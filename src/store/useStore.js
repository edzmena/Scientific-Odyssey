import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { isToday, isYesterday, parseISO } from 'date-fns'

// XP level thresholds
export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3700, 4700]
const LEVEL_NAMES = [
  'Curious Learner', 'Science Explorer', 'Lab Apprentice', 'Research Cadet',
  'Science Scholar', 'Experiment Ace', 'Physics Prodigy', 'Chemistry Sage',
  'Biology Master', 'Science Champion',
]

export function getLevel(xp) {
  let level = 0
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i
  }
  return level
}

export function getLevelName(level) {
  return LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length - 1)]
}

export function getXPProgress(xp) {
  const level = getLevel(xp)
  const current = LEVEL_THRESHOLDS[level]
  const next = LEVEL_THRESHOLDS[level + 1] ?? current
  const progress = next === current ? 100 : Math.round(((xp - current) / (next - current)) * 100)
  return { level, levelName: getLevelName(level), xp, current, next, progress }
}

const useStore = create((set, get) => ({
  user: null,
  profile: null,
  examAttempts: [],
  interviewSessions: [],
  loading: true,

  setUser: (user) => set({ user }),

  loadProfile: async (userId) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !profile) { set({ loading: false }); return }

    // Backfill full_name from auth metadata if the profile row is missing it
    // (e.g., accounts created before the signup flow saved it to `profiles`)
    if (!profile.full_name) {
      const { data: { user: authUser } = {} } = await supabase.auth.getUser()
      const metaName = authUser?.user_metadata?.full_name
      if (metaName) {
        await supabase.from('profiles').update({ full_name: metaName }).eq('id', userId)
        profile.full_name = metaName
      }
    }

    // Streak logic
    let { streak = 1, last_active } = profile
    const today = new Date().toISOString().split('T')[0]

    if (last_active) {
      const lastDate = parseISO(last_active)
      if (isToday(lastDate)) {
        // no change
      } else if (isYesterday(lastDate)) {
        streak += 1
        await supabase.from('profiles').update({ streak, last_active: today }).eq('id', userId)
      } else {
        streak = 1
        await supabase.from('profiles').update({ streak, last_active: today }).eq('id', userId)
      }
    } else {
      await supabase.from('profiles').update({ streak: 1, last_active: today }).eq('id', userId)
    }

    set({ profile: { ...profile, streak }, loading: false })
  },

  loadHistory: async (userId) => {
    const [exams, interviews] = await Promise.all([
      supabase.from('exam_attempts').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('interview_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    ])
    set({
      examAttempts: exams.data ?? [],
      interviewSessions: interviews.data ?? [],
    })
  },

  awardXP: async (userId, amount, reason) => {
    const { profile } = get()
    if (!profile) return
    const newXP = (profile.xp ?? 0) + amount
    await supabase.from('profiles').update({ xp: newXP }).eq('id', userId)
    set({ profile: { ...profile, xp: newXP } })
  },

  saveExamAttempt: async (userId, { subject, score, total, answers }) => {
    const base = 20
    const scaled = Math.round((score / total) * 30)
    const perfect = score === total ? 25 : 0
    const xpEarned = base + scaled + perfect

    const { data } = await supabase
      .from('exam_attempts')
      .insert({ user_id: userId, subject, score, total, xp_earned: xpEarned, answers })
      .select()
      .single()

    if (data) {
      get().awardXP(userId, xpEarned, 'exam')
      set((s) => ({ examAttempts: [data, ...s.examAttempts] }))
    }
    return { xpEarned }
  },

  saveInterviewSession: async (userId, { questionId, question, answer, feedback, score }) => {
    const xpEarned = 15
    const { data } = await supabase
      .from('interview_sessions')
      .insert({ user_id: userId, question_id: questionId, question, answer, feedback, score, xp_earned: xpEarned })
      .select()
      .single()

    if (data) {
      get().awardXP(userId, xpEarned, 'interview')
      set((s) => ({ interviewSessions: [data, ...s.interviewSessions] }))
    }
    return { xpEarned }
  },
}))

export default useStore
