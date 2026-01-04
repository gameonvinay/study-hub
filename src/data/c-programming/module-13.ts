export const module13 = `
## Module 13: Dynamic Memory Allocation

### What is Dynamic Memory Allocation?

**Dynamic memory allocation** allows programs to request memory at runtime from the **heap**, rather than having fixed-size allocations at compile time.

**Why use dynamic allocation?**
- Array size unknown at compile time
- Need memory that persists beyond function scope
- Build data structures (linked lists, trees, graphs)
- Efficient memory usage (allocate only what's needed)

**Memory layout of a C program:**
\`\`\`
┌─────────────────────┐ High Address
│   Command Line Args │
├─────────────────────┤
│   Stack             │ ← Local variables, function calls
│   ↓ (grows down)    │   (automatic management)
├─────────────────────┤
│                     │
│   ↑ (grows up)      │
│   Heap              │ ← Dynamic allocation (manual management)
├─────────────────────┤
│   BSS               │ ← Uninitialized global/static
├─────────────────────┤
│   Data              │ ← Initialized global/static
├─────────────────────┤
│   Text (Code)       │ ← Program instructions
└─────────────────────┘ Low Address
\`\`\`

---

### Stack vs Heap

| Aspect | Stack | Heap |
|--------|-------|------|
| Allocation | Automatic (by compiler) | Manual (by programmer) |
| Deallocation | Automatic (scope ends) | Manual (must call free) |
| Speed | Very fast | Slower |
| Size | Limited (typically 1-8 MB) | Large (limited by RAM) |
| Access | Direct, contiguous | Via pointers |
| Lifetime | Until function returns | Until explicitly freed |
| Fragmentation | None | Possible |

\`\`\`c
void demo() {
    int stackVar = 10;       // Stack - auto freed when function ends
    int *heapVar = malloc(sizeof(int));  // Heap - persists until free()
    *heapVar = 20;
    free(heapVar);           // Must manually free!
}
\`\`\`

---

### Memory Functions (\`<stdlib.h>\`)

All dynamic memory functions are in \`<stdlib.h>\`:

| Function | Purpose | Initialization |
|----------|---------|----------------|
| \`malloc(size)\` | Allocate size bytes | **Uninitialized** (garbage) |
| \`calloc(n, size)\` | Allocate n × size bytes | **Zero-initialized** |
| \`realloc(ptr, size)\` | Resize existing allocation | Preserves old data |
| \`free(ptr)\` | Deallocate memory | N/A |

---

### malloc() - Memory Allocation

\`\`\`c
void *malloc(size_t size);
\`\`\`

Allocates \`size\` bytes of **uninitialized** memory.

\`\`\`c
// Allocate memory for 5 integers
int *arr = (int *)malloc(5 * sizeof(int));

// Always check for failure!
if (arr == NULL) {
    printf("Memory allocation failed!\\n");
    return 1;
}

// Memory contains GARBAGE - must initialize before reading
for (int i = 0; i < 5; i++) {
    arr[i] = i * 10;  // Initialize
}

// Use the memory...

free(arr);      // Deallocate when done
arr = NULL;     // Good practice: avoid dangling pointer
\`\`\`

**Key points:**
- Returns \`void*\` (cast to appropriate type)
- Returns \`NULL\` if allocation fails
- Memory is **uninitialized** (contains garbage)
- Must use \`sizeof()\` for portability

---

### calloc() - Contiguous Allocation

\`\`\`c
void *calloc(size_t n, size_t size);
\`\`\`

Allocates memory for \`n\` elements of \`size\` bytes each, **initialized to zero**.

\`\`\`c
// Allocate and zero-initialize 5 integers
int *arr = (int *)calloc(5, sizeof(int));

if (arr == NULL) {
    printf("Memory allocation failed!\\n");
    return 1;
}

// All elements are already 0!
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);  // Prints: 0 0 0 0 0
}

free(arr);
\`\`\`

---

### malloc vs calloc

| Feature | malloc | calloc |
|---------|--------|--------|
| Syntax | \`malloc(n * size)\` | \`calloc(n, size)\` |
| Arguments | 1 (total bytes) | 2 (count, size each) |
| Initialization | **No** (garbage values) | **Yes** (all zeros) |
| Speed | Faster | Slightly slower |
| Overflow check | No | Yes (n × size overflow) |

\`\`\`c
// Equivalent allocations (but different initialization):
int *a = (int *)malloc(5 * sizeof(int));   // Contains garbage
int *b = (int *)calloc(5, sizeof(int));    // Contains zeros

// When to use which:
// malloc: When you'll initialize all values anyway
// calloc: When you need zero-initialization, or for safety
\`\`\`

---

### realloc() - Resize Allocation

\`\`\`c
void *realloc(void *ptr, size_t size);
\`\`\`

Resizes previously allocated memory block.

\`\`\`c
int *arr = (int *)malloc(3 * sizeof(int));
arr[0] = 10; arr[1] = 20; arr[2] = 30;

// Grow the array
int *temp = (int *)realloc(arr, 5 * sizeof(int));
if (temp == NULL) {
    // realloc failed - original arr is still valid!
    free(arr);
    return 1;
}
arr = temp;  // Safe to update pointer now

arr[3] = 40; arr[4] = 50;  // Use new space
// Original data (10, 20, 30) is preserved

free(arr);
\`\`\`

**realloc behavior:**
| Call | Behavior |
|------|----------|
| \`realloc(ptr, larger)\` | Extends (may move data) |
| \`realloc(ptr, smaller)\` | Shrinks (data truncated) |
| \`realloc(ptr, 0)\` | Equivalent to \`free(ptr)\` |
| \`realloc(NULL, size)\` | Equivalent to \`malloc(size)\` |

**Safe realloc pattern:**
\`\`\`c
// WRONG - loses original pointer if realloc fails
arr = realloc(arr, new_size);  // If fails, arr = NULL, memory leaked!

// CORRECT - preserve original on failure
int *temp = realloc(arr, new_size);
if (temp != NULL) {
    arr = temp;
} else {
    // Handle failure, arr still valid
}
\`\`\`

---

### free() - Deallocate Memory

\`\`\`c
void free(void *ptr);
\`\`\`

Releases memory back to the system.

\`\`\`c
int *ptr = (int *)malloc(sizeof(int));
*ptr = 100;

free(ptr);     // Memory is released
ptr = NULL;    // IMPORTANT: Avoid dangling pointer

// free(NULL) is safe - does nothing
free(NULL);    // OK, no effect
\`\`\`

**Critical rules:**
- Only free memory from malloc/calloc/realloc
- Don't free same memory twice (double free)
- Don't use memory after freeing (use-after-free)
- Set pointer to NULL after freeing

---

### Dynamic 2D Arrays

**Method 1: Array of pointers (most common)**
\`\`\`c
int rows = 3, cols = 4;

// Allocate array of row pointers
int **matrix = (int **)malloc(rows * sizeof(int *));

// Allocate each row
for (int i = 0; i < rows; i++) {
    matrix[i] = (int *)malloc(cols * sizeof(int));
}

// Use: matrix[i][j]
matrix[1][2] = 42;

// Free in reverse order!
for (int i = 0; i < rows; i++) {
    free(matrix[i]);  // Free each row first
}
free(matrix);         // Then free row pointers
\`\`\`

**Memory layout:**
\`\`\`
matrix → [ptr0][ptr1][ptr2]
           ↓     ↓     ↓
         [0][1][2][3]  (row 0)
         [0][1][2][3]  (row 1)
         [0][1][2][3]  (row 2)
\`\`\`

**Method 2: Single contiguous block (better cache)**
\`\`\`c
int rows = 3, cols = 4;

// Single allocation
int *matrix = (int *)malloc(rows * cols * sizeof(int));

// Access: matrix[i * cols + j]
matrix[1 * cols + 2] = 42;  // matrix[1][2]

// Single free
free(matrix);
\`\`\`

---

### Dynamic Structures

\`\`\`c
struct Student {
    int roll;
    char name[50];
    float marks;
};

// Single structure
struct Student *s = (struct Student *)malloc(sizeof(struct Student));
s->roll = 101;
strcpy(s->name, "John");
s->marks = 85.5;
free(s);

// Array of structures
int n = 10;
struct Student *students = (struct Student *)malloc(n * sizeof(struct Student));
for (int i = 0; i < n; i++) {
    students[i].roll = 100 + i;
}
free(students);
\`\`\`

---

### Common Memory Errors

**1. Memory Leak - forgetting to free:**
\`\`\`c
void leak() {
    int *p = malloc(100 * sizeof(int));
    // No free() - memory is lost forever!
}  // Function ends, but memory not freed

// CORRECT:
void noLeak() {
    int *p = malloc(100 * sizeof(int));
    // ... use p ...
    free(p);
}
\`\`\`

**2. Dangling Pointer - using after free:**
\`\`\`c
int *p = malloc(sizeof(int));
*p = 10;
free(p);
*p = 20;  // DANGEROUS! Memory no longer yours

// CORRECT:
free(p);
p = NULL;  // Safe - dereferencing NULL crashes immediately (easier to debug)
\`\`\`

**3. Double Free - freeing same memory twice:**
\`\`\`c
int *p = malloc(sizeof(int));
free(p);
free(p);  // CRASH or corruption!

// CORRECT:
free(p);
p = NULL;
free(p);  // Safe - free(NULL) does nothing
\`\`\`

**4. Not checking allocation failure:**
\`\`\`c
int *p = malloc(HUGE_SIZE);
*p = 10;  // CRASH if malloc returned NULL!

// CORRECT:
int *p = malloc(HUGE_SIZE);
if (p == NULL) {
    // Handle error
    return;
}
*p = 10;
\`\`\`

**5. Buffer overflow:**
\`\`\`c
int *arr = malloc(5 * sizeof(int));
for (int i = 0; i <= 5; i++) {  // Off-by-one: i <= 5 is wrong!
    arr[i] = i;  // arr[5] is out of bounds!
}

// CORRECT:
for (int i = 0; i < 5; i++) {  // i < 5
    arr[i] = i;
}
\`\`\`

---

### Common Mistakes

**1. Using wrong size in malloc:**
\`\`\`c
int *p = (int *)malloc(10);  // WRONG: 10 bytes, not 10 ints!
int *p = (int *)malloc(10 * sizeof(int));  // CORRECT
\`\`\`

**2. Losing pointer before freeing:**
\`\`\`c
int *p = malloc(sizeof(int));
p = malloc(sizeof(int));  // First allocation leaked!

// CORRECT:
int *p = malloc(sizeof(int));
free(p);
p = malloc(sizeof(int));
\`\`\`

**3. Returning pointer to local variable (not dynamic):**
\`\`\`c
int* badFunction() {
    int x = 10;
    return &x;  // WRONG: x is destroyed after return!
}

// CORRECT:
int* goodFunction() {
    int *x = malloc(sizeof(int));
    *x = 10;
    return x;  // Caller must free!
}
\`\`\`

**4. Wrong realloc usage:**
\`\`\`c
arr = realloc(arr, newSize);  // Loses original if realloc fails!

// CORRECT:
int *temp = realloc(arr, newSize);
if (temp != NULL) arr = temp;
\`\`\`

---

### Key Memory Triggers

- Dynamic memory comes from **heap** (not stack)
- **Always check** malloc/calloc/realloc for NULL
- **Always free** what you allocate
- Set pointer to **NULL after free** (prevents dangling pointer)
- \`malloc\` = uninitialized, \`calloc\` = zero-initialized
- Use **sizeof()** for portability
- \`realloc(NULL, size)\` = \`malloc(size)\`
- \`realloc(ptr, 0)\` = \`free(ptr)\`
- Free in **reverse order** of allocation (2D arrays)
- **Memory leak** = allocate without free
- **Dangling pointer** = use after free
- **Double free** = free same memory twice

---

### Viva Questions

**Q1: What is dynamic memory allocation?**
A: Allocating memory at runtime from the heap, allowing flexible memory management based on program needs.

**Q2: Difference between malloc and calloc?**
A: malloc allocates uninitialized memory (garbage values). calloc allocates zero-initialized memory and takes two arguments (count, size).

**Q3: What does realloc do?**
A: Resizes previously allocated memory. May move data to new location. Returns NULL on failure (original pointer still valid).

**Q4: What is a memory leak?**
A: When allocated memory is not freed and the pointer to it is lost, making the memory inaccessible but still occupied.

**Q5: What is a dangling pointer?**
A: A pointer that points to memory that has been freed. Using it causes undefined behavior.

**Q6: Why set pointer to NULL after free?**
A: To avoid dangling pointer. Dereferencing NULL crashes immediately (easier to debug than subtle corruption).

**Q7: What is double free?**
A: Calling free() on the same memory address twice. Causes heap corruption or crash.

**Q8: Can we return dynamically allocated memory from a function?**
A: Yes. Unlike local variables, heap memory persists after function returns. Caller must free it.

**Q9: What happens if malloc fails?**
A: Returns NULL. Always check the return value before using the pointer.

**Q10: Difference between stack and heap memory?**
A: Stack is automatic (fast, limited size, scope-based). Heap is manual (slower, large, programmer-managed lifetime).

---

### Practical Examples - Module 13

**Q1: Write a program to allocate memory using malloc**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

**Q2: Write a program to allocate memory using calloc**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int n = 5;
    int *arr = (int *)calloc(n, sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    printf("Initial values (should be 0): ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

**Q3: Write a program to demonstrate realloc**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int *arr = (int *)malloc(3 * sizeof(int));
    arr[0] = 10; arr[1] = 20; arr[2] = 30;

    printf("Before realloc: ");
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    printf("\\n");

    arr = (int *)realloc(arr, 5 * sizeof(int));
    arr[3] = 40; arr[4] = 50;

    printf("After realloc: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

**Q4: Write a program to create a dynamic 2D array**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int rows = 3, cols = 4;

    // Allocate array of pointers
    int **matrix = (int **)malloc(rows * sizeof(int *));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int *)malloc(cols * sizeof(int));
    }

    // Initialize
    int count = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = count++;
        }
    }

    // Print
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // Free
    for (int i = 0; i < rows; i++) free(matrix[i]);
    free(matrix);
    return 0;
}
\`\`\`

**Q5: Write a program to dynamically allocate a string**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    char *str = (char *)malloc(50 * sizeof(char));

    if (str == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    strcpy(str, "Hello, Dynamic World!");
    printf("%s\\n", str);

    free(str);
    return 0;
}
\`\`\`

**Q6: Write a program to create dynamic array and find sum**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));
    int sum = 0;

    // Initialize with values
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 2;
    }

    // Calculate sum
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }

    printf("Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\nSum: %d\\n", sum);

    free(arr);
    return 0;
}
\`\`\`

**Q7: Write a program to demonstrate difference between malloc and calloc**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int *mallocArr = (int *)malloc(5 * sizeof(int));
    int *callocArr = (int *)calloc(5, sizeof(int));

    printf("malloc (uninitialized): ");
    for (int i = 0; i < 5; i++) printf("%d ", mallocArr[i]);
    printf("\\n");

    printf("calloc (zero-initialized): ");
    for (int i = 0; i < 5; i++) printf("%d ", callocArr[i]);
    printf("\\n");

    free(mallocArr);
    free(callocArr);
    return 0;
}
\`\`\`

**Q8: Write a program to dynamically allocate structure**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    int roll;
    char name[50];
    float marks;
};

int main() {
    struct Student *s = (struct Student *)malloc(sizeof(struct Student));

    s->roll = 101;
    strcpy(s->name, "John");
    s->marks = 85.5;

    printf("Roll: %d\\n", s->roll);
    printf("Name: %s\\n", s->name);
    printf("Marks: %.2f\\n", s->marks);

    free(s);
    return 0;
}
\`\`\`

**Q9: Write a program to create dynamic array of structures**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Point {
    int x, y;
};

int main() {
    int n = 3;
    struct Point *points = (struct Point *)malloc(n * sizeof(struct Point));

    points[0] = (struct Point){1, 2};
    points[1] = (struct Point){3, 4};
    points[2] = (struct Point){5, 6};

    printf("Points:\\n");
    for (int i = 0; i < n; i++) {
        printf("(%d, %d)\\n", points[i].x, points[i].y);
    }

    free(points);
    return 0;
}
\`\`\`

**Q10: Write a program demonstrating proper memory management**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int *ptr = (int *)malloc(sizeof(int));

    if (ptr == NULL) {
        printf("Allocation failed!\\n");
        return 1;
    }

    *ptr = 100;
    printf("Value: %d\\n", *ptr);

    // Always free allocated memory
    free(ptr);

    // Set to NULL to avoid dangling pointer
    ptr = NULL;

    // Safe check before use
    if (ptr != NULL) {
        printf("Value: %d\\n", *ptr);
    } else {
        printf("Pointer is NULL - safe!\\n");
    }

    return 0;
}
\`\`\`
`
