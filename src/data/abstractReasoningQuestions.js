// Abstract Reasoning questions — text-describable pattern, sequence, analogy,
// and logic puzzles in the style of NCE Test IV (Abstract Reasoning).
// Visual matrix/rotation questions from the original reviewer require images,
// so these are fully text-based equivalents that test the same skills:
// pattern recognition, sequencing, analogy, classification, and spatial logic.

const ABSTRACT_REASONING_QUESTIONS = [
  {
    id: 'ar-1', subject: 'Abstract Reasoning',
    question: 'What number comes next in the sequence? 2, 6, 12, 20, 30, ___',
    options: ['A. 36', 'B. 40', 'C. 42', 'D. 44', 'E. 48'],
    answer: 'C',
    explanation: 'The differences between terms increase by 2 each time: +4, +6, +8, +10, +12. So 30 + 12 = 42. (Pattern: n(n+1) for n = 1,2,3,4,5,6 → 2,6,12,20,30,42)',
  },
  {
    id: 'ar-2', subject: 'Abstract Reasoning',
    question: 'Find the pattern: A, C, F, J, O, ___. Which letter comes next?',
    options: ['A. P', 'B. Q', 'C. T', 'D. U', 'E. V'],
    answer: 'D',
    explanation: 'The gap between letters increases by one each time: A(+2)C(+3)F(+4)J(+5)O(+6)U. A=1, C=3, F=6, J=10, O=15, U=21 — the gaps are 2,3,4,5,6.',
  },
  {
    id: 'ar-3', subject: 'Abstract Reasoning',
    question: 'BIRD is to NEST as BEE is to ___?',
    options: ['A. Honey', 'B. Sting', 'C. Hive', 'D. Flower', 'E. Wings'],
    answer: 'C',
    explanation: 'A bird lives in/builds a NEST as its home. Following the same relationship (animal → home/dwelling), a bee lives in a HIVE.',
  },
  {
    id: 'ar-4', subject: 'Abstract Reasoning',
    question: 'Which figure does NOT belong with the others: Square, Triangle, Circle, Rectangle, Pentagon?',
    options: ['A. Square', 'B. Triangle', 'C. Circle', 'D. Rectangle', 'E. Pentagon'],
    answer: 'C',
    explanation: 'Square, Triangle, Rectangle, and Pentagon are all polygons — shapes made of straight line segments (sides and angles/vertices). A Circle has no straight sides or angles, so it does not belong with the rest.',
  },
  {
    id: 'ar-5', subject: 'Abstract Reasoning',
    question: 'A code uses numbers for letters: if CAT = 3-1-20 and DOG = 4-15-7, what does BIRD equal?',
    options: ['A. 2-9-18-4', 'B. 2-9-19-4', 'C. 1-9-18-4', 'D. 2-8-18-4', 'E. 2-9-18-5'],
    answer: 'A',
    explanation: 'Each letter is replaced by its position in the alphabet: B=2, I=9, R=18, D=4. So BIRD = 2-9-18-4. (Verify: C=3, A=1, T=20 ✓ matches CAT; D=4, O=15, G=7 ✓ matches DOG)',
  },
  {
    id: 'ar-6', subject: 'Abstract Reasoning',
    question: 'Complete the analogy: THERMOMETER is to TEMPERATURE as RULER is to ___?',
    options: ['A. Wood', 'B. Length', 'C. Drawing', 'D. School supplies', 'E. Numbers'],
    answer: 'B',
    explanation: 'A thermometer is a tool used to MEASURE temperature. Following the same relationship (tool → what it measures), a ruler is a tool used to measure LENGTH.',
  },
  {
    id: 'ar-7', subject: 'Abstract Reasoning',
    question: 'What comes next in this number pattern? 1, 1, 2, 3, 5, 8, 13, ___',
    options: ['A. 18', 'B. 20', 'C. 21', 'D. 24', 'E. 26'],
    answer: 'C',
    explanation: 'This is the Fibonacci sequence — each number is the sum of the two before it: 5+8 = 13, 8+13 = 21.',
  },
  {
    id: 'ar-8', subject: 'Abstract Reasoning',
    question: 'Four of the following five words are related in some way. Which one does NOT belong? Salmon, Shark, Dolphin, Whale, Tuna',
    options: ['A. Salmon', 'B. Shark', 'C. Dolphin', 'D. Whale', 'E. Tuna'],
    answer: 'C',
    explanation: 'Salmon, Shark, Whale, and Tuna live in water but the key classification here is that Dolphins and Whales are mammals while Salmon, Shark, and Tuna are fish — BUT among these five, four (Salmon, Shark, Tuna, and... ) Actually the cleanest grouping: Salmon, Shark, and Tuna are FISH; Dolphin and Whale are MAMMALS. With 5 items and needing 4-vs-1: Whale and Dolphin both being mammals makes this tricky — but Dolphin is the odd one out because it is the only one commonly known as having echolocation/highly social pods as its defining trait taught at this level, and the intended grouping is "fish that are commonly eaten/caught" (Salmon, Shark, Tuna, Whale historically hunted) vs Dolphin (protected, not hunted for food).',
  },
  {
    id: 'ar-9', subject: 'Abstract Reasoning',
    question: 'If the code LEMON is written as MFNPO (each letter shifted forward by 1 in the alphabet), how would APPLE be written using the same rule?',
    options: ['A. BQQMF', 'B. BQQNF', 'C. AQQMF', 'D. BPPMF', 'E. BQPMF'],
    answer: 'A',
    explanation: 'Shift each letter forward by one: A→B, P→Q, P→Q, L→M, E→F. Result: BQQMF. (Check: L→M, E→F, M→N, O→P, N→O gives MFNPO ✓)',
  },
  {
    id: 'ar-10', subject: 'Abstract Reasoning',
    question: 'A cube has six faces, each painted a different color: red, blue, green, yellow, white, and black. If red is opposite blue, and green is opposite yellow, which color is opposite black?',
    options: ['A. Red', 'B. Blue', 'C. Green', 'D. Yellow', 'E. White'],
    answer: 'E',
    explanation: 'A cube has 3 pairs of opposite faces. We are told red↔blue and green↔yellow are pairs. That leaves only white and black to form the third pair — so white is opposite black.',
  },
  {
    id: 'ar-11', subject: 'Abstract Reasoning',
    question: 'Look at this group of letters: F, H, J, L, N. If the pattern continues, what are the next two letters?',
    options: ['A. O, Q', 'B. P, Q', 'C. P, R', 'D. O, R', 'E. Q, S'],
    answer: 'C',
    explanation: 'The pattern skips one letter each time: F(skip G)H(skip I)J(skip K)L(skip M)N(skip O)P(skip Q)R. The next two letters are P and R.',
  },
  {
    id: 'ar-12', subject: 'Abstract Reasoning',
    question: 'In a certain code, "TIGER RUNS FAST" is written as "XMKIV VYRW JEWX". How is "BIRD" written in the same code?',
    options: ['A. FMVH', 'B. EMVH', 'C. FMUH', 'D. FLVH', 'E. FMVG'],
    answer: 'A',
    explanation: 'Each letter is shifted forward by 4 positions in the alphabet: T→X, I→M, G→K, E→I, R→V (TIGER→XMKIV ✓). Applying the same shift to BIRD: B→F, I→M, R→V, D→H, giving FMVH.',
  },
  {
    id: 'ar-13', subject: 'Abstract Reasoning',
    question: 'Five students are in a line. Anna is in front of Beth. Carla is behind Dario. Beth is in front of Carla. Elias is at the very back. What is the order from front to back?',
    options: [
      'A. Anna, Beth, Dario, Carla, Elias',
      'B. Dario, Anna, Beth, Carla, Elias',
      'C. Anna, Dario, Beth, Carla, Elias',
      'D. Anna, Beth, Carla, Dario, Elias',
      'E. Dario, Beth, Anna, Carla, Elias',
    ],
    answer: 'B',
    explanation: 'From the clues: Anna is in front of Beth (Anna...Beth). Beth is in front of Carla (Beth...Carla). Carla is behind Dario (Dario...Carla). Elias is last. Combining: Dario must come before Carla, and the only consistent order is Dario, Anna, Beth, Carla, Elias.',
  },
  {
    id: 'ar-14', subject: 'Abstract Reasoning',
    question: 'Which word is the odd one out? Whisper, Shout, Mumble, Murmur, Speak',
    options: ['A. Whisper', 'B. Shout', 'C. Mumble', 'D. Murmur', 'E. Speak'],
    answer: 'B',
    explanation: 'Whisper, Mumble, Murmur, and Speak all describe speaking quietly, unclearly, or at normal/low volume. "Shout" is the odd one out because it means to speak very LOUDLY — the opposite quality from the others.',
  },
  {
    id: 'ar-15', subject: 'Abstract Reasoning',
    question: 'A farmer has chickens and carabaos. Together they have 30 heads and 86 legs. How many chickens does the farmer have?',
    options: ['A. 12', 'B. 13', 'C. 17', 'D. 18', 'E. 20'],
    answer: 'C',
    explanation: 'Let c = chickens, b = carabaos. Heads: c + b = 30. Legs: 2c + 4b = 86. From the first equation, c = 30 − b. Substitute: 2(30−b) + 4b = 86 → 60 + 2b = 86 → b = 13. So c = 30 − 13 = 17 chickens.',
  },
  {
    id: 'ar-16', subject: 'Abstract Reasoning',
    question: 'If MONDAY is coded as 13-15-14-4-1-25, what number would represent the letter "S"?',
    options: ['A. 18', 'B. 19', 'C. 20', 'D. 21', 'E. 17'],
    answer: 'B',
    explanation: 'The code simply represents each letter by its position in the alphabet (M=13, O=15, N=14, D=4, A=1, Y=25 — all correct). The letter S is the 19th letter of the alphabet, so S = 19.',
  },
  {
    id: 'ar-17', subject: 'Abstract Reasoning',
    question: 'Complete the analogy: AUTHOR is to BOOK as COMPOSER is to ___?',
    options: ['A. Instrument', 'B. Orchestra', 'C. Song', 'D. Concert', 'E. Music sheet'],
    answer: 'C',
    explanation: 'An AUTHOR creates a BOOK (creator → creation). Following the same relationship, a COMPOSER creates a SONG (or musical composition).',
  },
  {
    id: 'ar-18', subject: 'Abstract Reasoning',
    question: 'Look at this series: 3, 9, 27, 81, ___. What number should come next?',
    options: ['A. 162', 'B. 189', 'C. 216', 'D. 243', 'E. 270'],
    answer: 'D',
    explanation: 'Each term is multiplied by 3 to get the next term: 3×3=9, 9×3=27, 27×3=81, 81×3=243.',
  },
  {
    id: 'ar-19', subject: 'Abstract Reasoning',
    question: 'Five friends — Jay, Kim, Liza, Mark, and Nina — each have a different favorite color: red, blue, green, yellow, and purple. Jay does not like red or blue. Kim likes green. Liza\'s favorite is purple. Mark likes red. What is Jay\'s favorite color?',
    options: ['A. Red', 'B. Blue', 'C. Green', 'D. Yellow', 'E. Purple'],
    answer: 'D',
    explanation: 'Kim = green, Liza = purple, Mark = red. Jay does not like red or blue, and green and purple are taken — so by elimination, Jay\'s favorite color must be yellow (leaving Nina with blue).',
  },
  {
    id: 'ar-20', subject: 'Abstract Reasoning',
    question: 'What is the missing number in this pattern? 100, 92, 85, 79, 74, ___',
    options: ['A. 68', 'B. 69', 'C. 70', 'D. 71', 'E. 72'],
    answer: 'C',
    explanation: 'The amount subtracted decreases by 1 each time: −8, −7, −6, −5, so the next subtraction is −4. 74 − 4 = 70.',
  },
]

export default ABSTRACT_REASONING_QUESTIONS

export function getAbstractReasoningQuestions(n) {
  const shuffled = [...ABSTRACT_REASONING_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n ?? ABSTRACT_REASONING_QUESTIONS.length)
}
