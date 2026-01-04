import type { MCQ } from '../../../types'

export const mcqSet8: MCQ[] = [
  {
    "id": 71,
    "question": "The error code #REF! in Excel indicates:",
    "options": [
      "Division by zero",
      "Invalid cell reference",
      "Syntax error",
      "Value not available"
    ],
    "correctAnswer": 1
  },
  {
    "id": 72,
    "question": "Which of the following functions can be used to handle #N/A errors in Excel?",
    "options": [
      "IF",
      "ISERROR",
      "IFERROR",
      "ISNA"
    ],
    "correctAnswer": 2
  },
  {
    "id": 73,
    "question": "The error code #NAME? in Excel indicates:",
    "options": [
      "Division by zero",
      "Invalid cell reference",
      "Unknown function or name",
      "Value not available"
    ],
    "correctAnswer": 2
  },
  {
    "id": 74,
    "question": "Which function would you use to find the value in the third row and second column of a named range called data?",
    "options": [
      "VLOOKUP(3, data, 2, FALSE)",
      "HLOOKUP(2, data, 3, FALSE)",
      "INDEX(data, 3, 2)",
      "MATCH(3, data, 2)"
    ],
    "correctAnswer": 2
  },
  {
    "id": 75,
    "question": "What does VLOOKUP stand for?",
    "options": [
      "Vertical Lookup",
      "Variable Lookup",
      "Vector Lookup",
      "Virtual Lookup"
    ],
    "correctAnswer": 0
  },
  {
    "id": 76,
    "question": "Which of the following is the correct syntax for the VLOOKUP function?",
    "options": [
      "VLOOKUP(lookup_value, table_array, col_index_num, range_lookup)",
      "VLOOKUP(table_array, lookup_value, col_index_num, range_lookup)",
      "VLOOKUP(col_index_num, table_array, lookup_value, range_lookup)",
      "VLOOKUP(range_lookup, table_array, lookup_value, col_index_num)"
    ],
    "correctAnswer": 0
  },
  {
    "id": 77,
    "question": "The lookup_value in the VLOOKUP function:",
    "options": [
      "Is the value to be found in the first column of the table",
      "Is the value to be found in the last column of the table",
      "Is the column number where the value is to be found",
      "Is the range of cells where the value is to be found"
    ],
    "correctAnswer": 0
  },
  {
    "id": 78,
    "question": "The table_array in the VLOOKUP function:",
    "options": [
      "Is the cell reference of the lookup value",
      "Is the range of cells that contains the data to be searched",
      "Is the column number where the value is to be found",
      "Is the exact match of the lookup value"
    ],
    "correctAnswer": 1
  },
  {
    "id": 79,
    "question": "col_index_num in the VLOOKUP function:",
    "options": [
      "Specifies the column from which to retrieve the value",
      "Specifies the row from which to retrieve the value",
      "Specifies the range of cells to be searched",
      "Specifies the lookup value"
    ],
    "correctAnswer": 0
  },
  {
    "id": 80,
    "question": "What is the primary purpose of a PivotTable in Excel?",
    "options": [
      "To create charts and graphs",
      "To perform complex calculations",
      "To summarize and analyze large datasets",
      "To filter data"
    ],
    "correctAnswer": 2
  }
]
