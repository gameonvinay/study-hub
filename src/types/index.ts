export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number // index of correct option
}

export interface Subject {
  id: string
  name: string
  questions: Question[]
}

export interface TheoryQuestion {
  id: number
  title: string
  content: string
}

export interface TheorySubject {
  id: string
  name: string
  questions: TheoryQuestion[]
}
