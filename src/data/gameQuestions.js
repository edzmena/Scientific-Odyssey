// Scientific Odyssey — Game Questions & Story Data

export const STORY_SLIDES = [
  {
    title: 'The Sea of Knowledge',
    emoji: '🌊',
    text: 'You are Odysseus — a young Filipino scholar with one dream: to earn a place at the fabled Mount Olympus Academy, the most prestigious science school in the archipelago.\n\nBut the sea between you and your dream is vast and treacherous.',
  },
  {
    title: 'Your Mission',
    emoji: '🗺️',
    text: 'Six mythical islands guard the path to Mount Olympus. Each holds an ancient challenge that tests a different skill. Conquer all six, and the gates of the Academy will open for you.',
  },
  {
    title: 'Your Crew',
    emoji: '⛵',
    text: 'You sail aboard the ship Elpis (Hope) with your trusted crew:\n\n🧭 Mentor — the wise navigator\n💪 Eurylochus — the brave but stubborn first mate\n📖 Elpenor — the quick-witted scholar\n⭐ Polites — the loyal and kind heart of the crew',
  },
  {
    title: 'The Journey Begins',
    emoji: '🏝️',
    text: 'The gods are watching. Athena herself will guide you when you lose your way.\n\nBut beware — the journey will test not just your knowledge, but your courage, your teamwork, and your will to keep going.\n\nAre you ready, Odysseus?',
  },
]

export const ISLANDS = [
  {
    id: 'geometry',
    name: 'Geometry Island',
    emoji: '📐',
    subject: 'Math',
    description: 'Shapes and measurements guard this golden island.',
    intro: "The island is covered in perfect shapes — triangles, circles, and polygons of pure gold. The Geometrons, guardians of mathematical form, block your path. Prove you understand the language of shapes.",
    color: 'from-amber-400 to-yellow-300',
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    crew: 'Mentor',
  },
  {
    id: 'cyclops',
    name: "Cyclops' Cave",
    emoji: '🕳️',
    subject: 'Logic',
    description: "Logic traps set by the one-eyed giant lurk here.",
    intro: "You enter the dark cave of the Cyclops Polyphemus. He won't let you pass unless you can outsmart him. His traps are patterns, puzzles, and riddles designed to fool the careless thinker.",
    color: 'from-purple-500 to-indigo-400',
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    crew: 'Eurylochus',
  },
  {
    id: 'sirens',
    name: 'Sirens of Science',
    emoji: '🎵',
    subject: 'Science Facts',
    description: "The Sirens sing beautiful lies. Can you spot the truth?",
    intro: "The Sirens sit on the rocks and sing — but their songs are full of false science facts! Each note they sing could lead you astray. Cover your ears and think critically. Only truth will set you free.",
    color: 'from-cyan-500 to-teal-400',
    border: 'border-cyan-300',
    bg: 'bg-cyan-50',
    crew: 'Elpenor',
  },
  {
    id: 'hermes',
    name: "Hermes' Route",
    emoji: '🌿',
    subject: 'English',
    description: "The messenger god tests your command of words.",
    intro: "Hermes, the winged messenger, blocks the mountain pass. He speaks in riddles, analogies, and grammar challenges. Only those who master the English language may use his route to continue the journey.",
    color: 'from-green-500 to-emerald-400',
    border: 'border-green-300',
    bg: 'bg-green-50',
    crew: 'Polites',
  },
  {
    id: 'poseidon',
    name: "Poseidon's Reef",
    emoji: '🌊',
    subject: 'Physics',
    description: "The sea god's domain — forces and energy rule here.",
    intro: "Your ship sails over the deep reef of Poseidon. Suddenly, the sea stirs. The god of the ocean demands tribute: answer his questions about the laws that govern his domain — force, motion, energy, and waves.",
    color: 'from-blue-500 to-sky-400',
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    crew: null,
  },
  {
    id: 'labyrinth',
    name: 'Labyrinth of Variables',
    emoji: '🌀',
    subject: 'Algebra',
    description: "The Minotaur's maze is built from equations and unknowns.",
    intro: "The great Labyrinth looms before you — a maze of twisting corridors, each wall carved with equations and unknowns. The Minotaur guards the exit. Solve the variables, find the values, and escape the maze.",
    color: 'from-rose-500 to-pink-400',
    border: 'border-rose-300',
    bg: 'bg-rose-50',
    crew: null,
  },
]

