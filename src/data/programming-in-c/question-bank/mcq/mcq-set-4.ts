import type { MCQ } from '../../../types'

export const mcqSet4: MCQ[] = [
  {
    "id": 31,
    "question": "What is the output of C program with structure? int main() { struct srm { int h; int w; }; struct srm srm11={15}; printf(\"%d \",srm1.w); printf(\"%d\",srm1.h); return 0; }",
    "options": [
      "0 0",
      "15 0",
      "15 15",
      "0 15"
    ],
    "correctAnswer": 1
  },
  {
    "id": 32,
    "question": "What is the output of C program with structure arrays? int main() { struct pens { int color; }p1[2]; struct pens p2[3]; p1[0].color=15; p1[1].color=20; printf(\"%d \",p1[0].color); printf(\"%d\",p1[1].color); return 0; }",
    "options": [
      "Compiler error",
      "20 15",
      "20 20",
      "15 20"
    ],
    "correctAnswer": 3
  },
  {
    "id": 33,
    "question": "What is a structure in programming?",
    "options": [
      "A data type that allows for the representation of a single value",
      "A data type that allows for the representation of a collection of related variables",
      "A reserved keyword in programming languages",
      "A loop construct"
    ],
    "correctAnswer": 1
  },
  {
    "id": 34,
    "question": "Which keyword is used to define a structure in C/C++?",
    "options": [
      "define",
      "struct",
      "structure",
      "typedef"
    ],
    "correctAnswer": 1
  },
  {
    "id": 35,
    "question": "Which of the following operations is typically associated with unions?",
    "options": [
      "Accessing individual members",
      "Modifying individual members",
      "Resizing the union",
      "Initializing the union"
    ],
    "correctAnswer": 0
  },
  {
    "id": 36,
    "question": "What is a potential drawback of using unions?",
    "options": [
      "They are less memory-efficient compared to structures",
      "They can only store one type of data at a time",
      "They cannot be passed as arguments to functions",
      "They cannot be used as arguments to functions"
    ],
    "correctAnswer": 1
  },
  {
    "id": 37,
    "question": "What is the output of this C code? #include <stdio.h> int main() { int a = 2 + 4 + 3 * 5 / 3 - 5; printf(\"%d\", a); }",
    "options": [
      "7",
      "11",
      "6",
      "12"
    ],
    "correctAnswer": 2
  },
  {
    "id": 38,
    "question": "What is the output of this C code? #include <stdio.h> void main() { int a = 5 * 3 + 2 - 4; printf(\"%d\", a); }",
    "options": [
      "13",
      "14",
      "16",
      "19"
    ],
    "correctAnswer": 0
  },
  {
    "id": 39,
    "question": "What is the output of the following C code? #include <stdio.h> int main() { int a = 1, b = 1; switch (a) { case a*b: printf(\"yes \"); case a-b: printf(\"no\\n\"); break; } }",
    "options": [
      "yes",
      "no",
      "error",
      "0"
    ],
    "correctAnswer": 2
  },
  {
    "id": 40,
    "question": "How many times i value is checked in the following C code? #include <stdio.h> int main() { int i = 0; while (i < 3) i++; printf(\"In while loop\\n\"); }",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 3
  }
]
