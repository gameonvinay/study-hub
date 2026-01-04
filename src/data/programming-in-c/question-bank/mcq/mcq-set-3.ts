import type { MCQ } from '../../../types'

export const mcqSet3: MCQ[] = [
  {
    "id": 21,
    "question": "Which one of the following is not a reserved keyword for C?",
    "options": [
      "auto",
      "case",
      "main",
      "void"
    ],
    "correctAnswer": 2
  },
  {
    "id": 22,
    "question": "What will be the output of the following program? #include <stdio.h> int main() { int x = 30, y = 25, z = 20, w = 10; printf(\"%d \", x * y / z - w); printf(\"%d\", x * y / (z - w)); return (0); }",
    "options": [
      "27 85",
      "82 27",
      "27 75",
      "No output"
    ],
    "correctAnswer": 2
  },
  {
    "id": 23,
    "question": "Which of the following is a complete function?",
    "options": [
      "int funct();",
      "int funct(int x) { return x=x+1; }",
      "void funct(int) { printf(\"Hello\"); }",
      "None of the above"
    ],
    "correctAnswer": 1
  },
  {
    "id": 24,
    "question": "What is right way to Initialize array?",
    "options": [
      "int num[6] = { 2, 4, 12, 5, 45, 5 };",
      "int n{} = { 2, 4, 12, 5, 45, 5 };",
      "int n{6} = { 2, 4, 12 };",
      "None of the above"
    ],
    "correctAnswer": 0
  },
  {
    "id": 25,
    "question": "What is branching in programming?",
    "options": [
      "The process of combining multiple strings together",
      "The process of making decisions and executing different code blocks based on conditions",
      "The process of performing repetitive tasks",
      "The process of jumping to a different part of the code"
    ],
    "correctAnswer": 1
  },
  {
    "id": 26,
    "question": "Which statement is used for decision-making in Python?",
    "options": [
      "switch",
      "if",
      "while",
      "for"
    ],
    "correctAnswer": 1
  },
  {
    "id": 27,
    "question": "What is looping in programming?",
    "options": [
      "The process of making decisions based on conditions",
      "The process of combining multiple strings together",
      "The process of performing repetitive tasks",
      "The process of jumping to a different part of the code"
    ],
    "correctAnswer": 2
  },
  {
    "id": 28,
    "question": "Which loop in Python will always execute at least once?",
    "options": [
      "for loop",
      "while loop",
      "do-while loop",
      "There is no such loop in Python"
    ],
    "correctAnswer": 3
  },
  {
    "id": 29,
    "question": "What is the purpose of the continue statement in Python?",
    "options": [
      "To terminate the loop",
      "To skip the remaining code inside the loop and jump to the next iteration",
      "To execute the loop forever",
      "To print the current iteration index"
    ],
    "correctAnswer": 1
  },
  {
    "id": 30,
    "question": "What is the output of C program with structure? int main() { structure hotel { int items; char name[10]; }a; strcpy(a.name, \"TAJ\"); a.items=10; printf(\"%s\", a.name); return 0; }",
    "options": [
      "Compiler error",
      "Empty String",
      "TAJ",
      "Name"
    ],
    "correctAnswer": 0
  }
]
