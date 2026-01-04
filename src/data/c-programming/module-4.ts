export const module4 = `
## Module 4: Input/Output Functions

### What is I/O in C?

Input/Output (I/O) in C is handled through the **Standard I/O Library** (\`<stdio.h>\`). C doesn't have built-in I/O keywords - instead, it uses **library functions**. This makes C flexible but requires understanding how these functions work.

**Three Standard Streams:**
| Stream | Name | Default Device | File Pointer |
|--------|------|----------------|--------------|
| Standard Input | \`stdin\` | Keyboard | 0 |
| Standard Output | \`stdout\` | Monitor | 1 |
| Standard Error | \`stderr\` | Monitor | 2 |

---

### The printf() Function

\`printf()\` (print formatted) sends formatted output to \`stdout\`.

**Syntax:**
\`\`\`c
int printf(const char *format, ...);
\`\`\`

**Return Value:** Number of characters printed, or negative value on error.

\`\`\`c
int count = printf("Hello");  // count = 5
printf(" printed %d chars\\n", count);
\`\`\`

**How printf Works:**
1. Scans format string left to right
2. Prints regular characters as-is
3. When it finds \`%\`, reads the format specifier
4. Fetches next argument and formats according to specifier
5. Continues until end of format string

---

### Format Specifiers - Complete Reference

| Specifier | Type | Example | Output |
|-----------|------|---------|--------|
| \`%d\` or \`%i\` | Signed int | \`printf("%d", -42)\` | \`-42\` |
| \`%u\` | Unsigned int | \`printf("%u", 42)\` | \`42\` |
| \`%f\` | float/double | \`printf("%f", 3.14)\` | \`3.140000\` |
| \`%lf\` | double (scanf) | \`scanf("%lf", &d)\` | - |
| \`%e\` or \`%E\` | Scientific notation | \`printf("%e", 3.14)\` | \`3.140000e+00\` |
| \`%g\` or \`%G\` | Shorter of %f or %e | \`printf("%g", 0.00001)\` | \`1e-05\` |
| \`%c\` | Character | \`printf("%c", 'A')\` | \`A\` |
| \`%s\` | String | \`printf("%s", "Hi")\` | \`Hi\` |
| \`%x\` or \`%X\` | Hexadecimal | \`printf("%x", 255)\` | \`ff\` |
| \`%o\` | Octal | \`printf("%o", 8)\` | \`10\` |
| \`%p\` | Pointer address | \`printf("%p", ptr)\` | \`0x7fff...\` |
| \`%%\` | Literal % | \`printf("%%")\` | \`%\` |

**Length Modifiers:**
| Modifier | Meaning | Example |
|----------|---------|---------|
| \`h\` | short | \`%hd\` (short int) |
| \`l\` | long | \`%ld\` (long int), \`%lf\` (double in scanf) |
| \`ll\` | long long | \`%lld\` (long long int) |
| \`L\` | long double | \`%Lf\` (long double) |

---

### Escape Sequences

Escape sequences represent special characters:

| Sequence | Meaning | ASCII Value |
|----------|---------|-------------|
| \`\\\\n\` | Newline | 10 |
| \`\\\\t\` | Horizontal tab | 9 |
| \`\\\\r\` | Carriage return | 13 |
| \`\\\\b\` | Backspace | 8 |
| \`\\\\a\` | Alert (beep) | 7 |
| \`\\\\\\\\\` | Backslash | 92 |
| \`\\\\'\` | Single quote | 39 |
| \`\\\\"\` | Double quote | 34 |
| \`\\\\0\` | Null character | 0 |
| \`\\\\?\` | Question mark | 63 |

\`\`\`c
printf("Line1\\nLine2");     // Two lines
printf("Col1\\tCol2");       // Tab separated
printf("Path: C:\\\\\\\\folder"); // Prints: Path: C:\\\\folder
printf("\\"Hello\\"");       // Prints: "Hello"
\`\`\`

---

### Width and Precision Formatting

**Format:** \`%[flags][width][.precision][length]specifier\`

**Flags:**
| Flag | Effect | Example | Output |
|------|--------|---------|--------|
| \`-\` | Left-align | \`%-5d\` on 42 | \`"42   "\` |
| \`+\` | Show + for positive | \`%+d\` on 42 | \`"+42"\` |
| \`(space)\` | Space if no sign | \`% d\` on 42 | \`" 42"\` |
| \`0\` | Zero-pad | \`%05d\` on 42 | \`"00042"\` |
| \`#\` | Alternate form | \`%#x\` on 255 | \`"0xff"\` |

**Width:** Minimum field width
\`\`\`c
printf("[%5d]", 42);      // [   42] - right-aligned, width 5
printf("[%-5d]", 42);     // [42   ] - left-aligned, width 5
printf("[%05d]", 42);     // [00042] - zero-padded
\`\`\`

**Precision:**
- For integers: minimum digits to print
- For floats: decimal places (default 6)
- For strings: maximum characters to print

\`\`\`c
printf("%.2f", 3.14159);    // 3.14 (2 decimal places)
printf("%.5d", 42);         // 00042 (min 5 digits)
printf("%.3s", "Hello");    // Hel (max 3 chars)
printf("%10.2f", 3.14);     //       3.14 (width 10, 2 decimals)
\`\`\`

---

### The scanf() Function

\`scanf()\` (scan formatted) reads formatted input from \`stdin\`.

**Syntax:**
\`\`\`c
int scanf(const char *format, ...);
\`\`\`

**Return Value:** Number of items successfully read, or EOF on error.

\`\`\`c
int items = scanf("%d %d", &a, &b);
if (items == 2) {
    printf("Both values read successfully\\n");
} else {
    printf("Input error!\\n");
}
\`\`\`

**Critical Rules:**
1. **Use \`&\` operator** for variables (except arrays/strings)
2. **Whitespace in format** matches any whitespace in input
3. **Returns count** of successfully matched items

\`\`\`c
int age;
scanf("%d", &age);     // & is REQUIRED
scanf("%d", age);      // WRONG! Undefined behavior

char name[50];
scanf("%s", name);     // No & needed - array name IS an address
\`\`\`

---

### The Buffer Problem

One of the most common issues with scanf:

\`\`\`c
int num;
char ch;

printf("Enter number: ");
scanf("%d", &num);      // User types: 42[Enter]
                        // Buffer now has: '\\n'

printf("Enter char: ");
ch = getchar();         // Reads the leftover '\\n'!
                        // User never gets to input!
\`\`\`

**Solutions:**

**1. Use getchar() to consume newline:**
\`\`\`c
scanf("%d", &num);
getchar();              // Consume the '\\n'
ch = getchar();         // Now reads user input
\`\`\`

**2. Use space in format string:**
\`\`\`c
scanf("%d", &num);
scanf(" %c", &ch);      // Space before %c skips whitespace
\`\`\`

**3. Flush input buffer:**
\`\`\`c
scanf("%d", &num);
while (getchar() != '\\n');  // Clear entire buffer
ch = getchar();
\`\`\`

---

### Character I/O Functions

| Function | Description | Example |
|----------|-------------|---------|
| \`getchar()\` | Read one char from stdin | \`ch = getchar();\` |
| \`putchar()\` | Write one char to stdout | \`putchar('A');\` |
| \`getc(fp)\` | Read char from file | \`ch = getc(stdin);\` |
| \`putc(ch, fp)\` | Write char to file | \`putc('A', stdout);\` |
| \`getch()\` | Read without echo (conio.h) | Non-standard |
| \`getche()\` | Read with echo (conio.h) | Non-standard |

\`\`\`c
char ch;
printf("Press a key: ");
ch = getchar();           // Waits for Enter
printf("You pressed: ");
putchar(ch);
putchar('\\n');
\`\`\`

---

### String I/O Functions

| Function | Description | Safe? |
|----------|-------------|-------|
| \`gets()\` | Read line | **NO! NEVER USE** |
| \`fgets()\` | Read line safely | Yes |
| \`puts()\` | Write line + newline | Yes |
| \`fputs()\` | Write line (no newline) | Yes |

**Why gets() is dangerous:**
\`\`\`c
char buffer[10];
gets(buffer);    // If user types 20 chars = BUFFER OVERFLOW!
                 // Can crash program or allow code injection
\`\`\`

**Safe alternative - fgets():**
\`\`\`c
char buffer[10];
fgets(buffer, sizeof(buffer), stdin);
// Reads at most 9 chars + null terminator
// SAFE: cannot overflow buffer
\`\`\`

**Note:** fgets() includes the newline character if present:
\`\`\`c
char name[50];
fgets(name, sizeof(name), stdin);  // "John\\n\\0"

// Remove newline if needed:
name[strcspn(name, "\\n")] = '\\0';  // "John\\0"
\`\`\`

---

### Common Mistakes

**1. Forgetting & in scanf:**
\`\`\`c
int x;
scanf("%d", x);    // WRONG - undefined behavior!
scanf("%d", &x);   // CORRECT
\`\`\`

**2. Using %f for double in scanf:**
\`\`\`c
double d;
scanf("%f", &d);   // WRONG - %f is for float
scanf("%lf", &d);  // CORRECT - %lf for double
\`\`\`

**3. Using %lf in printf:**
\`\`\`c
double d = 3.14;
printf("%lf", d);  // Works but unnecessary
printf("%f", d);   // CORRECT - %f works for both float and double
\`\`\`

**4. Mismatched format specifiers:**
\`\`\`c
int x = 65;
printf("%c", x);   // Prints 'A' (might be intentional)
printf("%s", x);   // CRASH! Tries to read string from address 65
\`\`\`

**5. Not checking scanf return value:**
\`\`\`c
int age;
scanf("%d", &age);
// If user types "abc", scanf returns 0, age unchanged!

// Better:
if (scanf("%d", &age) != 1) {
    printf("Invalid input!\\n");
}
\`\`\`

---

### Key Memory Triggers

- \`printf()\` returns **count of characters** printed
- \`scanf()\` returns **count of items** successfully read
- \`scanf()\` needs **&** for variables (not for arrays)
- **%f** for float, **%lf** for double (in scanf only)
- **Newline stays** in buffer after scanf - consume it!
- **Never use gets()** - always use fgets()
- fgets() **includes newline** in the string

---

### Viva Questions

**Q1: What is the difference between printf() and sprintf()?**
A: printf() outputs to screen (stdout), sprintf() outputs to a string buffer.

**Q2: What does scanf() return?**
A: Number of items successfully read and assigned, or EOF on input failure.

**Q3: Why do we use & in scanf() but not for arrays?**
A: scanf() needs addresses. For variables, & gives address. Array name already IS the address of first element.

**Q4: What happens if scanf() format doesn't match input?**
A: scanf() stops reading, returns count of items read so far, leaves unmatched input in buffer.

**Q5: Why is gets() dangerous?**
A: No buffer size limit - can overflow, causing crashes or security vulnerabilities.

**Q6: Difference between %d and %i in scanf?**
A: %d reads only decimal. %i auto-detects base (0x for hex, 0 for octal, else decimal).

**Q7: What does %g format specifier do?**
A: Prints in %f or %e format, whichever is shorter, removing trailing zeros.

**Q8: How to print a literal % character?**
A: Use %% in the format string.

---

### Practical Examples - Module 4

**Q1: Write a program to read and display an integer**
\`\`\`c
#include <stdio.h>
int main() {
    int num;
    printf("Enter an integer: ");
    scanf("%d", &num);
    printf("You entered: %d\\n", num);
    return 0;
}
\`\`\`

**Q2: Write a program to read and display name and age**
\`\`\`c
#include <stdio.h>
int main() {
    char name[50];
    int age;

    printf("Enter your name: ");
    scanf("%s", name);  // Note: no & for arrays
    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Name: %s, Age: %d\\n", name, age);
    return 0;
}
\`\`\`

**Q3: Write a program to demonstrate width and precision in printf**
\`\`\`c
#include <stdio.h>
int main() {
    int num = 42;
    float f = 3.14159;

    printf("[%5d]\\n", num);     // Right-aligned, width 5
    printf("[%-5d]\\n", num);    // Left-aligned, width 5
    printf("[%05d]\\n", num);    // Zero-padded, width 5
    printf("[%.2f]\\n", f);      // 2 decimal places
    printf("[%8.2f]\\n", f);     // Width 8, 2 decimals
    printf("[%-8.2f]\\n", f);    // Left-aligned
    return 0;
}
\`\`\`

**Q4: Write a program to read a character using getchar and putchar**
\`\`\`c
#include <stdio.h>
int main() {
    char ch;
    printf("Enter a character: ");
    ch = getchar();
    printf("You entered: ");
    putchar(ch);
    putchar('\\n');
    return 0;
}
\`\`\`

**Q5: Write a program to read a line of text using fgets**
\`\`\`c
#include <stdio.h>
int main() {
    char line[100];
    printf("Enter a sentence: ");
    fgets(line, sizeof(line), stdin);
    printf("You entered: %s", line);
    return 0;
}
\`\`\`

**Q6: Write a program to demonstrate different format specifiers**
\`\`\`c
#include <stdio.h>
int main() {
    int d = 255;
    char c = 'A';
    float f = 3.14;
    char s[] = "Hello";

    printf("Decimal: %d\\n", d);
    printf("Octal: %o\\n", d);
    printf("Hexadecimal: %x\\n", d);
    printf("Character: %c\\n", c);
    printf("Float: %f\\n", f);
    printf("Scientific: %e\\n", f);
    printf("String: %s\\n", s);
    return 0;
}
\`\`\`

**Q7: Write a program to read multiple values in one scanf**
\`\`\`c
#include <stdio.h>
int main() {
    int a, b, c;
    printf("Enter three integers (space separated): ");
    scanf("%d %d %d", &a, &b, &c);
    printf("Sum = %d\\n", a + b + c);
    return 0;
}
\`\`\`

**Q8: Write a program to handle the newline issue after scanf**
\`\`\`c
#include <stdio.h>
int main() {
    int num;
    char ch;

    printf("Enter a number: ");
    scanf("%d", &num);
    getchar();  // Consume the newline left by scanf

    printf("Enter a character: ");
    ch = getchar();

    printf("Number: %d, Character: %c\\n", num, ch);
    return 0;
}
\`\`\`

**Q9: Write a program to display a formatted table**
\`\`\`c
#include <stdio.h>
int main() {
    printf("%-10s %10s %10s\\n", "Name", "Subject", "Marks");
    printf("%-10s %10s %10d\\n", "John", "Math", 85);
    printf("%-10s %10s %10d\\n", "Alice", "Science", 92);
    printf("%-10s %10s %10d\\n", "Bob", "English", 78);
    return 0;
}
\`\`\`

**Q10: Write a program to calculate simple interest with formatted output**
\`\`\`c
#include <stdio.h>
int main() {
    float principal, rate, time, si;

    printf("Enter Principal: ");
    scanf("%f", &principal);
    printf("Enter Rate of Interest: ");
    scanf("%f", &rate);
    printf("Enter Time (years): ");
    scanf("%f", &time);

    si = (principal * rate * time) / 100;

    printf("\\n--- Result ---\\n");
    printf("Principal:  Rs. %10.2f\\n", principal);
    printf("Rate:       %10.2f%%\\n", rate);
    printf("Time:       %10.2f years\\n", time);
    printf("Simple Interest: Rs. %10.2f\\n", si);
    return 0;
}
\`\`\`
`
