export const module3 = `
## Module 3: Operators & Expressions

### What are Operators?

**Operators** are special symbols that tell the compiler to perform specific mathematical, logical, or other operations. They work on **operands** (the values being operated on).

\`\`\`c
int result = 5 + 3;  // '+' is operator, 5 and 3 are operands
\`\`\`

**Expression** = combination of operands and operators that evaluates to a value.

### Types of Operators in C

C provides a rich set of operators, categorized as:
1. Arithmetic Operators
2. Relational Operators
3. Logical Operators
4. Bitwise Operators
5. Assignment Operators
6. Increment/Decrement Operators
7. Conditional (Ternary) Operator
8. Special Operators

---

### 1. Arithmetic Operators

Used for mathematical calculations:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | 8 |
| \`-\` | Subtraction | \`5 - 3\` | 2 |
| \`*\` | Multiplication | \`5 * 3\` | 15 |
| \`/\` | Division | \`5 / 3\` | 1 (integer division!) |
| \`%\` | Modulo (Remainder) | \`5 % 3\` | 2 |

**Important: Integer Division vs Float Division**

\`\`\`c
int a = 5 / 2;      // Result: 2 (truncates decimal part!)
float b = 5.0 / 2;  // Result: 2.5 (at least one float operand)
float c = (float)5 / 2;  // Result: 2.5 (explicit casting)
\`\`\`

**Modulo Operator (\`%\`):**
- Only works with integers
- Returns the remainder after division
- Useful for: checking even/odd, cycling through values, extracting digits

\`\`\`c
17 % 5 = 2    // 17 = 5*3 + 2
10 % 2 = 0    // Even number (no remainder)
7 % 2 = 1     // Odd number
123 % 10 = 3  // Extract last digit
\`\`\`

---

### 2. Relational (Comparison) Operators

Compare two values and return 1 (true) or 0 (false):

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`<\` | Less than | \`5 < 10\` | 1 (true) |
| \`>\` | Greater than | \`5 > 10\` | 0 (false) |
| \`<=\` | Less than or equal | \`5 <= 5\` | 1 (true) |
| \`>=\` | Greater than or equal | \`5 >= 10\` | 0 (false) |
| \`==\` | Equal to | \`5 == 5\` | 1 (true) |
| \`!=\` | Not equal to | \`5 != 10\` | 1 (true) |

**Common Use:** In conditions (if, while, for)

\`\`\`c
if (age >= 18) {
    printf("Adult");
}

while (count < 10) {
    count++;
}
\`\`\`

---

### 3. Logical Operators

Combine multiple conditions:

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| \`&&\` | Logical AND | True if BOTH conditions are true | \`(a > 0) && (b > 0)\` |
| \`\\|\\|\` | Logical OR | True if AT LEAST ONE condition is true | \`(a > 0) \\|\\| (b > 0)\` |
| \`!\` | Logical NOT | Inverts the condition | \`!(a > 0)\` |

**Truth Table:**

| A | B | A && B | A \\|\\| B | !A |
|---|---|--------|---------|-----|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 |

**Short-Circuit Evaluation:**

\`\`\`c
// In &&: If first condition is false, second is NOT evaluated
if (ptr != NULL && *ptr == 5) { }  // Safe! Won't dereference NULL

// In ||: If first condition is true, second is NOT evaluated
if (found || search()) { }  // search() not called if found is true
\`\`\`

---

### 4. Bitwise Operators

Operate on individual bits of integers:

| Operator | Name | Description | Example (5=0101, 3=0011) |
|----------|------|-------------|--------------------------|
| \`&\` | Bitwise AND | 1 if both bits are 1 | \`5 & 3 = 1\` (0001) |
| \`\\|\` | Bitwise OR | 1 if at least one bit is 1 | \`5 \\| 3 = 7\` (0111) |
| \`^\` | Bitwise XOR | 1 if bits are different | \`5 ^ 3 = 6\` (0110) |
| \`~\` | Bitwise NOT | Inverts all bits | \`~5 = -6\` |
| \`<<\` | Left Shift | Shift bits left | \`5 << 1 = 10\` (1010) |
| \`>>\` | Right Shift | Shift bits right | \`5 >> 1 = 2\` (0010) |

**Practical Applications:**

\`\`\`c
// Check if number is even/odd (faster than modulo!)
if (n & 1)  // True if odd (last bit is 1)

// Multiply/divide by powers of 2
x << 1   // x * 2
x << 3   // x * 8
x >> 1   // x / 2

// Set, clear, toggle specific bits (used in embedded systems)
flags |= (1 << 3);   // Set bit 3
flags &= ~(1 << 3);  // Clear bit 3
flags ^= (1 << 3);   // Toggle bit 3

// Swap without temp variable
a ^= b; b ^= a; a ^= b;
\`\`\`

---

### 5. Assignment Operators

Assign values to variables:

| Operator | Example | Equivalent To |
|----------|---------|---------------|
| \`=\` | \`a = 5\` | Assign 5 to a |
| \`+=\` | \`a += 5\` | \`a = a + 5\` |
| \`-=\` | \`a -= 5\` | \`a = a - 5\` |
| \`*=\` | \`a *= 5\` | \`a = a * 5\` |
| \`/=\` | \`a /= 5\` | \`a = a / 5\` |
| \`%=\` | \`a %= 5\` | \`a = a % 5\` |
| \`&=\` | \`a &= 5\` | \`a = a & 5\` |
| \`\\|=\` | \`a \\|= 5\` | \`a = a \\| 5\` |
| \`^=\` | \`a ^= 5\` | \`a = a ^ 5\` |
| \`<<=\` | \`a <<= 2\` | \`a = a << 2\` |
| \`>>=\` | \`a >>= 2\` | \`a = a >> 2\` |

---

### 6. Increment & Decrement Operators

Increase or decrease value by 1:

| Operator | Name | Behavior |
|----------|------|----------|
| \`++a\` | Pre-increment | Increment FIRST, then use value |
| \`a++\` | Post-increment | Use value FIRST, then increment |
| \`--a\` | Pre-decrement | Decrement FIRST, then use value |
| \`a--\` | Post-decrement | Use value FIRST, then decrement |

**Understanding Pre vs Post:**

\`\`\`c
int a = 5;
int b = a++;   // b = 5, then a becomes 6
// Now: a = 6, b = 5

int c = 5;
int d = ++c;   // c becomes 6 first, then d = 6
// Now: c = 6, d = 6
\`\`\`

**In Loops:**

\`\`\`c
for (int i = 0; i < 5; i++)   // Post: i used, then incremented
for (int i = 0; i < 5; ++i)   // Pre: same result (increment at end)
\`\`\`

---

### 7. Conditional (Ternary) Operator

Shorthand for simple if-else:

\`\`\`c
// Syntax: condition ? value_if_true : value_if_false

int max = (a > b) ? a : b;

// Equivalent to:
int max;
if (a > b)
    max = a;
else
    max = b;
\`\`\`

**Nested Ternary (use sparingly - reduces readability):**

\`\`\`c
char *grade = (marks >= 90) ? "A" :
              (marks >= 80) ? "B" :
              (marks >= 70) ? "C" : "F";
\`\`\`

---

### 8. Special Operators

**sizeof Operator:**
Returns size in bytes of a type or variable.

\`\`\`c
sizeof(int)      // 4 (usually)
sizeof(char)     // 1
sizeof(double)   // 8

int arr[10];
sizeof(arr)      // 40 (10 * 4 bytes)
sizeof(arr)/sizeof(arr[0])  // 10 (number of elements)
\`\`\`

**Comma Operator:**
Evaluates left to right, returns rightmost value.

\`\`\`c
int a = (5, 10, 15);  // a = 15 (rightmost)

// Common use in for loops:
for (int i = 0, j = 10; i < 5; i++, j--) { }
\`\`\`

**Address-of (\`&\`) and Dereference (\`*\`):**
See Module 10: Pointers

---

### Operator Precedence

From highest to lowest priority:

| Priority | Operators | Associativity |
|----------|-----------|---------------|
| 1 | \`()\` \`[]\` \`.\` \`->\` | Left to Right |
| 2 | \`!\` \`~\` \`++\` \`--\` \`sizeof\` (unary) | Right to Left |
| 3 | \`*\` \`/\` \`%\` | Left to Right |
| 4 | \`+\` \`-\` | Left to Right |
| 5 | \`<<\` \`>>\` | Left to Right |
| 6 | \`<\` \`<=\` \`>\` \`>=\` | Left to Right |
| 7 | \`==\` \`!=\` | Left to Right |
| 8 | \`&\` | Left to Right |
| 9 | \`^\` | Left to Right |
| 10 | \`\\|\` | Left to Right |
| 11 | \`&&\` | Left to Right |
| 12 | \`\\|\\|\` | Left to Right |
| 13 | \`?:\` | Right to Left |
| 14 | \`=\` \`+=\` \`-=\` etc. | Right to Left |
| 15 | \`,\` | Left to Right |

**Tip:** When in doubt, use parentheses! It makes code clearer and avoids bugs.

\`\`\`c
// Confusing:
int result = a + b * c / d - e;

// Clear:
int result = a + ((b * c) / d) - e;
\`\`\`

---

### Common Mistakes

1. **Assignment vs Equality:**
\`\`\`c
if (x = 5)   // WRONG! Assigns 5, always true
if (x == 5)  // CORRECT! Compares x with 5
\`\`\`

2. **Integer Division:**
\`\`\`c
float avg = 5 / 2;     // avg = 2.0 (not 2.5!)
float avg = 5.0 / 2;   // avg = 2.5 (correct)
\`\`\`

3. **Precedence Confusion:**
\`\`\`c
if (a & b == 0)    // Actually: a & (b == 0) - WRONG!
if ((a & b) == 0)  // Correct
\`\`\`

4. **Post-increment in Complex Expressions:**
\`\`\`c
int i = 5;
int j = i++ + i++;  // Undefined behavior! Don't do this.
\`\`\`

> **Viva Questions:**
> - What is the difference between \`/\` and \`%\` operators?
> - Explain short-circuit evaluation in logical operators.
> - What is the difference between \`++i\` and \`i++\`?
> - How do bitwise operators work? Give examples.
> - What is operator precedence? Why is it important?
> - What is the ternary operator? When would you use it?

### Practical Examples - Module 3

**Q1: Write a program to demonstrate all arithmetic operators**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 25, b = 7;
    printf("a = %d, b = %d\\n", a, b);
    printf("a + b = %d\\n", a + b);
    printf("a - b = %d\\n", a - b);
    printf("a * b = %d\\n", a * b);
    printf("a / b = %d\\n", a / b);
    printf("a %% b = %d\\n", a % b);
    return 0;
}
\`\`\`

**Q2: Write a program to check if a number is even or odd using modulo**
\`\`\`c
#include <stdio.h>
int main() {
    int num = 17;
    if (num % 2 == 0) {
        printf("%d is Even\\n", num);
    } else {
        printf("%d is Odd\\n", num);
    }
    return 0;
}
\`\`\`

**Q3: Write a program to demonstrate pre and post increment**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 5, b = 5;
    printf("Initial: a = %d, b = %d\\n", a, b);

    printf("Post-increment a++: %d\\n", a++);
    printf("After post-increment: a = %d\\n", a);

    printf("Pre-increment ++b: %d\\n", ++b);
    printf("After pre-increment: b = %d\\n", b);
    return 0;
}
\`\`\`

**Q4: Write a program to demonstrate logical operators**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 5, b = 10, c = 15;

    printf("a = %d, b = %d, c = %d\\n", a, b, c);
    printf("(a < b) && (b < c) = %d\\n", (a < b) && (b < c));
    printf("(a > b) || (b < c) = %d\\n", (a > b) || (b < c));
    printf("!(a > b) = %d\\n", !(a > b));
    return 0;
}
\`\`\`

**Q5: Write a program to demonstrate bitwise operators**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 5, b = 3;  // a = 0101, b = 0011 in binary
    printf("a = %d (binary: 0101)\\n", a);
    printf("b = %d (binary: 0011)\\n", b);
    printf("a & b = %d\\n", a & b);   // AND: 0001 = 1
    printf("a | b = %d\\n", a | b);   // OR: 0111 = 7
    printf("a ^ b = %d\\n", a ^ b);   // XOR: 0110 = 6
    printf("~a = %d\\n", ~a);         // NOT
    printf("a << 1 = %d\\n", a << 1); // Left shift: 1010 = 10
    printf("a >> 1 = %d\\n", a >> 1); // Right shift: 0010 = 2
    return 0;
}
\`\`\`

**Q6: Write a program to find the largest of three numbers using ternary operator**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 25, c = 15;
    int largest;

    largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    printf("Largest of %d, %d, %d is %d\\n", a, b, c, largest);
    return 0;
}
\`\`\`

**Q7: Write a program to swap two numbers without using a third variable**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 20;
    printf("Before swap: a = %d, b = %d\\n", a, b);

    a = a + b;  // a = 30
    b = a - b;  // b = 10
    a = a - b;  // a = 20

    printf("After swap: a = %d, b = %d\\n", a, b);
    return 0;
}
\`\`\`

**Q8: Write a program to demonstrate assignment operators**
\`\`\`c
#include <stdio.h>
int main() {
    int x = 10;
    printf("Initial x = %d\\n", x);

    x += 5;  printf("After x += 5: %d\\n", x);
    x -= 3;  printf("After x -= 3: %d\\n", x);
    x *= 2;  printf("After x *= 2: %d\\n", x);
    x /= 4;  printf("After x /= 4: %d\\n", x);
    x %= 3;  printf("After x %%= 3: %d\\n", x);
    return 0;
}
\`\`\`

**Q9: Write a program to check if a year is a leap year**
\`\`\`c
#include <stdio.h>
int main() {
    int year = 2024;
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("%d is a Leap Year\\n", year);
    } else {
        printf("%d is not a Leap Year\\n", year);
    }
    return 0;
}
\`\`\`

**Q10: Write a program to demonstrate the comma operator**
\`\`\`c
#include <stdio.h>
int main() {
    int a, b, c;

    // Comma operator: evaluates left to right, returns rightmost value
    a = (b = 5, c = 10, b + c);
    printf("b = %d, c = %d, a = %d\\n", b, c, a);

    // Common use in for loop
    for (int i = 0, j = 10; i < 5; i++, j--) {
        printf("i = %d, j = %d\\n", i, j);
    }
    return 0;
}
\`\`\`
`
