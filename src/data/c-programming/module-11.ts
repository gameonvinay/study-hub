export const module11 = `
## Module 11: Structures & Unions

### What is a Structure?

A **structure** is a user-defined data type that groups related variables of different data types under a single name. Unlike arrays (same type), structures can hold different types together.

**Why use structures?**
- Group related data (student: name, roll, marks)
- Create custom data types
- Organize complex data
- Foundation for data structures (linked lists, trees)

\`\`\`c
struct Student {
    int roll;        // 4 bytes
    char name[50];   // 50 bytes
    float marks;     // 4 bytes
};  // Don't forget the semicolon!
\`\`\`

---

### Structure Declaration and Initialization

**Method 1: Declaration then initialization**
\`\`\`c
struct Student s1;
s1.roll = 101;
strcpy(s1.name, "John");  // Cannot use = for strings
s1.marks = 85.5;
\`\`\`

**Method 2: Declaration with initialization**
\`\`\`c
struct Student s1 = {101, "John", 85.5};
\`\`\`

**Method 3: Designated initializers (C99)**
\`\`\`c
struct Student s1 = {
    .roll = 101,
    .name = "John",
    .marks = 85.5
};
\`\`\`

---

### Accessing Structure Members

**Dot operator (.)** - for direct access:
\`\`\`c
struct Student s1 = {101, "John", 85.5};
printf("Roll: %d\\n", s1.roll);
printf("Name: %s\\n", s1.name);
printf("Marks: %.2f\\n", s1.marks);
\`\`\`

**Arrow operator (->)** - for pointer access:
\`\`\`c
struct Student *ptr = &s1;
printf("Roll: %d\\n", ptr->roll);    // Preferred
printf("Roll: %d\\n", (*ptr).roll);  // Equivalent but verbose
\`\`\`

| Operator | Used with | Example |
|----------|-----------|---------|
| \`.\` | Structure variable | \`s1.roll\` |
| \`->\` | Pointer to structure | \`ptr->roll\` |

---

### Structure Memory Layout

Structure size = sum of members + **padding** (for alignment):

\`\`\`c
struct Example {
    char c;     // 1 byte + 3 padding (align to 4)
    int i;      // 4 bytes
    char d;     // 1 byte + 3 padding
};  // Total: 12 bytes (not 6!)

// Better arrangement:
struct BetterExample {
    int i;      // 4 bytes
    char c;     // 1 byte
    char d;     // 1 byte + 2 padding
};  // Total: 8 bytes
\`\`\`

**Padding rules:**
- Members aligned to their size (or max alignment)
- Structure size is multiple of largest member alignment
- Order members by size (largest first) to minimize padding

---

### Array of Structures

\`\`\`c
struct Student students[3] = {
    {101, "Alice", 85.5},
    {102, "Bob", 78.0},
    {103, "Charlie", 92.5}
};

// Access
for (int i = 0; i < 3; i++) {
    printf("%d: %s - %.2f\\n",
           students[i].roll,
           students[i].name,
           students[i].marks);
}
\`\`\`

---

### Nested Structures

Structures containing other structures:

\`\`\`c
struct Date {
    int day, month, year;
};

struct Employee {
    int id;
    char name[50];
    struct Date doj;      // Nested structure
    struct Date dob;
};

struct Employee emp = {
    101,
    "John",
    {15, 8, 2023},  // doj
    {20, 5, 1990}   // dob
};

printf("DOJ: %d/%d/%d\\n", emp.doj.day, emp.doj.month, emp.doj.year);
\`\`\`

---

### Passing Structures to Functions

**By value (copy):**
\`\`\`c
void display(struct Student s) {  // Copy made
    printf("%s\\n", s.name);
}
display(s1);  // Changes inside won't affect s1
\`\`\`

**By reference (pointer):**
\`\`\`c
void modify(struct Student *s) {  // Address passed
    s->marks = 95.0;  // Modifies original
}
modify(&s1);
\`\`\`

**Returning structure:**
\`\`\`c
struct Point createPoint(int x, int y) {
    struct Point p = {x, y};
    return p;  // Returns copy of structure
}
\`\`\`

---

### typedef with Structures

Creates an alias to avoid writing \`struct\` repeatedly:

\`\`\`c
// Without typedef
struct Point {
    int x, y;
};
struct Point p1;  // Must use 'struct'

// With typedef
typedef struct {
    int x, y;
} Point;
Point p1;  // No need for 'struct'

// Named struct with typedef
typedef struct Node {
    int data;
    struct Node *next;  // Must use 'struct Node' inside
} Node;
\`\`\`

---

### Self-Referential Structures

Structure containing pointer to itself - used for linked data structures:

\`\`\`c
struct Node {
    int data;
    struct Node *next;  // Pointer to same type
};

// Cannot have struct Node next; (infinite size!)
// Must use pointer to self
\`\`\`

---

### Unions

**Union** is like structure, but all members **share the same memory**:

\`\`\`c
union Data {
    int i;      // 4 bytes
    float f;    // 4 bytes
    char c;     // 1 byte
};  // Size = 4 bytes (largest member)

union Data d;
d.i = 10;       // Only i is valid
printf("%d", d.i);  // 10

d.f = 3.14;     // Now only f is valid
printf("%.2f", d.f);  // 3.14
printf("%d", d.i);    // Garbage! (same memory reinterpreted)
\`\`\`

---

### Structure vs Union

| Aspect | Structure | Union |
|--------|-----------|-------|
| Memory | Sum of all members | Size of largest member |
| Access | All members valid simultaneously | Only one member valid at a time |
| Use case | Group related data | Save memory, type variants |
| Keyword | \`struct\` | \`union\` |

**Example sizes:**
\`\`\`c
struct S { int i; float f; char c; };  // 12 bytes (with padding)
union  U { int i; float f; char c; };  // 4 bytes
\`\`\`

---

### Common Mistakes

**1. Forgetting semicolon after definition:**
\`\`\`c
struct Point {
    int x, y;
}      // ERROR! Missing semicolon

struct Point {
    int x, y;
};     // CORRECT
\`\`\`

**2. Using = for string members:**
\`\`\`c
struct Person p;
p.name = "John";     // ERROR! Use strcpy
strcpy(p.name, "John");  // CORRECT
\`\`\`

**3. Comparing structures directly:**
\`\`\`c
if (s1 == s2) { }    // ERROR! Cannot compare
// Compare member by member instead
\`\`\`

**4. Confusion with union:**
\`\`\`c
union Data d;
d.i = 10;
d.f = 3.14;
printf("%d", d.i);   // Garbage! i was overwritten
\`\`\`

---

### Key Memory Triggers

- Structure = group different types, all accessible
- Union = share memory, one member valid at a time
- Use \`.\` for variables, \`->\` for pointers
- **typedef** avoids writing \`struct\` keyword
- Self-referential = pointer to same struct (linked lists)
- **Padding** affects structure size (arrange by size)
- Don't forget **semicolon** after struct definition

---

### Viva Questions

**Q1: What is a structure?**
A: User-defined data type that groups variables of different types under one name.

**Q2: Difference between structure and union?**
A: Structure allocates memory for all members (sum). Union allocates memory only for largest member (all share same memory).

**Q3: What is structure padding?**
A: Extra bytes added by compiler for memory alignment. Ordering members by size can reduce padding.

**Q4: Difference between . and -> operators?**
A: Dot (.) is used with structure variables. Arrow (->) is used with pointers to structures.

**Q5: What is a self-referential structure?**
A: Structure containing pointer to its own type. Used for linked lists, trees.

**Q6: Can we compare two structures using ==?**
A: No. Must compare member by member.

**Q7: What is typedef used for with structures?**
A: Creates an alias so we don't need to write 'struct' keyword each time.

**Q8: When should we use union instead of structure?**
A: When only one member is needed at a time and we want to save memory.

---

### Practical Examples - Module 11

**Q1: Write a program to store and display student information using structure**
\`\`\`c
#include <stdio.h>

struct Student {
    int roll;
    char name[50];
    float marks;
};

int main() {
    struct Student s1 = {101, "John", 85.5};

    printf("Roll: %d\\n", s1.roll);
    printf("Name: %s\\n", s1.name);
    printf("Marks: %.2f\\n", s1.marks);
    return 0;
}
\`\`\`

**Q2: Write a program to store and display employee details**
\`\`\`c
#include <stdio.h>
#include <string.h>

struct Employee {
    int id;
    char name[50];
    float salary;
};

int main() {
    struct Employee emp;

    emp.id = 1001;
    strcpy(emp.name, "Alice");
    emp.salary = 50000.00;

    printf("Employee ID: %d\\n", emp.id);
    printf("Name: %s\\n", emp.name);
    printf("Salary: Rs. %.2f\\n", emp.salary);
    return 0;
}
\`\`\`

**Q3: Write a program using array of structures**
\`\`\`c
#include <stdio.h>

struct Student {
    int roll;
    char name[30];
    float marks;
};

int main() {
    struct Student students[3] = {
        {1, "Alice", 85.5},
        {2, "Bob", 78.0},
        {3, "Charlie", 92.5}
    };

    printf("%-5s %-15s %s\\n", "Roll", "Name", "Marks");
    for (int i = 0; i < 3; i++) {
        printf("%-5d %-15s %.2f\\n",
               students[i].roll, students[i].name, students[i].marks);
    }
    return 0;
}
\`\`\`

**Q4: Write a program using pointer to structure**
\`\`\`c
#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    struct Point *ptr = &p1;

    printf("Using dot operator: (%d, %d)\\n", p1.x, p1.y);
    printf("Using arrow operator: (%d, %d)\\n", ptr->x, ptr->y);

    ptr->x = 30;
    ptr->y = 40;
    printf("Modified: (%d, %d)\\n", p1.x, p1.y);
    return 0;
}
\`\`\`

**Q5: Write a program using nested structures**
\`\`\`c
#include <stdio.h>

struct Date {
    int day, month, year;
};

struct Employee {
    int id;
    char name[50];
    struct Date doj;  // Nested structure
};

int main() {
    struct Employee emp = {101, "John", {15, 8, 2023}};

    printf("ID: %d\\n", emp.id);
    printf("Name: %s\\n", emp.name);
    printf("Date of Joining: %02d/%02d/%d\\n",
           emp.doj.day, emp.doj.month, emp.doj.year);
    return 0;
}
\`\`\`

**Q6: Write a program using typedef with structure**
\`\`\`c
#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int main() {
    Point p1 = {10, 20};
    Point p2 = {30, 40};

    printf("Point 1: (%d, %d)\\n", p1.x, p1.y);
    printf("Point 2: (%d, %d)\\n", p2.x, p2.y);
    return 0;
}
\`\`\`

**Q7: Write a program to pass structure to function**
\`\`\`c
#include <stdio.h>

struct Rectangle {
    float length;
    float width;
};

float area(struct Rectangle r) {
    return r.length * r.width;
}

int main() {
    struct Rectangle rect = {10.5, 5.5};
    printf("Area: %.2f\\n", area(rect));
    return 0;
}
\`\`\`

**Q8: Write a program to demonstrate union**
\`\`\`c
#include <stdio.h>

union Data {
    int i;
    float f;
    char c;
};

int main() {
    union Data d;

    d.i = 10;
    printf("d.i = %d\\n", d.i);

    d.f = 3.14;
    printf("d.f = %.2f\\n", d.f);
    printf("d.i now = %d (corrupted)\\n", d.i);

    printf("\\nSize of union: %lu bytes\\n", sizeof(d));
    return 0;
}
\`\`\`

**Q9: Write a program to find the size of structure with padding**
\`\`\`c
#include <stdio.h>

struct WithPadding {
    char c;   // 1 byte + 3 padding
    int i;    // 4 bytes
    char d;   // 1 byte + 3 padding
};

struct WithoutPadding {
    int i;    // 4 bytes
    char c;   // 1 byte
    char d;   // 1 byte + 2 padding
};

int main() {
    printf("Size with poor arrangement: %lu bytes\\n", sizeof(struct WithPadding));
    printf("Size with better arrangement: %lu bytes\\n", sizeof(struct WithoutPadding));
    return 0;
}
\`\`\`

**Q10: Write a program using self-referential structure (linked list node)**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    struct Node *second = (struct Node*)malloc(sizeof(struct Node));
    struct Node *third = (struct Node*)malloc(sizeof(struct Node));

    head->data = 1; head->next = second;
    second->data = 2; second->next = third;
    third->data = 3; third->next = NULL;

    printf("Linked List: ");
    struct Node *temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");

    free(head); free(second); free(third);
    return 0;
}
\`\`\`
`
