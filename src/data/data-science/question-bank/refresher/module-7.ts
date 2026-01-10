export const module7 = `
## Module 7: Anomaly Detection

### What is Anomaly Detection?

**Anomaly Detection** (also called **Outlier Detection**) is the process of identifying data points, events, or observations that deviate significantly from the normal pattern or expected behavior.

**Definition**: Identifying unusual patterns that do not conform to expected behavior.

**Another Term**: **Outlier Detection**

**Why Anomaly Detection?**
- Detect fraud (credit cards, insurance)
- Identify system failures (network intrusion, equipment breakdown)
- Discover rare events (diseases, defects)
- Quality control (manufacturing defects)
- Cybersecurity threats

**Real-World Examples:**
\`\`\`
Normal Behavior → Anomaly

Credit Card:
- Normal: $50-200 transactions → Anomaly: $5000 sudden charge

Network Traffic:
- Normal: 100-500 requests/min → Anomaly: 10,000 requests/min (DDoS attack)

Manufacturing:
- Normal: Product weight 100±2g → Anomaly: Product weight 85g (defective)

Health Monitoring:
- Normal: Heart rate 60-100 bpm → Anomaly: Heart rate 180 bpm (medical emergency)
\`\`\`

---

### What is an Anomaly (Outlier)?

**Anomaly/Outlier**: A data point that is **significantly different** from other observations.

**Characteristics:**
- Rare occurrence (happens infrequently)
- Deviates substantially from normal pattern
- May indicate important events
- Can be errors or genuine rare cases

**Types of Anomalies:**

\`\`\`
ANOMALY TYPES
├── Point Anomaly (Single unusual value)
├── Contextual Anomaly (Unusual in specific context)
└── Collective Anomaly (Group behaves unusually)
\`\`\`

**Examples:**

| Type | Example |
|------|---------|
| **Point** | Age = 200 years (clearly wrong) |
| **Contextual** | Temperature = 15°C (normal in winter, anomaly in summer) |
| **Collective** | Sudden spike in login attempts from same IP (potential attack) |

---

### Approaches to Anomaly Detection

#### 1. Supervised Learning Approach

**When to Use**: When you have labeled data (normal vs anomaly).

**How it Works:**
\`\`\`
1. Collect labeled training data
   - Normal examples: labeled "normal"
   - Anomaly examples: labeled "anomaly"
2. Train classification model
3. Predict on new data: normal or anomaly
\`\`\`

**Challenge**: Anomalies are rare, so hard to get enough labeled anomaly examples.

**Example:**
\`\`\`
Training Data:
- 10,000 normal transactions (labeled "normal")
- 100 fraud cases (labeled "fraud")

Model learns: patterns of fraud vs normal
New transaction → Model predicts: normal or fraud
\`\`\`

#### 2. Unsupervised Learning Approach

**When to Use**: When you **don't have labeled data**. Build a model of **normal behavior** and flag deviations.

**How it Works:**
\`\`\`
1. Collect only normal data (no labels needed)
2. Build model of normal behavior
3. Anything that deviates significantly = anomaly
\`\`\`

**Key Idea**: Assume most data is normal, rare deviations are anomalies.

**Example:**
\`\`\`
Network Traffic Data (unlabeled):
- Model learns: typical traffic patterns
- Sudden spike in traffic → Flagged as anomaly

Manufacturing (unlabeled):
- Model learns: normal product dimensions
- Product outside normal range → Flagged as defect
\`\`\`

**Advantages:**
- ✅ No need for labeled data
- ✅ Can detect unknown anomalies
- ✅ Scalable to large datasets

**Disadvantages:**
- ❌ May flag normal rare events as anomalies (false positives)
- ❌ Assumes most data is normal

**Exam Tip**: Unsupervised anomaly detection is based on **building a model of normal behavior** and flagging data points that **deviate significantly from this model**.

#### 3. Semi-Supervised Learning Approach

**When to Use**: When you have only normal data for training.

**How it Works:**
\`\`\`
1. Train on normal data only
2. Assume anything different = anomaly
\`\`\`

**Example**: One-class SVM

---

### Anomaly Detection Methods

### 1. Statistical Methods

#### 1.1 Z-Score Method

**Concept**: Measures how many **standard deviations** a data point is from the **mean**.

**Formula:**
\`\`\`
Z = (X - μ) / σ

Where:
X = data point
μ = mean of dataset
σ = standard deviation
\`\`\`

**Rule of Thumb:**
\`\`\`
|Z| > 3    → Outlier (99.7% of data within ±3σ)
|Z| > 2    → Potential outlier (95% within ±2σ)
|Z| < 2    → Normal
\`\`\`

**Example:**
\`\`\`
Dataset: Student exam scores
Mean (μ) = 70
Standard Deviation (σ) = 10

Student A score: 95
Z = (95 - 70) / 10 = 2.5

Student B score: 45
Z = (45 - 70) / 10 = -2.5

Student C score: 110
Z = (110 - 70) / 10 = 4.0 → OUTLIER! (|Z| > 3)
\`\`\`

**When to Use:**
- Data follows normal distribution (bell curve)
- Univariate data (single variable)
- Quick screening for outliers

**Limitations:**
- Assumes normal distribution
- Sensitive to extreme outliers (they affect mean and σ)
- Not suitable for skewed data

**Exam Tip**: Z-score measures the **number of standard deviations** a data point is from the **mean**.

---

#### 1.2 IQR Method (Interquartile Range)

**Concept**: Uses quartiles to identify outliers. More **robust** than Z-score because it's not affected by extreme values.

**What is IQR?**
\`\`\`
IQR = Q3 - Q1

Where:
Q1 = 25th percentile (1st quartile)
Q3 = 75th percentile (3rd quartile)
Q2 = 50th percentile (median) - not used in IQR calculation
\`\`\`

**Outlier Detection Rule:**
\`\`\`
Lower Bound = Q1 - 1.5 × IQR
Upper Bound = Q3 + 1.5 × IQR

Outlier if:
  X < Lower Bound  OR  X > Upper Bound
\`\`\`

**Step-by-Step Example:**
\`\`\`
Dataset: [5, 7, 8, 9, 10, 11, 12, 13, 15, 50]

Step 1: Find quartiles
Q1 (25th percentile) = 8
Q2 (median) = 10.5
Q3 (75th percentile) = 13

Step 2: Calculate IQR
IQR = Q3 - Q1 = 13 - 8 = 5

Step 3: Calculate bounds
Lower Bound = Q1 - 1.5 × IQR = 8 - 1.5(5) = 0.5
Upper Bound = Q3 + 1.5 × IQR = 13 + 1.5(5) = 20.5

Step 4: Identify outliers
50 > 20.5 → 50 is an OUTLIER!
All other values are within bounds → Normal
\`\`\`

**Visualization (Box Plot):**
\`\`\`
           Outlier → ●
                     |
    ──────┬──────────┼──────────┬──────
          |          |          |
         Q1         Q2         Q3
          |←─── IQR ──→|
\`\`\`

**Advantages:**
- ✅ Robust (not affected by extreme values)
- ✅ Works for skewed distributions
- ✅ Simple to understand and implement
- ✅ Visualizable with box plots

**When to Use:**
- Skewed data distributions
- Data with extreme values
- Quick visual inspection needed
- Univariate outlier detection

**Limitations:**
- Works best for univariate data
- Fixed threshold (1.5 × IQR)
- May miss subtle anomalies

**Exam Tip**: IQR method is more **robust** than Z-score for outlier detection.

---

### 2. Distance-Based Methods

#### 2.1 K-Nearest Neighbors (KNN) for Anomaly Detection

**Concept**: Calculate distance to K nearest neighbors. Points far from neighbors are anomalies.

**How it Works:**
\`\`\`
1. For each point, find K nearest neighbors
2. Calculate average distance to these neighbors
3. If distance > threshold → Anomaly
\`\`\`

**Example:**
\`\`\`
Normal points: Clustered together (close neighbors)
Anomaly point: Far from all neighbors (large distance)
\`\`\`

**When to Use:**
- Multivariate data (multiple features)
- Clear clusters in data
- Medium-sized datasets

---

### 3. Density-Based Methods

#### 3.1 DBSCAN (Density-Based Spatial Clustering)

**Concept**: Identifies anomalies as points in low-density regions.

**How it Works:**
\`\`\`
1. Find dense regions (clusters)
2. Points in sparse regions = anomalies
\`\`\`

**Parameters:**
- ε (epsilon): Maximum distance to consider neighbors
- MinPts: Minimum points to form a dense region

**Anomalies**: Points that don't belong to any cluster (noise points)

**When to Use:**
- Irregular shaped clusters
- Varying density regions
- Spatial data

---

### 4. Machine Learning Methods

#### 4.1 Isolation Forest

**Concept**: Anomalies are easier to "isolate" in a tree structure (require fewer splits).

**How it Works:**
\`\`\`
1. Build random decision trees
2. Measure how many splits needed to isolate each point
3. Points isolated quickly (few splits) = Anomalies
\`\`\`

**Why it Works:**
- Normal points: Clustered, require many splits
- Anomalies: Isolated, require few splits

**Advantages:**
- ✅ Fast and scalable
- ✅ Works well for high-dimensional data
- ✅ No need for labeled data

#### 4.2 One-Class SVM

**Concept**: Learn boundary around normal data. Points outside boundary = anomalies.

**How it Works:**
\`\`\`
1. Train on normal data only
2. Find smallest boundary containing most normal points
3. New points outside boundary = Anomalies
\`\`\`

#### 4.3 Autoencoders (Deep Learning)

**Concept**: Neural network trained to reconstruct input. High reconstruction error = anomaly.

**How it Works:**
\`\`\`
1. Train autoencoder on normal data
2. For new data, try to reconstruct
3. If reconstruction error is high → Anomaly
\`\`\`

---

### Use Cases and Applications

| Domain | Anomaly | Detection Method | Benefit |
|--------|---------|-----------------|---------|
| **Credit Card Fraud** | Unusual transaction | Isolation Forest | Prevent fraud |
| **Network Security** | Intrusion attempts | DBSCAN | Detect attacks |
| **Manufacturing** | Defective products | Z-score, IQR | Quality control |
| **Healthcare** | Disease outbreaks | Statistical methods | Early warning |
| **IoT Sensors** | Equipment failure | Autoencoders | Predictive maintenance |
| **E-commerce** | Fake reviews | KNN | Content moderation |

---

### When to Use Each Method?

| Method | Best For | Data Type | Labeled Data? |
|--------|----------|-----------|---------------|
| **Z-Score** | Normally distributed data | Univariate | No |
| **IQR** | Skewed data, quick analysis | Univariate | No |
| **KNN** | Clustered data | Multivariate | No |
| **DBSCAN** | Spatial, irregular clusters | Multivariate | No |
| **Isolation Forest** | High-dimensional, fast | Multivariate | No |
| **One-Class SVM** | Complex boundaries | Multivariate | Semi-supervised |
| **Autoencoders** | Complex patterns, images | Any | No |

---

### Challenges in Anomaly Detection

**1. Imbalanced Data:**
- Anomalies are rare (1% or less)
- Models may ignore rare class
- **Solution**: Use anomaly-specific algorithms, sampling techniques

**2. Defining "Normal":**
- What is normal behavior?
- Changes over time (concept drift)
- **Solution**: Update models regularly, use adaptive methods

**3. False Positives:**
- Flagging normal events as anomalies
- Too many alerts = alert fatigue
- **Solution**: Tune thresholds, use ensemble methods

**4. Unknown Anomalies:**
- New types of anomalies not seen before
- **Solution**: Use unsupervised methods

---

### Evaluation Metrics

**For Labeled Data:**

| Metric | Formula | Use |
|--------|---------|-----|
| **Precision** | TP / (TP + FP) | How many flagged anomalies are real? |
| **Recall** | TP / (TP + FN) | How many real anomalies did we catch? |
| **F1-Score** | 2 × (Precision × Recall) / (P + R) | Balance |

**For Unlabeled Data:**
- Domain expert review
- Manual inspection of flagged items
- Monitoring false positive rate

---

### Scenario-Based Applications

**Q: In which scenario would anomaly detection using AI be LEAST effective?**

Let's analyze:

a) **Identifying defective products** in a manufacturing assembly line
   - Good use case: Clear normal vs defect patterns

b) **Monitoring website traffic** to detect unusual spikes
   - Good use case: Normal traffic patterns vs DDoS attacks

c) **Predicting customer churn** based on historical sales data
   - **LEAST EFFECTIVE**: This is a **prediction task**, not anomaly detection!
   - Customer churn = Classification/Regression problem
   - Not about finding outliers, but predicting future behavior

d) **Detecting abnormal patterns** in EEG signals
   - Good use case: Normal brain activity vs seizures

**Answer: c) Predicting customer churn**

**Exam Tip**: Anomaly detection finds **unusual patterns**, not predicting future outcomes.

---

### Quick Reference

**Anomaly Detection:**
- Also called: **Outlier Detection**
- Goal: Find unusual patterns
- Approach: Supervised, **Unsupervised** (most common), Semi-supervised

**Statistical Methods:**
- **Z-Score**: Measures standard deviations from mean (|Z| > 3 = outlier)
- **IQR**: Uses quartiles (more robust than Z-score)

**Machine Learning Methods:**
- KNN: Distance to neighbors
- DBSCAN: Density-based
- Isolation Forest: Tree-based isolation
- One-Class SVM: Boundary learning
- Autoencoders: Reconstruction error

**Unsupervised Approach:**
- Build model of **normal behavior**
- Flag significant **deviations**

---

> **Viva Questions:**
> - What is the difference between supervised and unsupervised anomaly detection?
> - Explain Z-score and IQR methods for outlier detection.
> - When would you use IQR over Z-score?
> - How does unsupervised anomaly detection work?
> - Give real-world examples of anomaly detection applications.
> - What is the cold start problem in anomaly detection?

---

### Practice Questions - Module 7

---

**Q1: What is another term for anomaly detection?**

**a) Outlier detection** ✅

b) Trend analysis

c) Data normalization

d) Signal processing

---

**Q2: Which method measures the number of standard deviations a data point is from the mean?**

a) IQR

**b) Z-score** ✅

c) KNN

d) DBSCAN

---

**Q3: Which approach to anomaly detection builds a model of normal behavior and flags deviations?**

a) Supervised learning

**b) Unsupervised learning** ✅

c) Semi-supervised learning

d) Reinforcement learning

---

**Q4: Which method is more robust to outliers: Z-score or IQR?**

a) Z-score

**b) IQR** ✅

c) Both equally robust

d) Neither is robust

---

**Q5: In which scenario would anomaly detection using AI be LEAST effective?**

a) Identifying defective products in a manufacturing assembly line

b) Monitoring website traffic to detect unusual spikes in user activity

**c) Predicting customer churn based on historical sales data** ✅

d) Detecting abnormal patterns in EEG signals for diagnosing neurological disorders

---

**Q6: What does IQR stand for?**

a) Interquantile Ratio

**b) Interquartile Range** ✅

c) Internal Quality Rating

d) Integrated Query Range

---

**Q7: In the IQR method, what is the outlier threshold?**

a) Q1 - 1.0 × IQR and Q3 + 1.0 × IQR

**b) Q1 - 1.5 × IQR and Q3 + 1.5 × IQR** ✅

c) Q1 - 2.0 × IQR and Q3 + 2.0 × IQR

d) Q1 - 3.0 × IQR and Q3 + 3.0 × IQR

---

**Q8: Which ML algorithm isolates anomalies by requiring fewer splits in a tree?**

a) DBSCAN

b) KNN

**c) Isolation Forest** ✅

d) One-Class SVM

---

**Q9: What is the main challenge with supervised anomaly detection?**

a) Too much data

**b) Anomalies are rare, hard to get labeled examples** ✅

c) Models are too complex

d) Cannot handle multivariate data

---

**Q10: Which method uses density to identify anomalies?**

a) Z-score

b) IQR

c) KNN

**d) DBSCAN** ✅
`
</invoke>