export const ISLAND_QUESTIONS = {
  geometry: [
    {
      q: 'What is the area of a rectangle with length 12 units and width 8 units?',
      options: ['A. 20 sq units', 'B. 40 sq units', 'C. 96 sq units', 'D. 80 sq units'],
      answer: 'C',
      hint: 'Area of a rectangle = length × width.',
    },
    {
      q: 'What is the sum of the interior angles of a triangle?',
      options: ['A. 90°', 'B. 180°', 'C. 270°', 'D. 360°'],
      answer: 'B',
      hint: 'All triangles, no matter the shape, have angles that add up to the same value.',
    },
    {
      q: 'A right triangle has legs of length 3 and 4. What is the length of the hypotenuse?',
      options: ['A. 5', 'B. 6', 'C. 7', 'D. 12'],
      answer: 'A',
      hint: 'Use the Pythagorean theorem: a² + b² = c²',
    },
    {
      q: 'What is the formula for the circumference of a circle?',
      options: ['A. πr²', 'B. 2πr', 'C. πd²', 'D. 4πr'],
      answer: 'B',
      hint: 'Circumference is the distance around a circle. It involves both π and the radius.',
    },
    {
      q: 'What is the volume of a cube with side length 4 units?',
      options: ['A. 16 cubic units', 'B. 48 cubic units', 'C. 64 cubic units', 'D. 32 cubic units'],
      answer: 'C',
      hint: 'Volume of a cube = side³',
    },
    {
      q: 'How many degrees are in the sum of interior angles of a pentagon (5-sided polygon)?',
      options: ['A. 360°', 'B. 450°', 'C. 540°', 'D. 720°'],
      answer: 'C',
      hint: 'Formula: (n - 2) × 180°, where n is the number of sides.',
    },
  ],
  cyclops: [
    {
      q: 'What is the next number in the pattern: 2, 6, 18, 54, ___?',
      options: ['A. 72', 'B. 108', 'C. 162', 'D. 216'],
      answer: 'C',
      hint: 'Look at what you multiply by each time.',
    },
    {
      q: 'A clock shows 6:00. What is the angle between the hour and minute hands?',
      options: ['A. 90°', 'B. 120°', 'C. 150°', 'D. 180°'],
      answer: 'D',
      hint: 'At 6:00, one hand points up and the other points straight down.',
    },
    {
      q: 'A rooster is sitting on top of a pointed roof. It lays an egg. Which side does the egg roll down?',
      options: ['A. The left side', 'B. The right side', 'C. Whichever side faces the wind', 'D. Roosters do not lay eggs'],
      answer: 'D',
      hint: 'Think carefully about the biology of roosters.',
    },
    {
      q: "Mary's mother has 5 daughters: Nana, Nene, Nini, Nono, and ___. What is the fifth daughter's name?",
      options: ['A. Nunu', 'B. Nyny', 'C. Mary', 'D. Nana'],
      answer: 'C',
      hint: "Re-read the question carefully. Who is asking about the mother's daughters?",
    },
    {
      q: 'What are the next two numbers in the sequence: 1, 4, 9, 16, 25, ___, ___?',
      options: ['A. 30, 35', 'B. 35, 49', 'C. 36, 49', 'D. 36, 48'],
      answer: 'C',
      hint: 'Notice these are perfect squares: 1², 2², 3², 4², 5²...',
    },
    {
      q: 'If you have a 3-litre jug and a 5-litre jug, how do you measure exactly 4 litres of water?',
      options: [
        'A. Fill the 5-litre jug, pour into 3-litre until full, leaving exactly 4 litres',
        'B. Fill both jugs halfway',
        'C. Fill the 3-litre jug twice and remove 2 litres',
        'D. It is impossible',
      ],
      answer: 'A',
      hint: 'Fill the big jug, then fill the small jug from it. What remains?',
    },
  ],
  sirens: [
    {
      q: 'TRUE or FALSE: The sun is a planet.',
      options: ['A. True', 'B. False', 'C. Sometimes true', 'D. Only at night'],
      answer: 'B',
      hint: 'Planets orbit stars. What kind of object is the Sun?',
    },
    {
      q: 'Which statement is a MYTH (not true)?',
      options: [
        'A. Plants release oxygen during photosynthesis',
        'B. Humans use only 10% of their brains',
        'C. Lightning can strike the same place twice',
        'D. The Earth orbits the Sun',
      ],
      answer: 'B',
      hint: 'Brain scans show activity throughout the brain, not just 10%.',
    },
    {
      q: 'TRUE or FALSE: The Great Wall of China is visible from outer space with the naked eye.',
      options: ['A. True', 'B. False', 'C. Only in clear weather', 'D. Only from low orbit'],
      answer: 'B',
      hint: 'The Wall is long but very narrow. Astronauts have confirmed this is a myth.',
    },
    {
      q: 'Scientifically, is a tomato a fruit or a vegetable?',
      options: ['A. Vegetable', 'B. Fruit', 'C. Neither', 'D. Both equally'],
      answer: 'B',
      hint: 'A fruit develops from the flower of a plant and contains seeds.',
    },
    {
      q: 'TRUE or FALSE: Antibiotics are effective against viral infections like the flu.',
      options: ['A. True', 'B. False', 'C. Only for strong viruses', 'D. Only for children'],
      answer: 'B',
      hint: 'Antibiotics target bacteria. Viruses are structurally very different.',
    },
    {
      q: 'Which of these is NOT a property of metals?',
      options: ['A. Conducts electricity', 'B. Is shiny (lustrous)', 'C. Dissolves easily in water', 'D. Is malleable'],
      answer: 'C',
      hint: 'Most metals are conductors, shiny, and can be shaped — but water has little effect on most metals.',
    },
  ],
  hermes: [
    {
      q: 'What is a synonym (same meaning) for the word "luminous"?',
      options: ['A. Dark', 'B. Heavy', 'C. Glowing', 'D. Quiet'],
      answer: 'C',
      hint: '"Luminous" comes from "lumen" — Latin for light.',
    },
    {
      q: 'Complete the analogy: Doctor : Hospital :: Teacher : ___',
      options: ['A. Classroom', 'B. Library', 'C. School', 'D. Chalkboard'],
      answer: 'C',
      hint: 'Think about WHERE each person works.',
    },
    {
      q: 'What is the plural form of the word "criterion"?',
      options: ['A. criterions', 'B. criterias', 'C. criteria', 'D. criterium'],
      answer: 'C',
      hint: 'This word comes from Greek. Many Greek words form plurals with "-a" instead of "-s".',
    },
    {
      q: 'Which word is spelled correctly?',
      options: ['A. neccessary', 'B. necessary', 'C. necesary', 'D. neccesary'],
      answer: 'B',
      hint: 'Remember: 1 collar (c), 2 socks (ss). One "c", double "s".',
    },
    {
      q: 'Identify the VERB in this sentence: "The scientist carefully observed the specimen under a microscope."',
      options: ['A. scientist', 'B. carefully', 'C. observed', 'D. specimen'],
      answer: 'C',
      hint: 'The verb is the action word in the sentence.',
    },
    {
      q: 'What is the antonym (opposite) of "ephemeral"?',
      options: ['A. Short-lived', 'B. Fragile', 'C. Lasting / Permanent', 'D. Invisible'],
      answer: 'C',
      hint: '"Ephemeral" means lasting for a very short time. What is the opposite of that?',
    },
  ],
  poseidon: [
    {
      q: 'What is the SI unit of power?',
      options: ['A. Joule', 'B. Newton', 'C. Watt', 'D. Pascal'],
      answer: 'C',
      hint: 'Power is the rate of doing work. 1 W = 1 J/s.',
    },
    {
      q: 'What type of energy does a stretched rubber band possess?',
      options: ['A. Kinetic energy', 'B. Chemical energy', 'C. Thermal energy', 'D. Elastic potential energy'],
      answer: 'D',
      hint: 'It is stored energy due to deformation — not yet moving, but ready to release.',
    },
    {
      q: 'What is the formula for density?',
      options: ['A. mass × volume', 'B. mass / volume', 'C. volume / mass', 'D. force / area'],
      answer: 'B',
      hint: 'Dense objects pack more mass into less space.',
    },
    {
      q: 'An object will float in water if its density is:',
      options: ['A. Equal to water', 'B. Greater than water', 'C. Less than water', 'D. Zero'],
      answer: 'C',
      hint: 'Water has a density of 1 g/cm³. Objects denser than this sink.',
    },
    {
      q: 'Which travels faster: sound or light?',
      options: ['A. Sound', 'B. Light', 'C. They travel at the same speed', 'D. Depends on the medium'],
      answer: 'B',
      hint: 'This is why you see lightning before you hear thunder.',
    },
    {
      q: 'What happens to water pressure as you go deeper underwater?',
      options: ['A. It decreases', 'B. It stays the same', 'C. It increases', 'D. It disappears'],
      answer: 'C',
      hint: 'More water above you = more weight pushing down = more pressure.',
    },
  ],
  labyrinth: [
    {
      q: 'Solve for x: 2x + 5 = 13',
      options: ['A. x = 3', 'B. x = 4', 'C. x = 5', 'D. x = 9'],
      answer: 'B',
      hint: 'Subtract 5 from both sides first, then divide.',
    },
    {
      q: 'If y = 3x − 2 and x = 5, what is y?',
      options: ['A. y = 10', 'B. y = 11', 'C. y = 13', 'D. y = 17'],
      answer: 'C',
      hint: 'Substitute x = 5 into the equation and calculate.',
    },
    {
      q: 'Simplify: 4a + 3b − 2a + b',
      options: ['A. 2a + 4b', 'B. 6a + 4b', 'C. 2a + 2b', 'D. 4a + 2b'],
      answer: 'A',
      hint: 'Combine like terms: group the "a" terms together and the "b" terms together.',
    },
    {
      q: 'What is the next term in the sequence: 3, 7, 11, 15, ___?',
      options: ['A. 17', 'B. 18', 'C. 19', 'D. 20'],
      answer: 'C',
      hint: 'Find the common difference between consecutive terms.',
    },
    {
      q: 'A bag contains x marbles. You add 8 more and now have 20. What is x?',
      options: ['A. x = 28', 'B. x = 14', 'C. x = 12', 'D. x = 10'],
      answer: 'C',
      hint: 'Set up the equation: x + 8 = 20',
    },
    {
      q: 'Which of these is equivalent to 3(2x + 4)?',
      options: ['A. 6x + 4', 'B. 5x + 7', 'C. 6x + 12', 'D. 6x + 7'],
      answer: 'C',
      hint: 'Use the distributive property: multiply 3 by each term inside the parentheses.',
    },
  ],
}

