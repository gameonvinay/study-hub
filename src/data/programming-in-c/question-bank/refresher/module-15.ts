export const module15 = `
## Module 15: Storage Classes

### What are Storage Classes?

**Storage classes** define the scope, visibility, lifetime, and default value of variables in C. Every variable has a storage class that determines:
- **Scope** - Where the variable is accessible
- **Lifetime** - How long the variable exists in memory
- **Default value** - Initial value if not explicitly initialized
- **Storage location** - Where in memory the variable is stored

---

### Storage Classes Overview

| Class | Keyword | Scope | Lifetime | Default Value | Storage Location |
|-------|---------|-------|----------|---------------|------------------|
| Automatic | \`auto\` | Local (block) | Until block ends | **Garbage** | Stack |
| Register | \`register\` | Local (block) | Until block ends | **Garbage** | CPU register (if possible) |
| Static | \`static\` | Local or File | **Entire program** | **0** | Data segment |
| External | \`extern\` | Global (all files) | **Entire program** | **0** | Data segment |

---

### auto - Automatic Storage

Default storage class for local variables. Rarely written explicitly.

\`\`\`c
void function() {
    auto int x = 10;  // Same as: int x = 10;
    int y = 20;       // Also auto by default

    // Variables created when function is called
    // Destroyed when function returns
}
\`\`\`

**Characteristics:**
- Default for all local variables
- Stored on **stack**
- Created on function entry, destroyed on exit
- **Not initialized** (contains garbage)
- Scope limited to defining block

\`\`\`c
void demo() {
    int outer = 10;  // auto
    {
        int inner = 20;  // auto, different scope
        printf("%d %d\\n", outer, inner);  // OK
    }
    // printf("%d\\n", inner);  // ERROR: inner out of scope
}
\`\`\`

---

### register - Register Storage

Suggests storing variable in CPU register for faster access.

\`\`\`c
void loop() {
    register int counter;  // Hint to use CPU register

    for (counter = 0; counter < 1000000; counter++) {
        // Fast access to counter
    }
}
\`\`\`

**Characteristics:**
- **Hint only** - compiler may ignore it
- Used for frequently accessed variables
- **Cannot take address** (\`&\` operator not allowed)
- Limited number of registers available
- Modern compilers optimize automatically (less useful today)

\`\`\`c
register int x = 10;
// int *p = &x;  // ERROR: cannot take address of register variable
\`\`\`

---

### static - Static Storage

Has two meanings depending on context:

#### 1. Static Local Variable

Retains value between function calls:

\`\`\`c
void counter() {
    static int count = 0;  // Initialized only ONCE
    count++;
    printf("Call #%d\\n", count);
}

int main() {
    counter();  // Call #1
    counter();  // Call #2
    counter();  // Call #3
    return 0;
}
\`\`\`

**Memory visualization:**
\`\`\`
First call:  count = 0 → 1
Second call: count = 1 → 2  (NOT reset to 0!)
Third call:  count = 2 → 3
\`\`\`

**Use cases for static local:**
- Counting function calls
- Caching expensive computations
- Generating unique IDs
- Maintaining state between calls

---

#### 2. Static Global Variable/Function

Limits visibility to current file (internal linkage):

\`\`\`c
// In myfile.c
static int privateVar = 100;  // Only visible in this file
static void privateFunc() {   // Only callable from this file
    printf("Private function\\n");
}

void publicFunc() {  // Visible from other files
    privateFunc();   // OK - same file
}

// In another_file.c
// extern int privateVar;  // ERROR: can't access static variable
// privateFunc();          // ERROR: can't call static function
\`\`\`

**Use cases for static global:**
- Encapsulation (file-private data)
- Avoiding name conflicts between files
- Internal helper functions

---

### extern - External Storage

Declares a variable defined in another file (external linkage):

**File 1: config.c**
\`\`\`c
#include <stdio.h>

int globalCount = 100;  // DEFINITION (allocates memory)

void printCount() {
    printf("Count: %d\\n", globalCount);
}
\`\`\`

**File 2: main.c**
\`\`\`c
#include <stdio.h>

extern int globalCount;  // DECLARATION (no memory allocation)

int main() {
    printf("Initial: %d\\n", globalCount);  // Uses config.c's variable
    globalCount = 200;
    printCount();  // Prints: Count: 200
    return 0;
}
\`\`\`

**Key points:**
- \`extern\` only **declares**, doesn't **define**
- Variable must be defined in exactly one file
- Links variable across translation units
- Used in header files for global variable declarations

---

### Declaration vs Definition

| Term | Description | Example |
|------|-------------|---------|
| **Definition** | Allocates memory | \`int x = 10;\` |
| **Declaration** | Announces existence | \`extern int x;\` |

\`\`\`c
// Definition (allocates memory)
int globalVar = 100;

// Declaration only (uses existing memory)
extern int globalVar;

// In functions, definition:
void func() {
    int local = 10;  // Definition
}
\`\`\`

---

### Scope vs Lifetime

| Concept | Description | Example |
|---------|-------------|---------|
| **Scope** | Where variable is **accessible** | Local, file, global |
| **Lifetime** | How long variable **exists** | Block, function, program |

\`\`\`c
int global = 1;  // Global scope, program lifetime

void demo() {
    static int persist = 0;  // Function scope, PROGRAM lifetime
    int temp = 0;            // Function scope, function lifetime

    {
        int inner = 10;  // Block scope, block lifetime
    }
    // inner not accessible here, and destroyed
}
\`\`\`

---

### Default Values

| Storage Class | Default Value |
|---------------|---------------|
| auto (local) | **Garbage** (uninitialized) |
| register | **Garbage** |
| static (local/global) | **0** |
| extern (global) | **0** |

\`\`\`c
int globalVar;         // Default: 0
static int staticVar;  // Default: 0

void demo() {
    int autoVar;          // Garbage! Must initialize before use
    static int staticLocal;  // Default: 0
    register int regVar;  // Garbage!
}
\`\`\`

---

### Static Function

Limits function visibility to current file:

\`\`\`c
// utils.c
static int helper(int x) {  // Private to this file
    return x * 2;
}

int publicAPI(int x) {  // Accessible from other files
    return helper(x) + 10;
}

// main.c
extern int publicAPI(int);  // OK
// extern int helper(int);  // ERROR: helper is static/private
\`\`\`

---

### Common Patterns

**1. Singleton-like pattern with static:**
\`\`\`c
int* getBuffer() {
    static int buffer[100];  // Created once, persists
    return buffer;
}
\`\`\`

**2. Unique ID generator:**
\`\`\`c
int getNextID() {
    static int id = 0;
    return ++id;
}
\`\`\`

**3. Call counter for debugging:**
\`\`\`c
void trackedFunction() {
    static int callCount = 0;
    printf("Function called %d times\\n", ++callCount);
    // ... rest of function
}
\`\`\`

**4. Header file with extern:**
\`\`\`c
// config.h
#ifndef CONFIG_H
#define CONFIG_H

extern int debugMode;     // Declaration
extern void initConfig(); // Declaration

#endif

// config.c
#include "config.h"

int debugMode = 0;        // Definition
void initConfig() { ... } // Definition
\`\`\`

---

### Common Mistakes

**1. Using uninitialized auto variable:**
\`\`\`c
int x;  // Garbage value!
printf("%d\\n", x);  // Undefined behavior

// CORRECT:
int x = 0;
\`\`\`

**2. Expecting static to reset:**
\`\`\`c
void func() {
    static int count = 0;  // Only set to 0 ONCE
    count = 0;  // If you want reset, do it explicitly
    count++;
}
\`\`\`

**3. Taking address of register variable:**
\`\`\`c
register int x = 10;
int *p = &x;  // ERROR: cannot take address
\`\`\`

**4. Multiple definitions with extern:**
\`\`\`c
// file1.c
int globalVar = 100;  // Definition

// file2.c
int globalVar = 200;  // ERROR: multiple definition!

// CORRECT in file2.c:
extern int globalVar;  // Declaration only
\`\`\`

**5. Confusing static local with static global:**
\`\`\`c
static int filePrivate = 0;  // File scope (private to file)

void func() {
    static int funcPrivate = 0;  // Function scope (persists between calls)
}
\`\`\`

---

### Summary Comparison

\`\`\`c
int globalVar = 1;              // Global scope, program lifetime
static int fileVar = 2;         // File scope, program lifetime

void demo() {
    int autoVar = 3;            // Function scope, function lifetime
    static int staticVar = 4;   // Function scope, PROGRAM lifetime
    register int regVar = 5;    // Function scope, function lifetime

    {
        int blockVar = 6;       // Block scope, block lifetime
    }
}
\`\`\`

---

### Key Memory Triggers

- **auto** is default for local (rarely written explicitly)
- **register** is a **hint** (compiler may ignore)
- **static local** retains value between calls
- **static global/function** limits scope to file
- **extern** declares variable defined elsewhere
- Global and static variables default to **0**
- Local variables default to **garbage**
- Can't take address of **register** variable
- **One definition rule**: define in one file, declare in others

---

### Viva Questions

**Q1: What are the four storage classes in C?**
A: auto, register, static, and extern.

**Q2: What is the default storage class for local variables?**
A: auto. It's the default and rarely written explicitly.

**Q3: What does static mean for a local variable?**
A: The variable retains its value between function calls. It's initialized only once and persists for the program's lifetime.

**Q4: What does static mean for a global variable?**
A: It limits the variable's scope to the current file (internal linkage). Other files cannot access it.

**Q5: What is extern used for?**
A: To declare a variable that is defined in another file. It allows sharing global variables across multiple files.

**Q6: What is the default value of static variables?**
A: 0 (zero). Both static local and static global variables are initialized to 0 if not explicitly initialized.

**Q7: Why can't we take the address of a register variable?**
A: Because it may be stored in a CPU register which doesn't have a memory address.

**Q8: Difference between scope and lifetime?**
A: Scope is where a variable can be accessed. Lifetime is how long it exists in memory. A static local has function scope but program lifetime.

**Q9: What is the difference between declaration and definition?**
A: Definition allocates memory (e.g., \`int x = 10;\`). Declaration just announces existence (e.g., \`extern int x;\`).

**Q10: When should you use static functions?**
A: For helper functions that should only be called from within the same file (encapsulation, avoiding name conflicts).

---

### Practical Examples - Module 15

**Q1: Write a program demonstrating auto storage class**
\`\`\`c
#include <stdio.h>
int main() {
    auto int x = 10;  // Same as: int x = 10;
    printf("Auto variable x = %d\\n", x);

    {
        auto int y = 20;  // New scope
        printf("Inner y = %d\\n", y);
    }
    // y is not accessible here

    return 0;
}
\`\`\`

**Q2: Write a program demonstrating register storage class**
\`\`\`c
#include <stdio.h>
int main() {
    register int counter;  // Hint to store in CPU register
    int sum = 0;

    for (counter = 1; counter <= 100; counter++) {
        sum += counter;
    }

    printf("Sum from 1 to 100 = %d\\n", sum);
    // Note: Can't take address of register variable
    // printf("%p", &counter);  // ERROR!
    return 0;
}
\`\`\`

**Q3: Write a program demonstrating static local variable**
\`\`\`c
#include <stdio.h>

void counter() {
    static int count = 0;  // Initialized only once
    count++;
    printf("Call #%d\\n", count);
}

int main() {
    counter();  // Call #1
    counter();  // Call #2
    counter();  // Call #3
    counter();  // Call #4
    return 0;
}
\`\`\`

**Q4: Write a program showing difference between static and non-static local**
\`\`\`c
#include <stdio.h>

void staticDemo() {
    static int s = 0;
    int a = 0;
    s++; a++;
    printf("static s = %d, auto a = %d\\n", s, a);
}

int main() {
    staticDemo();  // s=1, a=1
    staticDemo();  // s=2, a=1
    staticDemo();  // s=3, a=1
    return 0;
}
\`\`\`

**Q5: Write a program generating unique IDs using static**
\`\`\`c
#include <stdio.h>

int getUniqueID() {
    static int id = 1000;
    return id++;
}

int main() {
    printf("ID: %d\\n", getUniqueID());  // 1000
    printf("ID: %d\\n", getUniqueID());  // 1001
    printf("ID: %d\\n", getUniqueID());  // 1002
    return 0;
}
\`\`\`

**Q6: Write two files demonstrating extern variable**
\`\`\`c
// file1.c - Define global variable
#include <stdio.h>

int globalCount = 100;  // Definition

void printCount() {
    printf("Count: %d\\n", globalCount);
}

int main() {
    printCount();
    incrementCount();  // Defined in file2.c
    printCount();
    return 0;
}

// file2.c - Use extern
extern int globalCount;  // Declaration (defined in file1.c)

void incrementCount() {
    globalCount++;
}

// Compile: gcc file1.c file2.c -o program
\`\`\`

**Q7: Write a program demonstrating static global variable (file scope)**
\`\`\`c
#include <stdio.h>

static int filePrivate = 100;  // Only visible in this file

void displayPrivate() {
    printf("File private variable: %d\\n", filePrivate);
}

int main() {
    displayPrivate();
    filePrivate = 200;
    displayPrivate();
    return 0;
}
\`\`\`

**Q8: Write a program showing default values of storage classes**
\`\`\`c
#include <stdio.h>

int globalVar;        // Default: 0 (static storage)
static int staticVar; // Default: 0

int main() {
    int autoVar;           // Default: garbage
    static int localStatic; // Default: 0

    printf("Global (uninitialized): %d\\n", globalVar);
    printf("Static (uninitialized): %d\\n", staticVar);
    printf("Local static (uninitialized): %d\\n", localStatic);
    // autoVar has garbage value
    return 0;
}
\`\`\`

**Q9: Write a program with static function (file-private)**
\`\`\`c
#include <stdio.h>

static void helperFunction() {  // Only accessible in this file
    printf("I am a static (private) function\\n");
}

void publicFunction() {  // Accessible from other files
    printf("I am a public function\\n");
    helperFunction();
}

int main() {
    publicFunction();
    helperFunction();  // Works here, but not from other files
    return 0;
}
\`\`\`

**Q10: Write a program demonstrating variable lifetime and scope**
\`\`\`c
#include <stdio.h>

int global = 1;  // Program lifetime, global scope

void demo() {
    static int persistent = 0;  // Program lifetime, function scope
    int temporary = 0;          // Function lifetime, function scope

    global++; persistent++; temporary++;
    printf("global=%d, persistent=%d, temporary=%d\\n",
           global, persistent, temporary);
}

int main() {
    demo();  // global=2, persistent=1, temporary=1
    demo();  // global=3, persistent=2, temporary=1
    demo();  // global=4, persistent=3, temporary=1
    return 0;
}
\`\`\`
`
