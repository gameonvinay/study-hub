export const module2 = `
## Module 2: Data Types, Variables & Constants

### What are Data Types?

A **data type** tells the compiler two things:
1. **How much memory** to allocate for a variable
2. **How to interpret** the bits stored in that memory

Think of it like containers: a cup holds liquid differently than a box holds solid items. Similarly, \`int\` stores whole numbers differently than \`float\` stores decimals.

### Primary (Fundamental) Data Types

C has four fundamental data types:

| Type | Size | Range | Use Case |
|------|------|-------|----------|
| \`char\` | 1 byte | -128 to 127 | Single characters, small numbers |
| \`int\` | 4 bytes* | -2.1 billion to +2.1 billion | Whole numbers, counters, indices |
| \`float\` | 4 bytes | ±3.4 × 10³⁸ (6-7 digits precision) | Decimal numbers (less precise) |
| \`double\` | 8 bytes | ±1.7 × 10³⁰⁸ (15-16 digits precision) | Decimal numbers (more precise) |

*Size of \`int\` depends on system: 2 bytes on 16-bit, 4 bytes on 32/64-bit systems.

\`\`\`c
char grade = 'A';        // Single character in single quotes
int age = 25;            // Whole number
float price = 99.99f;    // Decimal (f suffix for float literal)
double pi = 3.14159265358979;  // More precise decimal
\`\`\`

### Type Modifiers

Modifiers change the **size** or **sign** of basic types:

**Size Modifiers:**
| Modifier | Effect | Example |
|----------|--------|---------|
| \`short\` | Reduces size (usually 2 bytes) | \`short int count;\` |
| \`long\` | Increases size | \`long int population;\` |
| \`long long\` | Even larger (8 bytes) | \`long long bigNumber;\` |

**Sign Modifiers:**
| Modifier | Effect | Example |
|----------|--------|---------|
| \`signed\` | Can store negative values (default) | \`signed int temp = -10;\` |
| \`unsigned\` | Only positive values (doubles positive range) | \`unsigned int age = 25;\` |

\`\`\`c
unsigned int age = 25;              // 0 to 4,294,967,295
short int smallNum = 100;           // -32,768 to 32,767
long long bigNum = 9223372036854775807LL;  // Very large number
unsigned char byte = 255;           // 0 to 255 (useful for binary data)
\`\`\`

### Variables: Declaration, Definition, Initialization

A **variable** is a named storage location in memory.

\`\`\`c
// Declaration: Tells compiler the variable exists
int age;

// Definition: Allocates memory (in C, declaration = definition for local variables)
int count;

// Initialization: Giving a variable its first value
int score = 100;

// Multiple declarations
int x, y, z;
int a = 1, b = 2, c = 3;
\`\`\`

**Variable Naming Rules:**
1. Must start with a letter (a-z, A-Z) or underscore (_)
2. Can contain letters, digits (0-9), and underscores
3. Cannot use C keywords (like \`int\`, \`return\`, \`if\`)
4. Case-sensitive: \`Age\`, \`age\`, \`AGE\` are different variables

\`\`\`c
// Valid names
int studentAge;
int _count;
int total_marks;
int score2;

// Invalid names
int 2score;      // Cannot start with digit
int my-var;      // Hyphens not allowed
int int;         // Cannot use keywords
\`\`\`

### Constants: Values That Don't Change

**1. Using \`const\` keyword (Recommended):**
\`\`\`c
const int MAX_STUDENTS = 100;
const float PI = 3.14159f;
const char NEWLINE = '\\n';

// MAX_STUDENTS = 200;  // ERROR! Cannot modify a const
\`\`\`

**2. Using \`#define\` (Preprocessor Macro):**
\`\`\`c
#define MAX_SIZE 100
#define PI 3.14159
#define SQUARE(x) ((x) * (x))

int arr[MAX_SIZE];  // Replaced with: int arr[100];
float area = PI * r * r;  // Replaced with: float area = 3.14159 * r * r;
\`\`\`

**Difference between \`const\` and \`#define\`:**
| Aspect | \`const\` | \`#define\` |
|--------|---------|-----------|
| Type checking | Yes | No |
| Debugging | Easier (has name) | Harder (just a value) |
| Scope | Follows normal scope rules | Global (from definition point) |
| Memory | Occupies memory | No memory (text replacement) |

### The \`sizeof\` Operator

Returns the size (in bytes) of a type or variable:

\`\`\`c
printf("char: %lu bytes\\n", sizeof(char));      // 1
printf("int: %lu bytes\\n", sizeof(int));        // 4 (usually)
printf("float: %lu bytes\\n", sizeof(float));    // 4
printf("double: %lu bytes\\n", sizeof(double));  // 8

int arr[10];
printf("Array: %lu bytes\\n", sizeof(arr));      // 40 (10 × 4)
\`\`\`

### Type Conversion (Casting)

**Implicit Conversion (Automatic):**
\`\`\`c
int a = 10;
float b = a;        // int → float automatically
double c = b;       // float → double automatically

// In expressions, smaller types are "promoted"
int x = 5;
float y = 2.5f;
float result = x + y;  // x is converted to float, then added
\`\`\`

**Explicit Conversion (Type Casting):**
\`\`\`c
float f = 3.7f;
int i = (int)f;     // i = 3 (truncates, doesn't round!)

int a = 5, b = 2;
float result = (float)a / b;  // 2.5 (not 2!)
\`\`\`

### Common Mistakes with Data Types

1. **Integer Division Truncation:**
\`\`\`c
int result = 5 / 2;    // result = 2, not 2.5!
float correct = 5.0 / 2;  // correct = 2.5
\`\`\`

2. **Overflow:**
\`\`\`c
unsigned char c = 255;
c = c + 1;  // c becomes 0 (wraps around!)

int big = 2147483647;
big = big + 1;  // Undefined behavior! (overflow)
\`\`\`

3. **Uninitialized Variables:**
\`\`\`c
int x;          // Contains garbage value!
printf("%d", x); // Prints unpredictable value
\`\`\`

> **Viva Questions:**
> - What is the difference between float and double?
> - Why do we need different data types?
> - What happens when you assign a float to an int?
> - Explain signed vs unsigned integers.
> - What is type casting? Give an example.

### Practical Examples - Module 2

**Q1: Write a program to demonstrate different data types**
\`\`\`c
#include <stdio.h>
int main() {
    int age = 25;
    float salary = 50000.50;
    char grade = 'A';
    double pi = 3.14159265359;

    printf("Age: %d\\n", age);
    printf("Salary: %.2f\\n", salary);
    printf("Grade: %c\\n", grade);
    printf("Pi: %.10lf\\n", pi);
    return 0;
}
\`\`\`

**Q2: Write a program to find size of different data types**
\`\`\`c
#include <stdio.h>
int main() {
    printf("Size of char: %lu byte\\n", sizeof(char));
    printf("Size of int: %lu bytes\\n", sizeof(int));
    printf("Size of float: %lu bytes\\n", sizeof(float));
    printf("Size of double: %lu bytes\\n", sizeof(double));
    printf("Size of long: %lu bytes\\n", sizeof(long));
    printf("Size of long long: %lu bytes\\n", sizeof(long long));
    return 0;
}
\`\`\`

**Q3: Write a program to swap two numbers using a third variable**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 20, temp;
    printf("Before swap: a = %d, b = %d\\n", a, b);
    temp = a;
    a = b;
    b = temp;
    printf("After swap: a = %d, b = %d\\n", a, b);
    return 0;
}
\`\`\`

**Q4: Write a program to demonstrate const keyword**
\`\`\`c
#include <stdio.h>
int main() {
    const int MAX = 100;
    const float PI = 3.14159;

    printf("MAX = %d\\n", MAX);
    printf("PI = %.5f\\n", PI);
    // MAX = 200;  // This would cause an error
    return 0;
}
\`\`\`

**Q5: Write a program to demonstrate unsigned integers**
\`\`\`c
#include <stdio.h>
int main() {
    unsigned int positive = 4294967295;  // Max value for 32-bit
    signed int negative = -100;

    printf("Unsigned: %u\\n", positive);
    printf("Signed: %d\\n", negative);
    return 0;
}
\`\`\`

**Q6: Write a program to convert Celsius to Fahrenheit**
\`\`\`c
#include <stdio.h>
int main() {
    float celsius = 37.5;
    float fahrenheit;

    fahrenheit = (celsius * 9 / 5) + 32;
    printf("%.2f Celsius = %.2f Fahrenheit\\n", celsius, fahrenheit);
    return 0;
}
\`\`\`

**Q7: Write a program to demonstrate type casting**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 3;
    float result;

    result = a / b;          // Integer division
    printf("Without casting: %.2f\\n", result);

    result = (float)a / b;   // Type casting
    printf("With casting: %.2f\\n", result);
    return 0;
}
\`\`\`

**Q8: Write a program using #define constants**
\`\`\`c
#include <stdio.h>
#define PI 3.14159
#define AREA(r) (PI * r * r)

int main() {
    float radius = 5.0;
    printf("Area of circle with radius %.1f = %.2f\\n", radius, AREA(radius));
    return 0;
}
\`\`\`

**Q9: Write a program to print ASCII values of A-Z**
\`\`\`c
#include <stdio.h>
int main() {
    char ch;
    printf("Character\\tASCII Value\\n");
    for (ch = 'A'; ch <= 'Z'; ch++) {
        printf("%c\\t\\t%d\\n", ch, ch);
    }
    return 0;
}
\`\`\`

**Q10: Write a program to demonstrate variable overflow**
\`\`\`c
#include <stdio.h>
int main() {
    short int num = 32767;  // Max value for short
    printf("Before overflow: %d\\n", num);
    num = num + 1;
    printf("After overflow: %d\\n", num);  // Will be -32768
    return 0;
}
\`\`\`
`
