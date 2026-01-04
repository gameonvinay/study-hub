import type { MCQ } from '../../../types'

export const mcqSet2: MCQ[] = [
  {
    "id": 11,
    "question": "What is the purpose of date formats in Excel?",
    "options": [
      "To change the color of the dates",
      "To calculate the difference between two dates",
      "To display dates in a specific format for readability and consistency",
      "To sort data based on the dates"
    ],
    "correctAnswer": 2
  },
  {
    "id": 12,
    "question": "Which of the following is a valid custom date format in Excel?",
    "options": [
      "MM/DD",
      "DD-MMM-YY",
      "YYYY/MM/DD",
      "All of the above"
    ],
    "correctAnswer": 3
  },
  {
    "id": 13,
    "question": "What does the MM represent in a date format in Excel?",
    "options": [
      "Month",
      "Minutes",
      "Meridiem (AM/PM)",
      "Milliseconds"
    ],
    "correctAnswer": 0
  },
  {
    "id": 14,
    "question": "If you want to display dates in the format 'Wednesday, Jan 1, 25', which format code would you use?",
    "options": [
      "DDDD, MMMM D, YYYY",
      "DDD, MMM D, YYYY",
      "DDDD, MMM D, YY",
      "DDD, MMMM D, YYYY"
    ],
    "correctAnswer": 2
  },
  {
    "id": 15,
    "question": "How can you quickly apply a predefined date format to a cell in Excel?",
    "options": [
      "By using the Format Painter",
      "By selecting the cell and pressing Ctrl+Shift+#",
      "By right-clicking the cell, choosing Format Cells, and selecting a date format",
      "By typing the date format directly into the cell"
    ],
    "correctAnswer": 2
  },
  {
    "id": 16,
    "question": "What is the default date format in Excel?",
    "options": [
      "MM/DD/YYYY",
      "DD/MM/YYYY",
      "YYYY/MM/DD",
      "It depends on the regional settings of the computer"
    ],
    "correctAnswer": 3
  },
  {
    "id": 17,
    "question": "Which of the following functions can be used to extract the day from a date in Excel?",
    "options": [
      "DAY()",
      "MONTH()",
      "YEAR()",
      "DATE()"
    ],
    "correctAnswer": 0
  },
  {
    "id": 18,
    "question": "If you want to display the current date and time in a cell, which function would you use?",
    "options": [
      "NOW()",
      "TODAY()",
      "DATEVALUE()",
      "TIMEVALUE()"
    ],
    "correctAnswer": 0
  },
  {
    "id": 19,
    "question": "How does Excel internally store dates?",
    "options": [
      "As text strings",
      "As decimal numbers, where the integer part represents the date and the fractional part represents time",
      "As a serial number, where each whole number represents a unique day starting from January 1, 1900",
      "As a combination of month, day, and year in separate cells"
    ],
    "correctAnswer": 2
  },
  {
    "id": 20,
    "question": "Which of the following date formats is not recognized by Excel?",
    "options": [
      "15-Jun-22",
      "June 15, 2022",
      "15.06.22",
      "15th June 2022"
    ],
    "correctAnswer": 3
  }
]
