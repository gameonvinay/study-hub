export const module11 = `
## Module 11: Data Science Tools & Libraries

### Programming Languages for Data Science

**Most Commonly Used Languages:**
- **Python**
- **R**
- **Julia**
- **Scala**

**Why These Languages?**
- Rich ecosystem of libraries
- Statistical capabilities
- Data manipulation tools
- Machine learning frameworks
- Visualization support

**NOT commonly used for data science:**
- C++, Java, PHP (general-purpose, but not primary DS languages)
- HTML, CSS, JavaScript (web development)
- Swift, Kotlin, Objective-C (mobile app development)

**Exam Tip**: Most commonly used languages in data science: **Julia, Python, R, Scala**

---

## Python Libraries

### Scikit-learn

**What is Scikit-learn?**
Machine learning library for Python offering **array of supervised and unsupervised algorithms**.

**Full Capabilities:**
- **Based on Python**
- Supervised learning (classification, regression)
- Unsupervised learning (clustering, dimensionality reduction)
- **Feature extraction from images and text**
- Model selection and evaluation
- Preprocessing

**Key Features:**
\`\`\`
SCIKIT-LEARN
├── Classification
│   ├── SVM, Logistic Regression, Random Forest
│   └── K-Nearest Neighbors, Naive Bayes
├── Regression
│   ├── Linear, Ridge, Lasso
│   └── Decision Trees, Random Forest
├── Clustering
│   ├── K-Means, DBSCAN
│   └── Hierarchical, Gaussian Mixture
├── Dimensionality Reduction
│   ├── PCA, t-SNE
│   └── LDA, NMF
└── Feature Extraction
    ├── From images (HOG, ORB)
    └── From text (TF-IDF, CountVectorizer)
\`\`\`

**Example - Feature Extraction from Text:**
\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer

documents = ["Machine learning is great", "Python is awesome"]
vectorizer = TfidfVectorizer()
features = vectorizer.fit_transform(documents)
# Converts text to numerical features
\`\`\`

**Example - Feature Extraction from Images:**
\`\`\`python
from sklearn.feature_extraction.image import extract_patches_2d
# Extract image patches for analysis
\`\`\`

**When to Use:**
- Quick prototyping
- Standard ML algorithms
- Feature engineering
- Model evaluation
- Production-ready models

**Exam Tip**: Scikit-learn offers **array of supervised and unsupervised algorithms**, is **based on Python**, and allows **extraction of features from images and text**.

---

## Deep Learning Frameworks

### TensorFlow

**What is TensorFlow?**
Open-source deep learning framework developed by **Google's Brain team**.

**First Released**: **2015**

**Key Information:**
- Created by: **Google Brain team**
- Initial release: **2015**
- Language: Python (primary), C++, JavaScript
- Use cases: Deep learning, neural networks, production ML

**Architecture:**
\`\`\`
TensorFlow
├── Low-level API (TensorFlow Core)
│   └── Full control over model
├── High-level API (Keras)
│   └── Easy model building
└── TensorFlow Lite
    └── Mobile/embedded devices
\`\`\`

**Key Features:**
- Computational graphs
- GPU/TPU acceleration
- Distributed training
- TensorBoard (visualization)
- Production deployment
- Cross-platform

**Example:**
\`\`\`python
import tensorflow as tf

# Create a simple neural network
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
\`\`\`

**When to Use:**
- Deep learning models
- Neural networks
- Production ML systems
- Large-scale training
- Research and deployment

**Exam Tip**: TensorFlow was developed by **Google's Brain team** and first released in **2015**.

---

### Other Deep Learning Frameworks

**PyTorch:**
- Developed by Facebook (Meta)
- Dynamic computational graphs
- Popular in research
- Easy debugging

**Keras:**
- High-level API (now part of TensorFlow)
- User-friendly
- Fast prototyping

**Theano:**
- One of the first deep learning libraries
- Developed at University of Montreal
- Optimizes mathematical expressions
- No longer actively developed (discontinued 2017)

**Microsoft CNTK:**
- Microsoft Cognitive Toolkit
- Deep learning framework
- Production-focused

---

## Data Visualization Libraries

### Plotly

**What is Plotly?**
Data visualization library for creating **interactive plots** that allow users to explore data dynamically.

**Distinguishing Feature**: **Provides interactive plots** that allow users to **explore data dynamically**.

**Key Features:**
- Interactive visualizations
- Zoom, pan, hover tooltips
- Web-based (works in Jupyter, dashboards)
- Many chart types
- 3D plots

**NOT distinguishing features:**
- Static plots (that's Matplotlib)
- Predefined templates only (Plotly is flexible)
- Basic charts only (Plotly supports advanced viz)

**Example:**
\`\`\`python
import plotly.express as px

df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length",
                 color="species", hover_data=['petal_width'])
fig.show()  # Interactive plot with hover, zoom, pan
\`\`\`

**Interactive Features:**
- Hover to see data points
- Zoom in/out
- Pan across plot
- Toggle series on/off
- Export as image

**When to Use:**
- Web dashboards
- Exploratory analysis
- Presentations
- Sharing insights

**Exam Tip**: Plotly's distinguishing feature is that it **provides interactive plots** that allow users to **explore data dynamically**.

---

### Matplotlib

**What is Matplotlib?**
Fundamental plotting library for Python, primarily for **static, publication-quality plots**.

**Characteristics:**
- Static visualizations
- Highly customizable
- Publication-ready
- Foundation for other libraries

**Example:**
\`\`\`python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Simple Plot')
plt.show()
\`\`\`

---

### Seaborn

**What is Seaborn?**
Statistical data visualization library built on Matplotlib.

**Features:**
- Beautiful default styles
- Statistical plots
- Easy complex visualizations

---

### Tableau

**What is Tableau?**
Business intelligence and data visualization tool with drag-and-drop interface.

**What Sets Tableau Apart:**
Its **utilization of an intuitive drag-and-drop interface**, facilitating the **creation of interactive dashboards**.

**Key Features:**
- **Drag-and-drop interface** (no coding required)
- **Interactive dashboards**
- Real-time data connections
- Business-friendly
- Collaboration features

**Capabilities:**
- Connect to various data sources
- Create complex visualizations easily
- Share dashboards
- Mobile support

**NOT primary features:**
- Complex statistical analysis (use R/Python)
- Real-time streaming focus (possible but not primary)
- ML library integration (limited)

**When to Use:**
- Business reporting
- Executive dashboards
- Non-technical users
- Quick insights

**Comparison with Other Tools:**

| Tool | Interface | Code Required | Best For |
|------|-----------|---------------|----------|
| **Tableau** | Drag-and-drop | No | Business users, dashboards |
| **Plotly** | Code + UI | Yes (Python/R) | Interactive web viz |
| **Matplotlib** | Code | Yes (Python) | Static plots, publications |

**Exam Tip**: Tableau sets itself apart with its **intuitive drag-and-drop interface**, facilitating **creation of interactive dashboards**.

---

## R Language

### What is R?

**R** is a programming language and environment specifically designed for **statistical analysis, data visualization, and machine learning**.

**Role in Data Science:**
R is **widely employed for statistical analysis, data visualization, and machine learning**.

**Key Characteristics:**
- Statistical computing focus
- Extensive statistical packages
- Publication-quality graphics
- Active community

**Strengths:**
- Statistical modeling
- Data visualization (ggplot2)
- Hypothesis testing
- Time series analysis
- Reporting (R Markdown)

**Popular R Libraries:**
- **ggplot2**: Data visualization
- **dplyr**: Data manipulation
- **tidyr**: Data tidying
- **caret**: Machine learning
- **shiny**: Interactive web apps

**Example:**
\`\`\`R
library(ggplot2)

ggplot(data = iris, aes(x = Sepal.Length, y = Sepal.Width, color = Species)) +
  geom_point() +
  theme_minimal()
\`\`\`

**R vs Python:**

| Aspect | R | Python |
|--------|---|--------|
| **Primary Use** | Statistics, data analysis | General-purpose, ML |
| **Strength** | Statistical modeling | Broad applications |
| **Syntax** | Statistical-focused | General programming |
| **Community** | Statisticians, researchers | Broader tech community |

**NOT primary uses:**
- Web development (that's not R's focus)
- General-purpose programming (R is specialized)
- Mobile app development (not R's domain)
- Operating systems (not R's purpose)

**Exam Tip**: R is **widely employed for statistical analysis, data visualization, and machine learning**.

---

## Other Important Tools

### MATLAB

**What is MATLAB?**
Commercial software for numerical computing and data analysis.

**Role in Computational Tasks:**
Serves as a **platform for data analysis and visualization**.

**Key Features:**
- Matrix operations (MATLAB = Matrix Laboratory)
- Numerical computing
- Algorithm development
- Data visualization
- Simulation and modeling

**Applications:**
- Engineering calculations
- Signal processing
- Image processing
- Control systems
- Scientific research

**NOT primary roles:**
- Database management (that's SQL/NoSQL)
- Web development (that's JavaScript/HTML)
- AI research focus (possible but not primary)

**Example:**
\`\`\`matlab
% Create and visualize data
x = 0:0.1:10;
y = sin(x);
plot(x, y)
title('Sine Wave')
\`\`\`

**Exam Tip**: MATLAB serves as a **platform for data analysis and visualization**.

---

### GitHub

**What is GitHub?**
**Cloud-based platform** for storing, managing, and sharing **code repositories** using **Git version control**.

**Fundamental Service:**
A **cloud-based platform for storing, managing, and sharing code repositories** using **Git version control**.

**Key Features:**
- Version control (Git)
- Collaboration (pull requests, code review)
- Project management (issues, projects)
- CI/CD integration
- Code hosting
- Documentation (README, wikis)

**Why Important for Data Science:**
- Share code and projects
- Collaborate with team
- Version control for experiments
- Portfolio showcase
- Open-source contributions

**NOT primary purposes:**
- Project management tools focus (has features, but not primary)
- Communication platform (has discussions, but not chat app)
- Cloud storage optimization (stores code, not general files)

**Example Workflow:**
\`\`\`bash
# Initialize repository
git init

# Add files
git add model.py

# Commit changes
git commit -m "Add random forest model"

# Push to GitHub
git push origin main
\`\`\`

**Exam Tip**: GitHub's fundamental service is **cloud-based platform for storing, managing, and sharing code repositories using Git version control**.

---

## AI Frameworks (Additional)

### Jax

**What is Jax?**
- Numerical computing library (Google)
- Automatic differentiation
- GPU/TPU acceleration
- NumPy-like syntax

---

### PaddlePaddle

**What is PaddlePaddle?**
- Deep learning platform (Baidu)
- Easy-to-use APIs
- Industrial applications

---

## Product Design Phases (Design Thinking)

While not purely data science, these phases are important for data products:

\`\`\`
DESIGN THINKING PHASES
├── Empathize (Understand users)
├── Define (Problem statement)
├── Ideate (Brainstorm solutions)
├── Prototype (Build mockup)
└── Test (Validate with users)
\`\`\`

### Empathize Phase

**Purpose**: Developing a deeper **understanding of the users**.

**Activities:**
- User interviews
- Observations
- Surveys
- User research

**Goal**: Understand user needs, pain points, behaviors.

**Exam Tip**: **Empathize** phase involves developing deeper **understanding of the users**.

---

### Ideate Phase

**Purpose**: **Brainstorming and coming up with as many creative solutions as possible**.

**Activities:**
- Brainstorming sessions
- Mind mapping
- Sketching ideas
- Thinking divergently

**Goal**: Generate many potential solutions.

**Exam Tip**: **Ideate** phase involves **brainstorming and coming up with creative solutions**.

---

## Quick Reference

**Programming Languages:**
- Data Science: **Julia, Python, R, Scala**
- Not primary: C++, Java, PHP, HTML/CSS/JS, Swift/Kotlin

**Python Libraries:**
- **Scikit-learn**: Supervised/unsupervised algorithms, feature extraction (images/text), Python-based

**Deep Learning:**
- **TensorFlow**: Google Brain team, 2015
- PyTorch: Facebook
- Theano: Early framework (discontinued)
- CNTK: Microsoft

**Visualization:**
- **Plotly**: Interactive plots, dynamic exploration
- **Tableau**: Drag-and-drop, interactive dashboards
- Matplotlib: Static, publication-quality
- Seaborn: Statistical plots

**Languages:**
- **R**: Statistical analysis, data viz, ML
- **Python**: General purpose, ML, data science

**Tools:**
- **MATLAB**: Data analysis and visualization platform
- **GitHub**: Cloud-based code repository platform (Git)

**Design Phases:**
- **Empathize**: Understand users
- **Ideate**: Brainstorm creative solutions

---

> **Viva Questions:**
> - Compare Python and R for data science.
> - What are the key features of Scikit-learn?
> - Why was TensorFlow created and by whom?
> - What makes Plotly different from Matplotlib?
> - Explain the role of GitHub in collaborative data science projects.
> - What is the difference between Tableau and Python visualization libraries?

---

### Practice Questions - Module 11

---

**Q1: Which programming languages are most commonly used in data science?**

a) C++, Java, PHP

**b) Julia, Python, R, Scala** ✅

c) HTML, CSS, JavaScript

d) Swift, Kotlin, Objective-C

---

**Q2: Which AI framework offers an array of supervised and unsupervised algorithms and is based on Python?**

a) Jax

**b) Scikit-learn** ✅

c) PaddlePaddle

d) Theano

---

**Q3: Which of the following AI frameworks was developed by Google's Brain team and first released in 2015?**

a) PyTorch

b) Theano

**c) TensorFlow** ✅

d) Microsoft CNTK

---

**Q4: What is a distinguishing feature of Plotly among data visualization libraries?**

a) It is specifically designed for static, publication-quality plots

b) It offers a wide range of predefined chart templates for quick visualization

**c) It provides interactive plots that allow users to explore data dynamically** ✅

d) It supports only basic chart types such as bar plots and line charts

---

**Q5: What feature sets Tableau apart in terms of user interaction and dashboard creation?**

a) Its capacity to execute complex statistical analyses within its interface

b) Its capability to visualize real-time streaming data seamlessly

**c) Its utilization of an intuitive drag-and-drop interface, facilitating the creation of interactive dashboards** ✅

d) Its integration with various machine learning libraries

---

**Q6: Which of the following best describes the role of R in data science?**

a) R is primarily used for web development and building APIs

b) R is a general-purpose programming language used for building operating systems

**c) R is widely employed for statistical analysis, data visualization, and machine learning** ✅

d) R is mainly utilized for mobile app development and game programming

---

**Q7: What role does MATLAB play in computational tasks?**

**a) It serves as a platform for data analysis and visualization** ✅

b) It functions as a database management system

c) It acts as a web development tool

d) It facilitates artificial intelligence research

---

**Q8: What fundamental service does GitHub primarily offer to software developers?**

**a) A cloud-based platform for storing, managing, and sharing code repositories using Git version control** ✅

b) A suite of project management tools tailored for software development teams

c) A communication platform for developers to collaborate and discuss coding projects

d) A scalable cloud storage solution optimized for hosting large datasets

---

**Q9: Which phase of product design involves developing a deeper understanding of the users?**

a) Ideate

b) Prototype

**c) Empathize** ✅

d) Test

---

**Q10: Which phase involves brainstorming and coming up with as many creative solutions as possible?**

a) Test

b) Define

**c) Ideate** ✅

d) Empathize
`
</invoke>