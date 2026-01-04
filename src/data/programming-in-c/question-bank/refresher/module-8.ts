export const module8 = `
## Module 8: Functions

### What is a Function?

A **function** is a self-contained block of code that performs a specific task. Functions promote:
- **Code reusability** - Write once, use many times
- **Modularity** - Break complex problems into smaller parts
- **Abstraction** - Hide implementation details
- **Maintainability** - Easier to debug and modify

**Types of Functions:**
| Type | Description | Examples |
|------|-------------|----------|
| Library Functions | Pre-defined in header files | printf(), scanf(), strlen() |
| User-defined Functions | Created by programmer | Any function you write |

---

### Function Components

\`\`\`c
return_type function_name(parameter_list) {
    // function body
    return value;  // optional for void
}
\`\`\`

**Components:**
1. **Return type**: Data type of value returned (int, float, void, etc.)
2. **Function name**: Identifier following naming rules
3. **Parameters**: Input values (optional)
4. **Function body**: Statements that perform the task
5. **Return statement**: Value sent back to caller (optional for void)

---

### Function Declaration (Prototype)

Tells compiler about function before its use:

\`\`\`c
return_type function_name(parameter_types);
\`\`\`

\`\`\`c
// Declaration/Prototype (at top or in header file)
int add(int, int);        // Parameter names optional
int add(int a, int b);    // With names (better for readability)

// Definition (anywhere in file)
int add(int a, int b) {
    return a + b;
}

// Usage
int result = add(5, 3);
\`\`\`

**Why declare?** Compiler needs to know return type and parameters before function call to:
- Check correct number/types of arguments
- Handle return value properly

---

### Categories of Functions

**Based on arguments and return value:**

| Category | Parameters | Return | Example |
|----------|------------|--------|---------|
| No args, No return | void | void | \`void greet(void)\` |
| With args, No return | Yes | void | \`void printNum(int n)\` |
| No args, With return | void | Yes | \`int getInput(void)\` |
| With args, With return | Yes | Yes | \`int add(int a, int b)\` |

\`\`\`c
// No arguments, No return
void greet(void) {
    printf("Hello!\\n");
}

// With arguments, No return
void printSquare(int n) {
    printf("%d squared = %d\\n", n, n * n);
}

// No arguments, With return
int getNumber(void) {
    int n;
    scanf("%d", &n);
    return n;
}

// With arguments, With return
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

---

### Parameter Passing

#### Call by Value

A **copy** of the argument is passed. Original variable is unchanged.

\`\`\`c
void increment(int x) {
    x++;  // Modifies local copy only
    printf("Inside function: %d\\n", x);  // 11
}

int main() {
    int num = 10;
    increment(num);
    printf("After function: %d\\n", num);  // Still 10!
    return 0;
}
\`\`\`

**Memory visualization:**
\`\`\`
main():     num = 10
            ↓ (copy value)
increment(): x = 10 → 11 (local copy modified)
main():     num = 10 (unchanged)
\`\`\`

#### Call by Reference (using pointers)

**Address** of variable is passed. Original can be modified.

\`\`\`c
void increment(int *x) {
    (*x)++;  // Modifies value at address
    printf("Inside function: %d\\n", *x);  // 11
}

int main() {
    int num = 10;
    increment(&num);  // Pass address
    printf("After function: %d\\n", num);  // 11!
    return 0;
}
\`\`\`

**Memory visualization:**
\`\`\`
main():     num = 10 (at address 0x100)
            ↓ (pass address 0x100)
increment(): x = 0x100 → modifies value at 0x100
main():     num = 11 (modified!)
\`\`\`

**Comparison:**
| Feature | Call by Value | Call by Reference |
|---------|---------------|-------------------|
| What's passed | Copy of value | Address of variable |
| Original modified | No | Yes |
| Syntax | \`func(x)\` | \`func(&x)\` |
| Parameter type | \`int x\` | \`int *x\` |
| Use when | Value shouldn't change | Need to modify original |

---

### Passing Arrays to Functions

Arrays are **always passed by reference** (as pointer to first element):

\`\`\`c
// All three declarations are equivalent:
void printArray(int arr[], int size);
void printArray(int *arr, int size);
void printArray(int arr[10], int size);  // Size ignored

void modifyArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // Modifies original array!
    }
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    modifyArray(nums, 5);
    // nums is now {2, 4, 6, 8, 10}
}
\`\`\`

**Note:** Must pass size separately - sizeof(arr) in function gives pointer size, not array size.

---

### Returning Multiple Values

C functions can only return one value, but we can return multiple using:

**Method 1: Pointers**
\`\`\`c
void minMax(int arr[], int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    int min, max;
    minMax(arr, 5, &min, &max);
    printf("Min: %d, Max: %d\\n", min, max);
}
\`\`\`

**Method 2: Structure**
\`\`\`c
struct Result {
    int min;
    int max;
};

struct Result findMinMax(int arr[], int n) {
    struct Result r = {arr[0], arr[0]};
    for (int i = 1; i < n; i++) {
        if (arr[i] < r.min) r.min = arr[i];
        if (arr[i] > r.max) r.max = arr[i];
    }
    return r;
}
\`\`\`

---

### Static Variables in Functions

Static local variables:
- Initialized **only once** (at first call)
- **Retain value** between function calls
- Have **local scope** but **program lifetime**

\`\`\`c
void counter() {
    static int count = 0;  // Initialized once!
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

**Use cases:**
- Counting function calls
- Caching expensive computations
- Generating unique IDs

---

### Function Scope and Lifetime

| Variable Type | Scope | Lifetime | Default Value |
|---------------|-------|----------|---------------|
| Local (auto) | Function | Until function returns | Garbage |
| Static local | Function | Entire program | 0 |
| Global | Entire file | Entire program | 0 |
| Parameter | Function | Until function returns | Passed value |

\`\`\`c
int globalVar = 100;  // Global scope, program lifetime

void demo() {
    int localVar = 10;       // Destroyed when function ends
    static int staticVar = 0; // Persists between calls
}
\`\`\`

---

### Common Mistakes

**1. Returning address of local variable:**
\`\`\`c
int* badFunction() {
    int x = 10;
    return &x;  // DANGEROUS! x is destroyed after return
}
// The returned pointer is a "dangling pointer"
\`\`\`

**2. Missing return statement:**
\`\`\`c
int add(int a, int b) {
    int sum = a + b;
    // Missing return sum;
}  // Undefined behavior!
\`\`\`

**3. Wrong parameter order:**
\`\`\`c
void divide(int dividend, int divisor);
divide(5, 20);  // Probably meant divide(20, 5)
\`\`\`

**4. Not using prototypes:**
\`\`\`c
int main() {
    printf("%d\\n", add(5, 3));  // Error: add unknown
    return 0;
}

int add(int a, int b) { return a + b; }
\`\`\`

**5. Modifying call-by-value parameters expecting change:**
\`\`\`c
void tryToModify(int x) {
    x = 100;  // Only modifies local copy!
}
\`\`\`

---

### Key Memory Triggers

- **Declaration/Prototype** before first call or at top of file
- **Call by value**: Copy passed, original unchanged
- **Call by reference**: Address passed, original can be modified
- Arrays always passed as **pointers** (by reference)
- **Static local** variables retain value between calls
- Default return type is **int** (but always specify explicitly)
- Never return address of **local variable** (dangling pointer)
- Functions can return **only one value** (use pointers/structs for multiple)

---

### Viva Questions

**Q1: Difference between declaration and definition?**
A: Declaration tells compiler about function signature (return type, name, parameters). Definition provides the actual implementation.

**Q2: What is call by value?**
A: Copy of argument is passed to function. Original variable cannot be modified by the function.

**Q3: How to modify original variable from function?**
A: Pass address of variable (pointer) and dereference inside function (call by reference).

**Q4: Why are arrays always passed by reference?**
A: Array name decays to pointer. Passing entire array by value would be inefficient.

**Q5: What is a static local variable?**
A: Variable that retains its value between function calls. Initialized only once.

**Q6: Can a function return multiple values?**
A: Not directly. Use pointers (out parameters) or return a structure.

**Q7: What happens if we return address of local variable?**
A: Creates dangling pointer - the memory is deallocated when function returns.

**Q8: What is a function prototype?**
A: Declaration that tells compiler about function's return type and parameters before its actual definition.

---

### Practical Examples - Module 8

**Q1: Write a function to find the maximum of two numbers**
\`\`\`c
#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    printf("Max of 10 and 25: %d\\n", max(10, 25));
    return 0;
}
\`\`\`

**Q2: Write a function to calculate the area of a circle**
\`\`\`c
#include <stdio.h>
#define PI 3.14159

float circleArea(float radius) {
    return PI * radius * radius;
}

int main() {
    float r = 5.0;
    printf("Area of circle with radius %.1f: %.2f\\n", r, circleArea(r));
    return 0;
}
\`\`\`

**Q3: Write a function to check if a number is prime**
\`\`\`c
#include <stdio.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    for (int i = 1; i <= 20; i++) {
        if (isPrime(i)) printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Q4: Write a function to swap two numbers using pointers (call by reference)**
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

**Q5: Write a function to find the factorial of a number**
\`\`\`c
#include <stdio.h>

long factorial(int n) {
    long fact = 1;
    for (int i = 2; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

int main() {
    printf("5! = %ld\\n", factorial(5));
    printf("10! = %ld\\n", factorial(10));
    return 0;
}
\`\`\`

**Q6: Write a function to reverse a string**
\`\`\`c
#include <stdio.h>
#include <string.h>

void reverseString(char *str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

int main() {
    char str[] = "Hello";
    printf("Original: %s\\n", str);
    reverseString(str);
    printf("Reversed: %s\\n", str);
    return 0;
}
\`\`\`

**Q7: Write a function that returns multiple values using pointers**
\`\`\`c
#include <stdio.h>

void minMax(int arr[], int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main() {
    int arr[] = {45, 23, 89, 12, 67};
    int min, max;
    minMax(arr, 5, &min, &max);
    printf("Min: %d, Max: %d\\n", min, max);
    return 0;
}
\`\`\`

**Q8: Write a function to calculate power of a number**
\`\`\`c
#include <stdio.h>

long power(int base, int exp) {
    long result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    printf("2^10 = %ld\\n", power(2, 10));
    printf("3^5 = %ld\\n", power(3, 5));
    return 0;
}
\`\`\`

**Q9: Write a function to count occurrences of a character in a string**
\`\`\`c
#include <stdio.h>

int countChar(char *str, char ch) {
    int count = 0;
    while (*str != '\\0') {
        if (*str == ch) count++;
        str++;
    }
    return count;
}

int main() {
    char str[] = "Hello World";
    printf("'l' appears %d times\\n", countChar(str, 'l'));
    return 0;
}
\`\`\`

**Q10: Write a function using static variable to count function calls**
\`\`\`c
#include <stdio.h>

int callCounter() {
    static int count = 0;  // Retains value between calls
    count++;
    return count;
}

int main() {
    printf("Call #%d\\n", callCounter());
    printf("Call #%d\\n", callCounter());
    printf("Call #%d\\n", callCounter());
    printf("Call #%d\\n", callCounter());
    return 0;
}
\`\`\`
`
