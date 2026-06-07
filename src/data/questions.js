// 40 PSHS-style Grade 6 Science questions — 10 per subject
// Replace these with your own question bank if needed.

const QUESTIONS = [
  // ── BIOLOGY ───────────────────────────────────────────────────────────────
  {
    id: 'bio-1', subject: 'Biology',
    question: 'Which organelle is known as the "powerhouse of the cell"?',
    options: ['A. Nucleus', 'B. Mitochondria', 'C. Chloroplast', 'D. Ribosome'],
    answer: 'B',
    explanation: 'Mitochondria produce ATP through cellular respiration, earning the nickname "powerhouse of the cell."',
  },
  {
    id: 'bio-2', subject: 'Biology',
    question: 'Which process do plants use to convert sunlight into food?',
    options: ['A. Respiration', 'B. Transpiration', 'C. Photosynthesis', 'D. Fermentation'],
    answer: 'C',
    explanation: 'Photosynthesis occurs in chloroplasts, converting CO₂ + H₂O + sunlight into glucose and oxygen.',
  },
  {
    id: 'bio-3', subject: 'Biology',
    question: 'What is the basic unit of heredity?',
    options: ['A. Chromosome', 'B. Cell', 'C. Protein', 'D. Gene'],
    answer: 'D',
    explanation: 'Genes are segments of DNA that encode instructions for protein synthesis and are passed from parent to offspring.',
  },
  {
    id: 'bio-4', subject: 'Biology',
    question: 'Which blood type is the universal donor?',
    options: ['A. AB+', 'B. O−', 'C. A+', 'D. B−'],
    answer: 'B',
    explanation: 'Type O− lacks A, B, and Rh antigens, so it can be given to patients of any blood type in emergencies.',
  },
  {
    id: 'bio-5', subject: 'Biology',
    question: 'What is the process by which organisms maintain a stable internal environment?',
    options: ['A. Osmosis', 'B. Homeostasis', 'C. Metabolism', 'D. Diffusion'],
    answer: 'B',
    explanation: 'Homeostasis is the self-regulating process that keeps internal conditions (temperature, pH, etc.) within a narrow range.',
  },
  {
    id: 'bio-6', subject: 'Biology',
    question: 'Which part of the plant absorbs water and minerals from the soil?',
    options: ['A. Stem', 'B. Leaves', 'C. Root hairs', 'D. Stomata'],
    answer: 'C',
    explanation: 'Root hair cells have a large surface area and absorb water and dissolved minerals through osmosis and active transport.',
  },
  {
    id: 'bio-7', subject: 'Biology',
    question: 'Meiosis results in cells with _____ the number of chromosomes as the parent cell.',
    options: ['A. Twice', 'B. The same', 'C. Four times', 'D. Half'],
    answer: 'D',
    explanation: 'Meiosis is a reductive division producing four haploid (n) cells from one diploid (2n) parent cell.',
  },
  {
    id: 'bio-8', subject: 'Biology',
    question: 'Which kingdom includes organisms that are prokaryotic and unicellular?',
    options: ['A. Fungi', 'B. Protista', 'C. Monera (Bacteria)', 'D. Plantae'],
    answer: 'C',
    explanation: 'Bacteria (domain Bacteria & Archaea, formerly kingdom Monera) are prokaryotes — they lack a membrane-bound nucleus.',
  },
  {
    id: 'bio-9', subject: 'Biology',
    question: 'Which hormone regulates blood sugar levels by promoting glucose uptake?',
    options: ['A. Glucagon', 'B. Estrogen', 'C. Insulin', 'D. Adrenaline'],
    answer: 'C',
    explanation: 'Insulin, produced by the pancreas, signals body cells to absorb glucose, lowering blood sugar levels.',
  },
  {
    id: 'bio-10', subject: 'Biology',
    question: 'What term describes organisms that make their own food through photosynthesis?',
    options: ['A. Heterotrophs', 'B. Decomposers', 'C. Consumers', 'D. Autotrophs'],
    answer: 'D',
    explanation: 'Autotrophs (producers) synthesize organic compounds from inorganic sources using sunlight or chemical energy.',
  },

  // ── CHEMISTRY ─────────────────────────────────────────────────────────────
  {
    id: 'chem-1', subject: 'Chemistry',
    question: 'What is the chemical formula for water?',
    options: ['A. HO', 'B. H₂O', 'C. H₂O₂', 'D. OH₂'],
    answer: 'B',
    explanation: 'Water consists of two hydrogen atoms covalently bonded to one oxygen atom: H₂O.',
  },
  {
    id: 'chem-2', subject: 'Chemistry',
    question: 'The pH of a neutral solution at 25 °C is:',
    options: ['A. 0', 'B. 7', 'C. 14', 'D. 1'],
    answer: 'B',
    explanation: 'A neutral solution has equal concentrations of H⁺ and OH⁻ ions, giving pH = 7 at 25 °C.',
  },
  {
    id: 'chem-3', subject: 'Chemistry',
    question: 'Which subatomic particle has a negative charge?',
    options: ['A. Neutron', 'B. Proton', 'C. Electron', 'D. Positron'],
    answer: 'C',
    explanation: 'Electrons carry a charge of −1.6 × 10⁻¹⁹ C and orbit the nucleus in electron shells.',
  },
  {
    id: 'chem-4', subject: 'Chemistry',
    question: 'What is the law that states matter cannot be created or destroyed?',
    options: ['A. Law of Definite Proportions', 'B. Law of Conservation of Mass', 'C. Avogadro\'s Law', 'D. Boyle\'s Law'],
    answer: 'B',
    explanation: 'The Law of Conservation of Mass (Lavoisier) states that the total mass of reactants equals the total mass of products.',
  },
  {
    id: 'chem-5', subject: 'Chemistry',
    question: 'Which element has the chemical symbol "Fe"?',
    options: ['A. Fluorine', 'B. Francium', 'C. Iron', 'D. Fermium'],
    answer: 'C',
    explanation: '"Fe" comes from the Latin "ferrum," the word for iron.',
  },
  {
    id: 'chem-6', subject: 'Chemistry',
    question: 'What type of bond is formed when electrons are shared between atoms?',
    options: ['A. Ionic bond', 'B. Hydrogen bond', 'C. Covalent bond', 'D. Metallic bond'],
    answer: 'C',
    explanation: 'In a covalent bond, two atoms share one or more pairs of electrons to achieve a stable electron configuration.',
  },
  {
    id: 'chem-7', subject: 'Chemistry',
    question: 'Sodium chloride (NaCl) is an example of a(n):',
    options: ['A. Covalent compound', 'B. Ionic compound', 'C. Metallic compound', 'D. Organic compound'],
    answer: 'B',
    explanation: 'NaCl is formed by the electrostatic attraction between Na⁺ and Cl⁻ ions — a classic ionic compound.',
  },
  {
    id: 'chem-8', subject: 'Chemistry',
    question: 'Which gas is produced when an acid reacts with a carbonate?',
    options: ['A. Oxygen', 'B. Hydrogen', 'C. Carbon dioxide', 'D. Nitrogen'],
    answer: 'C',
    explanation: 'Acid + carbonate → salt + water + CO₂. For example: HCl + CaCO₃ → CaCl₂ + H₂O + CO₂.',
  },
  {
    id: 'chem-9', subject: 'Chemistry',
    question: 'How many elements are in the modern periodic table?',
    options: ['A. 108', 'B. 112', 'C. 118', 'D. 120'],
    answer: 'C',
    explanation: 'As of 2016, the IUPAC periodic table contains 118 confirmed elements (up to oganesson, Og).',
  },
  {
    id: 'chem-10', subject: 'Chemistry',
    question: 'What is the name of the process that separates a mixture by boiling point differences?',
    options: ['A. Filtration', 'B. Distillation', 'C. Chromatography', 'D. Crystallization'],
    answer: 'B',
    explanation: 'Distillation exploits differences in boiling points to separate liquid mixtures into their components.',
  },

  // ── PHYSICS ───────────────────────────────────────────────────────────────
  {
    id: 'phys-1', subject: 'Physics',
    question: 'What is the SI unit of force?',
    options: ['A. Joule', 'B. Watt', 'C. Pascal', 'D. Newton'],
    answer: 'D',
    explanation: 'The Newton (N) is the SI unit of force: 1 N = 1 kg·m/s².',
  },
  {
    id: 'phys-2', subject: 'Physics',
    question: 'According to Newton\'s second law, force equals:',
    options: ['A. mass × velocity', 'B. mass × acceleration', 'C. weight × height', 'D. speed × time'],
    answer: 'B',
    explanation: 'F = ma: force equals mass multiplied by acceleration.',
  },
  {
    id: 'phys-3', subject: 'Physics',
    question: 'The speed of light in a vacuum is approximately:',
    options: ['A. 3 × 10⁶ m/s', 'B. 3 × 10⁸ m/s', 'C. 3 × 10¹⁰ m/s', 'D. 3 × 10⁴ m/s'],
    answer: 'B',
    explanation: 'c ≈ 2.998 × 10⁸ m/s, often rounded to 3 × 10⁸ m/s.',
  },
  {
    id: 'phys-4', subject: 'Physics',
    question: 'What type of energy does a moving object possess?',
    options: ['A. Potential energy', 'B. Chemical energy', 'C. Thermal energy', 'D. Kinetic energy'],
    answer: 'D',
    explanation: 'Kinetic energy (KE = ½mv²) is the energy an object has due to its motion.',
  },
  {
    id: 'phys-5', subject: 'Physics',
    question: 'Which wave property measures the number of cycles per second?',
    options: ['A. Wavelength', 'B. Amplitude', 'C. Frequency', 'D. Speed'],
    answer: 'C',
    explanation: 'Frequency (Hz) is the number of complete oscillations per second. 1 Hz = 1 cycle/s.',
  },
  {
    id: 'phys-6', subject: 'Physics',
    question: 'What is the unit of electrical resistance?',
    options: ['A. Volt', 'B. Ampere', 'C. Ohm', 'D. Watt'],
    answer: 'C',
    explanation: 'Resistance is measured in Ohms (Ω). By Ohm\'s Law: V = IR.',
  },
  {
    id: 'phys-7', subject: 'Physics',
    question: 'Which simple machine is a wheel with a grooved rim used with a rope?',
    options: ['A. Lever', 'B. Wedge', 'C. Pulley', 'D. Screw'],
    answer: 'C',
    explanation: 'A pulley redirects or multiplies force using a wheel and rope/cable to lift or move loads.',
  },
  {
    id: 'phys-8', subject: 'Physics',
    question: 'An object at rest stays at rest unless acted upon by an external force. This is:',
    options: ['A. Newton\'s 2nd Law', 'B. Newton\'s 3rd Law', 'C. Newton\'s 1st Law', 'D. Hooke\'s Law'],
    answer: 'C',
    explanation: 'Newton\'s First Law (Law of Inertia): objects resist changes in their state of motion.',
  },
  {
    id: 'phys-9', subject: 'Physics',
    question: 'What is the formula for calculating work?',
    options: ['A. W = F/d', 'B. W = F × d', 'C. W = m × a', 'D. W = P × t'],
    answer: 'B',
    explanation: 'Work (W) = Force (F) × displacement (d) in the direction of force. Unit: Joule (J).',
  },
  {
    id: 'phys-10', subject: 'Physics',
    question: 'Which color of visible light has the shortest wavelength?',
    options: ['A. Red', 'B. Green', 'C. Yellow', 'D. Violet'],
    answer: 'D',
    explanation: 'Violet light has the shortest wavelength (~380–450 nm) in the visible spectrum, while red has the longest (~620–750 nm).',
  },

  // ── EARTH SCIENCE ─────────────────────────────────────────────────────────
  {
    id: 'earth-1', subject: 'Earth Science',
    question: 'What is the outermost layer of the Earth?',
    options: ['A. Mantle', 'B. Outer core', 'C. Crust', 'D. Inner core'],
    answer: 'C',
    explanation: 'The crust is the thin, rocky outer layer of Earth, divided into oceanic (~7 km) and continental (~35 km) crust.',
  },
  {
    id: 'earth-2', subject: 'Earth Science',
    question: 'The theory that explains the movement of continents is called:',
    options: ['A. Continental Drift', 'B. Plate Tectonics', 'C. Seafloor Spreading', 'D. All of the above'],
    answer: 'D',
    explanation: 'Continental drift (Wegener), seafloor spreading (Hess), and plate tectonics are interconnected theories that together explain how Earth\'s lithosphere moves.',
  },
  {
    id: 'earth-3', subject: 'Earth Science',
    question: 'Which type of rock is formed from cooled magma or lava?',
    options: ['A. Sedimentary', 'B. Metamorphic', 'C. Igneous', 'D. Limestone'],
    answer: 'C',
    explanation: 'Igneous rocks form from the cooling and solidification of molten rock (magma underground, lava at the surface).',
  },
  {
    id: 'earth-4', subject: 'Earth Science',
    question: 'What is the instrument used to measure earthquake intensity?',
    options: ['A. Barometer', 'B. Seismograph', 'C. Hygrometer', 'D. Anemometer'],
    answer: 'B',
    explanation: 'A seismograph records seismic waves produced by earthquakes. The Richter and Moment Magnitude scales use seismograph data.',
  },
  {
    id: 'earth-5', subject: 'Earth Science',
    question: 'Which layer of the atmosphere contains the ozone layer?',
    options: ['A. Troposphere', 'B. Mesosphere', 'C. Stratosphere', 'D. Thermosphere'],
    answer: 'C',
    explanation: 'The ozone layer is found in the stratosphere (15–35 km altitude) and absorbs harmful UV-B and UV-C radiation.',
  },
  {
    id: 'earth-6', subject: 'Earth Science',
    question: 'What causes the seasons on Earth?',
    options: [
      'A. Earth\'s varying distance from the Sun',
      'B. The tilt of Earth\'s axis',
      'C. The rotation of the Moon',
      'D. Sunspot activity',
    ],
    answer: 'B',
    explanation: 'Earth\'s 23.5° axial tilt causes different hemispheres to receive varying amounts of sunlight throughout the year.',
  },
  {
    id: 'earth-7', subject: 'Earth Science',
    question: 'The Ring of Fire is associated with which tectonic feature?',
    options: ['A. Mid-ocean ridges', 'B. Convergent plate boundaries & subduction zones', 'C. Transform faults only', 'D. Hot spots'],
    answer: 'B',
    explanation: 'The Ring of Fire encircles the Pacific Ocean along subduction zones and convergent boundaries, hosting ~90% of the world\'s earthquakes.',
  },
  {
    id: 'earth-8', subject: 'Earth Science',
    question: 'Water in its vapor form rises and cools to form clouds through the process of:',
    options: ['A. Evaporation', 'B. Condensation', 'C. Precipitation', 'D. Sublimation'],
    answer: 'B',
    explanation: 'Condensation occurs when water vapor cools and turns into liquid droplets, forming clouds and fog.',
  },
  {
    id: 'earth-9', subject: 'Earth Science',
    question: 'Which gas makes up the largest percentage of Earth\'s atmosphere?',
    options: ['A. Oxygen', 'B. Carbon dioxide', 'C. Argon', 'D. Nitrogen'],
    answer: 'D',
    explanation: 'Nitrogen (N₂) comprises about 78% of Earth\'s atmosphere. Oxygen is ~21%, argon ~0.93%.',
  },
  {
    id: 'earth-10', subject: 'Earth Science',
    question: 'What is the term for the point on Earth\'s surface directly above an earthquake\'s origin?',
    options: ['A. Focus', 'B. Epicenter', 'C. Fault line', 'D. Seismic zone'],
    answer: 'B',
    explanation: 'The epicenter is the surface point above the focus (hypocenter), where seismic waves are typically strongest.',
  },
]

export function getQuestionsBySubject(subject) {
  return QUESTIONS.filter((q) => q.subject === subject)
}

export function getRandomQuestions(n) {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export function getFullExam() {
  const subjects = ['Biology', 'Chemistry', 'Physics', 'Earth Science']
  return subjects.flatMap((s) =>
    getQuestionsBySubject(s)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
  )
}

export const SUBJECTS = ['Biology', 'Chemistry', 'Physics', 'Earth Science', 'Math', 'English']

export default QUESTIONS
