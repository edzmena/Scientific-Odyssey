// NCE Verbal Aptitude questions — extracted from official PSHS NCE Reviewer 2024
// Source: PSHS Admissions Office / DOST-PSHS System

const VERBAL_QUESTIONS = [
  // ── SPELLING ─────────────────────────────────────────────────────────────
  {
    id: 'va-1', subject: 'English',
    question: 'Choose the letter of the word that is spelled CORRECTLY.',
    options: ['A. inoculate', 'B. innooculate', 'C. innocculate', 'D. inooculate', 'E. inoculatte'],
    answer: 'A',
    explanation: 'The correct spelling is "inoculate" — one "n" and one "c." It means to introduce a vaccine or bacteria into a body.',
  },

  // ── VOCABULARY IN CONTEXT ────────────────────────────────────────────────
  {
    id: 'va-2', subject: 'English',
    question: 'Kiefer was exhausted after a long day of drills. He was ________ to finally rest and sleep for the night.',
    options: ['A. crestfallen', 'B. elated', 'C. exhilarated', 'D. invigorated', 'E. relieved'],
    answer: 'E',
    explanation: '"Relieved" fits — after exhausting work, one feels relief at finally being able to rest. Crestfallen = sad; elated/exhilarated = excited; invigorated = energized (opposite of what\'s needed here).',
  },
  {
    id: 'va-3', subject: 'English',
    question: 'Sarah showed her ________ spirit when she stood up to the bully and defended her friend.',
    options: ['A. aggressive', 'B. courageous', 'C. emphatic', 'D. rebellious', 'E. nonchalant'],
    answer: 'B',
    explanation: '"Courageous" best describes standing up to a bully to defend someone — it requires bravery. Aggressive = hostile; emphatic = forceful in expression; rebellious = defiant of authority; nonchalant = unconcerned.',
  },
  {
    id: 'va-4', subject: 'English',
    question: 'The young woman is considered a "subversive" by some members of the airline industry. The underlined word is CLOSEST in meaning to:',
    options: ['A. anarchist', 'B. heretic', 'C. terrorist', 'D. traitor', 'E. rebel'],
    answer: 'E',
    explanation: '"Subversive" refers to someone who seeks to undermine an established system — closest to "rebel." An anarchist rejects all authority; a heretic opposes religious doctrine; a terrorist uses violence; a traitor betrays their own group.',
  },
  {
    id: 'va-5', subject: 'English',
    question: '"The hidden dolls were made of costly materials like delicate porcelain and rich ivory." The underlined word "rich" is CLOSEST in meaning to:',
    options: ['A. abundant', 'B. complex', 'C. fruitful', 'D. pleasant', 'E. wealthy'],
    answer: 'E',
    explanation: 'In this context, "rich" describes ivory as precious/valuable/costly — closest to "wealthy" in the sense of luxurious or high-quality.',
  },

  // ── ANALOGIES ────────────────────────────────────────────────────────────
  {
    id: 'va-6', subject: 'English',
    question: 'Jupiter : planet :: Moon : ________',
    options: ['A. asteroid', 'B. galaxy', 'C. nebula', 'D. satellite', 'E. star'],
    answer: 'D',
    explanation: 'Jupiter is a type of planet. The Moon is a type of natural satellite. The relationship is "X is a type of Y."',
  },
  {
    id: 'va-7', subject: 'English',
    question: 'ball : bat :: tennis : ________',
    options: ['A. club', 'B. javelin', 'C. pole', 'D. racquet', 'E. stick'],
    answer: 'D',
    explanation: 'A bat is used to strike a ball; a racquet is used to strike a tennis ball. The relationship is "object : tool used to strike it."',
  },
  {
    id: 'va-8', subject: 'English',
    question: 'square : cube :: circle : ________',
    options: ['A. oval', 'B. sphere', 'C. cylinder', 'D. triangle', 'E. rectangle'],
    answer: 'B',
    explanation: 'A cube is the 3D version of a square. A sphere is the 3D version of a circle. The relationship is "2D shape : its 3D counterpart."',
  },
  {
    id: 'va-9', subject: 'English',
    question: 'guitar : strings :: piano : ________',
    options: ['A. keys', 'B. frets', 'C. hammers', 'D. cymbals', 'E. drumsticks'],
    answer: 'A',
    explanation: 'You play a guitar by interacting with its strings; you play a piano by pressing its keys. The relationship is "instrument : part you play."',
  },

  // ── PUNCTUATION ──────────────────────────────────────────────────────────
  {
    id: 'va-10', subject: 'English',
    question: 'Choose the sentence that uses PROPER punctuation:\n"Did I not tell you[?]" her mother said, "[t/T]hat biking is not as hard as it looks[?]"',
    options: [
      'A. "Did I not tell you," her mother said, "that biking is not as hard as it looks"?',
      'B. "Did I not tell you," her mother said, "that biking is not as hard as it looks?"',
      'C. "Did I not tell you", her mother said, "that biking is not as hard as it looks?"',
      'D. "Did I not tell you," her mother said, "That biking is not as hard as it looks"?',
      'E. "Did I not tell you," her mother said, "That biking is not as hard as it looks?"',
    ],
    answer: 'B',
    explanation: 'Comma goes INSIDE the quotation marks after "you,". The question mark belongs INSIDE the closing quote since the whole quoted sentence is a question. The continuation "that" is lowercase since it\'s part of the same quoted sentence.',
  },
  {
    id: 'va-11', subject: 'English',
    question: 'Choose the sentence that uses PROPER punctuation for a list:',
    options: [
      'A. My favorite sports are basketball, volleyball, a nd boxing.',
      'B. My favorite sports are basketball, volleyball and boxing.',
      'C. My favorite sports are, basketball, volleyball, and boxing.',
      'D. My favorite sports are: basketball, volleyball, and boxing.',
      'E. My favorite sports are basketball; volleyball; and boxing.',
    ],
    answer: 'B',
    explanation: 'No comma after "are" (eliminates C); no colon after a verb (eliminates D); semicolons are for independent clauses, not simple list items (eliminates E). B uses correct comma separation with no Oxford comma.',
  },

  // ── PREPOSITIONS & CONJUNCTIONS ──────────────────────────────────────────
  {
    id: 'va-12', subject: 'English',
    question: 'The boy is sad because his pet cat has been missing ________ last week.',
    options: ['A. after', 'B. by', 'C. for', 'D. from', 'E. since'],
    answer: 'E',
    explanation: '"Since" is used with a specific point in time (last week). "For" is used with a duration (for three days). The cat has been missing since a point in time — last week.',
  },
  {
    id: 'va-13', subject: 'English',
    question: 'Julie walked to the park ________ his brother, ________ they played badminton for hours.',
    options: ['A. to, when', 'B. with, but', 'C. with, and', 'D. for, because', 'E. and, because'],
    answer: 'C',
    explanation: '"With" shows accompaniment (she went with her brother). "And" connects two related actions that happen in sequence.',
  },
  {
    id: 'va-14', subject: 'English',
    question: 'Jenny was excited ________ her graduation celebration, but she was also nervous ________ the speech she had to deliver.',
    options: ['A. about, about', 'B. for, with', 'C. at, in', 'D. on, for', 'E. in, about'],
    answer: 'A',
    explanation: '"Excited about" and "nervous about" are both correct idiomatic expressions in English.',
  },

  // ── ERROR IDENTIFICATION ──────────────────────────────────────────────────
  {
    id: 'va-15', subject: 'English',
    question: 'Identify the error: "The students (A) had cleaned (B) the laboratory instruments (C) after conducting the experiment." (D) If no error, choose (E) NO ERROR.',
    options: ['A. The students', 'B. had cleaned', 'C. the laboratory instruments', 'D. after conducting the experiment', 'E. NO ERROR'],
    answer: 'E',
    explanation: 'The sentence is grammatically correct. "Had cleaned" (past perfect) is appropriate here — the cleaning happened before the experiment concluded.',
  },
  {
    id: 'va-16', subject: 'English',
    question: 'Find the error: "Even after the harvest, the farmers did not (A) wanted (B) to take a rest from working in the fields." (C)',
    options: ['A. Even after the harvest', 'B. wanted', 'C. from working in the fields', 'D. to take a rest', 'E. NO ERROR'],
    answer: 'B',
    explanation: '"Did not wanted" is incorrect. After "did not," the base form of the verb must be used: "did not want." Rule: auxiliary verb "did" already carries the past tense.',
  },
  {
    id: 'va-17', subject: 'English',
    question: 'Find the error: "Karen (A) had went to the market (B) to buy food supplies, but she forgot to bring her wallet with her." (C)',
    options: ['A. had went', 'B. to buy food supplies', 'C. bring her wallet with her', 'D. but she forgot', 'E. NO ERROR'],
    answer: 'A',
    explanation: '"Had went" is incorrect — "went" is the simple past of "go." The past participle is "gone." The correct form is "had gone."',
  },
  {
    id: 'va-18', subject: 'English',
    question: 'Find the error: "The teacher (A) asks the students if they understand the concept, and then she (C) explained it again for clarification." (D)',
    options: ['A. asks', 'B. if they understand', 'C. explained', 'D. for clarification', 'E. NO ERROR'],
    answer: 'C',
    explanation: 'Tense inconsistency: "asks" (present) and "explained" (past) cannot be in the same sentence describing the same sequence of events. It should be "explains" (present) to match "asks."',
  },

  // ── IDIOMS ───────────────────────────────────────────────────────────────
  {
    id: 'va-19', subject: 'English',
    question: '"The class president has a tendency to sit on the fence and leave issues unresolved." The idiom "sit on the fence" means "to be ________."',
    options: ['A. idle', 'B. indecisive', 'C. lazy', 'D. lethargic', 'E. negligent'],
    answer: 'B',
    explanation: '"Sit on the fence" = to be unable or unwilling to commit to a side or decision. It means being indecisive or neutral.',
  },
  {
    id: 'va-20', subject: 'English',
    question: '"The girl took the scholarship opportunity because she knew that such chances come once in a blue moon." The idiom "once in a blue moon" means:',
    options: ['A. fortuitously', 'B. improbably', 'C. occasionally', 'D. rarely', 'E. unexpectedly'],
    answer: 'D',
    explanation: '"Once in a blue moon" = very rarely. A "blue moon" is a rare astronomical event (second full moon in a month), so the idiom means something that happens very infrequently.',
  },
  {
    id: 'va-21', subject: 'English',
    question: '"The examination was difficult but Trebor was able to ________, so he got a high score."',
    options: ['A. spill the beans', 'B. bite the bullet', 'C. burn the midnight oil', 'D. hit the nail on the head', 'E. make it a piece of cake'],
    answer: 'D',
    explanation: '"Hit the nail on the head" = to do or say exactly the right thing. It fits because Trebor answered correctly, earning a high score. "Burn the midnight oil" means to study late, but the sentence implies he succeeded IN the exam, not in preparation.',
  },

  // ── SENTENCE ARRANGEMENT ─────────────────────────────────────────────────
  {
    id: 'va-22', subject: 'English',
    question: 'Arrange the sentences to form a coherent paragraph about Bruno the dog:\n1. Three years ago, my brother gave me a puppy.\n2. Bruno made me excited to go home from school.\n3. I would always find him patiently waiting by the door.\n4. Then we would play until it was time for dinner.\n5. I still remember that first day like it was just yesterday.\n6. I named him Bruno, because of his brown fur.',
    options: ['A. 4-3-2-5-6-1', 'B. 4-5-6-3-2-1', 'C. 1-6-5-4-3-2', 'D. 1-6-5-3-2-4', 'E. 1-6-5-3-4-2'],
    answer: 'D',
    explanation: 'Logical order: (1) Got the puppy → (6) Named him Bruno → (5) Remember that first day → (3) He waited by the door → (2) Made me excited to go home → (4) Played until dinner. Order: 1-6-5-3-2-4.',
  },
  {
    id: 'va-23', subject: 'English',
    question: 'Arrange the sentences to form a coherent paragraph about Jason\'s garden:\n1. First, he cleared the area of weeds and rocks.\n2. Jason wanted to plant a garden in his backyard.\n3. After that, he carefully placed the seeds in the holes and covered them with soil.\n4. Then, he dug small holes in the soil for the seeds.\n5. Finally, he placed a fence around the garden.\n6. Next, he watered the soil thoroughly.',
    options: ['A. 2-1-4-3-6-5', 'B. 2-1-3-4-5-6', 'C. 2-4-3-6-1-5', 'D. 2-6-1-4-3-5', 'E. 2-5-4-1-3-6'],
    answer: 'A',
    explanation: 'Logical order: (2) Wanted to plant → (1) Cleared the area → (4) Dug holes → (3) Placed seeds → (6) Watered → (5) Put up fence. Order: 2-1-4-3-6-5.',
  },
  // ── READING COMPREHENSION: "Doll Eyes" (passage included in question) ──────
  {
    id: 'va-24', subject: 'English',
    question: 'Read this excerpt from "Doll Eyes": A street urchin saw an old woman in a doll shop. The woman\'s eyes resembled those of her glass dolls — blank and observant. She beckoned the child inside with a crooked smile. Inside, the dolls seemed to watch in silence. The doll-maker\'s brand of magic was the sinister kind.\n\nBased on the sinister tone of the story, what would most likely happen to the little girl?',
    options: [
      'A. She would be sold to a syndicate.',
      'B. She would be turned over by the doll-maker to the DSWD.',
      'C. She would be given a doll by the doll-maker from her collection.',
      'D. She would be turned into one of the hidden dolls by the doll-maker.',
      'E. She would be adopted by the doll-maker and made an apprentice.',
    ],
    answer: 'D',
    explanation: 'The passage establishes a sinister atmosphere with glass-eyed dolls, a mysterious doll-maker, and "the sinister kind of magic." The most ominous and logically consistent outcome — given the horror/dark fairy-tale tone — is that the girl would be transformed into one of the dolls.',
  },
  {
    id: 'va-25', subject: 'English',
    question: '"Mood" is the overall atmosphere or feeling created by a story. In the "Doll Eyes" excerpt — with blank glass eyes, a crooked smile, watching dolls, and "sinister magic" — which word most strongly sets the story\'s mood?',
    options: ['A. alone', 'B. arcane', 'C. sinister', 'D. mundane', 'E. marvelous'],
    answer: 'C',
    explanation: '"Sinister" is directly used in the passage and means threatening, ominous, or evil. It best encapsulates the dark, foreboding atmosphere. "Arcane" means secret/mysterious but is not as strong. "Mundane" means ordinary — the opposite. "Marvelous" is positive.',
  },
  {
    id: 'va-26', subject: 'English',
    question: 'In the "Doll Eyes" excerpt, the doll-maker appears friendly but hides a sinister nature. The dolls look ordinary but are somehow unsettling. What is the story\'s most likely central message?',
    options: [
      'A. Materialism conquers the innocent.',
      'B. Things are not always as they seem.',
      'C. Be careful when talking to strangers.',
      'D. Children should be protected by adults.',
      'E. When people show you who they are, believe them.',
    ],
    answer: 'B',
    explanation: 'The central irony — ordinary-looking dolls with sinister secrets, a friendly-seeming old woman with dark magic — points to the theme "things are not always as they seem." While C is practical advice, the passage\'s literary message is broader about hidden truths.',
  },
  // ── READING COMPREHENSION: Industrial Revolution passage ──────────────────
  {
    id: 'va-27', subject: 'English',
    question: 'Passage: "The Industrial Revolution began in Britain in the late 18th century. James Watt\'s improved steam engine (c. 1755) powered factories and changed transportation. Increased mechanization led to the growth of factories and urbanization as people migrated from rural areas to cities in search of employment."\n\nWhat is the meaning of "urbanization" as used in the passage?',
    options: [
      'A. Agricultural advancement in rural areas',
      'B. Expansion of cities as people move into them',
      'C. Migration of people away from cities',
      'D. Development of rural communities',
      'E. Invention of new technologies',
    ],
    answer: 'B',
    explanation: 'The passage states urbanization occurred "as people migrated from rural areas to cities." Urbanization = the process of cities growing and expanding as population moves into them. It is caused by migration but is itself the expansion/growth of urban areas.',
  },
  {
    id: 'va-28', subject: 'English',
    question: 'Using the same Industrial Revolution passage: "The steam engine powered new locomotives, and train travel connected cities across the country, transforming how goods and people moved."\n\nWhat does the passage imply about the impact of the steam engine on transportation?',
    options: [
      'A. Use of horse-drawn carriages increased.',
      'B. Transportation between cities remained unchanged.',
      'C. People began migrating away from industrial cities.',
      'D. Travel became faster and more efficient.',
      'E. Factory profits decreased due to transportation costs.',
    ],
    answer: 'D',
    explanation: 'The passage states the steam engine powered locomotives that "transformed how goods and people moved" by connecting cities. This clearly implies transportation became faster and more efficient — the core implication of rail-connected cities.',
  },
  // ── READING COMPREHENSION: Library passage ────────────────────────────────
  {
    id: 'va-29', subject: 'English',
    question: 'Passage: "Marilou loved to spend her weekends at the local library. She would explore various genres — from science fiction to historical novels — and always left with a stack of books. The library was her favorite place to learn and dream."\n\nComplete the sentence: "Marilou loved to spend her weekends ______."',
    options: [
      'A. above the library',
      'B. around the library',
      'C. beside the library',
      'D. in the library',
      'E. on the library',
    ],
    answer: 'D',
    explanation: '"In the library" is the correct preposition for being inside a building. "At the library" (location) and "in the library" (inside) are both grammatically correct, but the passage later says she explores genres there, so she is physically inside — making "in" the best fit.',
  },
  {
    id: 'va-30', subject: 'English',
    question: 'Using the same library passage about Marilou: she explores science fiction, historical novels, and other genres, always leaving with a stack of books. Why does Marilou enjoy spending time at the library?',
    options: [
      'A. Because she has a lot of free time on weekends.',
      'B. Because she wants to be alone and away from people.',
      'C. Because she enjoys exploring different kinds of books.',
      'D. Because she needs to review and study for school.',
      'E. Because she likes to stay in a quiet place.',
    ],
    answer: 'C',
    explanation: 'The passage directly states Marilou "would explore various genres" — from science fiction to historical novels. This is explicitly why she enjoys the library: she loves discovering and reading different types of books. Options A, B, D, and E are not stated in the passage.',
  },
]

export default VERBAL_QUESTIONS

export function getVerbalQuestions(n) {
  const shuffled = [...VERBAL_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n ?? VERBAL_QUESTIONS.length)
}
