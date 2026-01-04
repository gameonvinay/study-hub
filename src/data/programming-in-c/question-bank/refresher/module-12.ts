export const module12 = `
## Module 12: File Handling

### What is File Handling?

**File handling** allows programs to store data permanently on disk, beyond program execution. Unlike variables (stored in RAM, lost when program ends), files persist on storage devices.

**Why use files?**
- Store data permanently
- Share data between programs
- Handle large amounts of data
- Log information for later analysis

**Types of files:**
| Type | Description | Use Case |
|------|-------------|----------|
| Text files | Human-readable characters | .txt, .csv, source code |
| Binary files | Raw bytes (not human-readable) | .dat, images, executables |

---

### FILE Pointer

C uses a \`FILE\` structure (defined in stdio.h) to manage file operations:

\`\`\`c
FILE *fp;  // File pointer declaration

fp = fopen("data.txt", "r");  // Open file

// Always check for errors!
if (fp == NULL) {
    printf("Error opening file!\\n");
    return 1;
}

// ... work with file ...

fclose(fp);  // Close file - IMPORTANT!
\`\`\`

The FILE pointer:
- Points to a structure containing file information
- Tracks current position in file
- Manages buffer for efficient I/O

---

### File Opening Modes

| Mode | Description | If File Exists | If File Doesn't Exist |
|------|-------------|----------------|----------------------|
| \`"r"\` | Read only | Opens | Error (NULL) |
| \`"w"\` | Write only | **Truncates** (erases) | Creates |
| \`"a"\` | Append only | Opens at end | Creates |
| \`"r+"\` | Read + Write | Opens | Error (NULL) |
| \`"w+"\` | Read + Write | **Truncates** | Creates |
| \`"a+"\` | Read + Append | Opens at end | Creates |

**Binary modes:** Add \`b\` for binary files:
- \`"rb"\` - Read binary
- \`"wb"\` - Write binary
- \`"ab"\` - Append binary
- \`"r+b"\` or \`"rb+"\` - Read/Write binary

\`\`\`c
// Text file
FILE *text = fopen("data.txt", "r");

// Binary file
FILE *binary = fopen("data.bin", "rb");
\`\`\`

---

### File Operations Overview

| Operation | Text Functions | Binary Functions |
|-----------|---------------|------------------|
| Character | fgetc(), fputc() | fread(), fwrite() |
| String | fgets(), fputs() | fread(), fwrite() |
| Formatted | fscanf(), fprintf() | N/A |
| Position | fseek(), ftell(), rewind() | Same |

---

### Character I/O

**fgetc()** - Read one character:
\`\`\`c
int ch;
while ((ch = fgetc(fp)) != EOF) {
    putchar(ch);  // Process character
}
\`\`\`

**fputc()** - Write one character:
\`\`\`c
fputc('A', fp);       // Write 'A' to file
fputc('\\n', fp);      // Write newline
\`\`\`

**Note:** fgetc() returns \`int\`, not \`char\`, to accommodate EOF (-1).

---

### String I/O

**fgets()** - Read line (safe):
\`\`\`c
char line[100];
while (fgets(line, sizeof(line), fp) != NULL) {
    printf("%s", line);  // line includes \\n
}
\`\`\`

**fputs()** - Write string:
\`\`\`c
fputs("Hello World\\n", fp);  // Write string
// Does NOT add newline automatically
\`\`\`

---

### Formatted I/O

**fprintf()** - Formatted write (like printf to file):
\`\`\`c
int roll = 101;
char name[] = "John";
float marks = 85.5;

fprintf(fp, "%d %s %.2f\\n", roll, name, marks);
\`\`\`

**fscanf()** - Formatted read (like scanf from file):
\`\`\`c
int roll;
char name[50];
float marks;

while (fscanf(fp, "%d %s %f", &roll, name, &marks) == 3) {
    printf("Roll: %d, Name: %s, Marks: %.2f\\n", roll, name, marks);
}
\`\`\`

---

### Binary I/O

For reading/writing raw data (structures, arrays):

**fwrite():**
\`\`\`c
struct Student s = {101, "John", 85.5};
fwrite(&s, sizeof(struct Student), 1, fp);
//      ↑          ↑               ↑   ↑
//   address    item size       count  file
\`\`\`

**fread():**
\`\`\`c
struct Student s;
fread(&s, sizeof(struct Student), 1, fp);

// Returns number of items successfully read
size_t items = fread(buffer, sizeof(int), 10, fp);
if (items < 10) {
    // Fewer items read (EOF or error)
}
\`\`\`

---

### File Positioning

| Function | Description |
|----------|-------------|
| \`ftell(fp)\` | Returns current position (bytes from start) |
| \`fseek(fp, offset, origin)\` | Move to position |
| \`rewind(fp)\` | Move to beginning (same as fseek(fp, 0, SEEK_SET)) |

**fseek origins:**
| Origin | Meaning |
|--------|---------|
| \`SEEK_SET\` | Beginning of file |
| \`SEEK_CUR\` | Current position |
| \`SEEK_END\` | End of file |

\`\`\`c
fseek(fp, 0, SEEK_SET);    // Go to beginning
fseek(fp, 0, SEEK_END);    // Go to end
fseek(fp, 10, SEEK_SET);   // Go to byte 10
fseek(fp, -5, SEEK_CUR);   // Go back 5 bytes from current
fseek(fp, -10, SEEK_END);  // Go 10 bytes before end

long size = ftell(fp);     // Get file size (after SEEK_END)
rewind(fp);                // Go back to start
\`\`\`

---

### Error Handling

\`\`\`c
FILE *fp = fopen("data.txt", "r");

// Check if file opened successfully
if (fp == NULL) {
    perror("Error opening file");  // Prints system error message
    return 1;
}

// Check for errors during reading
if (ferror(fp)) {
    printf("Error reading file\\n");
    clearerr(fp);  // Clear error flag
}

// Check for end of file
if (feof(fp)) {
    printf("End of file reached\\n");
}

fclose(fp);
\`\`\`

---

### Common Patterns

**Reading file character by character:**
\`\`\`c
int ch;
while ((ch = fgetc(fp)) != EOF) {
    // Process ch
}
\`\`\`

**Reading file line by line:**
\`\`\`c
char line[256];
while (fgets(line, sizeof(line), fp) != NULL) {
    // Process line (includes \\n)
}
\`\`\`

**Copying a file:**
\`\`\`c
int ch;
while ((ch = fgetc(src)) != EOF) {
    fputc(ch, dest);
}
\`\`\`

**Reading binary records:**
\`\`\`c
struct Record r;
while (fread(&r, sizeof(r), 1, fp) == 1) {
    // Process record
}
\`\`\`

---

### Common Mistakes

**1. Not checking fopen return:**
\`\`\`c
FILE *fp = fopen("file.txt", "r");
fprintf(fp, "data");  // CRASH if file doesn't exist!

// CORRECT:
if (fp == NULL) {
    perror("Error");
    return 1;
}
\`\`\`

**2. Not closing files:**
\`\`\`c
FILE *fp = fopen("file.txt", "w");
fprintf(fp, "data");
// Missing fclose() - data may not be written!
\`\`\`

**3. Using "w" when you meant "a":**
\`\`\`c
FILE *fp = fopen("log.txt", "w");  // TRUNCATES existing data!
// Use "a" to append instead
\`\`\`

**4. Wrong mode for operation:**
\`\`\`c
FILE *fp = fopen("file.txt", "r");
fprintf(fp, "data");  // Can't write to read-only file!
\`\`\`

**5. Using feof() incorrectly:**
\`\`\`c
// WRONG - feof is true AFTER failed read
while (!feof(fp)) {
    ch = fgetc(fp);  // Reads EOF, then loop checks feof
    process(ch);     // Processes EOF!
}

// CORRECT
while ((ch = fgetc(fp)) != EOF) {
    process(ch);
}
\`\`\`

---

### Key Memory Triggers

- Always **check fopen() for NULL**
- Always **fclose()** to prevent data loss
- \`"w"\` mode **truncates** existing file!
- Use \`"a"\` to **append** to existing file
- fgetc() returns **int** (to handle EOF = -1)
- Check return value of **fscanf/fread** for success
- Binary mode (\`"rb"\`, \`"wb"\`) for non-text data
- **ftell/fseek** for random access

---

### Viva Questions

**Q1: What is a file pointer?**
A: A pointer to FILE structure that manages file operations, tracks position, and handles buffering.

**Q2: Difference between "w" and "a" modes?**
A: "w" truncates (erases) existing file. "a" preserves existing content and adds new data at end.

**Q3: Why does fgetc() return int instead of char?**
A: To accommodate EOF (-1), which cannot be represented in char on all systems.

**Q4: What happens if fopen() fails?**
A: Returns NULL. Must check before using file pointer to avoid crash.

**Q5: Difference between text and binary mode?**
A: Text mode may convert newlines (\\n to \\r\\n on Windows). Binary mode reads/writes exact bytes.

**Q6: What does fseek(fp, 0, SEEK_END) do?**
A: Moves file position to end of file. Combined with ftell(), gives file size.

**Q7: Why must we always close files?**
A: To flush buffer (write pending data), release system resources, and prevent data loss.

**Q8: What is the difference between fgets() and gets()?**
A: fgets() takes buffer size parameter (safe). gets() doesn't (unsafe, never use).

---

### Practical Examples - Module 12

**Q1: Write a program to create and write to a file**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("output.txt", "w");
    if (fp == NULL) {
        printf("Error creating file!\\n");
        return 1;
    }

    fprintf(fp, "Hello, World!\\n");
    fprintf(fp, "This is line 2.\\n");
    fputs("This is line 3.\\n", fp);

    fclose(fp);
    printf("File written successfully!\\n");
    return 0;
}
\`\`\`

**Q2: Write a program to read from a file character by character**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("input.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    fclose(fp);
    return 0;
}
\`\`\`

**Q3: Write a program to read file line by line**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("input.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char line[256];
    int lineNum = 1;
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%d: %s", lineNum++, line);
    }

    fclose(fp);
    return 0;
}
\`\`\`

**Q4: Write a program to copy one file to another**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *src = fopen("source.txt", "r");
    FILE *dest = fopen("destination.txt", "w");

    if (src == NULL || dest == NULL) {
        printf("Error opening files!\\n");
        return 1;
    }

    int ch;
    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dest);
    }

    fclose(src);
    fclose(dest);
    printf("File copied successfully!\\n");
    return 0;
}
\`\`\`

**Q5: Write a program to count characters, words, and lines in a file**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("input.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int chars = 0, words = 0, lines = 0;
    int ch, inWord = 0;

    while ((ch = fgetc(fp)) != EOF) {
        chars++;
        if (ch == '\\n') lines++;
        if (ch == ' ' || ch == '\\n' || ch == '\\t') {
            inWord = 0;
        } else if (!inWord) {
            words++;
            inWord = 1;
        }
    }

    printf("Characters: %d\\n", chars);
    printf("Words: %d\\n", words);
    printf("Lines: %d\\n", lines);
    fclose(fp);
    return 0;
}
\`\`\`

**Q6: Write a program to append data to a file**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("log.txt", "a");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fprintf(fp, "New log entry added.\\n");

    fclose(fp);
    printf("Data appended successfully!\\n");
    return 0;
}
\`\`\`

**Q7: Write a program to store and read student records using file**
\`\`\`c
#include <stdio.h>

struct Student {
    int roll;
    char name[50];
    float marks;
};

int main() {
    struct Student s = {101, "John", 85.5};
    FILE *fp;

    // Write
    fp = fopen("student.dat", "wb");
    fwrite(&s, sizeof(s), 1, fp);
    fclose(fp);

    // Read
    struct Student r;
    fp = fopen("student.dat", "rb");
    fread(&r, sizeof(r), 1, fp);
    fclose(fp);

    printf("Roll: %d, Name: %s, Marks: %.2f\\n", r.roll, r.name, r.marks);
    return 0;
}
\`\`\`

**Q8: Write a program to demonstrate fseek and ftell**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("test.txt", "w+");

    fprintf(fp, "Hello World");
    printf("Current position: %ld\\n", ftell(fp));

    fseek(fp, 0, SEEK_SET);  // Go to beginning
    printf("After seek to start: %ld\\n", ftell(fp));

    fseek(fp, 0, SEEK_END);  // Go to end
    printf("File size: %ld bytes\\n", ftell(fp));

    fclose(fp);
    return 0;
}
\`\`\`

**Q9: Write a program to merge two files into a third file**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *f1 = fopen("file1.txt", "r");
    FILE *f2 = fopen("file2.txt", "r");
    FILE *f3 = fopen("merged.txt", "w");

    if (!f1 || !f2 || !f3) {
        printf("Error opening files!\\n");
        return 1;
    }

    int ch;
    while ((ch = fgetc(f1)) != EOF) fputc(ch, f3);
    while ((ch = fgetc(f2)) != EOF) fputc(ch, f3);

    fclose(f1); fclose(f2); fclose(f3);
    printf("Files merged successfully!\\n");
    return 0;
}
\`\`\`

**Q10: Write a program to read integers from file and find their sum**
\`\`\`c
#include <stdio.h>
int main() {
    FILE *fp = fopen("numbers.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int num, sum = 0, count = 0;
    while (fscanf(fp, "%d", &num) == 1) {
        sum += num;
        count++;
    }

    printf("Count: %d, Sum: %d, Average: %.2f\\n",
           count, sum, (float)sum/count);
    fclose(fp);
    return 0;
}
\`\`\`
`
