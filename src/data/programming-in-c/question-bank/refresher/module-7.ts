export const module7 = `
## Module 7: Strings

### What is a String in C?

A **string** in C is a sequence of characters stored in a **character array** and terminated by a **null character** (\`\\0\`). Unlike languages like Java or Python, C has no built-in string type - strings are simply character arrays.

**Key Point:** The null terminator (\`\\0\`) marks the end of the string. Without it, string functions don't know where the string ends!

\`\`\`
char str[] = "Hello";

Memory:  | 'H' | 'e' | 'l' | 'l' | 'o' | '\\0' |
Index:     [0]   [1]   [2]   [3]   [4]   [5]

Size: 6 bytes (5 chars + null terminator)
Length: 5 (what strlen() returns)
\`\`\`

---

### String Declaration & Initialization

**Method 1: String literal (most common)**
\`\`\`c
char str[20] = "Hello";   // Array of 20 chars, holds "Hello\\0"
char str[] = "Hello";     // Size = 6 (auto-calculated)
\`\`\`

**Method 2: Character by character**
\`\`\`c
char str[] = {'H', 'e', 'l', 'l', 'o', '\\0'};  // Must add \\0!
char bad[] = {'H', 'e', 'l', 'l', 'o'};       // NOT a valid string!
\`\`\`

**Method 3: Pointer to string literal**
\`\`\`c
char *str = "Hello";   // Points to read-only memory!
str[0] = 'J';          // UNDEFINED BEHAVIOR! May crash
\`\`\`

**Array vs Pointer Declaration:**
| Feature | \`char str[] = "Hello"\` | \`char *str = "Hello"\` |
|---------|------------------------|------------------------|
| Storage | Stack (modifiable) | Points to read-only memory |
| Modification | Allowed | Not allowed |
| Size | sizeof gives array size | sizeof gives pointer size |
| Reassignment | Cannot reassign str | Can point to different string |

---

### String Input/Output

**Output:**
\`\`\`c
char str[] = "Hello";
printf("%s\\n", str);      // Print string
puts(str);                // Print string + newline
\`\`\`

**Input:**
\`\`\`c
char name[50];

// Method 1: scanf - stops at whitespace
scanf("%s", name);        // "John Doe" reads only "John"

// Method 2: fgets - reads entire line (SAFE)
fgets(name, sizeof(name), stdin);  // Includes newline!

// Remove newline from fgets:
name[strcspn(name, "\\n")] = '\\0';

// NEVER use gets() - buffer overflow vulnerability!
\`\`\`

**Reading with width specifier:**
\`\`\`c
char str[10];
scanf("%9s", str);    // Read max 9 chars (leave space for \\0)
\`\`\`

---

### String Library Functions (\`<string.h>\`)

#### Length, Copy, Concatenate

| Function | Purpose | Returns |
|----------|---------|---------|
| \`strlen(s)\` | Length (excluding \\0) | size_t |
| \`strcpy(dest, src)\` | Copy src to dest | dest pointer |
| \`strncpy(dest, src, n)\` | Copy at most n chars | dest pointer |
| \`strcat(dest, src)\` | Append src to dest | dest pointer |
| \`strncat(dest, src, n)\` | Append at most n chars | dest pointer |

\`\`\`c
char src[] = "Hello";
char dest[50];

size_t len = strlen(src);    // len = 5

strcpy(dest, src);           // dest = "Hello"
strcat(dest, " World");      // dest = "Hello World"

// Safe versions with size limit
strncpy(dest, src, sizeof(dest) - 1);
dest[sizeof(dest) - 1] = '\\0';  // Ensure null termination
\`\`\`

#### Comparison Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| \`strcmp(s1, s2)\` | Compare strings | <0, 0, or >0 |
| \`strncmp(s1, s2, n)\` | Compare first n chars | <0, 0, or >0 |
| \`strcasecmp(s1, s2)\` | Compare ignoring case | <0, 0, or >0 |

**strcmp() Return Values:**
- **0**: Strings are equal
- **Negative**: s1 < s2 (lexicographically)
- **Positive**: s1 > s2 (lexicographically)

\`\`\`c
strcmp("abc", "abc");   // Returns 0 (equal)
strcmp("abc", "abd");   // Returns negative ('c' < 'd')
strcmp("abd", "abc");   // Returns positive ('d' > 'c')
strcmp("abc", "abcd");  // Returns negative (shorter)
\`\`\`

#### Search Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| \`strchr(s, c)\` | Find first occurrence of char | Pointer or NULL |
| \`strrchr(s, c)\` | Find last occurrence of char | Pointer or NULL |
| \`strstr(s1, s2)\` | Find first occurrence of substring | Pointer or NULL |

\`\`\`c
char str[] = "Hello World";

char *p1 = strchr(str, 'o');   // Points to first 'o'
char *p2 = strrchr(str, 'o');  // Points to last 'o'
char *p3 = strstr(str, "Wor"); // Points to "World"

if (p3 != NULL) {
    printf("Found at index: %ld\\n", p3 - str);  // 6
}
\`\`\`

#### Other Useful Functions

| Function | Purpose |
|----------|---------|
| \`strcspn(s, reject)\` | Index of first char in reject |
| \`strspn(s, accept)\` | Index of first char NOT in accept |
| \`strtok(s, delim)\` | Tokenize string |
| \`strdup(s)\` | Duplicate string (malloc) |

---

### Character Functions (\`<ctype.h>\`)

| Function | True if... |
|----------|------------|
| \`isalpha(c)\` | Letter (a-z, A-Z) |
| \`isdigit(c)\` | Digit (0-9) |
| \`isalnum(c)\` | Letter or digit |
| \`isspace(c)\` | Whitespace |
| \`isupper(c)\` | Uppercase letter |
| \`islower(c)\` | Lowercase letter |
| \`toupper(c)\` | Converts to uppercase |
| \`tolower(c)\` | Converts to lowercase |

\`\`\`c
#include <ctype.h>

char ch = 'A';
if (isupper(ch)) {
    ch = tolower(ch);  // ch = 'a'
}
\`\`\`

---

### String to Number Conversion (\`<stdlib.h>\`)

| Function | Converts to |
|----------|-------------|
| \`atoi(s)\` | int |
| \`atol(s)\` | long |
| \`atof(s)\` | double |
| \`strtol(s, endptr, base)\` | long (with error checking) |
| \`strtod(s, endptr)\` | double (with error checking) |

\`\`\`c
char num_str[] = "12345";

int n = atoi(num_str);     // n = 12345
double d = atof("3.14");   // d = 3.14

// Better: with error checking
char *endptr;
long val = strtol("123abc", &endptr, 10);
// val = 123, endptr points to "abc"
\`\`\`

---

### Common String Operations (Manual Implementation)

**Finding length:**
\`\`\`c
int myStrlen(const char *s) {
    int len = 0;
    while (s[len] != '\\0') len++;
    return len;
}
\`\`\`

**Copying:**
\`\`\`c
void myStrcpy(char *dest, const char *src) {
    int i = 0;
    while ((dest[i] = src[i]) != '\\0') i++;
}
\`\`\`

**Comparing:**
\`\`\`c
int myStrcmp(const char *s1, const char *s2) {
    while (*s1 && *s1 == *s2) {
        s1++;
        s2++;
    }
    return *s1 - *s2;
}
\`\`\`

---

### Array of Strings

\`\`\`c
// Method 1: 2D character array
char names[3][20] = {"Alice", "Bob", "Charlie"};
// Each string can be up to 19 chars + null

// Method 2: Array of pointers (saves memory)
char *names[] = {"Alice", "Bob", "Charlie"};
// Pointers to string literals (read-only!)

// Accessing
printf("%s\\n", names[0]);   // "Alice"
printf("%c\\n", names[1][0]); // 'B'
\`\`\`

---

### Common Mistakes

**1. Forgetting null terminator:**
\`\`\`c
char str[5] = {'H', 'e', 'l', 'l', 'o'};  // No \\0!
printf("%s", str);  // Undefined behavior - reads past array
\`\`\`

**2. Buffer overflow:**
\`\`\`c
char dest[5];
strcpy(dest, "Hello World");  // 11 chars into 5-byte buffer!
// Use strncpy or ensure dest is large enough
\`\`\`

**3. Assigning strings with =:**
\`\`\`c
char str[20];
str = "Hello";  // ERROR! Cannot assign to array
strcpy(str, "Hello");  // CORRECT
\`\`\`

**4. Comparing strings with ==:**
\`\`\`c
if (str1 == str2)  // WRONG! Compares addresses
if (strcmp(str1, str2) == 0)  // CORRECT
\`\`\`

**5. Modifying string literals:**
\`\`\`c
char *str = "Hello";
str[0] = 'J';  // UNDEFINED BEHAVIOR!
// Use: char str[] = "Hello"; instead
\`\`\`

**6. Not accounting for null terminator:**
\`\`\`c
char name[5];
scanf("%s", name);  // "Hello" needs 6 bytes!
// Always allocate size + 1
\`\`\`

---

### Key Memory Triggers

- String = char array + **null terminator** (\`\\0\`)
- "Hello" occupies **6 bytes** (5 chars + \\0)
- strlen() returns length **without** \\0
- Cannot use **= or ==** for strings (use strcpy, strcmp)
- \`char *str = "literal"\` is **read-only**
- \`char str[] = "literal"\` is **modifiable**
- Always allocate **length + 1** for null terminator
- Use **fgets**, not gets (security)

---

### Viva Questions

**Q1: What is the null terminator and why is it important?**
A: \\0 (ASCII 0) marks end of string. Without it, string functions read past the array boundary (undefined behavior).

**Q2: Difference between char str[] and char *str?**
A: \`char str[]\` is a modifiable array on stack. \`char *str\` points to read-only string literal.

**Q3: What does strcmp() return?**
A: 0 if equal, negative if first < second, positive if first > second (lexicographic comparison).

**Q4: Why shouldn't we use gets()?**
A: No buffer size limit - can overflow buffer. Use fgets() which takes size parameter.

**Q5: How much memory does "Hello" need?**
A: 6 bytes - 5 for characters + 1 for null terminator.

**Q6: Can we modify a string literal?**
A: No. \`char *s = "Hello"; s[0] = 'X';\` is undefined behavior.

**Q7: How to concatenate strings safely?**
A: Use strncat() with size limit, or ensure destination has enough space before using strcat().

**Q8: Difference between strlen() and sizeof()?**
A: strlen() returns character count (excluding \\0). sizeof() returns total memory (including \\0 for arrays, pointer size for pointers).

---

### Practical Examples - Module 7

**Q1: Write a program to find the length of a string without using strlen**
\`\`\`c
#include <stdio.h>
int main() {
    char str[] = "Hello World";
    int len = 0;

    while (str[len] != '\\0') {
        len++;
    }

    printf("Length of \\"%s\\" is %d\\n", str, len);
    return 0;
}
\`\`\`

**Q2: Write a program to copy one string to another without strcpy**
\`\`\`c
#include <stdio.h>
int main() {
    char src[] = "Hello";
    char dest[20];
    int i = 0;

    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';

    printf("Copied string: %s\\n", dest);
    return 0;
}
\`\`\`

**Q3: Write a program to concatenate two strings without strcat**
\`\`\`c
#include <stdio.h>
int main() {
    char s1[50] = "Hello ";
    char s2[] = "World";
    int i = 0, j = 0;

    while (s1[i] != '\\0') i++;
    while (s2[j] != '\\0') {
        s1[i++] = s2[j++];
    }
    s1[i] = '\\0';

    printf("Concatenated: %s\\n", s1);
    return 0;
}
\`\`\`

**Q4: Write a program to compare two strings without strcmp**
\`\`\`c
#include <stdio.h>
int main() {
    char s1[] = "Hello";
    char s2[] = "Hello";
    int i = 0;

    while (s1[i] == s2[i] && s1[i] != '\\0') {
        i++;
    }

    if (s1[i] == s2[i])
        printf("Strings are equal\\n");
    else
        printf("Strings are not equal\\n");
    return 0;
}
\`\`\`

**Q5: Write a program to reverse a string**
\`\`\`c
#include <stdio.h>
#include <string.h>
int main() {
    char str[] = "Hello";
    int len = strlen(str);

    printf("Original: %s\\n", str);

    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }

    printf("Reversed: %s\\n", str);
    return 0;
}
\`\`\`

**Q6: Write a program to check if a string is palindrome**
\`\`\`c
#include <stdio.h>
#include <string.h>
int main() {
    char str[] = "madam";
    int len = strlen(str);
    int isPalindrome = 1;

    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            isPalindrome = 0;
            break;
        }
    }

    printf("\\"%s\\" is %sa palindrome\\n", str, isPalindrome ? "" : "not ");
    return 0;
}
\`\`\`

**Q7: Write a program to count vowels and consonants in a string**
\`\`\`c
#include <stdio.h>
#include <ctype.h>
int main() {
    char str[] = "Hello World";
    int vowels = 0, consonants = 0;

    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = tolower(str[i]);
        if (ch >= 'a' && ch <= 'z') {
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
                vowels++;
            else
                consonants++;
        }
    }

    printf("Vowels: %d, Consonants: %d\\n", vowels, consonants);
    return 0;
}
\`\`\`

**Q8: Write a program to convert a string to uppercase**
\`\`\`c
#include <stdio.h>
int main() {
    char str[] = "hello world";

    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            str[i] = str[i] - 32;  // or str[i] - ('a' - 'A')
        }
    }

    printf("Uppercase: %s\\n", str);
    return 0;
}
\`\`\`

**Q9: Write a program to find a substring in a string**
\`\`\`c
#include <stdio.h>
#include <string.h>
int main() {
    char str[] = "Hello World";
    char sub[] = "World";
    char *pos = strstr(str, sub);

    if (pos != NULL) {
        printf("'%s' found at position %ld\\n", sub, pos - str);
    } else {
        printf("'%s' not found\\n", sub);
    }
    return 0;
}
\`\`\`

**Q10: Write a program to count words in a string**
\`\`\`c
#include <stdio.h>
int main() {
    char str[] = "Hello World from C";
    int words = 0, inWord = 0;

    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] != ' ' && !inWord) {
            words++;
            inWord = 1;
        } else if (str[i] == ' ') {
            inWord = 0;
        }
    }

    printf("Word count: %d\\n", words);
    return 0;
}
\`\`\`
`
