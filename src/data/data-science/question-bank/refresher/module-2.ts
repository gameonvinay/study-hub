export const module2 = `
## Module 2: Data Processing & Preparation

### What is Data Processing?

**Data Processing** is the collection, manipulation, and transformation of raw data into meaningful information for analysis. It's the **foundation of any data science project** - garbage in, garbage out!

**Why is data processing critical?**
- Real-world data is messy: missing values, errors, inconsistencies
- ML models need clean, structured data to perform well
- 80% of data science time is spent on data preparation
- Quality of data directly impacts model accuracy

**Data Processing Pipeline:**
\`\`\`
Raw Data
    ↓ Data Collection
Collected Data
    ↓ Data Cleaning (remove errors, handle missing values)
Clean Data
    ↓ Data Transformation (normalize, encode, aggregate)
Transformed Data
    ↓ Feature Engineering/Selection (create/select important features)
Ready-to-Use Data
    ↓ Modeling
Insights & Predictions
\`\`\`

---

### 1. ETL (Extract, Transform, Load)

**Definition**: ETL is the process of integrating data from multiple sources into a data warehouse or database.

**What is ETL?**
- **E**xtract: Get data from various sources
- **T**ransform: Clean, format, and structure the data
- **L**oad: Store transformed data in target database/warehouse

\`\`\`
ETL Process Flow:

EXTRACT                TRANSFORM              LOAD
┌──────────┐          ┌──────────┐          ┌──────────┐
│ Database │          │  Clean   │          │   Data   │
│   APIs   │───────▶  │ Filter   │───────▶  │Warehouse │
│  Files   │          │ Validate │          │Database  │
│ Websites │          │ Aggregate│          │          │
└──────────┘          └──────────┘          └──────────┘
\`\`\`

**Extract (E):**
- Pull data from multiple sources: databases, APIs, CSV files, web scraping
- Sources can be structured (SQL) or unstructured (social media, logs)

**Transform (T):**
- Data cleaning: Remove duplicates, fix errors
- Data validation: Check data quality and consistency
- Data formatting: Convert data types, standardize formats
- Data aggregation: Combine data from multiple sources
- Data filtering: Remove irrelevant data

**Load (L):**
- Insert transformed data into target system
- Can be batch loading (periodic) or real-time streaming
- Ensure data integrity during loading

**ETL vs ELT:**
- **ETL**: Transform before loading (traditional data warehouses)
- **ELT**: Load first, transform later (modern big data systems)

**When to Use ETL:**
- Integrating data from multiple systems
- Building data warehouses
- Regular data migration tasks
- Data quality needs to be ensured before storage

**Exam Tip:** Full form - **E**xtract, **T**ransform, **L**oad (NOT Extract, Transfer, Load!)

---

### 2. Data Cleaning

**Definition**: Process of identifying and correcting (or removing) errors, inconsistencies, and inaccuracies in data.

**Why Data Cleaning?**
- Real data has: missing values, duplicates, outliers, inconsistencies
- Poor data quality leads to poor model performance
- "Garbage In, Garbage Out" - cleaning ensures quality input

**Common Data Quality Issues:**

| Issue | Example | Solution |
|-------|---------|----------|
| **Missing Values** | Age field is blank | Imputation (mean/median) or removal |
| **Duplicates** | Same customer record twice | Remove duplicate rows |
| **Outliers** | Age = 200 years | Remove or cap values |
| **Inconsistency** | "Mumbai" vs "Bombay" | Standardize to one format |
| **Invalid Data** | Gender = "XYZ" | Validate and correct/remove |
| **Formatting** | Date: "01-12-2024" vs "2024-12-01" | Standardize format |

**Data Cleaning Steps:**

\`\`\`
1. Identify Issues
   ├── Check for missing values
   ├── Find duplicates
   ├── Detect outliers
   └── Validate data types

2. Handle Missing Values
   ├── Delete rows/columns (if few missing)
   ├── Impute with mean/median/mode
   └── Use advanced imputation (KNN, regression)

3. Remove Duplicates
   └── Keep first/last occurrence or delete all

4. Fix Inconsistencies
   ├── Standardize text (uppercase/lowercase)
   ├── Fix typos
   └── Standardize formats (dates, phone numbers)

5. Handle Outliers
   ├── Remove extreme values
   ├── Cap at threshold (winsorization)
   └── Transform data (log transformation)

6. Validate Data
   └── Ensure data meets business rules
\`\`\`

**Techniques:**
- **Deduplication**: Remove duplicate records
- **Imputation**: Fill missing values (mean, median, mode, forward/backward fill)
- **Outlier Detection**: IQR method, Z-score, visualization
- **Validation**: Check data types, ranges, formats

**Missing Value Handling Methods:**

#### Method 1: Remove (Deletion)

**What it does:** Delete rows or columns containing missing values.

**When to use:**
- Very few missing values (<5% of data)
- Missing values are random
- Losing data won't significantly impact analysis

**Pros:**
- ✅ Simple and fast
- ✅ No assumptions about data
- ✅ Maintains data accuracy

**Cons:**
- ❌ Lose potentially valuable data
- ❌ Can introduce bias if data not missing randomly
- ❌ Reduces sample size

**Example:**
\`\`\`
Original Dataset:
Age: [25, 30, NaN, 35, 28]

After Deletion:
Age: [25, 30, 35, 28]  (Row with NaN removed)
\`\`\`

---

#### Method 2: Mean Imputation

**What it does:** Replace missing values with the **mean (average)** of that column.

**When to use:**
- Numerical continuous data
- Data is normally distributed (bell curve)
- Missing values are few and random

**Pros:**
- ✅ Preserves sample size
- ✅ Simple to implement
- ✅ Works well with normal distributions

**Cons:**
- ❌ Reduces variance (all missing become same value)
- ❌ Distorts distribution
- ❌ Can bias estimates if not missing randomly

**Example:**
\`\`\`
Original Dataset:
Age: [25, 30, NaN, 35, 28]

Calculate Mean:
Mean = (25 + 30 + 35 + 28) / 4 = 29.5

After Mean Imputation:
Age: [25, 30, 29.5, 35, 28]
\`\`\`

**When to prefer Mean over Median:**
- Normal distribution (symmetric)
- No significant outliers
- You want to preserve the "average" characteristic

---

#### Method 3: Median Imputation

**What it does:** Replace missing values with the **median (middle value)** of that column.

**When to use:**
- Numerical data with outliers
- Skewed distributions
- Ordinal data (rankings, ratings)

**Pros:**
- ✅ Preserves sample size
- ✅ **Robust to outliers** (not affected by extreme values)
- ✅ Better for skewed data than mean

**Cons:**
- ❌ Still reduces variance
- ❌ May not preserve relationships between variables

**Example:**
\`\`\`
Original Dataset:
Age: [25, 30, NaN, 35, 28]

Calculate Median:
Sorted: [25, 28, 30, 35]
Median = (28 + 30) / 2 = 29

After Median Imputation:
Age: [25, 30, 29, 35, 28]
\`\`\`

**When to prefer Median over Mean:**
- Skewed distribution (e.g., income, house prices)
- Presence of outliers
- Ordinal data

---

**Comparison of Methods:**

| Method | Best For | Preserves Size? | Handles Outliers? |
|--------|----------|-----------------|-------------------|
| **Remove** | <5% missing, random | ❌ No | N/A |
| **Mean** | Normal distribution, no outliers | ✅ Yes | ❌ No |
| **Median** | Skewed data, outliers present | ✅ Yes | ✅ Yes |

**Exam Tip:** Data Cleaning focuses on **error identification and correction** - making data accurate and complete. Know all three methods!

---

### 3. Data Transformation

**Definition**: Converting data from one format or structure to another to make it suitable for analysis.

**Why Transform Data?**
- Make data compatible with ML algorithms
- Improve model performance
- Handle different scales and distributions
- Convert categorical to numerical data

**Common Transformation Techniques:**

#### 3.1 Normalization (Min-Max Scaling)
- Scale features to [0, 1] range
- Formula: (x - min) / (max - min)

\`\`\`
Original: [10, 20, 30, 40, 50]
Normalized: [0, 0.25, 0.5, 0.75, 1.0]
\`\`\`

#### 3.2 Standardization (Z-score)
- Scale to mean=0, std=1
- Formula: (x - mean) / std

\`\`\`
Original: [10, 20, 30, 40, 50]
Mean = 30, Std = 15.81
Standardized: [-1.26, -0.63, 0, 0.63, 1.26]
\`\`\`

#### 3.3 Encoding
Convert categorical data to numerical:

| Encoding | Method | Example |
|----------|--------|---------|
| **Label Encoding** | Assign numbers | Red=0, Green=1, Blue=2 |
| **One-Hot Encoding** | Binary columns | Red=[1,0,0], Green=[0,1,0], Blue=[0,0,1] |

#### 3.4 Log Transformation
- Handle skewed data
- Compress large values

\`\`\`
Original: [1, 10, 100, 1000]
Log: [0, 1, 2, 3]
\`\`\`

#### 3.5 Aggregation
- Combine multiple values
- Examples: sum, average, count

**Exam Tip:** Transformation **changes the format/structure** of data without changing its meaning.

---

### 4. Feature Engineering

**Definition**: Creating new features (variables) from existing data to improve model performance.

**Why Feature Engineering?**
- Raw data may not capture patterns well
- New features can reveal hidden insights
- Can dramatically improve model accuracy
- Domain knowledge helps create meaningful features

**Feature Engineering Techniques:**

#### 4.1 Creating Interaction Features
Combine existing features:
\`\`\`
Features: Height (m), Weight (kg)
New Feature: BMI = Weight / (Height²)
\`\`\`

#### 4.2 Binning/Discretization
Convert continuous to categorical:
\`\`\`
Age: [18, 25, 35, 50, 65]
Age Groups: [Young, Young, Middle, Middle, Senior]
\`\`\`

#### 4.3 Date/Time Features
Extract components from dates:
\`\`\`
Date: 2024-12-25
→ Year: 2024, Month: 12, Day: 25, Day of Week: Wednesday
→ Is Weekend: False, Is Holiday: True
\`\`\`

#### 4.4 Text Features
From text data:
\`\`\`
Text: "Machine learning is amazing"
→ Word Count: 4
→ Character Count: 28
→ Has Uppercase: True
→ Sentiment: Positive
\`\`\`

#### 4.5 Domain-Specific Features
Use business knowledge:
\`\`\`
E-commerce:
Purchase Amount + Frequency → Customer Lifetime Value

Banking:
Income - Expenses → Disposable Income
\`\`\`

**Feature Engineering vs Feature Selection:**
- **Engineering**: CREATE new features
- **Selection**: CHOOSE important features

**Exam Tip:** Feature Engineering creates **artificial features** to improve model performance.

---

### 5. Feature Selection

**Definition**: Selecting the most relevant and important features from the dataset, discarding irrelevant or redundant ones.

**Why Feature Selection?**
- Reduce overfitting (simpler models)
- Improve accuracy (remove noise)
- Reduce training time
- Easier to interpret models

**Feature Selection Methods:**

#### 5.1 Filter Methods
- Rank features based on statistical scores
- Examples: Correlation, Chi-square, Information Gain

\`\`\`
Features: [Age, Gender, Income, Shoe_Size, Education]
Target: Loan Approval

Correlation with Target:
Income: 0.85 ✓ Keep
Education: 0.72 ✓ Keep
Age: 0.45 ✓ Keep
Gender: 0.12 ✗ Remove
Shoe_Size: 0.03 ✗ Remove (irrelevant!)
\`\`\`

#### 5.2 Wrapper Methods
- Use ML model to evaluate feature subsets
- Examples: Forward Selection, Backward Elimination, RFE

\`\`\`
Backward Elimination:
Start with all features → Remove least important → Retrain → Repeat
\`\`\`

#### 5.3 Embedded Methods
- Feature selection during model training
- Examples: Lasso Regression, Tree-based methods

**Benefits:**
- Reduced dimensionality
- Faster training
- Improved generalization
- Better interpretability

**Exam Tip:** Feature Selection identifies the most **important input data variables** for the model.

---

### 6. Dimensionality Reduction

**Definition**: Reducing the number of features while retaining most of the information.

**Why Reduce Dimensions?**
- Curse of dimensionality (too many features = poor performance)
- Visualization (can't plot beyond 3D)
- Remove multicollinearity
- Faster computation

**Techniques:**

| Method | Type | Description |
|--------|------|-------------|
| **PCA** | Linear | Principal Component Analysis - finds new axes |
| **t-SNE** | Non-linear | Good for visualization |
| **LDA** | Linear | Linear Discriminant Analysis - supervised |

**Example - PCA:**
\`\`\`
Original: 100 features
After PCA: 10 principal components (captures 95% variance)

Benefit: 10x fewer features, almost same information!
\`\`\`

---

### 7. Information Distillation

**Definition**: Process of extracting and synthesizing the most important information from large volumes of data.

**What is Information Distillation?**
- Filter signal from noise
- Extract key insights from big data
- Summarize complex information
- Remove redundancy

**Techniques:**
- **Data Sampling**: Use representative subset
- **Aggregation**: Combine similar data points
- **Summarization**: Extract key statistics
- **Dimensionality Reduction**: Reduce features

**Example:**
\`\`\`
Raw Data: 1 million customer transactions
Distilled Info:
  - Top 10 products by revenue
  - Customer segments (3 groups)
  - Peak shopping hours
  - Monthly trends
\`\`\`

**Applications:**
- News summarization
- Scientific paper analysis
- Business intelligence dashboards
- Knowledge extraction

**Exam Tip:** Information Distillation focuses on **extracting essential information** from large datasets.

---

### Quick Reference Table

| Term | Focus | Example |
|------|-------|---------|
| **ETL** | Data integration | Extract from DB → Transform → Load to warehouse |
| **Data Cleaning** | Error correction | Fix missing values, remove duplicates |
| **Data Transformation** | Format change | Normalize, encode categories |
| **Feature Engineering** | Create features | BMI from height & weight |
| **Feature Selection** | Choose features | Keep important, remove irrelevant |
| **Dimensionality Reduction** | Reduce features | 100 features → 10 components (PCA) |
| **Information Distillation** | Extract insights | Summarize 1M records → key trends |

---

### Exam-Ready Definitions

**1. Data Cleaning:**
Process of identifying errors and making corrections or improvements to data quality.

**2. Feature Selection:**
Identifying the most important or relevant input data variables for the model.

**3. Feature Engineering:**
Creating new artificial features from existing data to improve model performance.

**4. Data Transformation:**
Converting data from one format or structure to another to make it suitable for analysis.

**5. Dimensionality Reduction:**
Reducing the number of features while retaining most important information.

**6. Information Distillation:**
Extracting and synthesizing essential information from large volumes of data.

**7. ETL:**
Extract, Transform, Load - process of data integration from multiple sources.

---

> **Viva Questions:**
> - What is the difference between ETL and ELT?
> - Explain the difference between feature engineering and feature selection.
> - How do you handle missing values in a dataset?
> - Why is data cleaning important in data science?
> - What is the purpose of normalization?
> - Give examples of feature engineering techniques.

---

### Practice Questions - Module 2

**Q1: In ETL tools, what does E, T, and L stand for?**
a) Extract, transfer, load
b) Extract, transform, load
c) Extract, transfer, lend
d) Eject, transfer, lend
**Answer: b) Extract, transform, load**

**Q2: Which task includes identification of errors and making corrections?**
a) Feature Selection
b) Data Transformation
c) Data Cleaning
d) Feature Engineering
**Answer: c) Data Cleaning**

**Q3: We need to identify the most important input data variables for the model. What is this process called?**
a) Data Cleaning
b) Feature Selection
c) Data Transformation
d) Feature Engineering
**Answer: b) Feature Selection**

**Q4: Which is NOT a method of feature selection?**
a) Filter Methods
b) Wrapper Methods
c) Embedded Methods
d) Interaction Features
**Answer: d) Interaction Features** (This is feature engineering, not selection!)

**Q5: What is the primary goal of dimensionality reduction?**
a) Increase number of features
b) Reduce number of features while retaining information
c) Clean the data
d) Transform categorical variables
**Answer: b) Reduce number of features while retaining information**

**Q6: Which technique converts categorical data to numerical?**
a) Normalization
b) Standardization
c) Encoding
d) Binning
**Answer: c) Encoding**

**Q7: What is the purpose of information distillation?**
a) Clean the data
b) Extract essential information from large datasets
c) Select features
d) Transform data formats
**Answer: b) Extract essential information from large datasets**

**Q8: Which process creates new features from existing data?**
a) Feature Selection
b) Data Cleaning
c) Feature Engineering
d) Data Validation
**Answer: c) Feature Engineering**

**Q9: Min-Max Scaling is a type of:**
a) Feature Selection
b) Data Transformation (Normalization)
c) Data Cleaning
d) Feature Engineering
**Answer: b) Data Transformation (Normalization)**

**Q10: PCA (Principal Component Analysis) is used for:**
a) Data Cleaning
b) Feature Selection
c) Dimensionality Reduction
d) Data Collection
**Answer: c) Dimensionality Reduction**
`
