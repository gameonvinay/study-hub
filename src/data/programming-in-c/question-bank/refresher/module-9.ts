export const module9 = `
## Module 9: Recursion

### What is Recursion?

**Recursion** is a programming technique where a function calls itself to solve a problem. It breaks down complex problems into smaller, similar sub-problems.

**Two essential components:**
1. **Base case** - Condition to stop recursion (prevents infinite loops)
2. **Recursive case** - Function calls itself with modified parameters

\`\`\`c
returnType function(params) {
    if (base_condition) {
        return base_value;      // Base case - stops recursion
    }
    return function(modified_params);  // Recursive case
}
\`\`\`

---

### How Recursion Works (Call Stack)

Each recursive call creates a new **stack frame** containing:
- Local variables
- Parameters
- Return address

\`\`\`
factorial(4) call:

Call Stack:
┌─────────────────┐
│ factorial(1)=1  │ ← Base case reached, returns 1
├─────────────────┤
│ factorial(2)    │ ← Returns 2*1 = 2
├─────────────────┤
│ factorial(3)    │ ← Returns 3*2 = 6
├─────────────────┤
│ factorial(4)    │ ← Returns 4*6 = 24
└─────────────────┘
\`\`\`

**Execution flow for factorial(4):**
\`\`\`
factorial(4)
├── 4 * factorial(3)
│   ├── 3 * factorial(2)
│   │   ├── 2 * factorial(1)
│   │   │   └── returns 1 (base case)
│   │   └── returns 2 * 1 = 2
│   └── returns 3 * 2 = 6
└── returns 4 * 6 = 24
\`\`\`

---

### Classic Recursion Examples

#### 1. Factorial

\`\`\`c
// n! = n × (n-1) × (n-2) × ... × 1
// 5! = 5 × 4 × 3 × 2 × 1 = 120

long factorial(int n) {
    if (n <= 1) return 1;        // Base case
    return n * factorial(n - 1); // Recursive case
}
\`\`\`

**Trace:**
\`\`\`
factorial(5) = 5 * factorial(4)
             = 5 * 4 * factorial(3)
             = 5 * 4 * 3 * factorial(2)
             = 5 * 4 * 3 * 2 * factorial(1)
             = 5 * 4 * 3 * 2 * 1
             = 120
\`\`\`

#### 2. Fibonacci

\`\`\`c
// Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...
// F(n) = F(n-1) + F(n-2)

int fibonacci(int n) {
    if (n <= 1) return n;        // Base cases: F(0)=0, F(1)=1
    return fibonacci(n-1) + fibonacci(n-2);
}
\`\`\`

**Note:** This naive implementation has O(2^n) time complexity (very slow for large n). Use memoization or iteration for better performance.

#### 3. GCD (Euclidean Algorithm)

\`\`\`c
// GCD(a, b) = GCD(b, a % b)
// GCD(a, 0) = a

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
\`\`\`

**Trace GCD(48, 18):**
\`\`\`
gcd(48, 18) → gcd(18, 48%18) = gcd(18, 12)
gcd(18, 12) → gcd(12, 18%12) = gcd(12, 6)
gcd(12, 6)  → gcd(6, 12%6)   = gcd(6, 0)
gcd(6, 0)   → returns 6 (base case)
\`\`\`

---

### Types of Recursion

| Type | Description | Example |
|------|-------------|---------|
| Direct | Function calls itself | factorial() |
| Indirect | A calls B, B calls A | A() → B() → A() |
| Tail | Recursive call is last operation | Optimizable by compiler |
| Head | Recursive call is first operation | Processing happens while returning |
| Tree/Multiple | Multiple recursive calls | Fibonacci, Tower of Hanoi |

**Tail Recursion (Optimizable):**
\`\`\`c
// Tail recursive - recursive call is the LAST thing
int factorialTail(int n, int acc) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);  // Last operation
}
// Call: factorialTail(5, 1)
\`\`\`

**Non-Tail Recursion:**
\`\`\`c
// NOT tail recursive - multiplication happens AFTER recursive call
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // Multiply after recursion
}
\`\`\`

---

### Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Memory | Uses stack (more memory) | Uses fixed memory |
| Speed | Slower (function call overhead) | Faster |
| Code | Often cleaner/shorter | May be complex |
| Risk | Stack overflow possible | No stack overflow |
| Use case | Tree structures, divide & conquer | Linear problems |

**Same problem - both ways:**
\`\`\`c
// Recursive sum
int sumRecursive(int n) {
    if (n == 0) return 0;
    return n + sumRecursive(n - 1);
}

// Iterative sum
int sumIterative(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
\`\`\`

---

### Common Recursive Problems

**1. Sum of digits:**
\`\`\`c
int sumDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}
// sumDigits(123) = 3 + sumDigits(12) = 3 + 2 + sumDigits(1) = 3 + 2 + 1 = 6
\`\`\`

**2. Power calculation:**
\`\`\`c
long power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}
// power(2, 3) = 2 * power(2, 2) = 2 * 2 * power(2, 1) = 2 * 2 * 2 = 8
\`\`\`

**3. Array sum:**
\`\`\`c
int arraySum(int arr[], int n) {
    if (n == 0) return 0;
    return arr[n-1] + arraySum(arr, n-1);
}
\`\`\`

**4. Binary search:**
\`\`\`c
int binarySearch(int arr[], int low, int high, int key) {
    if (low > high) return -1;  // Not found
    int mid = (low + high) / 2;
    if (arr[mid] == key) return mid;
    if (arr[mid] > key)
        return binarySearch(arr, low, mid - 1, key);
    return binarySearch(arr, mid + 1, high, key);
}
\`\`\`

---

### Common Mistakes

**1. Missing base case:**
\`\`\`c
int badFactorial(int n) {
    return n * badFactorial(n - 1);  // Never stops!
}
// Stack overflow crash!
\`\`\`

**2. Wrong base case:**
\`\`\`c
int badFib(int n) {
    if (n == 0) return 0;  // Missing n == 1 case!
    return badFib(n-1) + badFib(n-2);
}
// badFib(1) → badFib(0) + badFib(-1) → infinite recursion!
\`\`\`

**3. Not progressing toward base case:**
\`\`\`c
int badSum(int n) {
    if (n == 0) return 0;
    return n + badSum(n);  // Should be n-1, not n!
}
// Infinite recursion!
\`\`\`

**4. Deep recursion (stack overflow):**
\`\`\`c
// Very deep recursion can crash
factorial(100000);  // May cause stack overflow!
// Use iteration for large values
\`\`\`

---

### Key Memory Triggers

- **Base case** stops recursion (MUST have one!)
- **Recursive case** moves toward base case
- Each call uses **stack memory** (limited)
- **Stack overflow** if too deep or infinite recursion
- **Tail recursion** can be optimized by compiler
- Every recursive solution has an **iterative equivalent**
- Recursion is elegant for **tree structures** and **divide & conquer**

---

### Viva Questions

**Q1: What is recursion?**
A: A technique where a function calls itself to solve smaller sub-problems of the same type.

**Q2: What are the two essential parts of recursion?**
A: Base case (stopping condition) and recursive case (function calling itself with modified parameters).

**Q3: What is a base case?**
A: Condition that stops the recursion. Without it, recursion would continue forever.

**Q4: What is stack overflow?**
A: Error when recursion is too deep and exhausts the call stack memory.

**Q5: Difference between recursion and iteration?**
A: Recursion uses function calls and stack memory. Iteration uses loops and fixed memory.

**Q6: What is tail recursion?**
A: When the recursive call is the last operation in the function. Can be optimized by compiler.

**Q7: Can every recursive problem be solved iteratively?**
A: Yes. Every recursive solution has an equivalent iterative solution.

**Q8: What happens if base case is missing?**
A: Infinite recursion leading to stack overflow and program crash.

---

### Practical Examples - Module 9

**Q1: Write a recursive function to calculate factorial**
\`\`\`c
#include <stdio.h>

long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("5! = %ld\\n", factorial(5));
    printf("10! = %ld\\n", factorial(10));
    return 0;
}
\`\`\`

**Q2: Write a recursive function to find nth Fibonacci number**
\`\`\`c
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("First 10 Fibonacci numbers: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Q3: Write a recursive function to find GCD of two numbers**
\`\`\`c
#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    printf("GCD of 48 and 18: %d\\n", gcd(48, 18));
    printf("GCD of 56 and 42: %d\\n", gcd(56, 42));
    return 0;
}
\`\`\`

**Q4: Write a recursive function to calculate power**
\`\`\`c
#include <stdio.h>

long power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int main() {
    printf("2^10 = %ld\\n", power(2, 10));
    printf("3^5 = %ld\\n", power(3, 5));
    return 0;
}
\`\`\`

**Q5: Write a recursive function to find sum of digits**
\`\`\`c
#include <stdio.h>

int sumOfDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumOfDigits(n / 10);
}

int main() {
    printf("Sum of digits of 12345: %d\\n", sumOfDigits(12345));
    return 0;
}
\`\`\`

**Q6: Write a recursive function to reverse a string**
\`\`\`c
#include <stdio.h>
#include <string.h>

void reverseStr(char *str, int start, int end) {
    if (start >= end) return;
    char temp = str[start];
    str[start] = str[end];
    str[end] = temp;
    reverseStr(str, start + 1, end - 1);
}

int main() {
    char str[] = "Hello";
    reverseStr(str, 0, strlen(str) - 1);
    printf("Reversed: %s\\n", str);
    return 0;
}
\`\`\`

**Q7: Write a recursive function to check if a number is palindrome**
\`\`\`c
#include <stdio.h>

int reverseNum(int n, int rev) {
    if (n == 0) return rev;
    return reverseNum(n / 10, rev * 10 + n % 10);
}

int isPalindrome(int n) {
    return n == reverseNum(n, 0);
}

int main() {
    printf("12321 is %spalindrome\\n", isPalindrome(12321) ? "" : "not ");
    printf("12345 is %spalindrome\\n", isPalindrome(12345) ? "" : "not ");
    return 0;
}
\`\`\`

**Q8: Write a recursive function to print array elements**
\`\`\`c
#include <stdio.h>

void printArray(int arr[], int n, int i) {
    if (i == n) return;
    printf("%d ", arr[i]);
    printArray(arr, n, i + 1);
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printArray(arr, 5, 0);
    printf("\\n");
    return 0;
}
\`\`\`

**Q9: Write a recursive function to find sum of array elements**
\`\`\`c
#include <stdio.h>

int arraySum(int arr[], int n) {
    if (n <= 0) return 0;
    return arr[n - 1] + arraySum(arr, n - 1);
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printf("Sum: %d\\n", arraySum(arr, 5));
    return 0;
}
\`\`\`

**Q10: Write a recursive function for binary search**
\`\`\`c
#include <stdio.h>

int binarySearch(int arr[], int low, int high, int key) {
    if (low > high) return -1;
    int mid = (low + high) / 2;
    if (arr[mid] == key) return mid;
    if (arr[mid] > key)
        return binarySearch(arr, low, mid - 1, key);
    return binarySearch(arr, mid + 1, high, key);
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int key = 30;
    int result = binarySearch(arr, 0, 4, key);
    if (result != -1)
        printf("%d found at index %d\\n", key, result);
    else
        printf("%d not found\\n", key);
    return 0;
}
\`\`\`
`
