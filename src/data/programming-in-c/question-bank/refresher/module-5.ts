export const module5 = `
## Module 5: Control Statements

### What are Control Statements?

Control statements determine the **flow of execution** in a program. By default, code executes sequentially (top to bottom). Control statements allow us to:
- Make **decisions** (if, switch)
- **Repeat** code (for, while, do-while)
- **Jump** to different parts (break, continue, goto, return)

**Types of Control Statements:**
| Category | Statements | Purpose |
|----------|------------|---------|
| Decision Making | if, if-else, switch | Choose between alternatives |
| Looping | for, while, do-while | Repeat code blocks |
| Jump | break, continue, goto, return | Alter flow unconditionally |

---

### Decision Making Statements

#### 1. Simple if Statement

Executes code block only if condition is **true** (non-zero).

\`\`\`c
if (condition) {
    // Executes if condition is true (non-zero)
}
\`\`\`

**How it works:**
1. Evaluate condition
2. If condition is non-zero (true), execute the block
3. If condition is zero (false), skip the block

\`\`\`c
int age = 18;
if (age >= 18) {
    printf("You can vote\\n");
}
// No else - nothing happens if age < 18
\`\`\`

#### 2. if-else Statement

Choose between two alternatives.

\`\`\`c
if (condition) {
    // Executes if true
} else {
    // Executes if false
}
\`\`\`

\`\`\`c
int num = 10;
if (num % 2 == 0) {
    printf("Even\\n");
} else {
    printf("Odd\\n");
}
\`\`\`

#### 3. if-else-if Ladder

Choose between multiple alternatives.

\`\`\`c
if (condition1) {
    // First true condition executes
} else if (condition2) {
    // code
} else if (condition3) {
    // code
} else {
    // Default (if none match)
}
\`\`\`

**Important:** Only the FIRST true condition's block executes!

\`\`\`c
int marks = 75;
if (marks >= 90) {
    printf("Grade A");
} else if (marks >= 80) {
    printf("Grade B");
} else if (marks >= 70) {
    printf("Grade C");    // This executes
} else if (marks >= 60) {
    printf("Grade D");    // Skipped even though marks >= 60
} else {
    printf("Fail");
}
\`\`\`

#### 4. Nested if

if statement inside another if.

\`\`\`c
if (outer_condition) {
    if (inner_condition) {
        // Both conditions true
    }
}
\`\`\`

**Dangling else problem:**
\`\`\`c
// CONFUSING - which if does else belong to?
if (a > 0)
    if (b > 0)
        printf("Both positive");
else
    printf("Which if?");  // Belongs to INNER if!

// BETTER - use braces to clarify
if (a > 0) {
    if (b > 0) {
        printf("Both positive");
    }
} else {
    printf("a is not positive");
}
\`\`\`

---

### Ternary Operator (Conditional Operator)

Shorthand for simple if-else:

\`\`\`c
result = (condition) ? value_if_true : value_if_false;
\`\`\`

\`\`\`c
// Using if-else
if (a > b) {
    max = a;
} else {
    max = b;
}

// Using ternary (same result)
max = (a > b) ? a : b;

// Can be nested (but reduces readability)
result = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
\`\`\`

---

### Switch Statement

Used when comparing a variable against multiple constant values.

\`\`\`c
switch (expression) {
    case constant1:
        // code
        break;
    case constant2:
        // code
        break;
    default:
        // code (optional)
}
\`\`\`

**Rules:**
| Rule | Description |
|------|-------------|
| Expression type | Must be \`int\` or \`char\` (not float, double, or string) |
| Case values | Must be **constant** expressions (not variables) |
| Duplicate cases | Not allowed |
| Break | Without break, execution "falls through" to next case |
| Default | Optional, handles unmatched values |

**Fall-through behavior:**
\`\`\`c
int day = 2;
switch (day) {
    case 1:
        printf("Monday");
        // No break - falls through!
    case 2:
        printf("Tuesday");   // Prints "Tuesday"
        break;
    case 3:
        printf("Wednesday");
        break;
}
\`\`\`

**Intentional fall-through (grouping cases):**
\`\`\`c
char ch = 'A';
switch (ch) {
    case 'a':
    case 'A':
        printf("Vowel A");
        break;
    case 'e':
    case 'E':
        printf("Vowel E");
        break;
    // etc.
}
\`\`\`

---

### Looping Statements

#### 1. for Loop

Best when number of iterations is **known**.

\`\`\`c
for (initialization; condition; update) {
    // body
}
\`\`\`

**Execution flow:**
1. **Initialization** - executed once at start
2. **Condition** - checked before each iteration
3. **Body** - executed if condition is true
4. **Update** - executed after body
5. Go to step 2

\`\`\`c
// Print 1 to 5
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);
}
// Output: 1 2 3 4 5
\`\`\`

**Variations:**
\`\`\`c
// Multiple variables
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d, j=%d\\n", i, j);
}

// Infinite loop
for (;;) {
    // Must use break to exit
}

// Empty parts
int i = 0;
for (; i < 5;) {
    printf("%d ", i++);
}
\`\`\`

#### 2. while Loop

Best when iterations depend on a **condition** (unknown count).

\`\`\`c
while (condition) {
    // body
}
\`\`\`

**Execution flow:**
1. Check condition
2. If true, execute body, go to step 1
3. If false, exit loop

\`\`\`c
// Read until user enters 0
int num;
scanf("%d", &num);
while (num != 0) {
    printf("Got: %d\\n", num);
    scanf("%d", &num);
}
\`\`\`

#### 3. do-while Loop

Executes body **at least once** (condition checked after).

\`\`\`c
do {
    // body (executes at least once)
} while (condition);  // Note the semicolon!
\`\`\`

**Execution flow:**
1. Execute body
2. Check condition
3. If true, go to step 1
4. If false, exit loop

\`\`\`c
// Menu - always show at least once
int choice;
do {
    printf("1. Add\\n2. Delete\\n3. Exit\\n");
    scanf("%d", &choice);
} while (choice != 3);
\`\`\`

**Comparison:**
| Feature | for | while | do-while |
|---------|-----|-------|----------|
| When to use | Known iterations | Unknown iterations | At least one iteration |
| Condition check | Before body | Before body | After body |
| Minimum executions | 0 | 0 | 1 |

---

### Nested Loops

Loop inside another loop. Inner loop completes fully for each outer iteration.

\`\`\`c
// Print multiplication table 1-5
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 10; j++) {
        printf("%d\\t", i * j);
    }
    printf("\\n");
}
\`\`\`

**Pattern printing - Right triangle:**
\`\`\`c
/*
*
**
***
****
*/
for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++) {
        printf("*");
    }
    printf("\\n");
}
\`\`\`

---

### Jump Statements

#### 1. break

Exits the **innermost** loop or switch immediately.

\`\`\`c
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;  // Exit loop when i is 5
    printf("%d ", i);
}
// Output: 1 2 3 4
\`\`\`

**In nested loops:**
\`\`\`c
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) break;  // Only exits inner loop!
        printf("(%d,%d) ", i, j);
    }
}
// Output: (1,1) (2,1) (3,1)
\`\`\`

#### 2. continue

Skips remaining body, jumps to next iteration.

\`\`\`c
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;  // Skip printing 3
    printf("%d ", i);
}
// Output: 1 2 4 5
\`\`\`

#### 3. goto (Avoid!)

Unconditional jump to a labeled statement.

\`\`\`c
    goto label;
    // ...
label:
    printf("Jumped here");
\`\`\`

**Why avoid goto:**
- Makes code hard to read and maintain ("spaghetti code")
- Breaks structured programming
- Almost never necessary

**One acceptable use - breaking out of nested loops:**
\`\`\`c
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        if (arr[i][j] == target) {
            goto found;
        }
    }
}
found:
    printf("Found the target");
\`\`\`

#### 4. return

Exits function, optionally returning a value.

\`\`\`c
int sum(int a, int b) {
    return a + b;  // Exit function, return value
}

void greet() {
    printf("Hello");
    return;  // Optional for void functions
}
\`\`\`

---

### Common Mistakes

**1. Using = instead of == in conditions:**
\`\`\`c
if (x = 5) { }    // WRONG! Assigns 5 to x, always true
if (x == 5) { }   // CORRECT! Compares x with 5
\`\`\`

**2. Missing break in switch:**
\`\`\`c
switch (choice) {
    case 1: printf("One");   // Falls through!
    case 2: printf("Two");   // Also executes
    case 3: printf("Three"); break;
}
// If choice=1, prints "OneTwoThree"
\`\`\`

**3. Semicolon after if/for/while:**
\`\`\`c
if (x > 0);           // Empty if body!
    printf("Positive");  // Always executes

for (int i = 0; i < 5; i++);  // Loop does nothing
    printf("%d", i);          // Executes once (i=5)
\`\`\`

**4. Infinite loops:**
\`\`\`c
while (1) { }           // Intentional infinite loop
for (;;) { }            // Another way

int i = 0;
while (i < 5) {
    printf("%d", i);
    // Forgot i++; - infinite loop!
}
\`\`\`

**5. Off-by-one errors:**
\`\`\`c
// Print 1 to 10
for (int i = 1; i < 10; i++)   // WRONG! Prints 1-9
for (int i = 1; i <= 10; i++)  // CORRECT! Prints 1-10
\`\`\`

---

### Key Memory Triggers

- **if-else-if:** First true condition wins, rest skipped
- **switch:** Only works with int/char, needs break
- **for:** Best when count is known
- **while:** Best when count depends on condition
- **do-while:** Executes at least once (condition after body)
- **break:** Exits innermost loop only
- **continue:** Skips to next iteration
- **goto:** Avoid! (breaks structured programming)

---

### Viva Questions

**Q1: Difference between while and do-while?**
A: while checks condition first (may never execute body). do-while executes body first then checks (always executes at least once).

**Q2: Can switch work with float or strings?**
A: No. switch only works with int and char types.

**Q3: What is fall-through in switch?**
A: When break is missing, execution continues into next case without checking its condition.

**Q4: What does break do in nested loops?**
A: Exits only the innermost loop containing the break statement.

**Q5: What is the difference between break and continue?**
A: break exits the loop entirely. continue skips to the next iteration.

**Q6: Why is goto considered harmful?**
A: Makes code hard to read/debug, violates structured programming, creates "spaghetti code".

**Q7: Can we declare variables inside for loop?**
A: Yes in C99 and later. The variable's scope is limited to the loop.

**Q8: What is an infinite loop? Give examples.**
A: Loop that never terminates. Examples: \`while(1)\`, \`for(;;)\`, loop with no update to condition variable.

---

### Practical Examples - Module 5

**Q1: Write a program to find the largest of three numbers**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 25, c = 15;
    if (a >= b && a >= c) {
        printf("Largest: %d\\n", a);
    } else if (b >= a && b >= c) {
        printf("Largest: %d\\n", b);
    } else {
        printf("Largest: %d\\n", c);
    }
    return 0;
}
\`\`\`

**Q2: Write a program to print grade based on marks using if-else**
\`\`\`c
#include <stdio.h>
int main() {
    int marks = 75;
    if (marks >= 90) {
        printf("Grade: A\\n");
    } else if (marks >= 80) {
        printf("Grade: B\\n");
    } else if (marks >= 70) {
        printf("Grade: C\\n");
    } else if (marks >= 60) {
        printf("Grade: D\\n");
    } else {
        printf("Grade: F\\n");
    }
    return 0;
}
\`\`\`

**Q3: Write a simple calculator using switch**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 5;
    char op = '*';
    switch (op) {
        case '+': printf("%d + %d = %d\\n", a, b, a + b); break;
        case '-': printf("%d - %d = %d\\n", a, b, a - b); break;
        case '*': printf("%d * %d = %d\\n", a, b, a * b); break;
        case '/': printf("%d / %d = %d\\n", a, b, a / b); break;
        default:  printf("Invalid operator\\n");
    }
    return 0;
}
\`\`\`

**Q4: Write a program to print numbers 1 to 10 using for loop**
\`\`\`c
#include <stdio.h>
int main() {
    for (int i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Q5: Write a program to print multiplication table**
\`\`\`c
#include <stdio.h>
int main() {
    int num = 7;
    printf("Multiplication Table of %d:\\n", num);
    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", num, i, num * i);
    }
    return 0;
}
\`\`\`

**Q6: Write a program to calculate factorial using while loop**
\`\`\`c
#include <stdio.h>
int main() {
    int n = 5, factorial = 1, i = 1;
    while (i <= n) {
        factorial *= i;
        i++;
    }
    printf("Factorial of %d = %d\\n", n, factorial);
    return 0;
}
\`\`\`

**Q7: Write a program to reverse a number**
\`\`\`c
#include <stdio.h>
int main() {
    int num = 12345, reversed = 0;
    while (num > 0) {
        reversed = reversed * 10 + num % 10;
        num /= 10;
    }
    printf("Reversed: %d\\n", reversed);
    return 0;
}
\`\`\`

**Q8: Write a program to check if a number is prime**
\`\`\`c
#include <stdio.h>
int main() {
    int num = 17, isPrime = 1;
    if (num <= 1) isPrime = 0;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            isPrime = 0;
            break;
        }
    }
    printf("%d is %s\\n", num, isPrime ? "Prime" : "Not Prime");
    return 0;
}
\`\`\`

**Q9: Write a program to print Floyd's triangle**
\`\`\`c
#include <stdio.h>
int main() {
    int rows = 5, num = 1;
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", num++);
        }
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Q10: Write a program to demonstrate break and continue**
\`\`\`c
#include <stdio.h>
int main() {
    printf("Using continue (skip 5):\\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) continue;
        printf("%d ", i);
    }

    printf("\\n\\nUsing break (stop at 5):\\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) break;
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
\`\`\`
`