export const MUTINY_QUESTIONS = [
  {
    q: 'Your crewmate Eurylochus wants to give up and sail home. He says the challenge is too hard. What do you do?',
    options: [
      'A. Agree and turn the ship around',
      'B. Encourage him and remind the crew of the goal — work through it together',
      'C. Ignore him and keep going alone',
      'D. Tell everyone he is weak and replace him',
    ],
    answer: 'B',
    hint: 'Great leaders don\'t abandon struggling teammates.',
  },
  {
    q: 'Your crew disagrees on which island to tackle next. What is the best approach?',
    options: [
      'A. Let the loudest crewmate decide',
      'B. Ignore everyone and choose alone',
      'C. Give up and anchor the ship',
      'D. Listen to everyone, weigh the options, and decide together',
    ],
    answer: 'D',
    hint: 'Good teams make decisions by involving everyone.',
  },
  {
    q: 'You notice Elpenor made a calculation error that could send the ship off course. What should you do?',
    options: [
      'A. Say nothing — it\'s not your problem',
      'B. Laugh at his mistake in front of everyone',
      'C. Quietly point it out and help him correct it',
      'D. Report it to the captain to get him in trouble',
    ],
    answer: 'C',
    hint: 'Good crewmates help each other without embarrassment.',
  },
]

