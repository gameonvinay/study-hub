export const module9 = `
## Module 9: Advanced NLP & Evaluation Metrics

### NLP Preprocessing Techniques

Natural Language Processing requires preprocessing raw text before analysis. Let's explore key techniques.

---

### 1. Tokenization

**Definition**: Breaking text into smaller units called tokens (words, sentences, or characters).

**Types:**

| Type | Breaks into | Example |
|------|-------------|---------|
| **Word Tokenization** | Words | "Hello world" → ["Hello", "world"] |
| **Sentence Tokenization** | Sentences | "Hi! How are you?" → ["Hi!", "How are you?"] |
| **Character Tokenization** | Characters | "Hi" → ["H", "i"] |

**Example:**
\`\`\`
Text: "Machine learning is amazing."

Word Tokens: ["Machine", "learning", "is", "amazing", "."]
\`\`\`

**Why Important:**
- First step in text processing
- Enables further analysis
- Basis for feature extraction

---

### 2. Stopword Removal

**Definition**: Removing common words that don't carry much meaning (the, is, at, which, on, etc.).

**Common Stopwords:**
\`\`\`
English: the, is, at, which, on, a, an, and, or, but, in, with
\`\`\`

**Example:**
\`\`\`
Original: "The cat is on the mat"
After removal: "cat mat"
\`\`\`

**Why Remove Stopwords:**
- Reduce noise
- Focus on meaningful words
- Reduce dimensionality

---

### 3. Lemmatization

**Definition**: Technique that reduces words to their **base or root form** (lemma) using vocabulary and morphological analysis.

**How it Works:**
- Uses dictionary (lexicon)
- Considers part of speech
- Returns valid dictionary words

**Examples:**
\`\`\`
running → run
ran → run
better → good
is, am, are → be
studies → study
geese → goose
\`\`\`

**Detailed Example:**
\`\`\`
Sentence: "The cats are running faster"

Lemmatization:
cats → cat (noun, plural → singular)
are → be (verb)
running → run (verb, present continuous → base)
faster → fast (adjective, comparative → base)

Result: "The cat be run fast"
\`\`\`

**Characteristics:**
- ✅ Returns meaningful words
- ✅ Uses part-of-speech information
- ✅ More accurate than stemming
- ❌ Slower (requires dictionary lookup)

**Exam Tip**: Lemmatization is a technique used to reduce words to their **base or root forms** using linguistic rules.

---

### Lemmatization vs Stemming

| Aspect | Lemmatization | Stemming |
|--------|--------------|----------|
| **Method** | Dictionary + POS | Rule-based cutting |
| **Output** | Valid words | May not be valid words |
| **Example** | studies → study | studies → studi |
| **Speed** | Slower | Faster |
| **Accuracy** | Higher | Lower |

**Example Comparison:**
\`\`\`
Word: "caring"
Lemmatization: care (valid word)
Stemming: car (not the intended root!)

Word: "better"
Lemmatization: good (correct root)
Stemming: better (unchanged or "bett")
\`\`\`

---

## Text Summarization Techniques (Advanced)

### Extractive Summarization Techniques

**Recall**: Extractive summarization **selects and extracts** important sentences from the original text.

#### 1. Statistical Approaches

**TF-IDF (Term Frequency-Inverse Document Frequency):**
- Ranks sentences by word importance
- Selects sentences with highest scores

**Example:**
\`\`\`
Document: "Machine learning is great. Machine learning helps solve problems."

TF-IDF scores:
Sentence 1: 0.6 (moderate important words)
Sentence 2: 0.8 (more important words)

Summary: Sentence 2
\`\`\`

#### 2. Graph-Based Methods

**TextRank:**
- Builds graph of sentences
- Sentences = nodes, similarity = edges
- Uses PageRank algorithm
- Selects top-ranked sentences

**LexRank:**
- Similar to TextRank
- Uses eigenvector centrality
- Graph-based sentence ranking
- Selects central sentences

**How Graph Methods Work:**
\`\`\`
1. Build sentence similarity graph
   Sentence A ←→ Sentence B (similarity score)
   Sentence A ←→ Sentence C
   Sentence B ←→ Sentence C

2. Apply ranking algorithm (PageRank/Centrality)
   Find most "important" sentences

3. Select top-ranked sentences
   Extract for summary
\`\`\`

**Example - LexRank:**
\`\`\`
Document: 5 sentences
Build similarity graph:
S1 ← connected to → S2, S3
S2 ← connected to → S1, S3, S4
S3 ← connected to → S1, S2, S4, S5 (most central!)

LexRank identifies S3 as most central
Summary includes S3
\`\`\`

#### 3. Sentence Scoring

**Methods:**
- Position-based: First sentences often important
- Length-based: Filter very short/long sentences
- Cue phrases: "In conclusion", "importantly", etc.
- Named entities: Sentences with names/places

**NOT an Extractive Technique:**
- **Sequence-to-Sequence Models** (these are for abstractive summarization!)

**Exam Tips:**
- **LexRank**: Graph-based method for extractive summarization
- **Seq2Seq models**: Used for ABSTRACTIVE summarization, NOT extractive

---

### Abstractive Summarization Techniques

**Recall**: Abstractive summarization **generates new sentences** that capture the essence.

#### 1. Sequence-to-Sequence (Seq2Seq) Models

**Definition**: Neural network models that transform input sequence to output sequence.

**Common Architectures:**
- **RNNs** (Recurrent Neural Networks)
- **LSTMs** (Long Short-Term Memory)
- **GRU** (Gated Recurrent Units)

**How Seq2Seq Works:**
\`\`\`
Encoder → Reads input text
         ↓
    Hidden State (context)
         ↓
Decoder → Generates summary
\`\`\`

**Example:**
\`\`\`
Input: "Machine learning is a subset of AI. It enables systems to learn from data."
Encoder: Processes input → Context vector
Decoder: Generates → "ML, an AI subset, learns from data."
\`\`\`

**Exam Tip**: Seq2seq models commonly used in abstractive summarization include **RNNs and LSTMs**.

#### 2. Attention Mechanisms

**Definition**: Allows model to focus on relevant parts of input while generating each word of summary.

**Why Important:**
- Seq2seq has limitation: single context vector
- Attention: Different focus for each output word
- Improves quality significantly

**How it Works:**
\`\`\`
For each word in output:
1. Look at ALL input words
2. Calculate relevance scores
3. Focus more on relevant words
4. Generate output word
\`\`\`

**Example:**
\`\`\`
Input: "The cat sat on the mat. The dog ran in the park."
Generating: "cat" → Attention focuses on "The cat sat on the mat"
Generating: "dog" → Attention shifts to "The dog ran in the park"
\`\`\`

**Modern Models with Attention:**
- Transformers (BERT, GPT)
- T5 (Text-to-Text Transfer Transformer)
- BART

**Exam Tip**: **Attention Mechanisms** is a technique used in abstractive summarization.

#### 3. Transformer Models

**Examples:**
- **BERT** (Bidirectional Encoder Representations from Transformers)
- **GPT** (Generative Pre-trained Transformer)
- **T5**, **BART**, **Pegasus**

**NOT for extractive**: BERT and GPT are for abstractive, not extractive summarization.

---

### Challenges in Abstractive Summarization

**Main Challenge**: **Generating grammatically correct and coherent summaries**

**Other Challenges:**
- Maintaining factual accuracy
- Avoiding repetition
- Handling long documents
- Preserving key information
- Natural language generation quality

**NOT a challenge:**
- "Preserving exact wording" (that's extractive!)
- "Selecting informative sentences" (that's extractive!)
- "Extracting key phrases" (that's extractive!)

**Exam Tip**: A challenge in abstractive summarization is **generating grammatically correct and coherent summaries**.

---

## Text Summarization Evaluation Metrics

### ROUGE (Recall-Oriented Understudy for Gisting Evaluation)

**Definition**: Metric that measures the **similarity between generated summaries and reference summaries**.

**What ROUGE Measures:**
- Overlap of n-grams (words, bigrams, etc.)
- Focuses on **recall** (how much reference content is captured)

**Types:**
- **ROUGE-N**: N-gram overlap (ROUGE-1, ROUGE-2)
- **ROUGE-L**: Longest common subsequence
- **ROUGE-S**: Skip-bigram overlap

**Example:**
\`\`\`
Reference Summary: "Machine learning improves with data"
Generated Summary: "Machine learning gets better with data"

ROUGE-1 (unigrams):
Overlap: machine, learning, with, data (4 words)
Precision: 4/6 = 0.67
Recall: 4/5 = 0.80
F1-Score: 0.73
\`\`\`

**Higher ROUGE = Better overlap with reference**

**What ROUGE Does NOT Measure:**
- NOT fluency (grammar quality)
- NOT coherence (logical flow)
- NOT informativeness (new content)

**Exam Tip**: ROUGE measures the **similarity between generated summaries and reference summaries**.

---

### BLEU (Bilingual Evaluation Understudy)

**Definition**: Metric for evaluating **text prediction** and **machine translation** quality.

**What BLEU Measures:**
- Precision of n-gram matches
- How many predicted words appear in reference

**Originally for**: Machine translation (English → French)
**Also used for**: Text prediction, text generation

**Score Range**: 0 to 1 (or 0 to 100)
- 0 = No match
- 1 = Perfect match

**Example:**
\`\`\`
Reference: "The cat is on the mat"
Prediction: "The cat is on the table"

Matching words: The, cat, is, on, the (5/6)
BLEU score: ~0.83 (83%)
\`\`\`

**BLEU Score Interpretation:**
- **Higher BLEU = Better performance**
- BLEU > 0.5 = Good
- BLEU > 0.7 = Very good
- BLEU > 0.9 = Excellent

**Application in Text Prediction:**
\`\`\`
User types: "How are"
Model predicts: "you"
Reference (actual): "you"

Match! → High BLEU score → Good prediction
\`\`\`

**Exam Tips:**
- **Higher BLEU score** indicates **better performance**
- Used for text prediction evaluation
- Example application: Autocomplete in search engines

---

## Named Entity Recognition (NER)

### What is NER?

**Definition**: NLP task to **identify and extract specific entities** (persons, organizations, locations, dates, etc.) from textual data.

**Fundamental Task**: To **identify and extract specific entities** including persons, organizations, and locations from textual data.

**Entity Types:**
\`\`\`
COMMON ENTITIES
├── PERSON (people names)
├── ORGANIZATION (companies, institutions)
├── LOCATION (cities, countries, addresses)
├── DATE (dates, times)
├── MONEY (monetary values)
├── PERCENT (percentages)
└── MISC (miscellaneous)
\`\`\`

**Example:**
\`\`\`
Text: "Apple Inc. released new iPhone in California on September 12, 2024"

NER Extraction:
- Organization: Apple Inc.
- Product: iPhone (MISC)
- Location: California
- Date: September 12, 2024
\`\`\`

**Another Example:**
\`\`\`
Text: "Barack Obama was born in Hawaii and served as US President."

Entities:
- PERSON: Barack Obama
- LOCATION: Hawaii
- ORGANIZATION: US (United States)
- TITLE: President
\`\`\`

**Applications:**

| Domain | Use Case | Benefit |
|--------|----------|---------|
| **News** | Extract people, places from articles | Automatic tagging |
| **Customer Support** | Identify customer names, products | Better routing |
| **Finance** | Extract company names, amounts | Automated analysis |
| **Healthcare** | Extract diseases, medications | Medical coding |
| **Legal** | Extract case names, laws | Document organization |

**Why Important:**
- Information extraction
- Question answering
- Content classification
- Knowledge graph construction

**NOT NER Tasks:**
- Sentiment analysis (determines emotion, not entities)
- Text categorization (assigns topics, not entities)
- Chatbot responses (generates conversation, not entity extraction)

**Exam Tip**: NER's fundamental task is to **identify and extract specific entities, including persons, organizations, and locations, from textual data**.

---

## NLP Libraries and Tools

### NLTK (Natural Language Toolkit)

**What is NLTK?**
- Comprehensive NLP library for Python
- **Provides extensive corpora and lexical resources**
- Best for learning and research
- Over 50 corpora and lexical resources

**Key Features:**
- Tokenization
- POS tagging
- NER
- Parsing
- Semantic reasoning
- WordNet integration

**Corpora Included:**
- Brown Corpus
- Reuters Corpus
- Movie Reviews
- WordNet (lexical database)

**Example:**
\`\`\`python
import nltk
nltk.download('punkt')
nltk.download('wordnet')

# Tokenization
from nltk.tokenize import word_tokenize
text = "NLTK is great for NLP"
tokens = word_tokenize(text)
\`\`\`

**When to Use:**
- Educational purposes
- Research projects
- Prototyping
- Access to linguistic resources

**Exam Tip**: NLTK provides **extensive corpora and lexical resources**.

---

### spaCy

**What is spaCy?**
- Industrial-strength NLP library
- **Recommended for production-grade NLP applications**
- Fast and efficient
- Pre-trained models

**Key Features:**
- Fast tokenization
- POS tagging
- NER (excellent)
- Dependency parsing
- Word vectors
- Production-ready

**Why Production-Grade:**
- ✅ Optimized for speed
- ✅ Memory efficient
- ✅ Easy to deploy
- ✅ Well-documented
- ✅ Active development

**Example:**
\`\`\`python
import spacy
nlp = spacy.load("en_core_web_sm")

doc = nlp("Apple is looking at buying U.K. startup for $1 billion")
for ent in doc.ents:
    print(ent.text, ent.label_)
# Output:
# Apple ORG
# U.K. GPE
# $1 billion MONEY
\`\`\`

**When to Use:**
- Production applications
- Real-time processing
- Large-scale NLP
- Performance-critical systems

**Exam Tip**: **spaCy** is recommended for **production-grade NLP applications**.

---

### NLTK vs spaCy

| Aspect | NLTK | spaCy |
|--------|------|-------|
| **Purpose** | Research, education | Production, industrial |
| **Speed** | Slower | Much faster |
| **Corpora** | Extensive | Limited |
| **Best For** | Learning, experimentation | Deployment, real apps |
| **Ease** | More options (complex) | Simpler, opinionated |
| **Models** | Traditional ML | Deep learning |

---

## Chatbot History

### Evolution of Chatbots

**Timeline:**

#### 1. ELIZA (1964-1966)

**Creator**: **Joseph Weizenbaum**

**Year**: **1964-1966** (MIT)

**Type**: Rule-based, pattern matching

**How it worked:**
- Simulated Rogerian psychotherapist
- Pattern matching and substitution
- No real understanding

**Example:**
\`\`\`
User: "I am sad"
ELIZA: "I am sorry to hear you are sad"
(Simple pattern: "I am X" → "Sorry to hear you are X")
\`\`\`

**Significance**: First chatbot ever created

---

#### 2. PARRY (1972)

**Creator**: Kenneth Colby
**Year**: 1972
**Type**: Simulated paranoid patient

---

#### 3. Jabberwacky (1988)

**Creator**: Rollo Carpenter
**Year**: 1988
**Type**: AI designed for entertainment

---

#### 4. SmarterChild (2001)

**Creator**: ActiveBuddy Inc.
**Year**: **2001**
**Platform**: AOL Instant Messenger, MSN Messenger

**Features:**
- Provided information (weather, news)
- Entertainment (games, jokes)
- Personal assistant functions

**Significance**: One of the first widely-used chatbots, millions of users

---

#### 5. Modern Era (2010+)

- **Siri** (Apple, 2011)
- **Google Assistant** (Google, 2016)
- **Alexa** (Amazon, 2014)
- **ChatGPT** (OpenAI, 2022)

**Exam Tips:**
- **ELIZA**: Created by **Joseph Weizenbaum**, **1964-1966**
- **SmarterChild**: Developed in **2001** by ActiveBuddy Inc.

---

## Quick Reference

**Preprocessing:**
- **Tokenization**: Break into words/sentences
- **Stopword Removal**: Remove common words
- **Lemmatization**: Reduce to base form (dictionary-based)

**Extractive Summarization:**
- **TF-IDF**: Statistical scoring
- **TextRank**: Graph-based ranking
- **LexRank**: Graph-based (eigenvector centrality)
- **Sentence Scoring**: Position, length, cues

**Abstractive Summarization:**
- **Seq2Seq**: RNNs, LSTMs
- **Attention Mechanisms**: Focus on relevant parts
- **Transformers**: BERT, GPT

**Challenges:**
- Extractive: Coherence, selecting best sentences
- Abstractive: **Generating grammatically correct and coherent summaries**

**Evaluation Metrics:**
- **ROUGE**: Similarity between summaries (recall-oriented)
- **BLEU**: Text prediction quality (higher = better)

**NER:**
- **Task**: Identify persons, organizations, locations
- **Entities**: PERSON, ORG, LOC, DATE, MONEY

**Libraries:**
- **NLTK**: Extensive corpora, learning/research
- **spaCy**: Production-grade, fast, efficient

**Chatbot History:**
- **ELIZA**: Joseph Weizenbaum, 1964-1966
- **SmarterChild**: 2001

---

> **Viva Questions:**
> - What is the difference between lemmatization and stemming?
> - Explain how LexRank works for text summarization.
> - What is the role of attention mechanisms in abstractive summarization?
> - How is ROUGE different from BLEU?
> - What are the main entity types in NER?
> - Compare NLTK and spaCy for NLP tasks.

---

### Practice Questions - Module 9

---

**Q1: Which of the following techniques is used to reduce words to their base or root forms?**

a) Tokenization

**b) Lemmatization** ✅

c) Stopword Removal

d) Text Summarization

---

**Q2: Which of the following is NOT a technique used in extractive summarization?**

a) Statistical Approaches

**b) Sequence-to-Sequence Models** ✅

c) Graph-Based Methods

d) Sentence Scoring

---

**Q3: Which of the following is a graph-based method used in extractive summarization?**

a) BERT

**b) LexRank** ✅

c) LSTM

d) GPT

---

**Q4: Which of the following is a technique used in abstractive summarization?**

a) TextRank

b) TF-IDF

**c) Attention Mechanisms** ✅

d) Sentence Scoring

---

**Q5: Sequence-to-Sequence models commonly used in abstractive summarization include:**

a) BERT and GPT

**b) RNNs and LSTMs** ✅

c) TextRank and LexRank

d) TF-IDF and LSA

---

**Q6: Which of the following is a challenge in abstractive summarization?**

a) Preserving the exact wording and phrases from the original text

**b) Generating grammatically correct and coherent summaries** ✅

c) Selecting the most informative sentences from the text

d) Extracting key phrases and concepts from the text

---

**Q7: What does ROUGE measure in text summarization evaluation?**

a) The fluency of generated summaries

b) The coherence of generated summaries

**c) The similarity between generated summaries and reference summaries** ✅

d) The informativeness of generated summaries

---

**Q8: A higher BLEU score in text prediction indicates:**

**a) Better performance** ✅

b) Worse performance

c) No change in performance

d) The model is overfitting

---

**Q9: Which library provides extensive corpora and lexical resources?**

**a) NLTK** ✅

b) spaCy

c) Keras

d) Theano

---

**Q10: Which library is recommended for production-grade NLP applications?**

a) NLTK

**b) spaCy** ✅

c) Scikit-learn

d) SciPy
`
</invoke>