export const module3 = `
## Module 3: Natural Language Processing (NLP) & Text Analytics

### What is Natural Language Processing?

**Natural Language Processing (NLP)** is a branch of AI that helps computers understand, interpret, and generate human language in a valuable way.

**Why NLP?**
- Humans communicate primarily through language (text, speech)
- Massive amounts of unstructured text data (social media, emails, documents)
- Enables machines to extract meaning from human language
- Powers virtual assistants, chatbots, translation, sentiment analysis

**NLP Applications:**
\`\`\`
NLP Use Cases:
├── Sentiment Analysis (product reviews, social media)
├── Text Summarization (news articles, documents)
├── Chatbots & Virtual Assistants (Siri, Alexa)
├── Machine Translation (Google Translate)
├── Text Classification (spam detection, topic categorization)
├── Named Entity Recognition (identify people, places, organizations)
└── Question Answering (search engines, customer support)
\`\`\`

---

### 1. Sentiment Analysis

**Definition**: NLP technique that identifies and extracts subjective information from text to determine the emotional tone (positive, negative, or neutral).

**What Does Sentiment Analysis Do?**
- Analyzes incoming messages
- Determines underlying sentiment: positive, negative, or neutral
- Measures emotional tone and opinions

\`\`\`
Input Text Analysis:

"This product is amazing! Best purchase ever!"
    → Sentiment: POSITIVE (95% confidence)

"Terrible service. Never buying again."
    → Sentiment: NEGATIVE (92% confidence)

"The product arrived on time."
    → Sentiment: NEUTRAL (85% confidence)
\`\`\`

**Types of Sentiment Analysis:**

| Type | Output | Example |
|------|--------|---------|
| **Binary** | Positive or Negative | Good review vs Bad review |
| **Multiclass** | Positive, Negative, Neutral | 3 categories |
| **Fine-grained** | Very Pos, Pos, Neutral, Neg, Very Neg | 5-star ratings |
| **Aspect-Based** | Per feature/aspect | "Food excellent, service poor" |
| **Emotion Detection** | Specific emotions | Happy, Angry, Sad, Excited |

**How Sentiment Analysis Works:**

\`\`\`
Method 1: Lexicon-Based Approach
┌─────────────────────────────────────┐
│ 1. Create sentiment dictionary      │
│    Positive words: {amazing, great} │
│    Negative words: {terrible, bad}  │
│ 2. Count positive/negative words    │
│ 3. Calculate overall sentiment      │
└─────────────────────────────────────┘

Method 2: Machine Learning Approach
┌─────────────────────────────────────┐
│ 1. Collect labeled training data    │
│ 2. Extract features (words, n-grams)│
│ 3. Train classifier (Naive Bayes,   │
│    SVM, Neural Networks)            │
│ 4. Predict sentiment on new text    │
└─────────────────────────────────────┘
\`\`\`

**Applications:**

| Domain | Use Case | Benefit |
|--------|----------|---------|
| **Social Media** | Monitor brand reputation | Track public opinion in real-time |
| **E-commerce** | Analyze product reviews | Identify customer pain points |
| **Customer Support** | Prioritize urgent issues | Route angry customers first |
| **Market Research** | Consumer sentiment trends | Understand market perception |
| **Politics** | Public opinion on policies | Gauge voter sentiment |

**Example - Sentiment Analysis:**
\`\`\`
Text: "I love this phone but the battery life is disappointing."

Overall Sentiment: MIXED
- Positive aspect: phone quality (love)
- Negative aspect: battery life (disappointing)

Aspect-Based Sentiment:
- Phone: Positive
- Battery: Negative
\`\`\`

**Exam Tip:** Sentiment Analysis **analyzes incoming messages** to determine if the sentiment is **positive, negative, or neutral**.

---

### 2. Text Summarization

**Definition**: NLP technique that produces a concise and fluent summary of a longer text document while preserving key information and overall meaning.

**Why Summarization?**
- Information overload - too much text to read
- Save time by reading summaries
- Extract key points from long documents
- News aggregation, research papers, legal documents

**Two Types of Text Summarization:**

#### 2.1 Extractive Summarization

**Concept**: Select and extract important sentences directly from the original text.

**How it Works:**
\`\`\`
Process:
1. Input document
2. Calculate sentence importance/rank
   (based on: word frequency, position, length)
3. Select sentences with higher rank
4. Combine selected sentences → Summary

It's like HIGHLIGHTING key sentences!
\`\`\`

**Example:**
\`\`\`
Original Text:
"Machine learning is a subset of AI. It enables systems to
learn from data. ML algorithms identify patterns in data.
These patterns help make predictions."

Extractive Summary (select top 2 sentences):
"Machine learning is a subset of AI. ML algorithms identify
patterns in data."
\`\`\`

**Characteristics:**
- ✅ Simpler and faster
- ✅ Grammatically correct (original sentences)
- ❌ May lack coherence
- ❌ Limited flexibility

#### 2.2 Abstractive Summarization

**Concept**: Generate new sentences that capture the essence of the original text, using different words and phrasing.

**How it Works:**
\`\`\`
Process:
1. Input document
2. Understand context and semantics (deep understanding)
3. Generate new sentences in own words
4. Create summary with novel phrasing

It's like WRITING a summary in your own words!
\`\`\`

**Example:**
\`\`\`
Original Text:
"Machine learning is a subset of AI. It enables systems to
learn from data. ML algorithms identify patterns in data.
These patterns help make predictions."

Abstractive Summary (paraphrase):
"ML, an AI subset, uses data patterns for predictions."
\`\`\`

**Characteristics:**
- ✅ More human-like and natural
- ✅ Better coherence
- ✅ Can paraphrase and generalize
- ❌ More complex (requires NLU + NLG)
- ❌ May introduce errors

**Comparison:**

| Feature | Extractive | Abstractive |
|---------|------------|-------------|
| **Method** | Copy-paste sentences | Generate new sentences |
| **Complexity** | Simple | Complex |
| **Quality** | Good grammar, may lack flow | Natural, coherent |
| **Techniques** | TF-IDF, TextRank | Seq2Seq, Transformers |
| **Speed** | Fast | Slower |
| **Example** | Highlighting key sentences | Paraphrasing in own words |

**Abstractive Summarization Process (from Exam):**

Option 1:
\`\`\`
Input document → sentences similarity → weight sentences
→ select sentences with higher rank
\`\`\`

Option 2 (More Accurate):
\`\`\`
Input document → understand context → semantics
→ create own summary
\`\`\`

**Applications:**
- News aggregation (Google News)
- Document summarization (legal, medical)
- Email summarization
- Research paper abstracts

**Exam Tip:**
- **Extractive**: Selects existing sentences
- **Abstractive**: Generates new sentences

---

### 3. Topic Modeling & LDA

**What is Topic Modeling?**
Process of automatically discovering topics (themes) present in a collection of documents.

**Why Topic Modeling?**
- Organize large document collections
- Discover hidden themes in text
- Document clustering and classification
- Content recommendation

#### Latent Dirichlet Allocation (LDA)

**Definition**: LDA is a probabilistic topic modeling algorithm that discovers topics in a collection of documents.

**Full Form:** **L**atent **D**irichlet **A**llocation

**What is LDA?**
- **Latent**: Hidden topics (not explicitly mentioned)
- **Dirichlet**: Type of probability distribution
- **Allocation**: Assigning words to topics

**How LDA Works:**

\`\`\`
Assumptions:
1. Documents are mixtures of topics
2. Topics are mixtures of words

Example:
Document: "Python is great for data science and machine learning"

LDA discovers:
Topic 1 (Programming): {Python, code, language, syntax}
Topic 2 (Data Science): {data, science, analysis, ML}

Document composition:
40% Topic 1 (Programming) + 60% Topic 2 (Data Science)
\`\`\`

**LDA Process:**
\`\`\`
1. Decide number of topics (K)
   Example: K=3 topics

2. Initialize randomly
   Assign each word to a random topic

3. Iterate
   For each word:
   - How often does this word appear in this topic?
   - How often does this document talk about this topic?
   - Reassign word to most likely topic

4. Converge
   After many iterations, stable topic assignments
\`\`\`

**Example - LDA Output:**
\`\`\`
Dataset: News articles

Topic 1 (Politics): election, government, president, policy, vote
Topic 2 (Sports): football, cricket, player, match, team
Topic 3 (Technology): AI, software, computer, data, algorithm

Document: "AI and machine learning transform data analysis"
→ 90% Topic 3 (Technology), 10% Topic 2 (Sports)
\`\`\`

**Applications:**
- Content recommendation (suggest similar articles)
- Document organization (group by topic)
- Trend analysis (emerging topics over time)
- Information retrieval (improve search)

**Exam Tip:**
- **Full Form**: Latent Dirichlet Allocation
- **Context**: Topic Modelling
- **Purpose**: Discover hidden topics in documents
- **Output**: Topics as word distributions

---

### 4. Topic Extraction

**Definition**: Identifying and extracting the main topics or keywords from a document.

**Difference from Topic Modeling:**
- **Topic Modeling (LDA)**: Discovers topics across document collection
- **Topic Extraction**: Identifies topics/keywords in single document

**Techniques:**
- **TF-IDF**: Term Frequency-Inverse Document Frequency
- **Keyword Extraction**: RAKE, YAKE
- **Named Entity Recognition**: Extract people, places, organizations

**Example:**
\`\`\`
Document: "Apple Inc. released new iPhone in California"

Extracted Topics/Entities:
- Organization: Apple Inc.
- Product: iPhone
- Location: California
\`\`\`

---

### 5. Other NLP Methods

#### 5.1 Text Classification

**Definition**: Assigning predefined categories/labels to text.

**Types:**
- **Content-based**: Based on file content (keywords, topics)
- **User-based**: Based on user knowledge (who created/edited)
- **Context-based**: Based on metadata (location, time, creator)

**Example - Content-Based Classification:**
\`\`\`
Email: "Congratulations! You won $1 million. Click here!"
→ Classification: SPAM (based on content)
\`\`\`

**Example - User-Based Classification:**
\`\`\`
Document marked "Confidential" by CEO
→ Classification: Sensitive (based on user's knowledge)
\`\`\`

**Example - Context-Based Classification:**
\`\`\`
File created in Legal Department, accessed 100 times
→ Classification: Important Legal Document (based on context)
\`\`\`

#### 5.2 Text Prediction

**Definition**: Predicting the next word or completing text based on context.

**Applications:**
- Auto-complete (Google Search)
- Predictive text (smartphone keyboards)
- Email smart compose (Gmail)

#### 5.3 Other NLP Techniques

| Technique | Purpose | Example |
|-----------|---------|---------|
| **Named Entity Recognition** | Identify entities | "Barack Obama" → Person |
| **Part-of-Speech Tagging** | Identify word types | "Run" → Verb |
| **Dependency Parsing** | Understand grammar | Subject-Verb-Object |
| **Machine Translation** | Translate languages | English → Spanish |
| **Question Answering** | Answer questions | "Who is CEO?" → "Tim Cook" |

---

### Quick Reference - NLP Techniques

| Technique | What it Does | Example |
|-----------|--------------|---------|
| **Sentiment Analysis** | Determines emotion (pos/neg/neutral) | "Great product!" → Positive |
| **Text Summarization** | Creates concise summary | Long article → 3 sentences |
| **Topic Modeling (LDA)** | Discovers hidden topics | News → Politics, Sports, Tech |
| **Topic Extraction** | Identifies keywords/entities | Document → Apple, iPhone, CA |
| **Text Classification** | Assigns categories | Email → Spam/Not Spam |
| **Text Prediction** | Predicts next words | "How are" → "you" |

---

### Exam-Ready Definitions

**1. Sentiment Analysis:**
NLP technique that analyzes incoming messages to determine if the underlying sentiment is positive, negative, or neutral.

**2. Text Summarization:**
NLP technique that produces a concise and fluent summary while preserving key information and overall meaning.
- **Extractive**: Selects important sentences from original text
- **Abstractive**: Generates new sentences in own words

**3. LDA (Latent Dirichlet Allocation):**
Topic modeling technique that discovers hidden topics in a collection of documents. Used in context with Topic Modelling.

**4. Content-Based Classification:**
Classification based on file contents (keywords, topics) for categorization.

**5. User-Based Classification:**
Classification based on user's knowledge of creation, editing, reviewing, or dissemination to label sensitive documents.

**6. Context-Based Classification:**
Classification based on data context such as location, application, creator, and other variables that affect the data.

---

> **Viva Questions:**
> - What is the difference between extractive and abstractive summarization?
> - Explain sentiment analysis and its applications.
> - What does LDA stand for and what is it used for?
> - Differentiate between topic modeling and topic extraction.
> - Give examples of content-based vs context-based classification.

---

### Practice Questions - Module 3

**Q1: Which technique analyzes incoming messages to determine sentiment?**
a) Topic Modelling
b) Text Summarization
c) Fuzzy Logic
d) Sentiment Analysis
**Answer: d) Sentiment Analysis**

**Q2: Which NLP technique produces a concise summary while preserving key information?**
a) Topic Modelling
b) Text Summarization
c) Fuzzy Logic
d) Sentiment Analysis
**Answer: b) Text Summarization**

**Q3: What is the full form of LDA in context with Topic Modelling?**
a) Latent Dirichlet Allocation
b) Latest Dirichlet Allocation
c) Latest Direction Allocation
d) Latent Direction Allocation
**Answer: a) Latent Dirichlet Allocation**

**Q4: Which type of summarization generates new sentences?**
a) Extractive
b) Abstractive
c) Both
d) None
**Answer: b) Abstractive**

**Q5: Which classification focuses on file content for categorization?**
a) User-based
b) Context-based
c) Content-based
d) None
**Answer: c) Content-based**

**Q6: Which classification relies on user's knowledge of document sensitivity?**
a) Content-based
b) User-based
c) Context-based
d) File-based
**Answer: b) User-based**

**Q7: Which focuses on location, application, and creator metadata?**
a) Content-based classification
b) User-based classification
c) Context-based classification
d) Sentiment analysis
**Answer: c) Context-based classification**

**Q8: Extractive summarization is like:**
a) Writing a summary in your own words
b) Highlighting key sentences
c) Translating to another language
d) Detecting sentiment
**Answer: b) Highlighting key sentences**

**Q9: What does sentiment analysis determine?**
a) Summary of text
b) Topics in document
c) Emotional tone (positive/negative/neutral)
d) Grammar errors
**Answer: c) Emotional tone (positive/negative/neutral)**

**Q10: LDA is used for:**
a) Sentiment detection
b) Text translation
c) Topic modeling (discovering hidden topics)
d) Grammar checking
**Answer: c) Topic modeling (discovering hidden topics)**
`
