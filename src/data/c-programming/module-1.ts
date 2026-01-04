export const module1 = `
## Module 1: Basics & Program Structure

### What is C?

C is a **general-purpose, procedural programming language** developed by Dennis Ritchie at Bell Labs in 1972. It's called a "middle-level language" because it combines features of both high-level languages (readable syntax) and low-level languages (direct memory access).

**Why learn C?**
- Foundation for many modern languages (C++, Java, Python internals)
- Used in operating systems (Linux, Windows kernel), embedded systems, databases
- Provides direct control over hardware and memory
- Fast execution speed compared to interpreted languages

### Structure of a C Program

Every C program follows a specific structure. Let's break down each part:

\`\`\`c
#include <stdio.h>   // 1. Preprocessor directive

int main() {         // 2. Main function (entry point)
    printf("Hello, World!\\n");  // 3. Statements
    return 0;        // 4. Return value to OS
}
\`\`\`

**Understanding each part:**

1. **Preprocessor Directives (\`#include\`)**: These are instructions to the preprocessor that run BEFORE compilation. \`#include <stdio.h>\` tells the compiler to include the Standard Input/Output library, which contains functions like \`printf()\` and \`scanf()\`.

2. **The \`main()\` Function**: Every C program MUST have exactly one \`main()\` function. This is where program execution begins. The \`int\` before \`main\` indicates it returns an integer value.

3. **Statements**: Instructions inside curly braces \`{}\` are executed sequentially. Each statement ends with a semicolon \`;\`.

4. **Return Statement**: \`return 0;\` sends a value back to the operating system. By convention, \`0\` means "program executed successfully", and non-zero values indicate errors.

### The Compilation Process

C is a **compiled language**, meaning source code is converted to machine code before execution. Here's what happens:

\`\`\`
Source Code (.c)
    ↓ Preprocessor (handles #include, #define)
Expanded Source Code
    ↓ Compiler (converts to assembly)
Assembly Code (.s)
    ↓ Assembler (converts to machine code)
Object Code (.o)
    ↓ Linker (combines with libraries)
Executable File
\`\`\`

**Compiling with GCC:**
\`\`\`bash
gcc program.c -o program    # Compile
./program                   # Run (Linux/Mac)
program.exe                 # Run (Windows)
\`\`\`

**Common GCC options:**
- \`-o name\`: Specify output filename
- \`-Wall\`: Enable all warnings (recommended!)
- \`-g\`: Include debug information
- \`-c\`: Compile only, don't link

### Comments in C

Comments are notes for humans that the compiler ignores. Use them to explain complex logic!

\`\`\`c
// Single-line comment: Everything after // on this line is ignored

/* Multi-line comment:
   Can span multiple lines.
   Useful for longer explanations.
*/

/* You can also use multi-line style for single lines */
\`\`\`

**Best Practice**: Write comments that explain WHY, not WHAT. The code shows what; comments should explain the reasoning.

### Header Files

Header files contain **function declarations** and **macro definitions** that your program can use. They have the \`.h\` extension.

| Header | Contains | Common Functions |
|--------|----------|------------------|
| \`<stdio.h>\` | Standard I/O | \`printf()\`, \`scanf()\`, \`fopen()\`, \`fclose()\` |
| \`<stdlib.h>\` | General utilities | \`malloc()\`, \`free()\`, \`atoi()\`, \`exit()\` |
| \`<string.h>\` | String handling | \`strlen()\`, \`strcpy()\`, \`strcmp()\`, \`strcat()\` |
| \`<math.h>\` | Math functions | \`sqrt()\`, \`pow()\`, \`sin()\`, \`cos()\`, \`abs()\` |
| \`<ctype.h>\` | Character handling | \`isalpha()\`, \`isdigit()\`, \`toupper()\`, \`tolower()\` |
| \`<time.h>\` | Date and time | \`time()\`, \`clock()\`, \`difftime()\` |

**Two ways to include:**
- \`#include <header.h>\` - Search in system directories (for standard libraries)
- \`#include "header.h"\` - Search in current directory first (for your own headers)

### Escape Sequences

Special character combinations that represent non-printable characters:

| Escape | Meaning | Example Output |
|--------|---------|----------------|
| \`\\n\` | Newline | Moves cursor to next line |
| \`\\t\` | Tab | Horizontal tab (usually 4-8 spaces) |
| \`\\\\\` | Backslash | Prints \`\\\` |
| \`\\"\` | Double quote | Prints \`"\` |
| \`\\'\` | Single quote | Prints \`'\` |
| \`\\0\` | Null character | String terminator |
| \`\\r\` | Carriage return | Moves cursor to start of line |

### Key Characteristics of C

1. **Case-Sensitive**: \`Variable\`, \`variable\`, and \`VARIABLE\` are three different identifiers
2. **Procedural**: Programs are organized as a sequence of procedures (functions)
3. **Statically Typed**: Variable types must be declared before use
4. **Compiled**: Source code is converted to machine code before execution
5. **Portable**: C programs can be compiled on different platforms with minimal changes

### Common Beginner Mistakes

1. **Forgetting semicolons**: Every statement needs one!
2. **Case sensitivity**: \`Printf\` is not the same as \`printf\`
3. **Missing header files**: \`printf\` needs \`#include <stdio.h>\`
4. **Forgetting \`return 0;\`**: Always return a value from \`main()\`

> **Viva Questions:**
> - What is the difference between a compiler and an interpreter?
> - Explain the compilation stages of a C program.
> - Why is \`main()\` function necessary in C?
> - What is the purpose of \`return 0\` in \`main()\`?

### Practical Examples - Module 1

**Q1: Write a program to print "Hello, World!"**
\`\`\`c
#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

**Q2: Write a program to print your name and address**
\`\`\`c
#include <stdio.h>
int main() {
    printf("Name: John Doe\\n");
    printf("Address: 123 Main Street\\n");
    printf("City: New Delhi\\n");
    return 0;
}
\`\`\`

**Q3: Write a program to add two numbers (hardcoded)**
\`\`\`c
#include <stdio.h>
int main() {
    int a = 5, b = 10;
    int sum = a + b;
    printf("Sum of %d and %d is %d\\n", a, b, sum);
    return 0;
}
\`\`\`

**Q4: Write a program using multiple printf statements**
\`\`\`c
#include <stdio.h>
int main() {
    printf("Line 1\\n");
    printf("Line 2\\n");
    printf("Line 3\\n");
    return 0;
}
\`\`\`

**Q5: Write a program demonstrating single and multi-line comments**
\`\`\`c
#include <stdio.h>
int main() {
    // This is a single line comment
    printf("Comments Demo\\n");
    /* This is a
       multi-line comment */
    return 0;
}
\`\`\`

**Q6: Write a program to print ASCII value of a character**
\`\`\`c
#include <stdio.h>
int main() {
    char ch = 'A';
    printf("ASCII value of %c is %d\\n", ch, ch);
    return 0;
}
\`\`\`

**Q7: Write a program to demonstrate escape sequences**
\`\`\`c
#include <stdio.h>
int main() {
    printf("Tab:\\tHello\\n");
    printf("Newline:\\nWorld\\n");
    printf("Backslash: \\\\\\n");
    printf("Quote: \\"Hello\\"\\n");
    return 0;
}
\`\`\`

**Q8: Write a program using multiple header files**
\`\`\`c
#include <stdio.h>
#include <math.h>
int main() {
    double num = 16.0;
    printf("Square root of %.0f is %.2f\\n", num, sqrt(num));
    return 0;
}
\`\`\`

**Q9: Write a program with a void main function (understand the difference)**
\`\`\`c
#include <stdio.h>
void main() {  // Non-standard, but commonly seen
    printf("Using void main\\n");
    // No return statement needed
}
// Note: int main() with return 0 is the standard way
\`\`\`

**Q10: Write a program to display a pattern using printf**
\`\`\`c
#include <stdio.h>
int main() {
    printf("*\\n");
    printf("**\\n");
    printf("***\\n");
    printf("****\\n");
    printf("*****\\n");
    return 0;
}
\`\`\`
`
