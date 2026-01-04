import type { MCQ } from '../../../types'

export const mcqSet7: MCQ[] = [
  {
    "id": 61,
    "question": "What are the C functions used to read or write a file in Binary Mode.?",
    "options": [
      "fprintf(), fscanf()",
      "fread(), rwrite()",
      "readf(), writef()",
      "printf(), scanf()"
    ],
    "correctAnswer": 0
  },
  {
    "id": 62,
    "question": "fseek() should be preferred over rewind() mainly because",
    "options": [
      "rewind() doesn't work for empty files",
      "rewind() may fail for large files",
      "In rewind, there is no way to check if the operations completed successfully",
      "All of the above"
    ],
    "correctAnswer": 2
  },
  {
    "id": 63,
    "question": "Which of the following statements about stdout and stderr are true?",
    "options": [
      "Same",
      "Both connected to screen always.",
      "Both connected to screen by default.",
      "stdout is line buffered but stderr is unbuffered."
    ],
    "correctAnswer": 3
  },
  {
    "id": 64,
    "question": "Which library in C/C++ provides functions for file handling?",
    "options": [
      "stdio.h",
      "math.h",
      "string.h",
      "ctype.h"
    ],
    "correctAnswer": 0
  },
  {
    "id": 65,
    "question": "Which function is used to check if a file exists in C/C++?",
    "options": [
      "file_exists()",
      "fopen()",
      "access()",
      "file_open()"
    ],
    "correctAnswer": 2
  }
]
