export const module6 = `
## Module 6: Arrays

### What is an Array?

An **array** is a collection of elements of the **same data type** stored in **contiguous memory** locations. Arrays allow you to store multiple values using a single variable name, accessed by index.

**Why use arrays?**
- Store multiple related values efficiently
- Access elements using index (constant time O(1))
- Process collections of data with loops

**Memory Layout:**
\`\`\`
int arr[5] = {10, 20, 30, 40, 50};

Address:  1000    1004    1008    1012    1016
         +-------+-------+-------+-------+-------+
arr ->   |  10   |  20   |  30   |  40   |  50   |
         +-------+-------+-------+-------+-------+
Index:     [0]     [1]     [2]     [3]     [4]
\`\`\`

Each int takes 4 bytes, so addresses differ by 4.

---

### 1D Array Declaration & Initialization

**Declaration:**
\`\`\`c
data_type array_name[size];
\`\`\`

**Different ways to initialize:**
\`\`\`c
// Method 1: Full initialization
int arr[5] = {1, 2, 3, 4, 5};

// Method 2: Partial initialization (rest become 0)
int arr[5] = {1, 2};        // {1, 2, 0, 0, 0}

// Method 3: All zeros
int arr[5] = {0};           // {0, 0, 0, 0, 0}

// Method 4: Size from initializer
int arr[] = {1, 2, 3};      // Size automatically = 3

// Method 5: No initialization (garbage values!)
int arr[5];                 // Contains random values
\`\`\`

**Accessing elements:**
\`\`\`c
arr[0] = 100;      // Set first element
int x = arr[2];    // Get third element
arr[4] = arr[0] + arr[1];  // Use in expression
\`\`\`

**Important:** Valid indices are 0 to (size-1).

---

### Array Size Calculation

\`\`\`c
int arr[] = {10, 20, 30, 40, 50};

int total_bytes = sizeof(arr);           // 20 (5 * 4 bytes)
int element_size = sizeof(arr[0]);       // 4 (size of int)
int num_elements = sizeof(arr) / sizeof(arr[0]);  // 5
\`\`\`

**Note:** This only works in the same scope where array is declared. When passed to a function, array decays to pointer!

\`\`\`c
void func(int arr[]) {
    // sizeof(arr) here gives pointer size (8 on 64-bit)
    // NOT array size!
}
\`\`\`

---

### 2D Arrays (Matrices)

A 2D array is an "array of arrays" - a table with rows and columns.

**Declaration:**
\`\`\`c
data_type array_name[rows][columns];
\`\`\`

**Initialization:**
\`\`\`c
// Method 1: Nested braces
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

// Method 2: Linear initialization
int matrix[2][3] = {1, 2, 3, 4, 5, 6};

// Method 3: Partial initialization
int matrix[2][3] = {{1}, {4}};  // Rest are 0
/*
    1  0  0
    4  0  0
*/

// Rows can be omitted if initialized
int matrix[][3] = {{1,2,3}, {4,5,6}};  // 2 rows inferred
\`\`\`

**Memory Layout (Row-Major Order):**
\`\`\`
int matrix[2][3] = {{1,2,3}, {4,5,6}};

Memory: | 1 | 2 | 3 | 4 | 5 | 6 |
        Row 0         Row 1

Address = Base + (row * num_cols + col) * sizeof(element)
matrix[1][2] = Base + (1 * 3 + 2) * 4 = Base + 20
\`\`\`

**Accessing elements:**
\`\`\`c
matrix[0][0] = 10;     // First element
matrix[1][2] = 60;     // Row 1, Column 2
int x = matrix[0][2];  // Get element
\`\`\`

---

### Multi-Dimensional Arrays

C supports arrays with more than 2 dimensions:

\`\`\`c
int cube[3][3][3];     // 3D array (27 elements)
int hyper[2][3][4][5]; // 4D array (120 elements)

// Accessing
cube[0][1][2] = 100;
\`\`\`

Memory is still stored linearly in row-major order.

---

### Array and Pointer Relationship

**Array name is a pointer** to the first element (with some differences):

\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};

// arr is equivalent to &arr[0]
printf("%p\\n", arr);       // Address of arr[0]
printf("%p\\n", &arr[0]);   // Same address

// Pointer arithmetic
printf("%d\\n", *arr);      // 10 (first element)
printf("%d\\n", *(arr+1));  // 20 (second element)
printf("%d\\n", *(arr+4));  // 50 (fifth element)
\`\`\`

**Equivalences:**
| Array Notation | Pointer Notation |
|----------------|------------------|
| \`arr[i]\` | \`*(arr + i)\` |
| \`&arr[i]\` | \`arr + i\` |
| \`arr[0]\` | \`*arr\` |

**Key Difference:**
\`\`\`c
int arr[5];
int *ptr = arr;

sizeof(arr);  // 20 (total array size)
sizeof(ptr);  // 8 (pointer size on 64-bit)

arr++;        // ERROR! Array name is not modifiable
ptr++;        // OK! Pointer can be modified
\`\`\`

---

### Passing Arrays to Functions

Arrays are **passed by reference** (as pointer to first element):

\`\`\`c
// Method 1: As unsized array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
}

// Method 2: As pointer (equivalent)
void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", *(arr + i));
    }
}

// Method 3: With size in declaration (informational only)
void printArray(int arr[10], int size) {
    // The 10 is ignored by compiler!
}
\`\`\`

**For 2D arrays, column size is required:**
\`\`\`c
void printMatrix(int matrix[][3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}
\`\`\`

---

### Common Array Operations

**1. Finding minimum/maximum:**
\`\`\`c
int findMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
\`\`\`

**2. Linear Search:**
\`\`\`c
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) return i;
    }
    return -1;  // Not found
}
\`\`\`

**3. Binary Search (sorted array):**
\`\`\`c
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == key) return mid;
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
\`\`\`

---

### Common Mistakes

**1. Array index out of bounds:**
\`\`\`c
int arr[5];
arr[5] = 10;   // WRONG! Valid indices: 0-4
arr[-1] = 20;  // WRONG! Negative index
// No error at compile time - undefined behavior at runtime!
\`\`\`

**2. Comparing arrays with ==:**
\`\`\`c
int a[3] = {1, 2, 3};
int b[3] = {1, 2, 3};
if (a == b) { }  // WRONG! Compares addresses, not contents
// Use loop to compare element by element
\`\`\`

**3. Assigning one array to another:**
\`\`\`c
int a[5] = {1, 2, 3, 4, 5};
int b[5];
b = a;  // ERROR! Cannot assign arrays
// Use loop or memcpy()
\`\`\`

**4. Forgetting to pass size:**
\`\`\`c
void func(int arr[]) {
    int n = sizeof(arr) / sizeof(arr[0]);  // WRONG!
    // arr is a pointer here, not array
}
// Always pass size as separate parameter
\`\`\`

**5. Variable length array (VLA) issues:**
\`\`\`c
int n = 10;
int arr[n];  // C99 VLA - size not known at compile time
// Cannot use initializer: int arr[n] = {0};  // ERROR!
\`\`\`

---

### Key Memory Triggers

- Index starts at **0**, ends at **size-1**
- Array name = **pointer to first element**
- **No bounds checking** - accessing out of range is undefined behavior
- 2D arrays stored in **row-major** order
- Arrays passed to functions **decay to pointers**
- Calculate size: \`sizeof(arr) / sizeof(arr[0])\` (only in same scope)
- Cannot assign or compare arrays directly

---

### Viva Questions

**Q1: What is the starting index of an array in C?**
A: 0 (zero-based indexing).

**Q2: How is 2D array stored in memory?**
A: In row-major order - all elements of row 0, then row 1, etc.

**Q3: What is array decay?**
A: When passed to a function, array "decays" to a pointer to its first element, losing size information.

**Q4: What happens when you access arr[10] in a 5-element array?**
A: Undefined behavior - may crash, return garbage, or appear to work.

**Q5: Can array size be determined at runtime?**
A: Yes, using Variable Length Arrays (VLA) in C99+, but cannot be initialized.

**Q6: Difference between arr and &arr?**
A: \`arr\` points to first element (type int*). \`&arr\` points to whole array (type int(*)[5]). Same address, different pointer arithmetic.

**Q7: How to find size of array passed to function?**
A: You cannot - must pass size as separate parameter.

**Q8: What is the formula to access 2D array element?**
A: Address = Base + (row * num_columns + column) * sizeof(element)

---

### Practical Examples - Module 6

**Q1: Write a program to find the sum and average of array elements**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    int sum = 0;

    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }

    printf("Sum = %d\\n", sum);
    printf("Average = %.2f\\n", (float)sum / n);
    return 0;
}
\`\`\`

**Q2: Write a program to find the largest element in an array**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {45, 23, 89, 12, 67};
    int n = sizeof(arr) / sizeof(arr[0]);
    int max = arr[0];

    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    printf("Largest element: %d\\n", max);
    return 0;
}
\`\`\`

**Q3: Write a program to reverse an array**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    // Reverse
    for (int i = 0; i < n / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = temp;
    }

    printf("\\nReversed: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}
\`\`\`

**Q4: Write a program to sort an array using bubble sort**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = sizeof(arr) / sizeof(arr[0]);

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}
\`\`\`

**Q5: Write a program to search an element using linear search**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 30, found = -1;

    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            found = i;
            break;
        }
    }

    if (found != -1)
        printf("%d found at index %d\\n", key, found);
    else
        printf("%d not found\\n", key);
    return 0;
}
\`\`\`

**Q6: Write a program to add two matrices**
\`\`\`c
#include <stdio.h>
int main() {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            c[i][j] = a[i][j] + b[i][j];
        }
    }

    printf("Sum of matrices:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", c[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Q7: Write a program to multiply two matrices**
\`\`\`c
#include <stdio.h>
int main() {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2] = {0};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    printf("Product of matrices:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", c[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Q8: Write a program to find the transpose of a matrix**
\`\`\`c
#include <stdio.h>
int main() {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int t[3][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            t[j][i] = a[i][j];
        }
    }

    printf("Transpose:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", t[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Q9: Write a program to count even and odd numbers in an array**
\`\`\`c
#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    int even = 0, odd = 0;

    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0)
            even++;
        else
            odd++;
    }

    printf("Even numbers: %d\\n", even);
    printf("Odd numbers: %d\\n", odd);
    return 0;
}
\`\`\`

**Q10: Write a program to merge two arrays**
\`\`\`c
#include <stdio.h>
int main() {
    int a[] = {1, 3, 5};
    int b[] = {2, 4, 6};
    int c[6];
    int na = 3, nb = 3;

    for (int i = 0; i < na; i++) c[i] = a[i];
    for (int i = 0; i < nb; i++) c[na + i] = b[i];

    printf("Merged array: ");
    for (int i = 0; i < na + nb; i++) {
        printf("%d ", c[i]);
    }
    printf("\\n");
    return 0;
}
\`\`\`
`
