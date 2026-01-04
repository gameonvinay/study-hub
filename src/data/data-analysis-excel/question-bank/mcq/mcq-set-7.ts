import type { MCQ } from '../../../types'

export const mcqSet7: MCQ[] = [
  {
    "id": 61,
    "question": "What is the main limitation of the VLOOKUP function?",
    "options": [
      "It can only look up values in the leftmost column of a table",
      "It can only look up values in the rightmost column of a table",
      "It cannot handle approximate matches",
      "It cannot handle exact matches"
    ],
    "correctAnswer": 0
  },
  {
    "id": 62,
    "question": "The INDEX function in Excel:",
    "options": [
      "Returns the value of a cell in a specified row and column",
      "Returns the position of a cell in a specified row and column",
      "Returns the address of a cell in a specified row and column",
      "Returns the range of cells in a specified row and column"
    ],
    "correctAnswer": 0
  },
  {
    "id": 63,
    "question": "Which of the following is true about the LOOKUP function in Excel?",
    "options": [
      "It can only perform exact matches",
      "It can only perform approximate matches",
      "It can perform both exact and approximate matches",
      "It cannot perform matches at all"
    ],
    "correctAnswer": 2
  },
  {
    "id": 64,
    "question": "What does the MATCH function in Excel return?",
    "options": [
      "The value of the matched cell",
      "The position of the matched cell",
      "The address of the matched cell",
      "The range of the matched cell"
    ],
    "correctAnswer": 1
  },
  {
    "id": 65,
    "question": "Which of the following is the correct syntax for the MATCH function?",
    "options": [
      "MATCH(lookup_value, lookup_array, match_type)",
      "MATCH(lookup_array, lookup_value, match_type)",
      "MATCH(match_type, lookup_value, lookup_array)",
      "MATCH(lookup_value, match_type, lookup_array)"
    ],
    "correctAnswer": 0
  },
  {
    "id": 66,
    "question": "The lookup_value in the MATCH function:",
    "options": [
      "Is the value to be found in the lookup_array",
      "Is the position of the value in the lookup_array",
      "Is the range of cells to be searched",
      "Is the type of match to be performed"
    ],
    "correctAnswer": 0
  },
  {
    "id": 67,
    "question": "The lookup_array in the MATCH function:",
    "options": [
      "Is the cell reference of the lookup value",
      "Is the range of cells that contains the data to be searched",
      "Is the column number where the value is to be found",
      "Is the exact match of the lookup value"
    ],
    "correctAnswer": 1
  },
  {
    "id": 68,
    "question": "The match_type argument in the MATCH function can be set to:",
    "options": [
      "0 for an exact match",
      "1 for a less than match (approximate match with sorted ascending data)",
      "-1 for a greater than match (approximate match with sorted descending data)",
      "All of the above"
    ],
    "correctAnswer": 3
  },
  {
    "id": 69,
    "question": "What does the error code #DIV/0! in Excel indicate?",
    "options": [
      "Division by zero",
      "Value not available",
      "Reference error",
      "Syntax error"
    ],
    "correctAnswer": 0
  },
  {
    "id": 70,
    "question": "Which of the following is the error code for a value not available in Excel?",
    "options": [
      "#DIV/0!",
      "#VALUE!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 2
  }
]
