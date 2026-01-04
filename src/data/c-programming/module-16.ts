export const module16 = `
## Module 16: Command Line Arguments

### What are Command Line Arguments?

**Command line arguments** are values passed to a program when it is executed from the terminal/command prompt. They allow programs to receive input without interactive prompts.

\`\`\`bash
$ ./myprogram arg1 arg2 arg3
       ↓      ↓    ↓    ↓
    argv[0] [1]  [2]  [3]
\`\`\`

**Why use command line arguments?**
- Automate program execution (scripts, batch processing)
- Configure program behavior at startup
- Process files specified by user
- Enable program to work in pipelines
- Avoid interactive input for simple tasks

---

### main() Function Parameters

\`\`\`c
int main(int argc, char *argv[]) {
    // argc - Argument Count: number of arguments (including program name)
    // argv - Argument Vector: array of strings (char pointers)

    return 0;
}
\`\`\`

**Alternative syntax (equivalent):**
\`\`\`c
int main(int argc, char **argv) {
    // Same as above - argv is pointer to pointer to char
}
\`\`\`

---

### argc and argv Explained

| Parameter | Type | Description |
|-----------|------|-------------|
| \`argc\` | \`int\` | Number of arguments (always >= 1) |
| \`argv\` | \`char *[]\` | Array of string pointers |
| \`argv[0]\` | \`char *\` | Program name |
| \`argv[1]\` to \`argv[argc-1]\` | \`char *\` | Actual arguments |
| \`argv[argc]\` | \`NULL\` | Always NULL (guaranteed) |

**Memory layout:**
\`\`\`
Command: ./program hello 42

argc = 3

argv → [0] → "./program\\0"
       [1] → "hello\\0"
       [2] → "42\\0"
       [3] → NULL
\`\`\`

---

### Basic Example

\`\`\`c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Program name: %s\\n", argv[0]);
    printf("Number of arguments: %d\\n", argc);

    for (int i = 1; i < argc; i++) {
        printf("Argument %d: %s\\n", i, argv[i]);
    }

    return 0;
}
\`\`\`

**Execution:**
\`\`\`bash
$ ./program hello 42 world
Program name: ./program
Number of arguments: 4
Argument 1: hello
Argument 2: 42
Argument 3: world
\`\`\`

---

### Converting String Arguments

All command line arguments are **strings**. Convert to other types as needed:

\`\`\`c
#include <stdlib.h>  // For atoi, atof, atol, strtol, strtod

// Basic conversions (no error checking)
int num = atoi(argv[1]);      // String to int
long l = atol(argv[1]);       // String to long
double d = atof(argv[1]);     // String to double

// Better: with error checking
char *endptr;
long value = strtol(argv[1], &endptr, 10);
if (*endptr != '\\0') {
    printf("Invalid number: %s\\n", argv[1]);
}

double dval = strtod(argv[1], &endptr);
if (*endptr != '\\0') {
    printf("Invalid float: %s\\n", argv[1]);
}
\`\`\`

**Conversion functions:**
| Function | Return Type | Description |
|----------|-------------|-------------|
| \`atoi(str)\` | \`int\` | String to integer |
| \`atol(str)\` | \`long\` | String to long |
| \`atof(str)\` | \`double\` | String to double |
| \`strtol(str, endptr, base)\` | \`long\` | String to long (with error check) |
| \`strtod(str, endptr)\` | \`double\` | String to double (with error check) |

---

### Argument Validation

Always validate arguments before use:

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    // Check argument count
    if (argc != 3) {
        printf("Usage: %s <num1> <num2>\\n", argv[0]);
        printf("Example: %s 10 20\\n", argv[0]);
        return 1;  // Non-zero indicates error
    }

    // Convert and use arguments
    int a = atoi(argv[1]);
    int b = atoi(argv[2]);

    printf("%d + %d = %d\\n", a, b, a + b);
    return 0;
}
\`\`\`

**Usage message convention:**
\`\`\`c
printf("Usage: %s <source> <destination>\\n", argv[0]);
//       ↑         ↑           ↑
//   program   required    required
//     name    argument    argument
\`\`\`

---

### Accessing Individual Characters

\`\`\`c
// argv[i] is a string (char array)
// argv[i][j] is a single character

char firstChar = argv[1][0];  // First char of first argument
char secondChar = argv[1][1]; // Second char of first argument

// Process character by character
for (int i = 0; argv[1][i] != '\\0'; i++) {
    printf("%c\\n", argv[1][i]);
}
\`\`\`

**Example: Get operator from argument**
\`\`\`c
char op = argv[2][0];  // First character of second argument
switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case 'x': result = a * b; break;  // Use 'x' for multiply
    case '/': result = a / b; break;
}
\`\`\`

---

### Optional Arguments Pattern

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    int verbose = 0;
    char *filename = NULL;

    // Parse arguments
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-v") == 0 || strcmp(argv[i], "--verbose") == 0) {
            verbose = 1;
        } else if (strcmp(argv[i], "-f") == 0 && i + 1 < argc) {
            filename = argv[++i];
        } else {
            printf("Unknown option: %s\\n", argv[i]);
            return 1;
        }
    }

    if (verbose) printf("Verbose mode enabled\\n");
    if (filename) printf("File: %s\\n", filename);

    return 0;
}

// Usage: ./program -v -f data.txt
\`\`\`

---

### Common Patterns

**1. Process all arguments:**
\`\`\`c
for (int i = 1; i < argc; i++) {
    processArgument(argv[i]);
}
\`\`\`

**2. Using NULL terminator:**
\`\`\`c
// argv[argc] is guaranteed to be NULL
for (char **arg = argv + 1; *arg != NULL; arg++) {
    printf("%s\\n", *arg);
}
\`\`\`

**3. Sum of numbers:**
\`\`\`c
int sum = 0;
for (int i = 1; i < argc; i++) {
    sum += atoi(argv[i]);
}
\`\`\`

**4. File processing:**
\`\`\`c
if (argc < 2) {
    printf("Usage: %s <filename>\\n", argv[0]);
    return 1;
}

FILE *fp = fopen(argv[1], "r");
if (fp == NULL) {
    perror(argv[1]);  // Prints error with filename
    return 1;
}
\`\`\`

---

### Return Values

| Return Value | Meaning |
|--------------|---------|
| \`return 0;\` | Success |
| \`return 1;\` | General error |
| \`return 2;\` | Incorrect usage |
| \`EXIT_SUCCESS\` | Success (from stdlib.h) |
| \`EXIT_FAILURE\` | Failure (from stdlib.h) |

\`\`\`c
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <file>\\n", argv[0]);
        return EXIT_FAILURE;
    }

    // ... process ...

    return EXIT_SUCCESS;
}
\`\`\`

---

### Special Characters in Arguments

Shell handles special characters:

\`\`\`bash
# Spaces - use quotes
./program "hello world"        # argv[1] = "hello world"
./program hello world          # argv[1] = "hello", argv[2] = "world"

# Special characters - use quotes or escape
./program "file*.txt"          # Literal asterisk
./program file\\*.txt           # Same

# Multiplication - use 'x' instead of '*'
./calc 5 x 3                   # * would be expanded by shell
\`\`\`

---

### Environment Variables (Optional)

Extended main signature:

\`\`\`c
int main(int argc, char *argv[], char *envp[]) {
    // envp is array of environment variables
    for (int i = 0; envp[i] != NULL; i++) {
        printf("%s\\n", envp[i]);
    }
    return 0;
}

// Or use getenv() from <stdlib.h>
char *path = getenv("PATH");
if (path != NULL) {
    printf("PATH: %s\\n", path);
}
\`\`\`

---

### Common Mistakes

**1. Not checking argc before accessing argv:**
\`\`\`c
// WRONG - may crash if no arguments
int x = atoi(argv[1]);

// CORRECT
if (argc < 2) {
    printf("Missing argument\\n");
    return 1;
}
int x = atoi(argv[1]);
\`\`\`

**2. Forgetting arguments are strings:**
\`\`\`c
// WRONG
if (argv[1] == 10) { }  // Comparing pointer with int!

// CORRECT
if (atoi(argv[1]) == 10) { }
\`\`\`

**3. String comparison with ==:**
\`\`\`c
// WRONG - compares pointers, not strings
if (argv[1] == "help") { }

// CORRECT
if (strcmp(argv[1], "help") == 0) { }
\`\`\`

**4. Off-by-one with argc:**
\`\`\`c
// WRONG - argv[argc] is NULL, not the last argument
for (int i = 0; i <= argc; i++) {
    printf("%s\\n", argv[i]);  // Crashes on last iteration
}

// CORRECT
for (int i = 0; i < argc; i++) {
    printf("%s\\n", argv[i]);
}
\`\`\`

**5. No error checking on conversion:**
\`\`\`c
// WRONG - atoi returns 0 for invalid input (indistinguishable from "0")
int x = atoi(argv[1]);

// BETTER - use strtol for error checking
char *endptr;
long x = strtol(argv[1], &endptr, 10);
if (*endptr != '\\0') {
    printf("'%s' is not a valid number\\n", argv[1]);
    return 1;
}
\`\`\`

---

### Key Memory Triggers

- \`argc\` is always at least **1** (program name counts)
- All arguments are **strings** (use atoi/atof to convert)
- \`argv[0]\` is the **program name**
- \`argv[argc]\` is **NULL** (guaranteed)
- Always **validate argc** before accessing argv[n]
- Use **strcmp()** to compare strings, not ==
- \`atoi()\` returns **0** for invalid input (no error indication)
- Use **strtol/strtod** for error-checked conversion
- Non-zero return from main indicates **error**
- Quotes in shell handle **spaces** in arguments

---

### Viva Questions

**Q1: What is argc?**
A: Argument count - the number of command line arguments passed to the program, including the program name. It's always at least 1.

**Q2: What is argv?**
A: Argument vector - an array of strings (char pointers) containing the command line arguments. argv[0] is the program name.

**Q3: What is argv[argc]?**
A: It's guaranteed to be NULL. This provides an alternative way to detect the end of arguments.

**Q4: Are command line arguments strings or numbers?**
A: Always strings. You must use atoi(), atof(), or similar functions to convert them to numeric types.

**Q5: What happens if you access argv[5] when argc is 3?**
A: Undefined behavior. You're accessing memory beyond the valid arguments, which could crash or return garbage.

**Q6: How do you check if a specific argument was provided?**
A: Check if argc is greater than the index you want to access, then compare using strcmp() for specific values.

**Q7: What does atoi return for invalid input?**
A: Returns 0, which is problematic because you can't distinguish between "0" and invalid input. Use strtol() for error checking.

**Q8: How do you handle spaces in a command line argument?**
A: Enclose the argument in quotes: \`./program "hello world"\`

**Q9: What is the conventional return value for successful execution?**
A: 0 or EXIT_SUCCESS. Non-zero values indicate errors.

**Q10: Why use argv[0] in usage messages?**
A: It shows the actual program name as invoked, which may differ from the executable name (symlinks, path variations).

---

### Practical Examples - Module 16

**Q1: Write a program to display all command line arguments**
\`\`\`c
#include <stdio.h>
int main(int argc, char *argv[]) {
    printf("Total arguments: %d\\n", argc);
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\\n", i, argv[i]);
    }
    return 0;
}
// Run: ./program hello world 123
\`\`\`

**Q2: Write a program to add two numbers from command line**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s num1 num2\\n", argv[0]);
        return 1;
    }
    int a = atoi(argv[1]);
    int b = atoi(argv[2]);
    printf("%d + %d = %d\\n", a, b, a + b);
    return 0;
}
// Run: ./add 10 20
\`\`\`

**Q3: Write a calculator using command line arguments**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    if (argc != 4) {
        printf("Usage: %s num1 operator num2\\n", argv[0]);
        return 1;
    }

    int a = atoi(argv[1]);
    char op = argv[2][0];
    int b = atoi(argv[3]);
    int result;

    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case 'x': result = a * b; break;  // 'x' for multiply
        case '/': result = a / b; break;
        default: printf("Invalid operator\\n"); return 1;
    }

    printf("%d %c %d = %d\\n", a, op, b, result);
    return 0;
}
// Run: ./calc 10 + 5
\`\`\`

**Q4: Write a program to find factorial from command line**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s number\\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);
    printf("%d! = %ld\\n", n, factorial(n));
    return 0;
}
// Run: ./factorial 5
\`\`\`

**Q5: Write a program to reverse a string from command line**
\`\`\`c
#include <stdio.h>
#include <string.h>
int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s string\\n", argv[0]);
        return 1;
    }

    char *str = argv[1];
    int len = strlen(str);

    printf("Original: %s\\n", str);
    printf("Reversed: ");
    for (int i = len - 1; i >= 0; i--) {
        putchar(str[i]);
    }
    printf("\\n");
    return 0;
}
// Run: ./reverse hello
\`\`\`

**Q6: Write a program to check if number is prime from command line**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s number\\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);
    printf("%d is %s\\n", n, isPrime(n) ? "Prime" : "Not Prime");
    return 0;
}
// Run: ./prime 17
\`\`\`

**Q7: Write a program to copy file using command line arguments**
\`\`\`c
#include <stdio.h>
int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s source destination\\n", argv[0]);
        return 1;
    }

    FILE *src = fopen(argv[1], "r");
    FILE *dest = fopen(argv[2], "w");

    if (src == NULL || dest == NULL) {
        printf("Error opening files\\n");
        return 1;
    }

    int ch;
    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dest);
    }

    fclose(src);
    fclose(dest);
    printf("File copied: %s -> %s\\n", argv[1], argv[2]);
    return 0;
}
// Run: ./copy source.txt dest.txt
\`\`\`

**Q8: Write a program to find sum of multiple numbers from command line**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s num1 num2 ...\\n", argv[0]);
        return 1;
    }

    int sum = 0;
    for (int i = 1; i < argc; i++) {
        sum += atoi(argv[i]);
    }

    printf("Sum of %d numbers = %d\\n", argc - 1, sum);
    return 0;
}
// Run: ./sum 10 20 30 40 50
\`\`\`

**Q9: Write a program to search a word in file from command line**
\`\`\`c
#include <stdio.h>
#include <string.h>
int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s filename word\\n", argv[0]);
        return 1;
    }

    FILE *fp = fopen(argv[1], "r");
    if (fp == NULL) {
        printf("Cannot open file\\n");
        return 1;
    }

    char line[256];
    int lineNum = 0, found = 0;

    while (fgets(line, sizeof(line), fp)) {
        lineNum++;
        if (strstr(line, argv[2]) != NULL) {
            printf("Line %d: %s", lineNum, line);
            found = 1;
        }
    }

    if (!found) printf("'%s' not found\\n", argv[2]);
    fclose(fp);
    return 0;
}
// Run: ./search file.txt hello
\`\`\`

**Q10: Write a program to demonstrate argument validation**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

int isNumber(char *str) {
    for (int i = 0; str[i] != '\\0'; i++) {
        if (!isdigit(str[i]) && str[i] != '-') return 0;
    }
    return 1;
}

int main(int argc, char *argv[]) {
    printf("Program: %s\\n", argv[0]);
    printf("Arguments: %d\\n\\n", argc - 1);

    for (int i = 1; i < argc; i++) {
        printf("Arg %d: '%s' - ", i, argv[i]);
        if (isNumber(argv[i])) {
            printf("Number: %d\\n", atoi(argv[i]));
        } else {
            printf("String of length %lu\\n", strlen(argv[i]));
        }
    }
    return 0;
}
// Run: ./validate hello 42 world 100
\`\`\`
`
