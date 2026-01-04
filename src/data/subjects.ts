import type { Subject } from '../types'
import excelMcqs from '../assets/excel_mcqs.json'
import dataScienceMcqs from '../assets/data_science_mcqs.json'
import programmingCMcqs from '../assets/programming_c_mcqs.json'

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
