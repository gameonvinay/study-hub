import type { TheorySubject } from '../types'
import { allTheoryQuestions } from './data-science/question-bank/theory/index'
import { allTheoryQuestions as businessEnglishTheoryQuestions } from './business-english/question-bank/theory/index'

export const theorySubjects: TheorySubject[] = [
  {
    id: 'data-science',
    name: 'Introduction to Data Science',
    questions: allTheoryQuestions
  },
  {
    id: 'business-english',
    name: 'Business English',
    questions: businessEnglishTheoryQuestions
  }
]
