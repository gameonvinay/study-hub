import type { TheorySubject } from '../types'
import { allTheoryQuestions } from './data-science/question-bank/theory/index'

export const theorySubjects: TheorySubject[] = [
  {
    id: 'data-science',
    name: 'Introduction to Data Science',
    questions: allTheoryQuestions
  }
]
