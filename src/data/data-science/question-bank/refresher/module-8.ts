export const module8 = `
## Module 8: Big Data & Hadoop Ecosystem

### What is Big Data?

**Big Data** refers to extremely large datasets that are too complex for traditional data processing tools to handle efficiently.

**Why "Big" Data?**
- Volume: Terabytes to petabytes of data
- Velocity: Generated at high speed
- Variety: Structured, unstructured, semi-structured
- Veracity: Data quality and accuracy challenges

---

### The 4 V's of Big Data

\`\`\`
BIG DATA CHARACTERISTICS (4 V's)
├── Volume (Size)
├── Velocity (Speed)
├── Variety (Types)
└── Veracity (Quality)
\`\`\`

#### 1. Volume

**Definition**: The sheer **amount/size** of data generated and stored.

**Scale:**
\`\`\`
Traditional: Gigabytes (GB)
Big Data: Terabytes (TB), Petabytes (PB), Exabytes (EB)

1 TB = 1,000 GB
1 PB = 1,000 TB = 1,000,000 GB
\`\`\`

**Examples:**
- Facebook: 4 petabytes of data generated per day
- YouTube: 500 hours of video uploaded per minute
- Google: Processes 20+ petabytes daily

**Challenge**: How to store and process such massive amounts?

---

#### 2. Velocity

**Definition**: The **speed** at which new data is generated, collected, and processed.

**Examples:**
\`\`\`
Social Media:
- Twitter: 6,000 tweets/second
- Instagram: 1,000 photos/second

IoT Sensors:
- Cars: Generate 25 GB/hour
- Smart factories: Millions of sensor readings/second

Financial Trading:
- Stock market: Millions of transactions/second
\`\`\`

**Real-Time Processing Needed:**
- Fraud detection (instant)
- Stock trading (milliseconds)
- Social media trending (seconds to minutes)

**Challenge**: Process data as fast as it arrives

**Exam Tip**: **Velocity** refers to the **speed** at which new data is generated and processed in big data.

---

#### 3. Variety

**Definition**: Different **types and formats** of data.

**Data Types:**

| Type | Examples | Structure |
|------|----------|-----------|
| **Structured** | SQL databases, spreadsheets | Fixed schema, organized |
| **Semi-Structured** | JSON, XML, logs | Some organization, flexible |
| **Unstructured** | Images, videos, text, audio | No predefined structure |

**Examples:**
\`\`\`
E-commerce Company Data:
- Structured: Customer database (SQL)
- Semi-Structured: Log files (JSON)
- Unstructured: Product images, customer reviews

Social Media:
- Text posts
- Images
- Videos
- Likes/reactions
- Location data
\`\`\`

**Challenge**: Integrate and analyze different data types together

---

#### 4. Veracity

**Definition**: The **quality, accuracy, and trustworthiness** of data.

**Issues:**
- Incomplete data (missing values)
- Inaccurate data (errors)
- Inconsistent data (conflicting sources)
- Uncertain data (sensor noise)

**Examples:**
\`\`\`
Sensor Data: 10% may be faulty readings
Social Media: Fake accounts, spam, misinformation
User Input: Typos, inconsistent formatting
\`\`\`

**Impact:**
- Poor decisions based on bad data
- "Garbage in, garbage out"

**Challenge**: Ensure data quality before analysis

---

### Challenges of Big Data

**1. Integration:**
- Multiple data sources
- Different formats and structures
- **What makes integration complicated?** Data variety and velocity

**2. Storage:**
- Traditional databases can't handle petabytes
- Need distributed storage systems

**3. Processing:**
- Can't process on single machine
- Need distributed computing frameworks

**4. Analysis:**
- Complex algorithms
- Real-time requirements

**Solutions:**
- Distributed storage: HDFS
- Distributed processing: Hadoop MapReduce, Spark
- NoSQL databases: MongoDB, Cassandra, HBase

**Exam Tip**: **Data variety and velocity** make the integration of big data sets complicated.

---

### Big Data Applications

| Industry | Application | Benefit |
|----------|-------------|---------|
| **Healthcare** | Predictive analytics, personalized medicine | Better diagnosis, treatment |
| **Retail** | Customer behavior, inventory optimization | Increase sales |
| **Finance** | Fraud detection, risk assessment | Reduce losses |
| **Manufacturing** | Predictive maintenance, quality control | Reduce downtime |
| **Social Media** | Sentiment analysis, targeted ads | Better engagement |

**Exam Tip**: In healthcare, big data is used for **predictive analytics and personalized medicine**.

---

## Apache Hadoop

### What is Hadoop?

**Apache Hadoop** is an open-source framework for **distributed storage and processing** of big data across clusters of computers.

**Core Idea**: Instead of one powerful computer, use many cheap computers working together.

**Hadoop Ecosystem:**
\`\`\`
HADOOP ECOSYSTEM
├── HDFS (Storage)
├── MapReduce (Processing)
├── YARN (Resource Management)
├── Hive (SQL on Hadoop)
├── HBase (NoSQL Database)
└── Other Tools
\`\`\`

---

### 1. HDFS (Hadoop Distributed File System)

**Definition**: Distributed file system that stores data across multiple machines.

**Key Concepts:**

**Architecture:**
\`\`\`
HDFS Architecture:
┌─────────────────┐
│  NameNode       │ ← Metadata (master)
│  (Master)       │
└─────────────────┘
        ↓
┌──────────┬──────────┬──────────┐
│ DataNode │ DataNode │ DataNode │ ← Actual data (slaves)
│ (Slave)  │ (Slave)  │ (Slave)  │
└──────────┴──────────┴──────────┘
\`\`\`

**Components:**
- **NameNode** (Master): Stores metadata, manages file system
- **DataNode** (Slave): Stores actual data blocks

**How it Works:**
\`\`\`
1. Large file split into blocks (default 128 MB)
2. Blocks distributed across DataNodes
3. Each block replicated 3 times (fault tolerance)
4. NameNode tracks which blocks are where
\`\`\`

**Example:**
\`\`\`
File: video.mp4 (1 GB)
Split into: 8 blocks (128 MB each)
Stored across: Multiple DataNodes
Replicated: 3 copies of each block
\`\`\`

**Advantages:**
- ✅ Handles very large files
- ✅ Fault tolerant (replication)
- ✅ Scalable (add more nodes)
- ✅ Cost-effective (commodity hardware)

---

### 2. MapReduce

**Definition**: Programming model for processing large datasets in parallel across Hadoop cluster.

**Two Phases:**
1. **Map**: Process data in parallel
2. **Reduce**: Aggregate results

**Example - Word Count:**
\`\`\`
Input: "Hello World Hello Hadoop"

Map Phase:
Hello → 1
World → 1
Hello → 1
Hadoop → 1

Shuffle & Sort:
Hadoop → [1]
Hello → [1, 1]
World → [1]

Reduce Phase:
Hadoop → 1
Hello → 2
World → 1
\`\`\`

---

### 3. YARN (Yet Another Resource Negotiator)

**Definition**: Resource management layer for Hadoop that manages computing resources.

**What does YARN do?**
- Allocates computing resources (CPU, memory)
- Schedules jobs across cluster
- Monitors resource usage

**ResourceManager:**
- **Main function**: Manage and allocate **computing resources** (CPU, memory) across applications in the cluster

**Components:**
\`\`\`
YARN Architecture:
┌─────────────────────┐
│  ResourceManager    │ ← Global resource manager
└─────────────────────┘
         ↓
┌──────────┬──────────┐
│NodeMgr 1 │NodeMgr 2 │ ← Per-node resource managers
└──────────┴──────────┘
\`\`\`

**Exam Tip**: ResourceManager's main function is to **manage and allocate computing resources** (CPU, memory) across applications.

---

## Apache Hive

### What is Hive?

**Apache Hive** is a data warehouse system **built on top of Hadoop** that provides **SQL-like queries** for big data analysis.

**Key Points:**
- Translates SQL to MapReduce jobs
- Query language: HiveQL (similar to SQL)
- Good for batch processing
- Not for real-time queries

**Architecture:**
\`\`\`
User → HiveQL Query → Hive → MapReduce → HDFS
\`\`\`

**Built on top of**: **Apache Hadoop**

**Exam Tip**: Apache Hive is **built on top of Hadoop framework**.

---

### Hive Components

**1. Hive CLI (Command Line Interface):**
- **Purpose**: Provides a shell for executing Hive queries and commands
- Text-based interface for running HiveQL
- Interactive query execution

**2. Hive Server:**
- Allows remote clients to execute queries
- Supports multiple client connections

**3. Thrift Server:**
- Enables other applications to connect to Hive
- Provides API access

**4. Metastore:**
- Stores metadata (table schemas, locations)
- Uses relational database (MySQL, PostgreSQL)

**Exam Tip**: **Hive CLI** provides a shell for executing Hive queries and commands.

---

### Hive Partitioning

**What is Partitioning?**
Organizing data into separate directories based on **partition keys** to improve query performance.

**Concept:**
\`\`\`
Without Partitioning:
/data/all_sales.txt (scans entire file)

With Partitioning:
/data/year=2023/month=01/
/data/year=2023/month=02/
/data/year=2024/month=01/

Query: "Sales for Jan 2024"
→ Only scans /data/year=2024/month=01/ (much faster!)
\`\`\`

**Significance:**
- Data **physically stored in separate directories** based on partition keys
- **Improves query performance** (scans only relevant partitions)
- Reduces data scanned
- Faster query execution

**Example:**
\`\`\`
Table: sales
Partitioned by: year, month

Data storage:
/warehouse/sales/year=2023/month=12/data
/warehouse/sales/year=2024/month=01/data

Query: SELECT * FROM sales WHERE year=2024 AND month=01
→ Only scans one partition (fast!)
\`\`\`

**Exam Tip**: Partitioning allows data to be **physically stored in separate directories** based on partition keys, **improving query performance**.

---

## HBase

### What is HBase?

**Apache HBase** is a **column-oriented NoSQL database** built on top of **HDFS**, designed for real-time read/write access to big data.

**Type**: Column-oriented database (column-family database)

**Built on top of**: **HDFS** (Hadoop Distributed File System)

**Key Characteristics:**
- Column-family storage model
- Real-time random read/write
- Billions of rows, millions of columns
- Sparse data handling
- Automatic sharding

**Architecture:**
\`\`\`
HBase
  ↓ (built on)
HDFS
  ↓ (runs on)
Hadoop Cluster
\`\`\`

**Column-Oriented Storage:**
\`\`\`
Row-Oriented (Traditional):
Row1: [id=1, name="Alice", age=25]
Row2: [id=2, name="Bob", age=30]

Column-Oriented (HBase):
id: [1, 2]
name: ["Alice", "Bob"]
age: [25, 30]

Benefit: Fast column scans, good for analytics
\`\`\`

**Typical Use Cases:**
- Real-time analytics
- Time-series data
- IoT sensor data
- Log processing

**Exam Tips:**
- HBase is a **column-oriented database**
- Built on top of **HDFS**
- Typical use case: **Real-time analytics**

---

## Other Databases & Tools

### MariaDB

**What is MariaDB?**
- Relational database (SQL)
- Developed by **original developers of MySQL**
- Fork of MySQL (after Oracle acquired MySQL)

**Licenses:**
- **GPL** (GNU General Public License)
- **LGPL** (Lesser GPL)
- **BSD** (Berkeley Software Distribution)

**Why created?**
- Community-driven alternative to MySQL
- Ensure open-source availability
- More features than MySQL

**Exam Tips:**
- MariaDB developed by **original MySQL developers**
- Licenses: **GPL, LGPL, or BSD**

---

### MongoDB (Recap)

**Type**: Document-Oriented Database (NoSQL)

**Developer**: **10gen** (now MongoDB Inc.)

**Key Features:**
- JSON-like documents (BSON)
- Dynamic schema
- Horizontal scalability
- **Aggregation framework** for complex data analysis

**Aggregation Framework:**
- Performs **complex data analysis and aggregations**
- Pipeline of operations (filter, group, sort, transform)
- Similar to SQL GROUP BY, but more powerful

**Example:**
\`\`\`javascript
db.sales.aggregate([
  { $match: { year: 2024 } },
  { $group: { _id: "$product", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
\`\`\`

**Suitable for**: Real-time analytics and data science applications

**Why suitable?**
- Fast query performance
- Flexible schema for diverse data
- **Aggregation framework** for analytics
- Horizontal scaling

**Exam Tips:**
- MongoDB is **document-oriented database**
- Developed by **10gen**
- **Aggregation framework** makes it suitable for real-time analytics

---

### CouchDB

**Type**: Document-oriented NoSQL database

**Key Features:**
- JSON documents
- HTTP REST API
- Multi-master replication
- Offline-first design

**Use Cases:**
- **Content management systems**
- Mobile applications (offline sync)
- Distributed databases

**Exam Tip**: CouchDB use case: **Content management systems**

---

### AllegroGraph

**What is AllegroGraph?**
- **Triplestore** designed for storing **RDF data**
- Graph database specialized for semantic web
- NOT a relational database
- NOT a document-oriented NoSQL database

**RDF (Resource Description Framework):**
- Data model for semantic web
- Stores data as subject-predicate-object triples

**Example:**
\`\`\`
Triple: (Alice, knows, Bob)
Subject: Alice
Predicate: knows
Object: Bob
\`\`\`

**Exam Tip**: AllegroGraph is a **triplestore designed for storing RDF data**.

---

### Teradata

**What is Teradata?**
- Enterprise data warehouse platform
- Massively parallel processing (MPP)
- Handles large-scale analytics

**Key Feature for Data Analytics:**
- **Integration with Apache Hadoop** for distributed processing
- Can query both Teradata and Hadoop data
- Hybrid approach: SQL + Hadoop

**Exam Tip**: Teradata's **integration with Apache Hadoop** makes it suitable for large-scale data analytics.

---

### Redis

**Full Form**: **Remote Dictionary Server**

**Type**: Key-value NoSQL database

**Key Features:**
- **In-memory** storage (extremely fast)
- Data structures: strings, lists, sets, hashes
- Microsecond latency
- Used for caching

**Already covered in Module 1**

**Exam Tip**: Redis stands for **Remote Dictionary Server**.

---

## Apache Spark

### What is Spark?

**Apache Spark** is a fast, distributed computing framework for big data processing and analytics.

**Key Features:**
- 100x faster than MapReduce
- In-memory processing
- Supports batch and real-time processing
- Multiple languages: Scala, Python, Java, R

---

### RDDs vs DataFrames

#### RDD (Resilient Distributed Dataset)

**Definition**: Fundamental data structure in Spark - immutable, distributed collection of objects.

**Characteristics:**
- **Immutable**: Cannot be changed after creation
- Low-level API
- No optimization
- Stores data as collection of objects

**Example:**
\`\`\`python
rdd = sc.parallelize([1, 2, 3, 4, 5])
rdd2 = rdd.map(lambda x: x * 2)
\`\`\`

#### DataFrame

**Definition**: Higher-level abstraction built on RDDs with a tabular structure (rows and columns).

**Characteristics:**
- Mutable operations (transformations)
- Tabular format (like SQL table)
- **Optimized query optimization and execution plans**
- Uses Catalyst optimizer
- Better performance

**Example:**
\`\`\`python
df = spark.createDataFrame([(1, "Alice"), (2, "Bob")])
df.select("name").show()
\`\`\`

**Primary Difference:**
- **RDDs** store data as a **collection of objects**
- **DataFrames** store data in **tabular format** (rows × columns)
- **DataFrames** provide **optimized query optimization and execution plans**

**Exam Tip**: **DataFrames provide optimized query optimization and execution plans** compared to RDDs.

---

## Apache Storm

### What is Storm?

**Apache Storm** is a **real-time** distributed stream processing framework.

**Key Features:**
- **Real-time** processing (not batch)
- Processes unbounded streams of data
- Scalable and fault-tolerant
- Low latency

**Most Suitable Scenario:**
**Real-time processing of social media data for sentiment analysis**

**Why Storm?**
- Continuous data streams (tweets, posts)
- Need immediate processing
- Low latency requirements

**NOT suitable for:**
- Batch processing of historical data (use Hadoop/Spark)
- Static analysis (use Hadoop)
- Indexing/searching (use Elasticsearch)

**Example Use Cases:**
- Real-time analytics
- Stream processing
- Continuous computation
- Online machine learning

**Exam Tip**: Apache Storm is most suitable for **real-time processing** of streaming data like social media.

---

## Scala

### What is Scala?

**Scala** is a programming language that combines object-oriented and functional programming.

**Key Features:**
- Runs on JVM (Java Virtual Machine)
- Interoperable with Java
- Strongly typed
- Functional programming support

---

### Covariance in Scala

**Definition**: The property of a type parameter indicating that it can **vary in the same direction as its container type**.

**Concept**: If A is a subtype of B, then Container[A] is a subtype of Container[B].

**Notation**: `+T` (plus sign indicates covariance)

**Example:**
\`\`\`scala
class Container[+A]  // Covariant

// If Dog extends Animal:
val dogContainer: Container[Dog] = new Container[Dog]
val animalContainer: Container[Animal] = dogContainer  // Valid!
\`\`\`

**Why it matters:**
- Allows type flexibility
- Safe upcasting
- Used in collections (List, Seq)

**Exam Tip**: Covariance indicates that a type parameter can **vary in the same direction as its container type**.

---

## Quick Reference

**Big Data 4 V's:**
- **Volume**: Size of data
- **Velocity**: Speed of data generation/processing
- **Variety**: Different types/formats
- **Veracity**: Quality/accuracy

**Hadoop Ecosystem:**
- **HDFS**: Distributed storage
- **MapReduce**: Distributed processing
- **YARN**: Resource management
- **Hive**: SQL on Hadoop (built on Hadoop)
- **HBase**: Column-oriented NoSQL (built on HDFS)

**Key Services:**
- **Hive CLI**: Shell for Hive queries
- **ResourceManager**: Manages CPU/memory in YARN

**Databases:**
- **MariaDB**: MySQL developers, GPL/LGPL/BSD
- **MongoDB**: 10gen, document DB, aggregation framework
- **CouchDB**: Content management
- **HBase**: Real-time analytics, column-oriented
- **AllegroGraph**: RDF triplestore

**Tools:**
- **Redis**: Remote Dictionary Server
- **Storm**: Real-time stream processing
- **Spark**: Fast distributed computing (RDDs vs DataFrames)
- **Teradata**: Hadoop integration

---

> **Viva Questions:**
> - What are the 4 V's of Big Data? Explain each.
> - What is the difference between HDFS and HBase?
> - Explain the architecture of Hadoop.
> - What is the significance of partitioning in Hive?
> - Compare RDDs and DataFrames in Spark.
> - When would you use Apache Storm over Hadoop?

---

### Practice Questions - Module 8

---

**Q1: Which of the following refers to the speed at which new data is generated and processed in big data?**

a) Volume

b) Variety

**c) Velocity** ✅

d) Veracity

---

**Q2: What makes the integration of big data sets complicated?**

a) Data volume only

**b) Data variety and velocity** ✅

c) Data storage capacity

d) Data processing speed

---

**Q3: In which industry is big data used for predictive analytics and personalized medicine?**

a) Retail

b) Finance

**c) Healthcare** ✅

d) Manufacturing

---

**Q4: Apache Hive is built on top of which framework?**

a) Apache Spark

**b) Apache Hadoop** ✅

c) Apache Flink

d) Apache Storm

---

**Q5: Which Hive service provides a shell for executing Hive queries and commands?**

a) Hive Web UI

**b) Hive CLI** ✅

c) Hive Server

d) Thrift Server

---

**Q6: What type of database is HBase?**

a) Relational database

b) Document-oriented database

**c) Column-oriented database** ✅

d) Key-value store

---

**Q7: HBase is built on top of which file system?**

a) NTFS

**b) HDFS** ✅

c) ext4

d) FAT32

---

**Q8: MariaDB is developed by the original developers of which database system?**

a) PostgreSQL

b) Oracle

**c) MySQL** ✅

d) SQLite

---

**Q9: What types of licenses are used for MariaDB?**

a) MIT

b) Apache

**c) GPL, LGPL, or BSD** ✅

d) Proprietary

---

**Q10: Which company originally developed MongoDB?**

a) Microsoft

b) IBM

**c) 10gen** ✅

d) Oracle
`
</invoke>