// NCE Quantitative Ability questions — extracted from official PSHS NCE Reviewer 2024
// Source: PSHS Admissions Office / DOST-PSHS System

const MATH_QUESTIONS = [
  {
    id: 'math-1', subject: 'Math',
    question: 'Which of the following is equal to 10² + 10⁷?',
    options: ['A. 10¹²', 'B. 10³⁵', 'C. 100¹²', 'D. 10,100,000', 'E. 11,000,000'],
    answer: 'D',
    explanation: '10² = 100 and 10⁷ = 10,000,000. Adding them: 100 + 10,000,000 = 10,100,000. You cannot add exponents when the bases are different — only when multiplying same bases.',
  },
  {
    id: 'math-2', subject: 'Math',
    question: 'Mathon got a ₱15 discount from a book marked 20% off at Inkhorn Bookstore. At Lofty Bookstore, he got a 30% discount equal to the original price of the Inkhorn book. What is the difference between the two books\' original prices?',
    options: ['A. ₱75', 'B. ₱175', 'C. ₱250', 'D. ₱325', 'E. ₱600'],
    answer: 'B',
    explanation: 'Inkhorn: ₱15 = 20% → original = ₱75. Lofty: discount amount = ₱75 = 30% of Lofty\'s price → Lofty original = ₱75 ÷ 0.30 = ₱250. Difference = ₱250 − ₱75 = ₱175.',
  },
  {
    id: 'math-3', subject: 'Math',
    question: 'Basket A (50 balls, blue:green = 9:1) and Basket B (120 balls, yellow:orange = 5:7). Albert moved all green balls from A and all yellow balls from B into Basket C. What is the ratio of yellow to green balls in Basket C?',
    options: ['A. 1:5', 'B. 1:10', 'C. 9:1', 'D. 10:1', 'E. 5:1'],
    answer: 'D',
    explanation: 'Basket A green = 50 × (1/10) = 5. Basket B yellow = 120 × (5/12) = 50. Basket C: yellow = 50, green = 5. Ratio yellow:green = 50:5 = 10:1.',
  },
  {
    id: 'math-4', subject: 'Math',
    question: 'Given that 2¹=2, 2²=4, 2³=8, and 2⁴=16, what must be the last digit of 2²⁷?',
    options: ['A. 2', 'B. 4', 'C. 6', 'D. 7', 'E. 8'],
    answer: 'E',
    explanation: 'The last digits of powers of 2 cycle every 4: 2, 4, 8, 6, 2, 4, 8, 6... 27 ÷ 4 = 6 remainder 3. The 3rd in the cycle is 8.',
  },
  {
    id: 'math-5', subject: 'Math',
    question: 'How many distinct prime number divisors does 72 have?',
    options: ['A. 0', 'B. 1', 'C. 2', 'D. 3', 'E. 4'],
    answer: 'C',
    explanation: '72 = 2³ × 3². The only prime factors are 2 and 3 — that\'s 2 distinct prime divisors.',
  },
  {
    id: 'math-6', subject: 'Math',
    question: 'What is the length (in cm) of each edge of a cube whose volume is numerically equal to the area of a square whose side measures 8 cm?',
    options: ['A. 64', 'B. 16', 'C. 8', 'D. 4', 'E. 2'],
    answer: 'D',
    explanation: 'Area of square = 8² = 64 cm². Volume of cube = 64 cm³. Edge = ∛64 = 4 cm.',
  },
  {
    id: 'math-7', subject: 'Math',
    question: 'Two radio stations air an ad simultaneously at 8:00 AM — Station A every 15 minutes, Station B every 20 minutes. How many times will they simultaneously air the ad from 9:00 AM to 5:30 PM?',
    options: ['A. 1', 'B. 8', 'C. 9', 'D. 10', 'E. 60'],
    answer: 'C',
    explanation: 'LCM(15, 20) = 60 minutes. Simultaneous airings from 8:00 AM: at 9:00, 10:00, 11:00, 12:00, 1:00, 2:00, 3:00, 4:00, 5:00 PM. From 9:00 AM to 5:30 PM = 9 times.',
  },
  {
    id: 'math-8', subject: 'Math',
    question: 'What happens to the volume of a rectangular box (V = l × w × h) if each of its length, width, and height are doubled?',
    options: [
      'A. The volume stays the same.',
      'B. The volume becomes 2 times the original.',
      'C. The volume becomes 4 times the original.',
      'D. The volume becomes 6 times the original.',
      'E. The volume becomes 8 times the original.',
    ],
    answer: 'E',
    explanation: 'New volume = (2l)(2w)(2h) = 8lwh. The volume becomes 8 times the original.',
  },
  {
    id: 'math-9', subject: 'Math',
    question: 'Linda can wrap one cylindrical tin using a 4-inch × 2-inch piece of paper. Her mother gave her a 15-inch × 4-inch sheet. What is the maximum number of tins she can fully wrap?',
    options: ['A. 6', 'B. 7', 'C. 8', 'D. 9', 'E. 10'],
    answer: 'B',
    explanation: 'Orient each piece as 2-inch × 4-inch. Along the 15-inch length: fit 7 pieces of 2 inches each (7 × 2 = 14, with 1 inch remaining). Along the 4-inch width: fits exactly 1 piece of 4 inches. Total = 7 pieces.',
  },
  {
    id: 'math-10', subject: 'Math',
    question: 'A 10 m × 8 m floor is to be covered completely by 50 cm × 50 cm square tiles. How many tiles are needed?',
    options: ['A. 80', 'B. 320', 'C. 400', 'D. 2500', 'E. 3200'],
    answer: 'B',
    explanation: 'Convert to cm: 1000 cm × 800 cm. Tiles along length: 1000 ÷ 50 = 20. Tiles along width: 800 ÷ 50 = 16. Total = 20 × 16 = 320.',
  },
  {
    id: 'math-11', subject: 'Math',
    question: 'Car A travels north at 80 km/h and Car B travels north at 120 km/h, both starting from the same point at the same time. How far apart (in km) are they after 30 minutes?',
    options: ['A. 10', 'B. 20', 'C. 40', 'D. 60', 'E. 80'],
    answer: 'B',
    explanation: 'In 30 min (0.5 h): Car A covers 80 × 0.5 = 40 km. Car B covers 120 × 0.5 = 60 km. Both go north, so distance apart = 60 − 40 = 20 km.',
  },
  {
    id: 'math-12', subject: 'Math',
    question: 'The minute hand of a clock is 5 cm long. How far (in cm) does the tip of the minute hand travel in 12 hours?',
    options: ['A. 10π', 'B. 120π', 'C. 240π', 'D. 360π', 'E. 720π'],
    answer: 'B',
    explanation: 'In 12 hours, the minute hand completes 12 full rotations. Each rotation = 2π × 5 = 10π cm. Total = 12 × 10π = 120π cm.',
  },
  {
    id: 'math-13', subject: 'Math',
    question: 'Jek and Pau started hiking at 6:51 AM and reached the summit at 2:27 PM. How long did they hike?',
    options: ['A. 9 hours 18 min', 'B. 8 hours 36 min', 'C. 7 hours 36 min', 'D. 6 hours 36 min', 'E. 4 hours 24 min'],
    answer: 'C',
    explanation: 'From 6:51 AM to 2:51 PM = exactly 8 hours. But the end time is 2:27 PM, which is 24 minutes before 2:51 PM. So total = 8 hours − 24 minutes = 7 hours 36 minutes.',
  },
  {
    id: 'math-14', subject: 'Math',
    question: 'A letter-sized paper is 8.5 × 11 inches with a 1-inch margin on all sides. What is the printable area (in square inches)?',
    options: ['A. 58.5', 'B. 60', 'C. 65', 'D. 75', 'E. 93.5'],
    answer: 'A',
    explanation: 'With 1-inch margin on all sides: printable width = 8.5 − 2 = 6.5 inches. Printable height = 11 − 2 = 9 inches. Area = 6.5 × 9 = 58.5 sq in.',
  },
  {
    id: 'math-15', subject: 'Math',
    question: 'A circle pattern shows 1 point in figure 1, 2 in figure 2, etc. The number of line segments connecting all points follows a pattern. How many line segments are in the 8th figure?',
    options: ['A. 21', 'B. 22', 'C. 27', 'D. 28', 'E. 29'],
    answer: 'D',
    explanation: 'For n points on a circle, the number of line segments = n(n−1)/2. Figure 8 has 8 points: 8 × 7 / 2 = 28.',
  },
]

export default MATH_QUESTIONS

export function getMathQuestions(n) {
  const shuffled = [...MATH_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n ?? MATH_QUESTIONS.length)
}
