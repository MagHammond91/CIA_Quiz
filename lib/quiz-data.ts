export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // index of the correct option
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Jane Austen",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is the chemical symbol for water?",
    options: ["CO2", "NaCl", "H2O", "O2"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Which continent is the Sahara Desert located on?",
    options: ["Asia", "Africa", "South America", "Australia"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "Which organ in the human body is responsible for pumping blood?",
    options: ["Brain", "Liver", "Heart", "Lungs"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Core Processing Unit",
    ],
    correctAnswer: 0,
  },
  {
    id: 10,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
  },
]

export const QUIZ_TIME_LIMIT_SECONDS = 600 // 10 minutes
export const TEACHER_PASSWORD = "CIA2026Admin"
