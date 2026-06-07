// NCE Scientific Ability questions — Test III from official PSHS NCE Reviewer 2024
// Source: PSHS Admissions Office / DOST-PSHS System
// These are application-level science questions (data interpretation, experimental design, reasoning)

const SCIENCE_ABILITY_QUESTIONS = [
  {
    id: 'sa-1', subject: 'Science',
    question: 'According to PAGASA\'s 2022 Annual Climate Bulletin summarizing annual total rainfall from 1991–2022, the highest recorded annual rainfall was approximately 2,966 mm. In which year did the Philippines experience this?',
    options: ['A. 1999', 'B. 2000', 'C. 2008', 'D. 2011', 'E. 2017'],
    answer: 'D',
    explanation: 'According to PAGASA climate data, 2011 recorded the highest annual total rainfall in the Philippines (approximately 2,966.5 mm), largely due to the enhanced monsoon season and multiple typhoons that year.',
  },
  {
    id: 'sa-2', subject: 'Science',
    question: 'Scientists study the effects of Variable X on tomato plant growth. They use identical seedlings, the same soil, and the same amount of water. They use a different fertilizer for four groups and no fertilizer for another. What is Variable X in this experiment?',
    options: [
      'A. The type of fertilizer used',
      'B. The initial size of the tomato seedlings',
      'C. The type of soil the plants are grown in',
      'D. The amount of water the plants receive',
      'E. The amount of sunlight the plants receive',
    ],
    answer: 'A',
    explanation: 'The independent variable (Variable X) is what is deliberately changed in an experiment. Here, only the fertilizer changes between groups. All other factors (soil, water, seedling size) are kept constant as controlled variables.',
  },
  {
    id: 'sa-3', subject: 'Science',
    question: 'A Venn diagram shows: Material X has unique properties "conducts heat" and "conducts electricity." Material Y has unique properties "cannot conduct heat" and "cannot conduct electricity." Both share "is a solid" and "does not dissolve in water." What are the most likely materials for X and Y?',
    options: [
      'A. Material X is copper, material Y is salt',
      'B. Material X is iron, material Y is copper',
      'C. Material X is iron, material Y is rubber',
      'D. Material X is rubber, material Y is iron',
      'E. Material X is salt, material Y is rubber',
    ],
    answer: 'C',
    explanation: 'Material X (conducts heat + electricity, solid, insoluble) = metal like iron. Material Y (does not conduct heat or electricity, solid, insoluble) = rubber. Salt (NaCl) dissolves in water, ruling it out. Copper conducts electricity, ruling it out for Y.',
  },
  {
    id: 'sa-4', subject: 'Science',
    question: 'Marvice wants to find out how the ANGLE of a ramp affects the DISTANCE a skateboard travels. She has skateboards, a ramp, and measuring tape. What should she do?',
    options: [
      'A. Release the skateboard from different heights onto a flat surface and measure how far it rolls each time.',
      'B. Use different skateboards on the same ramp at different angles and measure how far each skateboard travels.',
      'C. Set the ramp at one angle and release the skateboards multiple times, measuring the distance each time.',
      'D. Set the ramp at different angles and release the skateboard from the same starting point, measuring the distance traveled each time.',
      'E. Use the same skateboard and angle but change the surface the skateboard rolls on.',
    ],
    answer: 'D',
    explanation: 'To test the effect of ramp angle: change ONLY the angle (independent variable), keep everything else constant — same skateboard, same starting point, same surface. This isolates the angle as the only changing variable.',
  },
  {
    id: 'sa-5', subject: 'Science',
    question: 'Rey notices small brown flies gathering around fallen mango fruits in his backyard. What is the most likely role of these flies in the ecosystem?',
    options: [
      'A. They are pollinators that help mango trees reproduce.',
      'B. They are producers that feed other organisms.',
      'C. They are parasites that harm mango trees.',
      'D. They are predators that feed on mango pests.',
      'E. They are decomposers that break down the fruit and return nutrients to the soil.',
    ],
    answer: 'E',
    explanation: 'Flies gathering around fallen, rotting fruit are acting as decomposers — they break down dead organic matter (the fallen fruit) and help recycle nutrients back into the soil. This is a key role in nutrient cycling.',
  },
  {
    id: 'sa-6', subject: 'Science',
    question: 'A 1,500 g sample of seawater was evaporated, leaving 50 g of salt. How many grams of the same seawater must be evaporated to produce 10 g of salt?',
    options: ['A. 30', 'B. 100', 'C. 150', 'D. 300', 'E. 500'],
    answer: 'D',
    explanation: 'Set up a proportion: 50g salt / 1500g seawater = 10g salt / X grams seawater. X = 1500 × (10/50) = 1500 × 0.2 = 300 grams.',
  },
  {
    id: 'sa-7', subject: 'Science',
    question: 'Bernard wants to test if temperature affects how quickly sugar dissolves. He has 3 cups of water at different temperatures (hot, warm, cold) and sugar packets. Which setup best answers his question?',
    options: [
      'A. Heat all cups to the same temperature, then add sugar and see which one dissolves first.',
      'B. Stir the sugar into each cup for different amounts of time and see which one dissolved first.',
      'C. Use different types of sugar (white, brown, confectioner\'s) in each cup.',
      'D. Add different amounts of sugar to each cup at different temperatures.',
      'E. Add the same amount of sugar to each cup and stir for the same amount of time, then observe which dissolves first.',
    ],
    answer: 'E',
    explanation: 'To isolate temperature as the independent variable, everything else must be constant: same type and amount of sugar, same stirring time and method. E is the only option that keeps all non-temperature variables controlled.',
  },
  {
    id: 'sa-8', subject: 'Science',
    question: 'A hardness test shows: Rock 1 can be scratched by a fingernail, copper coin, and steel nail (+,+,+). Rock 2 cannot be scratched by any (-,-,-). Rock 3 cannot be scratched by fingernail or copper coin, only by steel nail (-,-,+). Rock 4 cannot be scratched by fingernail, but can be by copper coin and steel nail (-,+,+). Which statement is the most valid interpretation?',
    options: [
      'A. Sample 1 is the hardest of the samples.',
      'B. Sample 4 is the softest of the samples.',
      'C. Sample 3 can scratch Samples 2 and 4.',
      'D. Sample 4 can be scratched by Sample 1.',
      'E. Sample 2 can scratch Samples 1, 3, and 4.',
    ],
    answer: 'E',
    explanation: 'Hardness ranking (softest to hardest): Rock 1 → Rock 4 → Rock 3 → Rock 2. Rock 2 is the hardest (nothing can scratch it). A harder rock CAN scratch softer ones. Therefore, Rock 2 can scratch Rocks 1, 3, and 4.',
  },
  {
    id: 'sa-9', subject: 'Science',
    question: 'On a distance-from-home vs. time graph of someone\'s journey, which type of segment represents FASTEST speed?',
    options: [
      'A. A flat horizontal segment',
      'B. A gently sloping upward segment',
      'C. A segment sloping downward',
      'D. The steepest upward-sloping segment',
      'E. A segment with no slope',
    ],
    answer: 'D',
    explanation: 'On a distance-time graph, speed = slope (rise/run = distance/time). The STEEPEST positive slope = the greatest change in distance per unit time = fastest speed.',
  },
  {
    id: 'sa-10', subject: 'Science',
    question: 'Levers are classified by the position of their fulcrum, effort, and load. A Class 3 lever has the effort applied BETWEEN the fulcrum and the load. Which of the following are examples of Class 3 levers?',
    options: [
      'A. scissors, pliers',
      'B. seesaw, crowbar',
      'C. fishing rod, broom',
      'D. door, bottle opener',
      'E. wheelbarrow, nail clippers',
    ],
    answer: 'C',
    explanation: 'Class 3 levers: fulcrum at one end, load at the other, effort applied in between. A fishing rod (fulcrum = handle end, effort = grip in the middle, load = fish) and broom (fulcrum = top hand, effort = bottom hand, load = bristles) are both Class 3.',
  },
  {
    id: 'sa-11', subject: 'Science',
    question: 'A person\'s body temperature was recorded: 8:00 AM = 36.5°C, 12:00 PM = 37.2°C, 4:00 PM = 36.8°C, 8:00 PM = 36.3°C. What does this data best reveal about how the body regulates temperature?',
    options: [
      'A. Body temperature remains constant throughout the day.',
      'B. Exercise has a major impact on body temperature regulation.',
      'C. The body warms up in the morning and cools down at night.',
      'D. Eating meals causes a significant increase in body temperature.',
      'E. Body temperature fluctuates slightly but is maintained within a certain range.',
    ],
    answer: 'E',
    explanation: 'The data shows temperature varying from 36.3°C to 37.2°C — a range of only 0.9°C. This is evidence of homeostasis: the body allows minor fluctuations but keeps temperature within a narrow, healthy range (~36–37.5°C).',
  },
  {
    id: 'sa-12', subject: 'Science',
    question: 'Locations at the SAME LATITUDE on opposite sides of the world tend to have similar climates because they receive similar amounts of solar radiation. Which pair of locations — one in North America and one in Asia at approximately the same northern latitude — would likely have similar climates?',
    options: [
      'A. A tropical location near the equator and a polar location',
      'B. Two locations at the same latitude in opposite hemispheres',
      'C. Two locations at the same latitude in the same hemisphere',
      'D. Two locations at the same longitude',
      'E. Two locations on the same continent',
    ],
    answer: 'C',
    explanation: 'Climate is primarily determined by latitude (which controls sunlight intensity and seasons). Two locations at the same latitude in the same hemisphere receive the same amount of solar energy at the same time of year, leading to similar climatic conditions.',
  },
  {
    id: 'sa-13', subject: 'Science',
    question: 'In an investigation about plant growth, a scientist keeps soil type, water amount, and light constant across all groups but changes fertilizer concentration. Which type of variable is the fertilizer concentration?',
    options: [
      'A. Dependent variable',
      'B. Controlled variable',
      'C. Independent variable',
      'D. Extraneous variable',
      'E. Responding variable',
    ],
    answer: 'C',
    explanation: 'The independent variable is the one the scientist deliberately manipulates (changes). Fertilizer concentration is being changed → it is the independent variable. The plant growth outcome would be the dependent variable. All other factors kept the same are controlled variables.',
  },
  // ── Q14–Q20 from NCE Test III (pages 26–27) ─────────────────────────────────
  {
    id: 'sa-14', subject: 'Science',
    question: 'A distance-time graph shows a battery-powered car moving at a steady pace — the line is perfectly straight with a positive slope. Which of the following correctly describes the car\'s speed based on the graph?',
    options: [
      'A. Zero — the car is not moving',
      'B. Constant — the car moves the same distance every second',
      'C. Negative — the car is moving backwards',
      'D. Increasing — the car accelerates over time',
      'E. Decreasing — the car is slowing down',
    ],
    answer: 'B',
    explanation: 'A straight (linear) line on a distance-time graph means the car covers equal distances in equal time intervals → constant speed. A curved line would indicate acceleration or deceleration. A horizontal line means the car is stopped (zero speed).',
  },
  {
    id: 'sa-15', subject: 'Science',
    question: 'A coastal diagram shows mangroves, seagrass, and coral reefs in a sequence from shore to sea. Environmentalists say planting more mangroves may protect coral reefs from degradation. How do mangroves most likely protect coral reefs?',
    options: [
      'A. They provide shade for the corals and prevent them from overheating.',
      'B. They attract more fish to the area, which feed on algae that harm the coral.',
      'C. They filter pollutants from the water and improve the water quality for the corals.',
      'D. They release chemicals that directly protect the corals from diseases and predators.',
      'E. They act as natural barriers and break the force of waves before they reach the reefs.',
    ],
    answer: 'C',
    explanation: 'Mangroves are known for their water filtration role: their root systems trap sediments and absorb pollutants before the water reaches the coral reef. Improved water quality (lower turbidity, fewer toxins) allows corals to thrive. While mangroves also buffer waves (E), the primary mechanism of reef protection in scientific research is water quality improvement.',
  },
  {
    id: 'sa-16', subject: 'Science',
    question: 'A climate graph shows global surface temperature from 1940–2016 compared to the 1981–2010 average. The years of three volcanic eruptions are marked: Mt. Agung, El Chichón, and Mt. Pinatubo. After each eruption, the global temperature dips below average. How did volcanic ash from these eruptions affect global temperatures?',
    options: [
      'A. Increase in global temperature due to the greenhouse effect of ash',
      'B. No significant change — the ash settles quickly',
      'C. Melting of glaciers due to ash absorbing heat',
      'D. Short-term cooling effect due to reduced sunlight reaching Earth',
      'E. Warming of coastal regions due to increased absorption of sunlight by oceans',
    ],
    answer: 'D',
    explanation: 'Volcanic ash and sulfur dioxide injected into the stratosphere reflect incoming solar radiation back into space. This reduces the amount of sunlight reaching Earth\'s surface, causing a short-term global cooling effect. Mt. Pinatubo (1991) lowered global temperatures by ~0.5°C for about 1–2 years.',
  },
  {
    id: 'sa-17', subject: 'Science',
    question: 'During a particular night, the Moon was observed as a first quarter moon (right half illuminated). The lunar cycle is approximately 29.5 days. What will the Moon most likely look like 4 weeks (28 days) later, viewed from the same position?',
    options: [
      'A. Full moon — completely illuminated',
      'B. Waxing gibbous — more than half lit on the right',
      'C. First quarter — same right-half illuminated (same phase)',
      'D. Waxing crescent — thin sliver of light on the right',
      'E. New moon — completely dark',
    ],
    answer: 'D',
    explanation: 'First quarter occurs ~7 days into the lunar cycle. After 28 more days: day 7 + 28 = day 35 of the cycle. 35 mod 29.5 ≈ 5.5 days after new moon = waxing crescent phase. Since 28 days falls 1.5 days short of a full cycle (29.5 days), the moon hasn\'t quite returned to first quarter — it\'s still a waxing crescent.',
  },
  {
    id: 'sa-18', subject: 'Science',
    question: 'A graph shows the amounts of carbohydrates, fat, and protein stored in the body during weeks of starvation. Carbohydrates drop sharply in the first 1–2 weeks, fat decreases gradually over weeks 3–10, and protein begins decreasing last. Which is a valid inference from this data?',
    options: [
      'A. Fat levels in the body decrease at a constant rate during starvation.',
      'B. Starving yourself for weeks will make you lose weight.',
      'C. Protein levels are the last to decrease during starvation.',
      'D. Starving will not affect your nutrient levels during the first month.',
      'E. Carbohydrates are depleted first because they are the least important.',
    ],
    answer: 'C',
    explanation: 'Based on the graph, carbohydrates are used first, followed by fat, then protein. Protein is the body\'s last resort energy source because it comes from breaking down muscle tissue. This is directly supported by the data — making C the valid inference. Option E is partially true but gives a wrong reason (carbs are primary fuel, not "least important").',
  },
  {
    id: 'sa-19', subject: 'Science',
    question: 'A roller coaster starts from rest at Location 1 (highest point), moves through Location 2 (midpoint), and reaches Location 3 (lowest point). Potential energy is greatest at the highest position; kinetic energy depends on speed. Which statement correctly describes energy at specific locations?',
    options: [
      'A. Kinetic energy is greatest at Location 1.',
      'B. Kinetic energy is zero at Location 3.',
      'C. Potential energy is greatest at Location 1.',
      'D. Potential energy increases as the cart moves down the track.',
      'E. Potential and kinetic energies cannot be determined at these locations.',
    ],
    answer: 'C',
    explanation: 'Location 1 (top) = highest position = maximum gravitational potential energy (PE). The cart starts from rest, so KE = 0 at Location 1. As it descends, PE converts to KE. At Location 3 (bottom), PE is minimum and KE is maximum. Therefore, PE is greatest at Location 1 — answer C.',
  },
  {
    id: 'sa-20', subject: 'Science',
    question: 'Delfin poured different liquids into a glass tube and five layers formed (labeled 1–5, bottom to top). Densities: Corn syrup = 1.3 g/mL, Honey = 1.4 g/mL, Rubbing alcohol = 0.8 g/mL, Vegetable oil = 0.9 g/mL, Water = 1.0 g/mL. Which layer corresponds to water?',
    options: ['A. Layer 1', 'B. Layer 2', 'C. Layer 3', 'D. Layer 4', 'E. Layer 5'],
    answer: 'C',
    explanation: 'Liquids settle with densest at the bottom. Order from bottom (1) to top (5): Layer 1 = Honey (1.4), Layer 2 = Corn syrup (1.3), Layer 3 = Water (1.0), Layer 4 = Vegetable oil (0.9), Layer 5 = Rubbing alcohol (0.8). Water is Layer 3.',
  },
]

export default SCIENCE_ABILITY_QUESTIONS

export function getScienceAbilityQuestions(n) {
  const shuffled = [...SCIENCE_ABILITY_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n ?? SCIENCE_ABILITY_QUESTIONS.length)
}