export const OLYMPUS_QUESTIONS = [
  {
    q: 'What is the powerhouse of the cell?',
    options: ['A. Nucleus', 'B. Ribosome', 'C. Mitochondria', 'D. Chloroplast'],
    answer: 'C',
    hint: 'This organelle produces ATP through cellular respiration.',
  },
  {
    q: 'The average of 5, 10, 15, 20, and 25 is:',
    options: ['A. 12', 'B. 13', 'C. 15', 'D. 17'],
    answer: 'C',
    hint: 'Average = sum of all values ÷ number of values.',
  },
  {
    q: 'Newton\'s Second Law states that Force =',
    options: ['A. mass × velocity', 'B. mass × acceleration', 'C. weight / mass', 'D. speed × time'],
    answer: 'B',
    hint: 'F = ma is one of the most important equations in physics.',
  },
  {
    q: 'The Mariana Trench — the deepest point on Earth — is found in which ocean?',
    options: ['A. Atlantic Ocean', 'B. Indian Ocean', 'C. Arctic Ocean', 'D. Pacific Ocean'],
    answer: 'D',
    hint: 'The Philippines is also in this ocean.',
  },
  {
    q: 'What is the pH of pure water at 25°C?',
    options: ['A. 0', 'B. 5', 'C. 7', 'D. 14'],
    answer: 'C',
    hint: 'Pure water is neither acidic nor basic.',
  },
  {
    q: '12.5% expressed as a fraction in lowest terms is:',
    options: ['A. 1/6', 'B. 1/8', 'C. 1/4', 'D. 12/100'],
    answer: 'B',
    hint: '12.5% = 12.5/100. Multiply numerator and denominator by 2 first.',
  },
  {
    q: 'Which organelle contains the cell\'s genetic information (DNA)?',
    options: ['A. Cell membrane', 'B. Vacuole', 'C. Nucleus', 'D. Mitochondria'],
    answer: 'C',
    hint: 'This organelle is often called the "control center" of the cell.',
  },
  {
    q: 'What is the unit of frequency?',
    options: ['A. Newton', 'B. Pascal', 'C. Ampere', 'D. Hertz'],
    answer: 'D',
    hint: 'Frequency measures cycles per second.',
  },
  {
    q: 'Marble is an example of which type of rock?',
    options: ['A. Igneous', 'B. Sedimentary', 'C. Metamorphic', 'D. Volcanic'],
    answer: 'C',
    hint: 'Marble forms when limestone is subjected to extreme heat and pressure.',
  },
  {
    q: 'Solve: If the ratio of boys to girls is 3:5 and there are 24 boys, how many girls are there?',
    options: ['A. 32', 'B. 36', 'C. 40', 'D. 48'],
    answer: 'C',
    hint: 'Set up a proportion: 3/5 = 24/x, then cross-multiply.',
  },
]

