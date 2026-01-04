import type { Subject } from '../types'
import * as dataScienceQuestions from './data-science/question-bank/mcq/index'
import * as excelQuestions from './data-analysis-excel/question-bank/mcq/index'
import * as cProgrammingQuestions from './programming-in-c/question-bank/mcq/index'

// Combine all MCQ sets into single arrays
const dataScienceMcqs = [
  ...dataScienceQuestions.mcqSet1,
  ...dataScienceQuestions.mcqSet2,
  ...dataScienceQuestions.mcqSet3,
  ...dataScienceQuestions.mcqSet4,
  ...dataScienceQuestions.mcqSet5,
  ...dataScienceQuestions.mcqSet6,
  ...dataScienceQuestions.mcqSet7,
  ...dataScienceQuestions.mcqSet8,
  ...dataScienceQuestions.mcqSet9,
  ...dataScienceQuestions.mcqSet10,
  ...dataScienceQuestions.mcqSet11,
  ...dataScienceQuestions.mcqSet12,
  ...dataScienceQuestions.mcqSet13,
  ...dataScienceQuestions.mcqSet14,
  ...dataScienceQuestions.mcqSet15
]

const excelMcqs = [
  ...excelQuestions.mcqSet1,
  ...excelQuestions.mcqSet2,
  ...excelQuestions.mcqSet3,
  ...excelQuestions.mcqSet4,
  ...excelQuestions.mcqSet5,
  ...excelQuestions.mcqSet6,
  ...excelQuestions.mcqSet7,
  ...excelQuestions.mcqSet8,
  ...excelQuestions.mcqSet9,
  ...excelQuestions.mcqSet10,
  ...excelQuestions.mcqSet11,
  ...excelQuestions.mcqSet12,
  ...excelQuestions.mcqSet13,
  ...excelQuestions.mcqSet14,
  ...excelQuestions.mcqSet15,
  ...excelQuestions.mcqSet16,
  ...excelQuestions.mcqSet17
]

const programmingCMcqs = [
  ...cProgrammingQuestions.mcqSet1,
  ...cProgrammingQuestions.mcqSet2,
  ...cProgrammingQuestions.mcqSet3,
  ...cProgrammingQuestions.mcqSet4,
  ...cProgrammingQuestions.mcqSet5,
  ...cProgrammingQuestions.mcqSet6,
  ...cProgrammingQuestions.mcqSet7
]

export const subjects: Subject[] = [
  {
    id: 'data-analysis-excel',
    name: 'Data Analysis with Excel',
    questions: excelMcqs
  },
  {
    id: 'data-science',
    name: 'Introduction to Data Science',
    questions: dataScienceMcqs
  },
  {
    id: 'programming-in-c',
    name: 'Programming in C',
    questions: programmingCMcqs
  }
]
