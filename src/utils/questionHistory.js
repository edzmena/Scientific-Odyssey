// Tracks which questions a user has seen recently, so Mock Exams and the
// Odyssey game can avoid repeating the same questions within a 5-day window.
//
// Stored in localStorage as: { [userId]: { [questionId]: timestampMs } }

const STORAGE_KEY = 'so_question_history_v1'
const REPEAT_WINDOW_MS = 5 * 24 * 60 * 60 * 1000 // 5 days

function loadAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {} }
  catch { return {} }
}

function saveAll(all) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)) } catch { /* ignore quota errors */ }
}

function pruneExpired(userHistory) {
  const now = Date.now()
  const fresh = {}
  for (const [qid, ts] of Object.entries(userHistory ?? {})) {
    if (now - ts < REPEAT_WINDOW_MS) fresh[qid] = ts
  }
  return fresh
}

/** Mark a list of question objects (with `.id`) as seen right now for this user. */
export function recordSeen(userId, questions) {
  if (!userId || !questions?.length) return
  const all = loadAll()
  const userHistory = pruneExpired(all[userId])
  const now = Date.now()
  questions.forEach((q) => { if (q?.id) userHistory[q.id] = now })
  all[userId] = userHistory
  saveAll(all)
}

/**
 * Given a pool of questions, returns them split into { fresh, recentlySeen } —
 * `fresh` = not seen in the last 5 days, `recentlySeen` = seen within the window.
 * Also prunes expired entries for this user as a side effect.
 */
export function splitByRecency(userId, pool) {
  if (!userId) return { fresh: pool, recentlySeen: [] }
  const all = loadAll()
  const userHistory = pruneExpired(all[userId])
  all[userId] = userHistory
  saveAll(all)

  const fresh = []
  const recentlySeen = []
  for (const q of pool) {
    if (q?.id && userHistory[q.id]) recentlySeen.push(q)
    else fresh.push(q)
  }
  return { fresh, recentlySeen }
}

/**
 * Pick `n` questions from `pool`, preferring ones not seen in the last 5 days.
 * If there aren't enough fresh questions, backfills with the least-recently-seen
 * ones so the exam/game never comes up short. Automatically records the chosen
 * questions as "seen" for this user (set `record: false` to skip, e.g. for previews).
 */
export function pickQuestions(userId, pool, n, { record = true, shuffle = true } = {}) {
  const shuffled = shuffle ? [...pool].sort(() => Math.random() - 0.5) : [...pool]
  const { fresh, recentlySeen } = splitByRecency(userId, shuffled)

  let chosen
  if (fresh.length >= n) {
    chosen = fresh.slice(0, n)
  } else {
    // Not enough fresh ones — sort recently-seen by oldest-seen-first and backfill
    const all = loadAll()
    const userHistory = all[userId] ?? {}
    const byOldest = [...recentlySeen].sort((a, b) => (userHistory[a.id] ?? 0) - (userHistory[b.id] ?? 0))
    chosen = [...fresh, ...byOldest].slice(0, n)
  }

  if (record) recordSeen(userId, chosen)
  return chosen
}

export const REPEAT_WINDOW_DAYS = 5