export const HARD_OLYMPUS_QUESTIONS = [
  {
    q: 'What is the process by which a cell divides to produce two identical daughter cells?',
    options: ['A. Meiosis', 'B. Mitosis', 'C. Fission', 'D. Budding'],
    answer: 'B',
    hint: 'Think: MITosis = Making Identical Twins (cells).',
  },
  {
    q: 'What is the Least Common Multiple (LCM) of 12 and 18?',
    options: ['A. 6', 'B. 24', 'C. 36', 'D. 72'],
    answer: 'C',
    hint: 'List multiples of both numbers until you find the first one in common.',
  },
  {
    q: 'According to the Law of Conservation of Energy, energy:',
    options: [
      'A. Can be created but not destroyed',
      'B. Can be destroyed but not created',
      'C. Can be created and destroyed equally',
      'D. Cannot be created or destroyed — only converted',
    ],
    answer: 'D',
    hint: 'Energy is never lost — it just changes form.',
  },
  {
    q: 'Which element has the highest electronegativity on the periodic table?',
    options: ['A. Oxygen', 'B. Chlorine', 'C. Fluorine', 'D. Nitrogen'],
    answer: 'C',
    hint: 'Electronegativity increases going up and to the right of the periodic table.',
  },
  {
    q: 'What causes the aurora borealis (Northern Lights)?',
    options: [
      'A. Moonlight reflecting off ice crystals',
      'B. Solar wind particles interacting with Earth\'s magnetic field',
      'C. Volcanic gases rising into the atmosphere',
      'D. Bioluminescent clouds',
    ],
    answer: 'B',
    hint: 'The key is Earth\'s magnetic field channeling charged particles from the Sun.',
  },
  {
    q: 'Evaluate: 3² + 4²',
    options: ['A. 14', 'B. 25', 'C. 49', 'D. 7'],
    answer: 'B',
    hint: '3² = 9, 4² = 16. Add them together.',
  },
  {
    q: 'What is the primary function of ribosomes in a cell?',
    options: ['A. Energy production', 'B. Waste removal', 'C. Protein synthesis', 'D. DNA replication'],
    answer: 'C',
    hint: 'Ribosomes "read" mRNA and assemble amino acids into proteins.',
  },
  {
    q: 'All squares are rectangles. Is every rectangle a square?',
    options: ['A. Yes', 'B. No', 'C. Only if the angles are right angles', 'D. Only if all sides are equal'],
    answer: 'B',
    hint: 'A square is a special rectangle with ALL sides equal. Not all rectangles have equal sides.',
  },
  {
    q: 'What is the relationship between the wavelength and frequency of a wave?',
    options: [
      'A. Directly proportional — both increase together',
      'B. Inversely proportional — as one increases, the other decreases',
      'C. They are always equal',
      'D. They have no relationship',
    ],
    answer: 'B',
    hint: 'v = fλ. If speed (v) is constant, increasing f must decrease λ.',
  },
  {
    q: 'What was the name of the supercontinent that existed approximately 300 million years ago?',
    options: ['A. Gondwana', 'B. Laurasia', 'C. Pangaea', 'D. Rodinia'],
    answer: 'C',
    hint: 'Alfred Wegener proposed this supercontinent as part of his Continental Drift theory.',
  },
]

