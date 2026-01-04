export const module5 = `
## Module 5: Machine Learning Fundamentals

### What is Machine Learning?

**Machine Learning (ML)** is a subset of AI that enables systems to automatically learn and improve from experience without being explicitly programmed.

**Key Idea**: Instead of programming specific rules, we let the machine learn patterns from data!

\`\`\`
Traditional Programming:
Input + Rules → Output

Machine Learning:
Input + Output → Rules (learned from data)
\`\`\`

**Why Machine Learning?**
- Handles complex patterns humans can't easily program
- Improves with more data
- Adapts to new situations
- Powers modern AI applications

**Machine Learning Types:**
\`\`\`
MACHINE LEARNING
├── Supervised Learning (Labeled data)
│   ├── Classification (Discrete output)
│   └── Regression (Continuous output)
├── Unsupervised Learning (Unlabeled data)
│   ├── Clustering
│   └── Dimensionality Reduction
└── Reinforcement Learning (Reward-based)
\`\`\`

---

### 1. Supervised Learning

**Definition**: Learning from labeled data where we know the correct answer.

**How it Works:**
\`\`\`
Training Phase:
Input Data + Correct Labels → Learn Pattern → Model

Prediction Phase:
New Input → Model → Predicted Output
\`\`\`

**Example:**
\`\`\`
Training Data:
Email 1: "Buy cheap meds now!" → SPAM ✓
Email 2: "Meeting at 3 PM" → NOT SPAM ✓
Email 3: "Win $1000 now!" → SPAM ✓

Model learns: Certain words/patterns indicate spam

New Email: "Click here to claim prize!"
Model Predicts: SPAM (based on learned patterns)
\`\`\`

**Two Types:**
1. **Classification**: Predict categories/classes
2. **Regression**: Predict continuous numbers

---

### 2. Classification

**Definition**: Supervised learning task that predicts which category/class an input belongs to.

**Output**: Discrete categories (e.g., Spam/Not Spam, Cat/Dog, Yes/No)

**How Classification Works:**
\`\`\`
Training:
Features + Labels → Classification Algorithm → Model

Prediction:
New Features → Model → Predicted Class
\`\`\`

**Example - Email Spam Detection:**
\`\`\`
Features: word count, sender, has links, has "free", etc.
Labels: Spam or Not Spam

Training:
100,000 emails (labeled) → Train classifier → Model

New Email: "Free money! Click here!"
Model → Prediction: SPAM (98% confidence)
\`\`\`

**Types of Classification:**

| Type | Classes | Example |
|------|---------|---------|
| **Binary** | 2 classes | Spam/Not Spam, Yes/No |
| **Multiclass** | 3+ classes | Cat/Dog/Bird, Low/Med/High |
| **Multilabel** | Multiple labels per instance | Movie genres: Action+Comedy |

**Common Classification Algorithms:**

| Algorithm | How it Works | Use Case |
|-----------|--------------|----------|
| **Logistic Regression** | Probability-based | Binary classification |
| **Decision Tree** | Tree of if/else rules | Interpretable models |
| **Random Forest** | Ensemble of trees | High accuracy |
| **SVM** | Find best separating boundary | High-dimensional data |
| **Naive Bayes** | Probability using Bayes' theorem | Text classification |
| **K-NN** | Find K nearest neighbors | Simple, instance-based |
| **Neural Networks** | Layers of connected neurons | Complex patterns |

**Classification Metrics:**

\`\`\`
Confusion Matrix:
                Predicted
              Spam | Not Spam
Actual  Spam   TP  |   FN
        Not    FP  |   TN

Metrics:
Accuracy = (TP + TN) / Total
Precision = TP / (TP + FP)  [How many predicted spam are actually spam?]
Recall = TP / (TP + FN)     [How many actual spam did we catch?]
\`\`\`

**Example Problems:**
- Email spam detection
- Disease diagnosis (healthy/sick)
- Credit card fraud detection
- Image recognition (cat/dog/bird)
- Sentiment analysis (positive/negative)
- Customer churn prediction (will leave/stay)

**Exam Tip:**
- Classification is **supervised learning**
- Output: **Categories/Classes**
- Not suitable metric for classification: **RMSE** (that's for regression!)

---

### 3. Regression

**Definition**: Supervised learning task that predicts continuous numerical values.

**Output**: Real numbers (e.g., price, temperature, age)

**How Regression Works:**
\`\`\`
Training:
Features + Numerical Targets → Regression Algorithm → Model

Prediction:
New Features → Model → Predicted Number
\`\`\`

**Example - House Price Prediction:**
\`\`\`
Features: size, bedrooms, location, age
Target: Price (in ₹)

Training Data:
House 1: 1000 sqft, 2BR, Mumbai → ₹50L
House 2: 1500 sqft, 3BR, Mumbai → ₹75L
House 3: 2000 sqft, 4BR, Delhi → ₹90L

Model learns relationship between features and price

New House: 1200 sqft, 2BR, Mumbai
Model → Prediction: ₹60L
\`\`\`

**Regression Equation:**
\`\`\`
Simple Linear Regression:
Y = β₀ + β₁X + ε

Where:
Y = Target variable (price)
X = Input feature (size)
β₀ = Intercept
β₁ = Slope (coefficient)
ε = Error/Noise term

Example: Price = 20000 + 30000×(sqft) + noise
\`\`\`

**Variables in Regression:**
- **Dependent Variable** (Y): Target we want to predict (also called Response Variable, Target Variable)
- **Independent Variables** (X): Features used for prediction (also called Predictor Variables, Input Variables)

**Example from Exam:**
\`\`\`
"Regression analysis helps us understand how value of A variable
is changing corresponding to B variable when other C variables
are held fixed."

A = Dependent (target)
B = Independent (predictor)
C = Independent (control variables)
\`\`\`

**Types of Regression:**

| Type | Equation | Use Case |
|------|----------|----------|
| **Linear** | Y = β₀ + β₁X | Simple relationships |
| **Multiple** | Y = β₀ + β₁X₁ + β₂X₂ + ... | Multiple predictors |
| **Polynomial** | Y = β₀ + β₁X + β₂X² + ... | Non-linear relationships |
| **Ridge/Lasso** | Regularized linear | Prevent overfitting |

**Common Regression Algorithms:**
- Linear Regression
- Polynomial Regression
- Decision Tree Regressor
- Random Forest Regressor
- Support Vector Regression (SVR)
- Neural Network Regression

**Regression Metrics:**
- **RMSE** (Root Mean Squared Error): Average prediction error
- **MAE** (Mean Absolute Error): Average absolute error
- **R² Score**: How well model explains variance (0-1, higher better)

**Example Problems:**
- House price prediction
- Stock price forecasting
- Temperature prediction
- Sales forecasting
- Age estimation
- Salary prediction based on experience

**Time-Series Analysis:**
Special type of regression for data with time component.

\`\`\`
Example: Forecasting sales for next quarter
Data: Sales for past 2 years (monthly)
Model: Time-series regression
Prediction: Sales for next 3 months
\`\`\`

**Exam Tip:**
- Regression predicts **continuous numbers**
- Response variable = **Dependent variable** = Target
- Predictor variable = **Independent variable** = Feature
- In "Yt = μt + εt", the **noise term is εt** (epsilon)

---

### 4. Predictive Analytics

**Definition**: Using data, statistical algorithms, and machine learning to predict future outcomes based on historical data.

**Goal**: Forecast future events

**How it Works:**
\`\`\`
Historical Data → Analyze Patterns → Build Model → Predict Future
\`\`\`

**Predictive Analytics Methods:**

| Method | Type | Use |
|--------|------|-----|
| **Regression** | Predict numbers | Sales, prices |
| **Classification** | Predict categories | Churn, fraud |
| **Time-Series** | Forecast trends | Stock prices |
| **Clustering** | Group similar items | Customer segments |

**Example - Customer Churn Prediction:**
\`\`\`
Historical Data:
Customer behaviors (usage, complaints, tenure)
Label: Churned (Yes/No)

Model predicts: Which current customers likely to leave?

Action: Offer retention deals to at-risk customers
\`\`\`

**Applications:**

| Industry | Application | Benefit |
|----------|-------------|---------|
| **Retail** | Sales forecasting | Inventory planning |
| **Finance** | Credit risk assessment | Reduce defaults |
| **Healthcare** | Disease outbreak prediction | Early intervention |
| **Marketing** | Customer lifetime value | Target high-value customers |
| **Manufacturing** | Equipment failure prediction | Preventive maintenance |

**Predictive vs Other Analytics:**

| Type | Focus | Question |
|------|-------|----------|
| **Descriptive** | Past | What happened? |
| **Diagnostic** | Past | Why did it happen? |
| **Predictive** | Future | What will happen? |
| **Prescriptive** | Future | What should we do? |

**Exam Tip:**
- Predictive Analytics: **Forecast future outcomes**
- Main goal: **Prediction/Forecasting**
- Example: Forecasting sales for next quarter uses **Time-series Analysis**

---

### 5. Types of Data

Understanding data types is crucial for choosing the right model:

**1. Time-Series Data:**
- Observations collected over time at regular intervals
- Example: Daily stock prices, monthly sales, hourly temperature

\`\`\`
Date       | Sales
2024-01-01 | 100
2024-01-02 | 105
2024-01-03 | 98
...
\`\`\`

**2. Cross-Sectional Data:**
- Data from multiple subjects at a single point in time
- Example: Income of 1000 people in 2024

\`\`\`
Person | Income | Age | City
1      | 50000  | 25  | Mumbai
2      | 60000  | 30  | Delhi
3      | 55000  | 28  | Bangalore
\`\`\`

**3. Pooled Data:**
- Combination of time-series and cross-sectional
- Multiple subjects observed over multiple time periods

\`\`\`
Person | Year | Income
1      | 2022 | 45000
1      | 2023 | 48000
1      | 2024 | 50000
2      | 2022 | 50000
2      | 2023 | 55000
2      | 2024 | 60000
\`\`\`

**Exam Tip:**
- **Pooled data** is a combination of time-series and cross-sectional data

---

### 6. Overfitting vs Underfitting

**Underfitting:**
- Model is too simple
- Doesn't capture patterns in data
- Poor performance on both training and test data
- Solution: Use more complex model, add more features

**Overfitting:**
- Model is too complex
- Memorizes training data (including noise)
- Great on training, poor on test data
- Solution: Simplify model, regularization, more data

\`\`\`
Performance:
          Training | Testing
Underfit:   Poor   |   Poor     (too simple)
Good Fit:   Good   |   Good     (just right!)
Overfit:    Great  |   Poor     (too complex)
\`\`\`

**Exam Tip:**
- Algorithm performing well on training but poorly on testing = **Overfitting**

---

### 7. Data Mining & Knowledge Discovery

**Data Mining:**
Process of discovering patterns, associations, and relationships in large datasets.

**Another Name**: Knowledge Discovery in Database (KDD)

**Data Mining Tasks:**
- **Association Rules**: Find items that occur together (market basket analysis)
- **Clustering**: Group similar items
- **Classification**: Assign categories
- **Regression**: Predict values
- **Anomaly Detection**: Find unusual patterns

**Example - Market Basket Analysis:**
\`\`\`
Rule: IF {Bread, Butter} THEN {Milk}
Support: 30% (appear together 30% of time)
Confidence: 80% (when bread+butter bought, 80% also buy milk)
\`\`\`

**Association Rule Terms:**
- **Antecedent**: IF part (Bread, Butter)
- **Consequent**: THEN part (Milk)

**Algorithms:**
- **Apriori Algorithm**: Uses breadth-first search and hash tree
- **FP-Growth**: Frequent Pattern Growth
- **Eclat**: Equivalence Class Transformation

---

### 8. Clustering

**Definition**: Unsupervised learning that groups similar data points together.

**Type**: Unsupervised learning (no labels!)

**Clustering Methods:**

| Method | Description | Example |
|--------|-------------|---------|
| **Partitioning** | K-Means (centroid-based) | Customer segmentation |
| **Hierarchical** | Tree of clusters | Document organization |
| **Density-Based** | DBSCAN (high-density regions) | Anomaly detection |
| **Fuzzy** | Points belong to multiple clusters | Overlapping groups |

**Example - Customer Segmentation:**
\`\`\`
Input: Customer data (age, income, spending)
Output: 3 clusters
  Cluster 1: High income, high spending
  Cluster 2: Medium income, medium spending
  Cluster 3: Low income, low spending

Action: Targeted marketing for each segment
\`\`\`

**Exam Tip:**
- Clustering is **unsupervised learning**
- K-Means: **Partitioning** (centroid-based) clustering
- Fuzzy Clustering: Points can belong to **multiple clusters**

---

### 9. Graph Analytics

**Components of a Graph:**
- **Nodes (Vertices)**: Represent entities (objects to track)
- **Edges (Arcs)**: Represent relationships
- **Weights**: Strength of relationships (optional)

**Example:**
\`\`\`
Social Network:
Nodes: People
Edges: Friendships
Analysis: Find influencers, communities
\`\`\`

**Graph Properties:**
- **Degree**: Number of connections a node has
- **Path**: Sequence of edges connecting nodes
- **Cycle**: Path that starts and ends at same node

**NOT a property**: Frequency (not a graph property!)

---

### Quick Reference Table

| Concept | Type | Input | Output |
|---------|------|-------|--------|
| **Classification** | Supervised | Features + Labels | Categories |
| **Regression** | Supervised | Features + Numbers | Numbers |
| **Clustering** | Unsupervised | Features only | Groups |
| **Predictive Analytics** | Various | Historical data | Future predictions |

---

### Exam-Ready Definitions

**1. Classification:**
Supervised learning that predicts which category an input belongs to. Output is discrete.

**2. Regression:**
Supervised learning that predicts continuous numerical values. Uses dependent (target) and independent (predictor) variables.

**3. Predictive Analytics:**
Using data and ML to forecast future outcomes based on historical data. Main goal is prediction.

**4. Time-Series Analysis:**
Analyzing data collected over time to forecast future values. Best for forecasting trends.

**5. Overfitting:**
When model performs well on training data but poorly on test data. Model is too complex.

**6. Data Mining:**
Discovering patterns in large datasets. Also called Knowledge Discovery in Database (KDD).

**7. Clustering:**
Unsupervised learning that groups similar data points. No labels needed.

---

> **Viva Questions:**
> - What is the difference between classification and regression?
> - Explain supervised vs unsupervised learning with examples.
> - What is overfitting and how do you prevent it?
> - In regression, what are dependent and independent variables?
> - What is the difference between time-series and cross-sectional data?
> - Name and explain three classification algorithms.

---

### Practice Questions - Module 5

**Q1: Which type of machine learning is classification?**
a) Unsupervised learning
b) Supervised learning
c) Reinforcement learning
d) Semi-supervised
**Answer: b) Supervised learning**

**Q2: Regression is used to predict:**
a) Categories
b) Continuous numbers
c) Clusters
d) Patterns
**Answer: b) Continuous numbers**

**Q3: In regression "Yt = μt + εt", what is the noise term?**
a) Yt
b) μt
c) εt
d) There is no noise term
**Answer: c) εt** (epsilon)

**Q4: In regression, the response variable is also called:**
a) Independent variable
b) Predictor variable
c) Dependent variable
d) Feature variable
**Answer: c) Dependent variable** (Target)

**Q5: Which is best for forecasting sales trends over next quarter?**
a) Classification
b) Regression
c) Time-series Analysis
d) Anomaly Detection
**Answer: c) Time-series Analysis**

**Q6: Pooled data is a combination of:**
a) Structured and unstructured data
b) Time-series and cross-sectional data
c) Training and testing data
d) Labeled and unlabeled data
**Answer: b) Time-series and cross-sectional data**

**Q7: Algorithm performs well on training but poorly on testing. This is:**
a) Underfitting
b) Overfitting
c) Good fit
d) Homoscedasticity
**Answer: b) Overfitting**

**Q8: Which is NOT a metric for classification?**
a) Accuracy
b) Precision
c) Recall
d) RMSE
**Answer: d) RMSE** (RMSE is for regression!)

**Q9: What is another name for data mining?**
a) Data Cleaning
b) Knowledge Discovery in Database (KDD)
c) Data Transformation
d) Data Warehousing
**Answer: b) Knowledge Discovery in Database (KDD)**

**Q10: In graph analytics, what represents objects to be tracked?**
a) Edges
b) Paths
c) Nodes (Vertices)
d) Weights
**Answer: c) Nodes (Vertices)**
`
