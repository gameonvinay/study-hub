import type { MCQ } from '../../../types'

export const mcqSet1: MCQ[] = [
  {
    "id": 1,
    "question": "Any C Program must at least contain",
    "options": [
      "One function",
      "Nothing is needed",
      "2 functions are needed",
      "Input and output is enough"
    ],
    "correctAnswer": 0
  },
  {
    "id": 2,
    "question": "What will be the output of the following C function? #include void reverse(int i); int main() { reverse(1); } void reverse(int i) { if (i > 5) return ; printf(\"%d \", i); return reverse((i++, i)); }",
    "options": [
      "1 2 3 4 5",
      "Segmentation fault",
      "Compilation error",
      "Undefined behaviour"
    ],
    "correctAnswer": 3
  },
  {
    "id": 3,
    "question": "Comment on the following C statement. n = 1; printf(\"%d, %d\\n\", 3*n, n++);",
    "options": [
      "Output will be 3, 2",
      "Output will be 3, 1",
      "Output will be 6, 1",
      "Output is compiler dependent"
    ],
    "correctAnswer": 3
  },
  {
    "id": 4,
    "question": "What will be the data type returned for the following C function? #include int func() { return (double)(char)5.0; }",
    "options": [
      "char",
      "int",
      "double",
      "multiple type-casting in return is illegal"
    ],
    "correctAnswer": 1
  },
  {
    "id": 5,
    "question": "Which option should be selected to work the following C expression? string p = \"HELLO\";",
    "options": [
      "typedef char [] string;",
      "typedef char *string;",
      "typedef char [] string; and typedef char *string;",
      "Such expression cannot be generated in C"
    ],
    "correctAnswer": 1
  },
  {
    "id": 6,
    "question": "Which of the following is a correct method to pass an array to a function in C/C++?",
    "options": [
      "Pass the array by value",
      "Pass the array by reference",
      "Pass the array using the new keyword",
      "Pass each element of the array individually"
    ],
    "correctAnswer": 1
  },
  {
    "id": 7,
    "question": "What is the advantage of passing arrays by reference to functions?",
    "options": [
      "It allows for easier modification of the original array within the function",
      "It consumes less memory",
      "It improves code readability",
      "It prevents changes to the original array"
    ],
    "correctAnswer": 0
  },
  {
    "id": 8,
    "question": "In which programming languages are nested functions commonly found?",
    "options": [
      "C/C++",
      "Java",
      "Python",
      "All of the above"
    ],
    "correctAnswer": 2
  },
  {
    "id": 9,
    "question": "Which of the following is NOT a potential drawback of using nested functions?",
    "options": [
      "Increased complexity of the code",
      "Reduced modularity",
      "Difficulty in debugging",
      "Encapsulation of functionality"
    ],
    "correctAnswer": 3
  },
  {
    "id": 10,
    "question": "What is the scope of a nested function in relation to the enclosing function?",
    "options": [
      "It has the same scope",
      "It has a wider scope",
      "It has a narrower scope",
      "It has no scope"
    ],
    "correctAnswer": 0
  }
]