export const TRAINING_QUESTIONS = [
  // Day 1: Biology
  { q: 'What is the basic unit of life?', options: ['A. Atom', 'B. Molecule', 'C. Cell', 'D. Organ'], answer: 'C', hint: 'Everything living is made of this.' },
  { q: 'Which organ pumps blood through the body?', options: ['A. Lungs', 'B. Liver', 'C. Kidney', 'D. Heart'], answer: 'D', hint: 'It beats about 100,000 times per day.' },
  { q: 'What is the green pigment in plants called?', options: ['A. Melanin', 'B. Chlorophyll', 'C. Carotene', 'D. Hemoglobin'], answer: 'B', hint: 'This pigment absorbs sunlight for photosynthesis.' },
  { q: 'Which blood cells fight infection?', options: ['A. Red blood cells', 'B. Platelets', 'C. White blood cells', 'D. Plasma'], answer: 'C', hint: 'These are the soldiers of your immune system.' },
  { q: 'What is the process of water moving through a plant called?', options: ['A. Osmosis', 'B. Transpiration', 'C. Respiration', 'D. Fermentation'], answer: 'B', hint: 'Water exits through the leaves.' },
  // Day 2: Chemistry
  { q: 'What is H₂O?', options: ['A. Carbon dioxide', 'B. Hydrogen peroxide', 'C. Water', 'D. Hydrochloric acid'], answer: 'C', hint: '2 Hydrogen atoms + 1 Oxygen atom.' },
  { q: 'What does pH measure?', options: ['A. Temperature', 'B. Pressure', 'C. Acidity or basicity', 'D. Density'], answer: 'C', hint: 'Scale from 0 (most acidic) to 14 (most basic).' },
  { q: 'Which is a physical change?', options: ['A. Burning wood', 'B. Rusting iron', 'C. Melting ice', 'D. Cooking an egg'], answer: 'C', hint: 'A physical change does not produce a new substance.' },
  { q: 'What is the symbol for gold?', options: ['A. Go', 'B. Gd', 'C. Ag', 'D. Au'], answer: 'D', hint: 'From the Latin "aurum."' },
  { q: 'What is the smallest particle of an element?', options: ['A. Molecule', 'B. Atom', 'C. Electron', 'D. Compound'], answer: 'B', hint: 'You cannot break this down further and still have the same element.' },
  // Day 3: Physics
  { q: 'What is the unit of electrical resistance?', options: ['A. Volt', 'B. Ampere', 'C. Watt', 'D. Ohm'], answer: 'D', hint: 'Named after Georg Simon Ohm.' },
  { q: 'What type of energy does a moving car have?', options: ['A. Chemical', 'B. Potential', 'C. Kinetic', 'D. Nuclear'], answer: 'C', hint: 'Energy of motion.' },
  { q: 'For every action there is an equal and opposite ___:', options: ['A. force', 'B. reaction', 'C. motion', 'D. inertia'], answer: 'B', hint: "Newton's Third Law." },
  { q: 'What type of wave is sound?', options: ['A. Transverse', 'B. Electromagnetic', 'C. Longitudinal', 'D. Light'], answer: 'C', hint: 'Sound makes particles vibrate in the same direction it travels.' },
  { q: 'What is the SI unit of temperature?', options: ['A. Fahrenheit', 'B. Celsius', 'C. Kelvin', 'D. Rankine'], answer: 'C', hint: 'Named after Lord Kelvin. 0 K is absolute zero.' },
  // Days 4-7 repeat shuffled
]
