export const module1 = `
## Module 1: Databases in Data Science

### What are Databases in Data Science?

Databases are organized collections of structured information or data, typically stored electronically. In data science, choosing the right database is crucial for **performance, scalability, and data structure flexibility**.

**Why learn about databases?**
- Essential for storing and retrieving large datasets
- Different databases suit different data science tasks
- Understanding database types helps optimize data pipelines
- Critical for real-world data engineering and analysis

---

### Database Categories

Data science uses **3 main categories** of databases:

\`\`\`
DATABASE CATEGORIES
├── SQL (Relational)
│   └── MySQL, PostgreSQL, MS-SQL Server
├── NoSQL (Non-Relational)
│   ├── Document Store (MongoDB, CouchDB)
│   ├── Key-Value Store (Redis, DynamoDB)
│   ├── Column-Family (Cassandra, HBase)
│   └── Graph Database (Neo4j, Neptune)
└── Time-Series
    └── InfluxDB, TimescaleDB
\`\`\`

---

### 1. SQL (Relational) Databases

**Definition**: Structured databases that store data in **tables** with predefined schemas. Use SQL (Structured Query Language) for querying.

**Key Characteristics:**
- ✅ **Fixed Schema**: Structure defined before data insertion
- ✅ **ACID Compliant**: Atomicity, Consistency, Isolation, Durability
- ✅ **Relationships**: Tables linked via foreign keys
- ✅ **Vertical Scalability**: Scale up by adding more power to existing machine
- ✅ **Complex Queries**: Joins, aggregations, subqueries

**Structure Example:**
\`\`\`
CUSTOMERS Table          ORDERS Table
┌────────┬──────────┐   ┌─────────┬────────┬────────┐
│ cust_id│   name   │   │order_id │cust_id │ amount │
├────────┼──────────┤   ├─────────┼────────┼────────┤
│   1    │  Alice   │◀──│   101   │   1    │  5000  │
│   2    │  Bob     │   │   102   │   2    │  3000  │
└────────┴──────────┘   └─────────┴────────┴────────┘
\`\`\`

**Common SQL Databases:**

| Database | Use Case | Key Feature |
|----------|----------|-------------|
| **MySQL** | Web applications, CMS | Open-source, fast |
| **PostgreSQL** | Complex queries, GIS data | Advanced features, extensible |
| **MS-SQL Server** | Enterprise applications | Windows integration |
| **Oracle** | Large enterprises, banking | High performance, security |

**When to Use SQL:**
- Structured data with clear relationships
- Need for complex queries and joins
- ACID compliance required (banking, finance)
- Data integrity is critical

---

### 2. NoSQL Databases

**Definition**: Non-relational databases designed for **flexible schemas**, **horizontal scalability**, and **large-scale distributed data**.

**Why NoSQL?**
- Handle unstructured/semi-structured data
- Horizontally scalable (add more machines)
- Faster for simple queries
- Schema flexibility

#### 2.1 Document Stores

**Concept**: Store data as documents (JSON/BSON format). Each document can have different structure.

**MongoDB** (Most Popular Document Store):
- Stores data as JSON-like documents (BSON internally)
- **Dynamic Schema**: No predefined structure required
- **Scalability**: Can auto-scale up to 128 TiB
- **Flexible**: Different documents in same collection can have different fields

\`\`\`json
// MongoDB Document Example
{
  "_id": "user001",
  "name": "Alice",
  "email": "alice@example.com",
  "orders": [
    {"product": "Laptop", "price": 50000},
    {"product": "Mouse", "price": 500}
  ],
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra"
  }
}
\`\`\`

**Other Document Stores:**
- **CouchDB**: Multi-master replication, offline-first
- **Amazon DocumentDB**: MongoDB-compatible, AWS managed

**When to Use Document Stores:**
- Content management systems
- Product catalogs with varying attributes
- Real-time analytics
- User profiles with flexible schemas

#### 2.2 Key-Value Stores

**Concept**: Simplest NoSQL type. Store data as key-value pairs for ultra-fast lookups.

**Redis** (Most Popular Key-Value Store):
- **In-memory storage**: Extremely fast (microsecond latency)
- **Data structures**: Strings, lists, sets, hashes, sorted sets
- **Use cases**: Caching, session storage, real-time analytics

\`\`\`
KEY                  VALUE
"user:1001"     →    {"name": "Alice", "age": 25}
"session:xyz"   →    {"userId": 1001, "loginTime": "..."}
"cache:page"    →    "<html>...</html>"
"counter:views" →    15234
\`\`\`

**Other Key-Value Stores:**
- **Amazon DynamoDB**: Fully managed, serverless
- **Memcached**: Simple caching

**When to Use Key-Value Stores:**
- Caching frequently accessed data
- Session management
- Real-time recommendations
- Temporary data storage

#### 2.3 Column-Family Databases

**Concept**: Store data in columns instead of rows. Optimized for write-heavy workloads.

**Cassandra** (Most Popular Column-Family DB):
- **Distributed architecture**: No single point of failure
- **Linear scalability**: Add more nodes for better performance
- **Tunable consistency**: Choose between consistency and availability
- **Use cases**: Time-series data, IoT sensor data

**Other Column-Family Databases:**
- **HBase**: Built on Hadoop, integrates with HDFS
- **Google Bigtable**: Managed, petabyte-scale

**When to Use Column-Family:**
- IoT sensor data
- Time-series analytics
- Write-heavy applications
- Large-scale event logging

#### 2.4 Graph Databases

**Concept**: Store data as nodes (entities) and edges (relationships). Optimized for relationship queries.

**Neo4j** (Most Popular Graph Database):
- **Native graph storage**: Stores nodes, edges, properties
- **Query Language**: Cypher (SQL-like for graphs)
- **Use cases**: Social networks, fraud detection, recommendation engines

\`\`\`
Graph Structure:
         Person              Person
        "Alice" ────KNOWS───▶ "Bob"
           │                    │
       WORKS_AT             WORKS_AT
           │                    │
           ▼                    ▼
        Company              Company
         "TCS"               "Infosys"
\`\`\`

**Components:**
- **Nodes**: Represent entities (Person, Company, Product)
- **Edges**: Represent relationships (KNOWS, WORKS_AT, LIKES)
- **Properties**: Attributes of nodes/edges (name, age, date)

**Other Graph Databases:**
- **Amazon Neptune**: Managed graph database
- **ArangoDB**: Multi-model (graph + document)

**When to Use Graph Databases:**
- Social network analysis
- Fraud detection (finding patterns)
- Recommendation engines
- Knowledge graphs

---

### 3. CAP Theorem (Critical for Exam!)

**Definition**: In distributed databases, you can only achieve **2 out of 3** properties simultaneously:

\`\`\`
CAP THEOREM
├── C = Consistency (all nodes see same data at same time)
├── A = Availability (system always responds to requests)
└── P = Partition Tolerance (works despite network failures)

RULE: Pick any 2, sacrifice the 3rd
\`\`\`

**Why CAP Matters:**
- NoSQL databases are distributed systems
- Must handle network partitions (P is usually required)
- Must choose between C and A

**Database CAP Classifications:**

| Database | CAP | Why? |
|----------|-----|------|
| **MySQL** | CA | Strong consistency, not partition-tolerant |
| **MongoDB** | CP | Consistency + Partition tolerance |
| **Cassandra** | AP | Availability + Partition tolerance |
| **Redis** | CP | Consistency + Partition tolerance |
| **DynamoDB** | AP | Availability + Partition tolerance |

**Exam Tip:**
- Full form: **C**onsistency, **A**vailability, **P**artition tolerance
- NoSQL follows CAP because they're distributed systems
- Remember: Can only have 2 out of 3!

---

### SQL vs NoSQL Comparison

| Feature | SQL (Relational) | NoSQL |
|---------|-----------------|-------|
| **Schema** | Fixed, predefined | Flexible, dynamic |
| **Scalability** | Vertical (scale up) | Horizontal (scale out) |
| **Data Structure** | Tables with rows/columns | Documents, key-value, graphs |
| **ACID** | Yes, fully ACID compliant | Eventual consistency (BASE) |
| **Queries** | Complex joins, aggregations | Simple, fast lookups |
| **Examples** | MySQL, PostgreSQL, Oracle | MongoDB, Cassandra, Redis, Neo4j |
| **Best For** | Structured data, transactions | Unstructured data, high-volume |
| **Relationships** | Foreign keys, joins | Embedded or referenced |
| **Use Cases** | Banking, ERP, CRM | Social media, IoT, real-time |

---

### Choosing the Right Database

\`\`\`
Decision Tree:

Need ACID compliance & complex queries?
    YES → Use SQL (MySQL, PostgreSQL)
    NO  → Continue...

Data has flexible structure?
    YES → Use Document Store (MongoDB)
    NO  → Continue...

Need ultra-fast simple lookups?
    YES → Use Key-Value (Redis)
    NO  → Continue...

Working with relationships & networks?
    YES → Use Graph DB (Neo4j)
    NO  → Continue...

Time-series or IoT data?
    YES → Use Column-Family (Cassandra)
\`\`\`

---

### Quick Reference for Exam

**Full Forms:**
- SQL = Structured Query Language
- NoSQL = Not Only SQL
- BSON = Binary JSON
- ACID = Atomicity, Consistency, Isolation, Durability
- CAP = Consistency, Availability, Partition tolerance

**Key Differences to Remember:**
- SQL = Fixed schema, vertical scaling, ACID
- NoSQL = Flexible schema, horizontal scaling, CAP

**MongoDB Quick Facts:**
- Type: Document store (NoSQL)
- Format: JSON-like documents (BSON)
- Schema: Dynamic (flexible)
- Max size: Auto-scales to 128 TiB
- Compatible with: Amazon DocumentDB

**Neo4j Quick Facts:**
- Type: Graph database
- Components: Nodes, Edges, Properties
- Query language: Cypher
- Best for: Relationships, networks, fraud detection

**CAP Theorem Examples:**
- MongoDB: CP (Consistency + Partition)
- Cassandra: AP (Availability + Partition)
- MySQL: CA (Consistency + Availability)

---

> **Viva Questions:**
> - What is the difference between SQL and NoSQL databases?
> - Explain the CAP theorem and its significance.
> - Why does MongoDB have a dynamic schema?
> - What are nodes and edges in Neo4j?
> - When would you choose Redis over MongoDB?
> - What does ACID stand for and why is it important?

---

### Practice Questions - Module 1

---

**Q1: Which of the following is the standard language for querying relational databases?**

a) Python

**b) SQL** ✅

c) NoSQL

d) GraphQL

---

**Q2: What does CAP stand for in the CAP theorem?**

a) Consistency, Attention, Partition

b) Consistency, Availability, Petition

**c) Consistency, Availability, Partition tolerance** ✅

d) Consistency, Allocation, Partition tolerance

---

**Q3: Which of the following is NOT an example of NoSQL database?**

a) MongoDB

b) Cassandra

**c) MS-SQL Server** ✅ (It's SQL, not NoSQL)

d) Redis

---

**Q4: Which type of NoSQL database is MongoDB?**

a) Key-Value Store

**b) Document Store** ✅

c) Column-Family

d) Graph Database

---

**Q5: In graph databases, what represents the relationships between entities?**

a) Nodes

**b) Edges** ✅ (Also called relationships or arcs)

c) Properties

d) Vertices

---

**Q6: Which database is best suited for social network analysis?**

a) MySQL

b) Redis

**c) Neo4j** ✅ (Graph database)

d) MongoDB

---

**Q7: Which SQL database characteristic ensures data integrity?**

a) Dynamic schema

**b) ACID compliance** ✅

c) Horizontal scaling

d) Document storage

---

**Q8: What is the maximum storage capacity that MongoDB can auto-scale to?**

a) 64 TiB

**b) 128 TiB** ✅

c) 256 TiB

d) 512 TiB

---

**Q9: Which NoSQL database is designed for in-memory caching?**

a) MongoDB

b) Neo4j

**c) Redis** ✅

d) Cassandra

---

**Q10: According to CAP theorem, which property must NoSQL databases typically sacrifice?**

**a) Consistency OR Availability (must choose one)** ✅ (Since partition tolerance is essential for distributed systems)

b) Partition tolerance

c) All three

d) None
`
