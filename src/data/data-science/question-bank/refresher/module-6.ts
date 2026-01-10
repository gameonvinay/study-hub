export const module6 = `
## Module 6: Recommender Systems

### What are Recommender Systems?

**Recommender Systems** are intelligent algorithms that analyze user preferences and behaviors to suggest relevant items, products, or content that users might be interested in.

**Why Recommender Systems?**
- Information overload - too many choices
- Personalized user experience
- Increase engagement and sales
- Help users discover new items
- Improve customer satisfaction

**Real-World Examples:**
\`\`\`
Netflix: Movie/show recommendations
Amazon: Product recommendations
Spotify: Music recommendations
YouTube: Video recommendations
LinkedIn: Job/connection recommendations
\`\`\`

**Impact:**
- 35% of Amazon revenue comes from recommendations
- 75% of Netflix views are from recommendations
- Increases user engagement by 50-200%

---

### Types of Recommender Systems

\`\`\`
RECOMMENDER SYSTEMS
├── Content-Based Filtering (Item features)
├── Collaborative Filtering (User behavior)
│   ├── Memory-Based CF
│   │   ├── User-Based CF
│   │   └── Item-Based CF
│   └── Model-Based CF
└── Hybrid Systems (Combination)
\`\`\`

---

### 1. Content-Based Filtering

**Definition**: Recommends items similar to those the user has interacted with in the past, based on **item features and characteristics**.

**How it Works:**
\`\`\`
Process:
1. Analyze features of items user liked
2. Find items with similar features
3. Recommend similar items

Focus: WHAT the item is (item attributes)
\`\`\`

**Example - Movie Recommendation:**
\`\`\`
User liked:
- The Dark Knight (Action, Crime, Drama, Nolan)
- Inception (Action, Sci-Fi, Thriller, Nolan)

System analyzes:
- Genre: Action, Thriller
- Director: Christopher Nolan
- Actors: Similar cast

Recommends:
- Interstellar (Sci-Fi, Drama, Nolan) ✓
- Tenet (Action, Thriller, Nolan) ✓
\`\`\`

**Example - E-commerce:**
\`\`\`
User bought: iPhone 14 Pro
Features: Apple, Smartphone, High-end, 6.1" screen

System recommends:
- AirPods Pro (Apple, Premium accessories)
- iPhone case (Compatible with iPhone 14 Pro)
- Apple Watch (Apple ecosystem)
\`\`\`

**How to Extract Features:**

| Item Type | Features |
|-----------|----------|
| **Movies** | Genre, director, actors, year, language |
| **Products** | Category, brand, price range, color, size |
| **Music** | Artist, genre, tempo, mood |
| **Articles** | Topic, author, keywords, category |

**Advantages:**
- ✅ No need for other users' data
- ✅ Can recommend new/unpopular items
- ✅ Explainable recommendations
- ✅ User independence

**Disadvantages:**
- ❌ Limited to user's past preferences (filter bubble)
- ❌ Cannot discover new interests
- ❌ Requires detailed item features
- ❌ Over-specialization problem

**Exam Tip**: Content-based filtering **primarily focuses on analyzing item features and characteristics**, NOT user similarities.

---

### 2. Collaborative Filtering

**Definition**: Recommends items based on the **preferences of similar users**. The idea: "Users who agreed in the past will agree in the future."

**Core Concept:**
\`\`\`
"People like you also liked..."

If User A and User B liked similar items in the past,
and User A likes a new item,
then User B will probably like it too!
\`\`\`

**Example:**
\`\`\`
User A ratings:     Movie1: 5★, Movie2: 4★, Movie3: 5★
User B ratings:     Movie1: 5★, Movie2: 4★, Movie3: ?

Since A and B have similar taste (both liked Movie1 & Movie2),
System predicts B will like Movie3 (5★)
\`\`\`

**Types of Collaborative Filtering:**

#### 2.1 Memory-Based Collaborative Filtering

**Concept**: Uses the entire user-item rating matrix stored in memory to make recommendations. Direct computation using all historical data.

**Characteristics:**
- Uses all historical data directly
- No model training required
- Simple and intuitive
- Slower for large datasets

**Two Approaches:**

##### A) User-Based Collaborative Filtering

**Concept**: Find users similar to the target user, then recommend items those similar users liked.

**Process:**
\`\`\`
1. Find users similar to target user
2. Identify items those similar users liked
3. Recommend those items to target user
\`\`\`

**Example:**
\`\`\`
Target User: You
Similar Users: User A, User B, User C

User A liked: Movie X, Movie Y
User B liked: Movie X, Movie Z
User C liked: Movie Y, Movie Z

Recommendation: Movie X (2 users), Movie Y (2 users), Movie Z (2 users)
\`\`\`

**Formula:**
\`\`\`
Similarity between users → Find neighbors → Predict ratings
\`\`\`

##### B) Item-Based Collaborative Filtering

**Concept**: Find items similar to items the user has liked, then recommend those similar items.

**Process:**
\`\`\`
1. Identify items user liked
2. Find similar items (based on user ratings)
3. Recommend those similar items
\`\`\`

**Example:**
\`\`\`
User liked: iPhone

System finds items similar to iPhone:
- MacBook (users who bought iPhone also bought MacBook)
- AirPods (high similarity with iPhone)
- Apple Watch (frequently bought together)

Recommendation: MacBook, AirPods, Apple Watch
\`\`\`

**User-Based vs Item-Based:**

| Aspect | User-Based | Item-Based |
|--------|-----------|------------|
| **Find** | Similar users | Similar items |
| **Recommend** | What similar users liked | Items similar to what user liked |
| **Best for** | Fewer users, many items | Fewer items, many users |
| **Example** | "People like you watched..." | "Because you watched X, try Y" |

#### 2.2 Model-Based Collaborative Filtering

**Definition**: Uses **machine learning algorithms to build a model** on the user-item rating dataset, then uses the model for predictions.

**Concept**: Train a model to learn patterns, then predict ratings without storing entire matrix.

**Process:**
\`\`\`
1. Collect user-item rating data
2. Train ML model (learn patterns)
3. Use model to predict ratings for unseen items
4. Recommend high-predicted items
\`\`\`

**Common Algorithms:**
- Matrix Factorization (SVD, NMF)
- Deep Learning (Neural Networks)
- Clustering (K-means on users/items)
- Bayesian Networks

**Advantages over Memory-Based:**
- ✅ Faster predictions (no need to scan entire dataset)
- ✅ Scalable (handles millions of users)
- ✅ Better performance
- ✅ Handles sparse data better

**Example - Matrix Factorization:**
\`\`\`
User-Item Rating Matrix (sparse):
        Movie1  Movie2  Movie3
User1     5       ?       4
User2     ?       4       ?
User3     3       ?       5

Model-Based CF:
1. Decompose matrix into user features × item features
2. Learn latent factors (hidden preferences)
3. Predict missing ratings
4. Recommend highest predicted ratings
\`\`\`

**Memory-Based vs Model-Based:**

| Aspect | Memory-Based | Model-Based |
|--------|-------------|-------------|
| **Approach** | Use entire dataset directly | Build ML model |
| **Speed** | Slower (compute on demand) | Faster (pre-trained model) |
| **Scalability** | Poor (large datasets) | Excellent |
| **Examples** | User-based, Item-based | SVD, Neural Networks |
| **Training** | No training needed | Requires training |

**Exam Tip**: Model-Based CF **uses machine learning algorithms to build a model on the user-item rating dataset**.

---

### 3. Similarity Measures

To find similar users or items, we need similarity metrics:

#### 3.1 Cosine Similarity

**Concept**: Measures the cosine of the angle between two vectors. Ranges from -1 to 1 (0 to 1 for positive data).

**Formula:**
\`\`\`
cos(θ) = (A · B) / (||A|| × ||B||)

Where:
A · B = dot product
||A|| = magnitude of vector A
\`\`\`

**Example:**
\`\`\`
User A ratings: [5, 4, 0, 0]
User B ratings: [4, 5, 0, 0]

Cosine Similarity = 0.98 (very similar!)
\`\`\`

**Characteristics:**
- Measures angle, not magnitude
- Good for sparse data
- Range: 0 to 1 (for positive ratings)

#### 3.2 Euclidean Distance

**Concept**: Calculates the **straight-line distance** between two users' preference vectors. Lower distance = more similar.

**Formula:**
\`\`\`
distance = √[(x₁-x₂)² + (y₁-y₂)² + ...]
\`\`\`

**Example:**
\`\`\`
User A ratings: [5, 3, 4]
User B ratings: [4, 4, 3]

Euclidean Distance = √[(5-4)² + (3-4)² + (4-3)²]
                   = √[1 + 1 + 1]
                   = √3 ≈ 1.73

Lower distance = More similar users
\`\`\`

**Characteristics:**
- Measures actual distance
- Sensitive to magnitude
- Convert to similarity: 1 / (1 + distance)

#### 3.3 Pearson Correlation

**Concept**: Measures linear correlation between two users' ratings. Ranges from -1 to 1.

**Formula:**
\`\`\`
r = Σ[(xᵢ - x̄)(yᵢ - ȳ)] / √[Σ(xᵢ - x̄)² × Σ(yᵢ - ȳ)²]
\`\`\`

**Characteristics:**
- Accounts for rating scale differences
- Range: -1 (opposite) to 1 (same)
- Good for different rating behaviors

#### 3.4 Jaccard Similarity

**Concept**: Measures overlap between two sets. Good for binary data (liked/not liked).

**Formula:**
\`\`\`
Jaccard = |A ∩ B| / |A ∪ B|
\`\`\`

**Example:**
\`\`\`
User A liked: {Movie1, Movie2, Movie3}
User B liked: {Movie2, Movie3, Movie4}

Intersection: {Movie2, Movie3} = 2
Union: {Movie1, Movie2, Movie3, Movie4} = 4

Jaccard Similarity = 2/4 = 0.5
\`\`\`

**Comparison:**

| Measure | Type | Best For | Range |
|---------|------|----------|-------|
| **Cosine** | Angle | Sparse data, text | 0 to 1 |
| **Euclidean** | Distance | Dense data | 0 to ∞ |
| **Pearson** | Correlation | Different scales | -1 to 1 |
| **Jaccard** | Overlap | Binary data | 0 to 1 |

**Exam Tip**: Euclidean Distance calculates the **straight-line distance between two users' preference vectors**.

---

### 4. Non-Negative Matrix Factorization (NMF/NNM)

**Full Name**: Non-Negative Matrix Factorization

**What is a Non-Negative Matrix (NNM)?**
A matrix where **all entries are non-negative** (≥ 0). No negative values allowed.

**Example:**
\`\`\`
Valid NNM:           Invalid (has negatives):
[5  3  0]           [5  -3   0]
[0  4  2]           [0   4   2]
[1  0  5]           [-1  0   5]
\`\`\`

**What is NMF?**
Technique to decompose a non-negative matrix into the product of two non-negative matrices.

**Formula:**
\`\`\`
V ≈ W × H

Where:
V = Original matrix (m × n)
W = Basis matrix (m × k) - also called Coefficient Matrix
H = Coefficient matrix (k × n)
k = number of latent factors (smaller than m, n)
\`\`\`

**Components:**
- **V**: Original user-item rating matrix
- **W**: User feature matrix (users × latent factors)
- **H**: Item feature matrix (latent factors × items)
- **Coefficient Matrix**: W matrix in NMF

**Example - Movie Recommendations:**
\`\`\`
Original Matrix V (3 users × 4 movies):
        M1  M2  M3  M4
User1   5   3   0   1
User2   4   0   0   1
User3   1   1   5   0

Decompose into:
W (users × 2 factors):        H (2 factors × movies):
        F1  F2                    M1  M2  M3  M4
User1   2   1                F1   2   1   0   1
User2   2   0                F2   1   2   5   0
User3   0   1

Factors might represent:
F1 = Action preference
F2 = Romance preference
\`\`\`

**How NMF Works in Recommender Systems:**
\`\`\`
1. Start with sparse user-item matrix
2. Decompose into W × H
3. W captures user preferences for latent factors
4. H captures item characteristics for latent factors
5. Multiply W × H to predict missing ratings
6. Recommend items with highest predicted ratings
\`\`\`

**Advantages:**
- ✅ Handles sparse data
- ✅ Discovers latent features
- ✅ All values remain non-negative (interpretable)
- ✅ Good for recommendation systems

**Applications:**
- Recommender systems
- Topic modeling (text)
- Image processing
- Audio source separation

**Exam Tip**:
- **Non-Negative Matrix (NNM)**: Matrix with **all entries non-negative** (≥ 0)
- **Coefficient Matrix**: One of the matrices in NMF decomposition (W matrix)

---

### 5. Hybrid Recommender Systems

**Definition**: Combines multiple recommendation techniques to leverage their strengths and overcome weaknesses.

**Common Combinations:**
- Content-Based + Collaborative Filtering
- Multiple collaborative filtering methods
- Adding demographic data
- Context-aware recommendations

**Example - Netflix:**
\`\`\`
Hybrid approach:
1. Collaborative filtering (what similar users watched)
2. Content-based (genre, actors you like)
3. Popularity (trending shows)
4. Context (time of day, device)
\`\`\`

**Advantages:**
- ✅ Better accuracy
- ✅ Overcomes cold start problem
- ✅ More diverse recommendations
- ✅ Handles sparse data better

---

### Comparison Table

| Type | Input | Focus | Cold Start | Example |
|------|-------|-------|------------|---------|
| **Content-Based** | Item features | What item IS | No problem for items | "Similar to iPhone" |
| **Collaborative** | User behavior | What users LIKE | Problem for new users/items | "People like you bought" |
| **User-Based CF** | User ratings | Similar users | Problem | "Users like you" |
| **Item-Based CF** | User ratings | Similar items | Less problem | "Similar products" |
| **Model-Based CF** | User-item matrix | ML patterns | Less problem | Matrix factorization |
| **Hybrid** | Multiple sources | Best of both | Minimal problem | Netflix, Amazon |

---

### Applications

| Industry | Use Case | Benefit |
|----------|----------|---------|
| **E-commerce** | Product recommendations | Increase sales, cross-selling |
| **Streaming** | Movies, music, podcasts | Engagement, retention |
| **Social Media** | Friends, content, ads | User engagement |
| **News** | Article recommendations | Personalized feed |
| **Education** | Course recommendations | Learning path |
| **Travel** | Hotel, destination recommendations | Personalized trips |

---

### Challenges

**1. Cold Start Problem:**
- New users: No history to base recommendations
- New items: No ratings yet

**Solutions:**
- Ask for initial preferences
- Use content-based for new items
- Use popularity-based recommendations

**2. Scalability:**
- Millions of users × items = huge matrix
- Real-time recommendations

**Solutions:**
- Model-based CF
- Approximate algorithms
- Distributed computing

**3. Sparsity:**
- Most users rate very few items
- Matrix is 99% empty

**Solutions:**
- Matrix factorization
- Hybrid approaches

**4. Diversity vs Accuracy:**
- Too personalized = filter bubble
- Need balance between accuracy and diversity

---

### Quick Reference

**Content-Based Filtering:**
- Focuses on **item features**
- Relies on user's **past interactions**
- Not suitable when items have **complex attributes** (FALSE - it handles complex attributes well!)

**Collaborative Filtering:**
- Predicts based on **similar users** preferences
- Can be Memory-Based or Model-Based
- User-Based: Find similar users
- Item-Based: Find similar items

**Similarity Measures:**
- Euclidean: Straight-line distance
- Cosine: Angle between vectors
- Pearson: Correlation
- Jaccard: Set overlap

**NMF:**
- Non-Negative Matrix: All entries ≥ 0
- Decomposes matrix: V ≈ W × H
- W = Coefficient Matrix

---

> **Viva Questions:**
> - What is the difference between content-based and collaborative filtering?
> - Explain user-based vs item-based collaborative filtering.
> - What is the cold start problem in recommender systems?
> - How does Non-Negative Matrix Factorization work?
> - Compare memory-based and model-based collaborative filtering.
> - Which similarity measure would you use for sparse data and why?

---

### Practice Questions - Module 6

---

**Q1: Which type of recommender system is NOT commonly used?**

a) Content-based filtering

b) Collaborative filtering

c) User-based filtering

**d) Deep filtering** ✅

---

**Q2: Which type of collaborative filtering uses machine learning algorithms to build a model on the user-item rating dataset?**

a) Memory-Based CF

b) User-Based CF

**c) Model-Based CF** ✅

d) Item-Based CF

---

**Q3: Which similarity measure calculates the straight-line distance between two users' preference vectors?**

a) Cosine Similarity

b) Pearson Correlation

**c) Euclidean Distance** ✅

d) Jaccard Similarity

---

**Q4: What is a Non-Negative Matrix (NNM)?**

a) A matrix with all entries greater than zero

b) A matrix with all entries less than zero

**c) A matrix with all entries non-negative** ✅

d) A matrix with all entries equal to zero

---

**Q5: Which of the following is a component of Non-Negative Matrix Factorization?**

a) Mean Matrix

**b) Coefficient Matrix** ✅

c) Diagonal Matrix

d) Singular Matrix

---

**Q6: What is collaborative filtering in recommender systems?**

a) A technique that recommends items similar to those the user has interacted with in the past

b) A technique that analyzes item attributes and recommends items with similar features

c) A technique that mines association rules to identify item relationships

**d) A technique that predicts user preferences based on the preferences of similar users** ✅

---

**Q7: In content-based filtering, which of the following statements is true?**

a) It relies on users' past interactions and preferences to make recommendations

**b) It primarily focuses on analyzing item features and characteristics** ✅

c) It uses collaborative filtering techniques to generate recommendations

d) It is not suitable for recommending items with complex attributes

---

**Q8: Which approach to recommender systems combines multiple techniques?**

a) Content-Based

b) Collaborative Filtering

c) User-Based

**d) Hybrid Systems** ✅

---

**Q9: What problem occurs when there is no data for new users or items?**

a) Sparsity problem

b) Scalability problem

**c) Cold start problem** ✅

d) Diversity problem

---

**Q10: Which is better for systems with many users but fewer items?**

a) User-Based CF

**b) Item-Based CF** ✅

c) Content-Based

d) Demographic filtering
`
</invoke>