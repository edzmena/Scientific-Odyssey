const INTERVIEW_QUESTIONS = [
  // About Yourself
  {
    id: 'iy-1',
    category: 'About Yourself',
    question: 'Tell me about yourself and why you want to attend this science high school.',
    tip: 'Mention 2–3 specific science interests. Be authentic — interviewers can tell when answers are rehearsed.',
  },
  {
    id: 'iy-2',
    category: 'About Yourself',
    question: 'What is your greatest strength as a student, and how will it help you succeed in a competitive science program?',
    tip: 'Choose a real strength and give a concrete example from school. Tie it to science learning.',
  },
  {
    id: 'iy-3',
    category: 'About Yourself',
    question: 'Describe a time when you faced a challenge in school. How did you overcome it?',
    tip: 'Use the STAR method: Situation, Task, Action, Result. Keep it concise — about 2 minutes.',
  },

  // Science & Academics
  {
    id: 'sa-1',
    category: 'Science & Academics',
    question: 'Which branch of science do you find most fascinating and why?',
    tip: 'Pick one and go deep — explain a specific concept or discovery that excites you.',
  },
  {
    id: 'sa-2',
    category: 'Science & Academics',
    question: 'Can you explain what photosynthesis is in simple terms, as if you were teaching a younger student?',
    tip: 'Use an analogy. The ability to simplify complex ideas shows true understanding.',
  },
  {
    id: 'sa-3',
    category: 'Science & Academics',
    question: 'How do you prepare for a difficult science exam? Walk us through your study process.',
    tip: 'Show self-awareness and good study habits. Mention active recall, practice problems, or concept mapping.',
  },

  // Problem Solving
  {
    id: 'ps-1',
    category: 'Problem Solving',
    question: 'If you were given a science experiment with no instructions, how would you approach it?',
    tip: 'Demonstrate scientific thinking: hypothesis, variables, controls, observation, conclusion.',
  },
  {
    id: 'ps-2',
    category: 'Problem Solving',
    question: 'A classmate got a different result from yours in an experiment. What would you do?',
    tip: 'Show intellectual humility and scientific rigor. Propose re-testing, checking variables, and discussing methodology.',
  },
  {
    id: 'ps-3',
    category: 'Problem Solving',
    question: 'You have a limited budget and need to design a science fair project. How do you decide what to do?',
    tip: 'Focus on feasibility + impact. Judges love creative low-cost experiments with clear hypotheses.',
  },

  // Goals & Motivation
  {
    id: 'gm-1',
    category: 'Goals & Motivation',
    question: 'Where do you see yourself in 10 years? How does attending this school help you get there?',
    tip: 'Have a clear goal (field, career, impact). Connect it to the school\'s specific strengths.',
  },
  {
    id: 'gm-2',
    category: 'Goals & Motivation',
    question: 'Why should we choose you over other qualified applicants?',
    tip: 'Be confident, not arrogant. Highlight what makes you unique — passion, perspective, or specific experiences.',
  },

  // Science Awareness
  {
    id: 'sw-1',
    category: 'Science Awareness',
    question: 'What is a recent scientific discovery or news story that impressed you? Why?',
    tip: 'Read science news! Try NASA news, ScienceDaily, or the DOST website. Shows you\'re genuinely curious.',
  },
  {
    id: 'sw-2',
    category: 'Science Awareness',
    question: 'What is one environmental or scientific problem facing the Philippines today, and how could science help solve it?',
    tip: 'Good options: climate change, plastic pollution, typhoon resilience, food security. Be specific about the science.',
  },
]

export const INTERVIEW_CATEGORIES = [
  'About Yourself',
  'Science & Academics',
  'Problem Solving',
  'Goals & Motivation',
  'Science Awareness',
]

export function getQuestionsByCategory(category) {
  return INTERVIEW_QUESTIONS.filter((q) => q.category === category)
}

export function getRandomInterviewQuestion() {
  return INTERVIEW_QUESTIONS[Math.floor(Math.random() * INTERVIEW_QUESTIONS.length)]
}

export default INTERVIEW_QUESTIONS
