export const module10 = `
## Module 10: Pointers

### What is a Pointer?

A **pointer** is a variable that stores the **memory address** of another variable. Pointers are one of C's most powerful features, enabling:
- Direct memory access and manipulation
- Efficient array and string handling
- Dynamic memory allocation
- Call by reference (modifying original variables)

\`\`\`
Memory:
┌─────────┬─────────┬─────────┬─────────┐
│ 1000    │ 1004    │ 1008    │ 1012    │ ← Addresses
├─────────┼─────────┼─────────┼─────────┤
│   10    │  1000   │         │         │ ← Values
│   x     │   p     │         │         │ ← Variables
└─────────┴─────────┴─────────┴─────────┘

int x = 10;      // x is at address 1000, value = 10
int *p = &x;     // p is at address 1004, value = 1000 (address of x)
\`\`\`

---

### Pointer Declaration and Initialization

**Declaration syntax:**
\`\`\`c
data_type *pointer_name;
\`\`\`

\`\`\`c
int *p;      // Pointer to int
float *fp;   // Pointer to float
char *cp;    // Pointer to char
void *vp;    // Generic pointer (any type)

// Initialization
int x = 10;
int *p = &x;     // Initialize with address of x
int *q = NULL;   // Initialize to NULL (safe)
int *r;          // Uninitialized - DANGEROUS (wild pointer)
\`\`\`

---

### Pointer Operators

| Operator | Name | Description |
|----------|------|-------------|
| \`&\` | Address-of | Gets memory address of variable |
| \`*\` | Dereference | Gets value at address |

\`\`\`c
int x = 10;
int *p = &x;     // & gets address of x

printf("%d", x);     // 10 - value of x
printf("%p", &x);    // 0x7fff... - address of x
printf("%p", p);     // 0x7fff... - value of p (same address)
printf("%d", *p);    // 10 - value at address p points to

*p = 20;             // Modify x through pointer
printf("%d", x);     // 20 - x is changed!
\`\`\`

---

### Pointer Size

Pointer size depends on **architecture**, not data type:

\`\`\`c
printf("Size of int*:    %lu\\n", sizeof(int*));     // 8 (on 64-bit)
printf("Size of char*:   %lu\\n", sizeof(char*));    // 8
printf("Size of double*: %lu\\n", sizeof(double*));  // 8
printf("Size of void*:   %lu\\n", sizeof(void*));    // 8

// On 32-bit system, all would be 4 bytes
\`\`\`

---

### Pointer Arithmetic

When you add/subtract from a pointer, it moves by **multiples of the data type size**:

\`\`\`c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

// Pointer arithmetic
printf("%d\\n", *p);       // 10 (arr[0])
printf("%d\\n", *(p + 1)); // 20 (arr[1])
printf("%d\\n", *(p + 2)); // 30 (arr[2])

p++;                      // Moves by sizeof(int) = 4 bytes
printf("%d\\n", *p);       // 20

// Equivalent expressions
arr[i]    ≡  *(arr + i)  ≡  *(i + arr)  ≡  i[arr]
\`\`\`

**Valid pointer operations:**
| Operation | Description |
|-----------|-------------|
| \`p + n\` | Add n * sizeof(type) to address |
| \`p - n\` | Subtract n * sizeof(type) from address |
| \`p++\` | Move to next element |
| \`p--\` | Move to previous element |
| \`p1 - p2\` | Number of elements between pointers |
| \`p1 == p2\` | Compare addresses |

**Invalid operations:** Adding two pointers, multiplying pointers

---

### Pointers and Arrays

Array name is essentially a **constant pointer** to first element:

\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};

// These are equivalent:
arr      ≡  &arr[0]       // Address of first element
*arr     ≡  arr[0]        // First element
*(arr+i) ≡  arr[i]        // i-th element

// Key difference:
int *p = arr;
p++;        // OK - pointer can be modified
arr++;      // ERROR - array name is constant!
\`\`\`

---

### Pointer to Pointer (Double Pointer)

A pointer that stores the address of another pointer:

\`\`\`c
int x = 10;
int *p = &x;      // Pointer to x
int **pp = &p;    // Pointer to pointer p

printf("%d\\n", x);      // 10
printf("%d\\n", *p);     // 10 (value at address in p)
printf("%d\\n", **pp);   // 10 (value at address in address in pp)
printf("%p\\n", p);      // Address of x
printf("%p\\n", *pp);    // Same - address of x
printf("%p\\n", pp);     // Address of p
\`\`\`

**Use cases:**
- Modifying a pointer inside a function
- 2D dynamic arrays
- Multiple levels of indirection

---

### NULL Pointer

NULL is a special value meaning "points to nothing":

\`\`\`c
int *p = NULL;     // Safe initialization

// Always check before dereferencing!
if (p != NULL) {
    printf("%d", *p);  // Safe
} else {
    printf("Pointer is NULL");
}

// Dereferencing NULL = crash!
int *q = NULL;
*q = 10;           // CRASH! Segmentation fault
\`\`\`

---

### Void Pointer (Generic Pointer)

Can hold address of any data type:

\`\`\`c
void *vp;

int x = 10;
float f = 3.14;

vp = &x;                      // Points to int
printf("%d\\n", *(int*)vp);    // Must cast before dereference

vp = &f;                      // Now points to float
printf("%.2f\\n", *(float*)vp);

// Cannot dereference without casting
// *vp = 5;  // ERROR - void* cannot be dereferenced
\`\`\`

**Use cases:** Generic functions (like malloc, qsort)

---

### Pointer Types Summary

\`\`\`c
int *p;          // Pointer to int
int **pp;        // Pointer to pointer to int
int *arr[5];     // Array of 5 pointers to int
int (*p)[5];     // Pointer to array of 5 ints
int (*fp)(int);  // Pointer to function taking int, returning int
void *vp;        // Generic pointer (void pointer)
const int *p;    // Pointer to constant int (value can't change)
int * const p;   // Constant pointer to int (address can't change)
\`\`\`

---

### Function Pointers

Pointers that point to functions:

\`\`\`c
// Function pointer declaration
int (*fp)(int, int);    // Pointer to function taking 2 ints, returning int

// Functions
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

// Using function pointer
fp = add;               // Assign function
printf("%d\\n", fp(5, 3));  // 8 - calls add(5, 3)

fp = multiply;
printf("%d\\n", fp(5, 3));  // 15 - calls multiply(5, 3)
\`\`\`

---

### Common Pointer Mistakes

**1. Wild Pointer (Uninitialized):**
\`\`\`c
int *p;        // Random garbage address
*p = 10;       // DANGEROUS! Writing to random memory
\`\`\`

**2. Dangling Pointer:**
\`\`\`c
int *p;
{
    int x = 10;
    p = &x;
}  // x is destroyed here
*p = 20;       // DANGEROUS! x no longer exists
\`\`\`

**3. NULL Dereference:**
\`\`\`c
int *p = NULL;
*p = 10;       // CRASH! Cannot dereference NULL
\`\`\`

**4. Memory Leak:**
\`\`\`c
int *p = malloc(sizeof(int));
p = NULL;      // Lost reference! Memory never freed
\`\`\`

**5. Pointer Type Mismatch:**
\`\`\`c
float f = 3.14;
int *p = (int*)&f;   // Wrong interpretation of bits
\`\`\`

---

### Key Memory Triggers

- Pointer stores **address**, not value
- \`*\` dereferences (gets value at address)
- \`&\` gets address of variable
- Pointer size is **system-dependent** (4 or 8 bytes)
- Array name = **constant pointer** to first element
- \`arr[i]\` ≡ \`*(arr + i)\`
- **NULL** = safe initialization (check before use!)
- **Wild pointer** = uninitialized (dangerous)
- **Dangling pointer** = points to freed/invalid memory

---

### Viva Questions

**Q1: What is a pointer?**
A: A variable that stores the memory address of another variable.

**Q2: What is the size of a pointer?**
A: Depends on system architecture - 4 bytes on 32-bit, 8 bytes on 64-bit. Same for all pointer types.

**Q3: Difference between \`*p\` and \`&p\`?**
A: \`*p\` dereferences p (gets value at address). \`&p\` gets address of the pointer variable itself.

**Q4: What is a NULL pointer?**
A: Pointer initialized to NULL, meaning it points to nothing. Dereferencing it causes crash.

**Q5: What is a wild pointer?**
A: Uninitialized pointer containing garbage address. Using it is undefined behavior.

**Q6: What is a dangling pointer?**
A: Pointer pointing to memory that has been freed or gone out of scope.

**Q7: How is arr[i] equivalent to *(arr+i)?**
A: Array subscript is converted to pointer arithmetic. Adding i to array pointer moves i elements forward.

**Q8: Can we add two pointers?**
A: No. We can subtract pointers (to find distance) but not add them.

---

### Practical Examples - Module 10

**Q1: Write a program to demonstrate pointer basics**
\`\`\`c
#include <stdio.h>
int main() {
    int x = 10;
    int *p = &x;

    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", (void*)&x);
    printf("Value of p (address): %p\\n", (void*)p);
    printf("Value at p (*p): %d\\n", *p);

    *p = 20;  // Modify through pointer
    printf("New value of x: %d\\n", x);
    return 0;
}
\`\`\`

**Q2: Write a program to swap two numbers using pointers**
\`\`\`c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After:  x = %d, y = %d\\n", x, y);
    return 0;
}
\`\`\`

**Q3: Write a program to traverse an array using pointers**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Using pointer arithmetic:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d (address: %p)\\n", i, *(p + i), (void*)(p + i));
    }
    return 0;
}
\`\`\`

**Q4: Write a program to demonstrate pointer to pointer**
\`\`\`c
#include <stdio.h>
int main() {
    int x = 10;
    int *p = &x;
    int **pp = &p;

    printf("x = %d\\n", x);
    printf("*p = %d\\n", *p);
    printf("**pp = %d\\n", **pp);
    printf("Address of x: %p\\n", (void*)&x);
    printf("Value of p: %p\\n", (void*)p);
    printf("Value of pp: %p\\n", (void*)pp);
    return 0;
}
\`\`\`

**Q5: Write a program to find length of string using pointer**
\`\`\`c
#include <stdio.h>

int stringLength(char *str) {
    char *p = str;
    while (*p != '\\0') {
        p++;
    }
    return p - str;
}

int main() {
    char str[] = "Hello World";
    printf("Length: %d\\n", stringLength(str));
    return 0;
}
\`\`\`

**Q6: Write a program to copy string using pointers**
\`\`\`c
#include <stdio.h>

void stringCopy(char *dest, char *src) {
    while (*src != '\\0') {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\\0';
}

int main() {
    char src[] = "Hello";
    char dest[20];
    stringCopy(dest, src);
    printf("Copied: %s\\n", dest);
    return 0;
}
\`\`\`

**Q7: Write a program to demonstrate array of pointers**
\`\`\`c
#include <stdio.h>
int main() {
    char *names[] = {"Alice", "Bob", "Charlie", "David"};
    int n = sizeof(names) / sizeof(names[0]);

    printf("Names:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d. %s\\n", i + 1, names[i]);
    }
    return 0;
}
\`\`\`

**Q8: Write a program to demonstrate pointer to function**
\`\`\`c
#include <stdio.h>

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main() {
    int (*operation)(int, int);  // Function pointer

    operation = add;
    printf("10 + 5 = %d\\n", operation(10, 5));

    operation = subtract;
    printf("10 - 5 = %d\\n", operation(10, 5));

    operation = multiply;
    printf("10 * 5 = %d\\n", operation(10, 5));
    return 0;
}
\`\`\`

**Q9: Write a program to return multiple values using pointers**
\`\`\`c
#include <stdio.h>

void getQuotientRemainder(int a, int b, int *quo, int *rem) {
    *quo = a / b;
    *rem = a % b;
}

int main() {
    int q, r;
    getQuotientRemainder(17, 5, &q, &r);
    printf("17 / 5 = %d remainder %d\\n", q, r);
    return 0;
}
\`\`\`

**Q10: Write a program to demonstrate void pointer**
\`\`\`c
#include <stdio.h>

void printValue(void *ptr, char type) {
    switch (type) {
        case 'i': printf("Integer: %d\\n", *(int*)ptr); break;
        case 'f': printf("Float: %.2f\\n", *(float*)ptr); break;
        case 'c': printf("Char: %c\\n", *(char*)ptr); break;
    }
}

int main() {
    int i = 10;
    float f = 3.14;
    char c = 'A';

    printValue(&i, 'i');
    printValue(&f, 'f');
    printValue(&c, 'c');
    return 0;
}
\`\`\`
`
