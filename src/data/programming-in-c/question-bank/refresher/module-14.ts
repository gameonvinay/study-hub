export const module14 = `
## Module 14: Preprocessor Directives

### What is the Preprocessor?

The **preprocessor** is a program that processes source code **before** the actual compilation. It handles directives that start with \`#\`.

**Preprocessing stages:**
\`\`\`
Source Code (.c)
      ↓
  Preprocessor  →  Expanded source (macros replaced, headers included)
      ↓
    Compiler    →  Object code (.o)
      ↓
     Linker     →  Executable
\`\`\`

**Why use preprocessor?**
- Include header files
- Define constants and macros
- Conditional compilation
- Improve code portability
- Enable/disable features

---

### #include - File Inclusion

Inserts contents of another file into current file.

\`\`\`c
#include <stdio.h>    // System header - searches system paths
#include <stdlib.h>   // Standard library headers

#include "myfile.h"   // User header - searches current directory first
#include "utils/helpers.h"  // Relative path
\`\`\`

**Search order:**
| Syntax | Search Order |
|--------|--------------|
| \`<file.h>\` | System include directories only |
| \`"file.h"\` | Current directory → then system directories |

**Common headers:**
| Header | Purpose |
|--------|---------|
| \`<stdio.h>\` | Input/Output (printf, scanf, FILE) |
| \`<stdlib.h>\` | Memory, conversion (malloc, atoi) |
| \`<string.h>\` | String functions (strlen, strcpy) |
| \`<math.h>\` | Math functions (sqrt, pow) |
| \`<ctype.h>\` | Character functions (isalpha, tolower) |
| \`<limits.h>\` | Type limits (INT_MAX, CHAR_MIN) |
| \`<stdbool.h>\` | Boolean type (bool, true, false) |

---

### #define - Macros

#### Object-like Macros (Constants)

\`\`\`c
#define PI 3.14159
#define MAX_SIZE 100
#define NEWLINE '\\n'
#define MESSAGE "Hello World"

// Usage
float area = PI * r * r;
int arr[MAX_SIZE];
printf(MESSAGE);
\`\`\`

**Advantages over const:**
- No memory allocation
- Can be used in array sizes (in older C)
- Works with \`#if\` conditions

---

#### Function-like Macros

\`\`\`c
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))

// Usage
int sq = SQUARE(5);       // ((5) * (5)) = 25
int m = MAX(10, 20);      // 20
\`\`\`

**CRITICAL: Always use parentheses!**
\`\`\`c
// WRONG - causes bugs
#define SQUARE(x) x * x
int a = SQUARE(1 + 2);  // Expands to: 1 + 2 * 1 + 2 = 5 (not 9!)

// CORRECT
#define SQUARE(x) ((x) * (x))
int a = SQUARE(1 + 2);  // Expands to: ((1 + 2) * (1 + 2)) = 9

// WRONG
#define DOUBLE(x) x + x
int b = 10 * DOUBLE(5);  // Expands to: 10 * 5 + 5 = 55 (not 100!)

// CORRECT
#define DOUBLE(x) ((x) + (x))
int b = 10 * DOUBLE(5);  // Expands to: 10 * ((5) + (5)) = 100
\`\`\`

---

#### Multi-line Macros

\`\`\`c
#define SWAP(a, b, type) do { \\
    type temp = a; \\
    a = b; \\
    b = temp; \\
} while(0)

// Usage
int x = 10, y = 20;
SWAP(x, y, int);

// The do-while(0) trick makes it work safely in if statements:
if (condition)
    SWAP(x, y, int);  // Works correctly
\`\`\`

---

### Stringizing (#) and Token Pasting (##)

#### Stringizing Operator (#)

Converts macro parameter to string literal:

\`\`\`c
#define PRINT_VAR(x) printf(#x " = %d\\n", x)
#define TO_STRING(x) #x

int age = 25;
PRINT_VAR(age);     // Expands to: printf("age" " = %d\\n", age);
                    // Prints: age = 25

printf(TO_STRING(Hello World));  // Prints: Hello World
\`\`\`

---

#### Token Pasting Operator (##)

Concatenates two tokens:

\`\`\`c
#define DECLARE(name, num) int name##num
#define CONCAT(a, b) a##b

DECLARE(var, 1) = 10;  // Creates: int var1 = 10;
DECLARE(var, 2) = 20;  // Creates: int var2 = 20;

int CONCAT(my, Var) = 100;  // Creates: int myVar = 100;
\`\`\`

---

### Conditional Compilation

#### #ifdef / #ifndef / #endif

\`\`\`c
// #ifdef - if defined
#define DEBUG

#ifdef DEBUG
    printf("Debug mode enabled\\n");
    printf("Value of x: %d\\n", x);
#endif

// #ifndef - if NOT defined
#ifndef RELEASE
    printf("Development build\\n");
#endif
\`\`\`

---

#### #if / #elif / #else / #endif

\`\`\`c
#define VERSION 2

#if VERSION == 1
    printf("Version 1.0\\n");
#elif VERSION == 2
    printf("Version 2.0\\n");
#elif VERSION >= 3
    printf("Version 3.0 or higher\\n");
#else
    printf("Unknown version\\n");
#endif

// Using defined() operator
#if defined(DEBUG) && defined(VERBOSE)
    printf("Verbose debug mode\\n");
#endif

// Numeric conditions
#if MAX_SIZE > 100
    // Large array handling
#endif
\`\`\`

---

#### Header Guards (Include Guards)

Prevents header from being included multiple times:

\`\`\`c
// In myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

// Header contents here
struct Point {
    int x, y;
};

void printPoint(struct Point p);

#endif  // MYHEADER_H
\`\`\`

**Why needed?**
\`\`\`c
// file1.h includes stdio.h
// file2.h includes stdio.h
// main.c includes both file1.h and file2.h
// Without guards: stdio.h included twice → redefinition errors!
\`\`\`

**Alternative (non-standard but widely supported):**
\`\`\`c
#pragma once
// Header contents here
\`\`\`

---

### #undef - Undefine Macro

\`\`\`c
#define SIZE 10
printf("%d\\n", SIZE);  // 10

#undef SIZE
#define SIZE 20
printf("%d\\n", SIZE);  // 20

// Check if defined after undef
#ifdef SIZE
    printf("SIZE is defined\\n");
#else
    printf("SIZE is not defined\\n");
#endif
\`\`\`

---

### Predefined Macros

| Macro | Description | Example Output |
|-------|-------------|----------------|
| \`__FILE__\` | Current source file name | \`"main.c"\` |
| \`__LINE__\` | Current line number | \`42\` |
| \`__DATE__\` | Compilation date | \`"Dec 30 2025"\` |
| \`__TIME__\` | Compilation time | \`"14:30:00"\` |
| \`__func__\` | Current function name | \`"main"\` |
| \`__STDC__\` | 1 if ANSI C compliant | \`1\` |

\`\`\`c
printf("File: %s\\n", __FILE__);
printf("Line: %d\\n", __LINE__);
printf("Compiled: %s %s\\n", __DATE__, __TIME__);

void myFunction() {
    printf("Function: %s\\n", __func__);  // Prints: myFunction
}
\`\`\`

**Debug macro example:**
\`\`\`c
#define DEBUG_LOG(msg) printf("[%s:%d] %s\\n", __FILE__, __LINE__, msg)

DEBUG_LOG("Starting process");
// Output: [main.c:15] Starting process
\`\`\`

---

### #pragma - Compiler Directives

Compiler-specific instructions:

\`\`\`c
#pragma once          // Include guard (non-standard but common)

#pragma pack(push, 1) // Set structure packing to 1 byte
struct Packed {
    char a;
    int b;
};  // Size = 5 bytes (no padding)
#pragma pack(pop)     // Restore previous packing

#pragma warning(disable: 4996)  // Disable specific warning (MSVC)

#pragma GCC optimize("O3")  // GCC optimization level

#pragma message("Compiling with debug enabled")  // Display message during compilation
\`\`\`

---

### #error and #warning

\`\`\`c
#ifndef CONFIG_FILE
    #error "CONFIG_FILE must be defined!"
    // Stops compilation with this message
#endif

#if MAX_SIZE < 10
    #warning "MAX_SIZE is very small"
    // Displays warning but continues compilation
#endif
\`\`\`

---

### Common Macro Patterns

**1. Debug print macro:**
\`\`\`c
#ifdef DEBUG
    #define DBG(fmt, ...) printf("[DEBUG] " fmt "\\n", ##__VA_ARGS__)
#else
    #define DBG(fmt, ...)  // Empty - no code generated
#endif

DBG("Value is %d", x);  // Only prints in debug mode
\`\`\`

**2. Array size macro:**
\`\`\`c
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int nums[] = {1, 2, 3, 4, 5};
int size = ARRAY_SIZE(nums);  // 5
\`\`\`

**3. Bit manipulation macros:**
\`\`\`c
#define SET_BIT(x, n)    ((x) |= (1 << (n)))
#define CLEAR_BIT(x, n)  ((x) &= ~(1 << (n)))
#define TOGGLE_BIT(x, n) ((x) ^= (1 << (n)))
#define CHECK_BIT(x, n)  ((x) & (1 << (n)))
\`\`\`

**4. Min/Max with type safety:**
\`\`\`c
#define MAX(a, b) ({ \\
    typeof(a) _a = (a); \\
    typeof(b) _b = (b); \\
    _a > _b ? _a : _b; \\
})
\`\`\`

---

### Common Mistakes

**1. Missing parentheses in macros:**
\`\`\`c
#define SQUARE(x) x * x
int a = SQUARE(1+2);  // Wrong: 1+2*1+2 = 5

#define SQUARE(x) ((x) * (x))
int a = SQUARE(1+2);  // Correct: ((1+2)*(1+2)) = 9
\`\`\`

**2. Semicolon at end of #define:**
\`\`\`c
#define MAX 100;  // WRONG - semicolon included in substitution
int arr[MAX];     // Expands to: int arr[100;]; - syntax error!

#define MAX 100   // CORRECT
\`\`\`

**3. Side effects with macros:**
\`\`\`c
#define SQUARE(x) ((x) * (x))
int a = 5;
int b = SQUARE(a++);  // Expands to: ((a++) * (a++))
                       // a incremented TWICE! Undefined behavior!

// Use inline functions for side-effect-safe code
\`\`\`

**4. Forgetting header guards:**
\`\`\`c
// myheader.h - NO guard
struct Point { int x, y; };

// If included twice:
// error: redefinition of 'struct Point'
\`\`\`

**5. Spaces in macro names:**
\`\`\`c
#define MY MACRO 100  // WRONG - only MY is defined as "MACRO 100"
#define MY_MACRO 100  // CORRECT
\`\`\`

---

### Macros vs Functions

| Aspect | Macro | Function |
|--------|-------|----------|
| Expansion | Text substitution | Function call |
| Type checking | No | Yes |
| Debugging | Harder | Easier |
| Code size | Increases (inline) | Smaller (called) |
| Speed | Faster (no call overhead) | Slight overhead |
| Side effects | Can evaluate args multiple times | Evaluates once |
| Return type | None (text) | Defined type |

**When to use macros:**
- Simple constants
- Simple inline operations
- Generic operations (work with any type)
- Compile-time decisions

**When to use functions:**
- Complex logic
- Need type checking
- Debugging important
- Avoid side effect issues

---

### Key Memory Triggers

- Preprocessor runs **before** compilation
- Directives start with **#** (no semicolon at end)
- \`#include <>\` for system headers, \`""\` for user headers
- Macros are **text substitution** - no type checking
- Always use **parentheses** around macro parameters
- **Header guards** prevent multiple inclusion
- \`#ifdef\` checks if defined, \`#ifndef\` if NOT defined
- \`__FILE__\`, \`__LINE__\`, \`__func__\` for debugging
- Use **do-while(0)** for multi-statement macros
- Macro arguments can be evaluated **multiple times**

---

### Viva Questions

**Q1: What is a preprocessor?**
A: A program that processes source code before compilation. Handles directives starting with #.

**Q2: Difference between #include <> and #include ""?**
A: <file.h> searches only system directories. "file.h" searches current directory first, then system directories.

**Q3: What is a macro?**
A: A name that the preprocessor replaces with its definition. Can be object-like (constants) or function-like.

**Q4: Why use parentheses in macro definitions?**
A: To ensure correct operator precedence when macro is expanded with complex expressions.

**Q5: What is conditional compilation?**
A: Compiling different code sections based on conditions. Uses #ifdef, #ifndef, #if, #elif, #else, #endif.

**Q6: What is a header guard?**
A: #ifndef/#define/#endif pattern to prevent a header from being included multiple times.

**Q7: What does #undef do?**
A: Removes a previously defined macro, allowing it to be redefined.

**Q8: Difference between macro and function?**
A: Macro is text substitution (no type check, faster, can have side effects). Function is actual call (type checked, debuggable, evaluates args once).

**Q9: What are predefined macros?**
A: Built-in macros like __FILE__, __LINE__, __DATE__, __TIME__ provided by the compiler.

**Q10: What is the stringizing operator (#)?**
A: Converts macro parameter to a string literal. #x becomes "x".

---

### Practical Examples - Module 14

**Q1: Write a program using #define for constants**
\`\`\`c
#include <stdio.h>
#define PI 3.14159
#define MAX_SIZE 100

int main() {
    float radius = 5.0;
    float area = PI * radius * radius;
    int arr[MAX_SIZE];

    printf("Area = %.2f\\n", area);
    printf("Array size = %d\\n", MAX_SIZE);
    return 0;
}
\`\`\`

**Q2: Write a program using macro function**
\`\`\`c
#include <stdio.h>
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main() {
    printf("Square of 5: %d\\n", SQUARE(5));
    printf("Square of 3+2: %d\\n", SQUARE(3+2));  // Correctly gives 25
    printf("Max of 10, 20: %d\\n", MAX(10, 20));
    printf("Min of 10, 20: %d\\n", MIN(10, 20));
    return 0;
}
\`\`\`

**Q3: Write a program using conditional compilation (#ifdef)**
\`\`\`c
#include <stdio.h>
#define DEBUG

int main() {
    int x = 10;

#ifdef DEBUG
    printf("Debug: x = %d\\n", x);
#endif

    printf("Program running...\\n");

#ifndef RELEASE
    printf("This is not a release build\\n");
#endif

    return 0;
}
\`\`\`

**Q4: Write a program using #if, #elif, #else**
\`\`\`c
#include <stdio.h>
#define VERSION 2

int main() {
#if VERSION == 1
    printf("Version 1.0\\n");
#elif VERSION == 2
    printf("Version 2.0\\n");
#else
    printf("Unknown version\\n");
#endif

    return 0;
}
\`\`\`

**Q5: Write a program demonstrating macro with multiple statements**
\`\`\`c
#include <stdio.h>
#define SWAP(a, b, type) do { \\
    type temp = a; \\
    a = b; \\
    b = temp; \\
} while(0)

int main() {
    int x = 10, y = 20;
    printf("Before: x = %d, y = %d\\n", x, y);
    SWAP(x, y, int);
    printf("After: x = %d, y = %d\\n", x, y);
    return 0;
}
\`\`\`

**Q6: Write a program using predefined macros**
\`\`\`c
#include <stdio.h>
int main() {
    printf("File: %s\\n", __FILE__);
    printf("Line: %d\\n", __LINE__);
    printf("Date: %s\\n", __DATE__);
    printf("Time: %s\\n", __TIME__);
    printf("Function: %s\\n", __func__);
    return 0;
}
\`\`\`

**Q7: Write a program using stringizing operator (#)**
\`\`\`c
#include <stdio.h>
#define PRINT_VAR(x) printf(#x " = %d\\n", x)

int main() {
    int age = 25;
    int count = 100;

    PRINT_VAR(age);    // Prints: age = 25
    PRINT_VAR(count);  // Prints: count = 100
    return 0;
}
\`\`\`

**Q8: Write a program using token pasting operator (##)**
\`\`\`c
#include <stdio.h>
#define DECLARE_VAR(name, num) int name##num
#define CONCAT(a, b) a##b

int main() {
    DECLARE_VAR(var, 1) = 10;  // Creates: int var1 = 10
    DECLARE_VAR(var, 2) = 20;  // Creates: int var2 = 20

    printf("var1 = %d\\n", var1);
    printf("var2 = %d\\n", var2);
    printf("Concatenated: %d\\n", CONCAT(12, 34));
    return 0;
}
\`\`\`

**Q9: Write a program with header guard simulation**
\`\`\`c
#include <stdio.h>

// Simulating header guard
#ifndef MYHEADER_H
#define MYHEADER_H

#define MAX_VALUE 1000
#define MIN_VALUE 0

#endif  // MYHEADER_H

int main() {
    printf("Max: %d, Min: %d\\n", MAX_VALUE, MIN_VALUE);
    return 0;
}
\`\`\`

**Q10: Write a program demonstrating #undef**
\`\`\`c
#include <stdio.h>
#define SIZE 10

int main() {
    printf("SIZE = %d\\n", SIZE);

#undef SIZE
#define SIZE 20

    printf("SIZE = %d\\n", SIZE);

    return 0;
}
\`\`\`
`
