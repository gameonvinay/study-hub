import type { MCQ } from '../../../types'

export const mcqSet5: MCQ[] = [
  {
    "id": 41,
    "question": "What is the maximum number of elements an array can hold in many programming languages?",
    "options": [
      "It depends on the available memory",
      "100",
      "256",
      "1024"
    ],
    "correctAnswer": 0
  },
  {
    "id": 42,
    "question": "Which of the following is NOT a common operation performed on arrays?",
    "options": [
      "Searching",
      "Sorting",
      "Merging",
      "Deleting"
    ],
    "correctAnswer": 3
  },
  {
    "id": 43,
    "question": "What is the term used to describe the process of adding an element to the end of an array?",
    "options": [
      "Insertion",
      "Deletion",
      "Append",
      "Concatenation"
    ],
    "correctAnswer": 2
  },
  {
    "id": 44,
    "question": "Which of the following operations on arrays has a time complexity of O(1)?",
    "options": [
      "Accessing an element by index",
      "Searching for an element",
      "Sorting the array",
      "Deleting an element"
    ],
    "correctAnswer": 0
  },
  {
    "id": 45,
    "question": "What is the term used to describe the process of removing the last element from an array?",
    "options": [
      "Pop",
      "Shift",
      "Push",
      "Unshift"
    ],
    "correctAnswer": 0
  },
  {
    "id": 46,
    "question": "What are the elements present in the array of the following C code?",
    "options": [
      "5, 5, 5, 5, 5",
      "5, 0, 0, 0, 0",
      "5, (garbage), (garbage), (garbage), (garbage)",
      "(garbage), (garbage), (garbage), (garbage), 5"
    ],
    "correctAnswer": 1
  },
  {
    "id": 47,
    "question": "Which part of the program address space is p stored in the following C code? #include <stdio.h> int *p; int main() { int i = 0; p = &i; return 0; }",
    "options": [
      "Code/text segment",
      "Data segment",
      "Stack",
      "Bss segment"
    ],
    "correctAnswer": 3
  },
  {
    "id": 48,
    "question": "Comment on the output of following C code. #include <stdio.h> main() { char *p = 0; *p = 'a'; printf(\"value in pointer p is %c\\n\", *p); }",
    "options": [
      "It will print a",
      "It will print 0",
      "Compile time error",
      "Run time error"
    ],
    "correctAnswer": 3
  },
  {
    "id": 49,
    "question": "What type of return-type used in String operations?",
    "options": [
      "void only",
      "void and (char *) only",
      "void and int only",
      "void, int and (char *) only"
    ],
    "correctAnswer": 3
  },
  {
    "id": 50,
    "question": "Which of the following function compares 2 strings with case-insensitively?",
    "options": [
      "strcmp(s, t)",
      "strcmpcase(s, t)",
      "strcasecmp(s, t)",
      "strchr(s, t)"
    ],
    "correctAnswer": 2
  }
]
