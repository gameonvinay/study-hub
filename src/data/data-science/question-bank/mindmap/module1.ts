export interface MindmapCategory {
  id: string
  title: string
  markdown: string
  color: string
}

export const module1Categories: MindmapCategory[] = [
  {
    id: 'intro',
    title: 'Introduction to Data Science',
    color: '#4facfe',
    markdown: `# Introduction to Data Science

## Definition
- Interdisciplinary Field
- Creates Insights from Data
- Uses Analytics Methodologies
- Handles Big Data

## Key Elements
- Data: Raw Information
- Science: Systematic Study
- Forms Hypotheses
- Evidence-Based Conclusions

## Data Types
- Structured Data
- Unstructured Data
- Text, Images, Videos
- Databases & Spreadsheets`
  },
  {
    id: 'analysis-types',
    title: 'Data Analysis Types',
    color: '#43e97b',
    markdown: `# Data Analysis Types

## Descriptive Analysis
- What Happened
- Data Visualizations
- Charts & Graphs
- Generated Narratives

## Diagnostic Analysis
- Why It Happened
- Drill-Down Techniques
- Data Mining
- Pattern Discovery

## Predictive Analysis
- Future Forecasts
- Machine Learning
- Pattern Matching
- Predictive Modeling

## Prescriptive Analysis
- Optimum Response
- Best Course of Action
- Neural Networks
- Recommendation Engines`
  },
  {
    id: 'applications',
    title: 'Applications',
    color: '#fa709a',
    markdown: `# Applications

## Industry Applications
- Healthcare
- Finance
- Marketing
- Retail

## Technology Sectors
- Transportation
- Education
- Entertainment
- Manufacturing

## Public Sector
- Energy
- Government
- Smart Cities
- Public Safety`
  },
  {
    id: 'ds-vs-bi',
    title: 'Data Science vs Business Intelligence',
    color: '#f093fb',
    markdown: `# Data Science vs Business Intelligence

## Data Science Characteristics
- Future Focused
- Structured & Unstructured
- Scientific Method
- Higher Complexity

## Business Intelligence Characteristics
- Past & Present Focus
- Mainly Structured Data
- Analytic Method
- Simpler Approach

## Key Differences
- ELT vs ETL Process
- Real-time vs Warehouse
- Data Scientist vs Analyst
- Predictive vs Descriptive`
  },
  {
    id: 'bi-vs-stats',
    title: 'BI vs Statistics',
    color: '#667eea',
    markdown: `# BI vs Statistics

## Business Intelligence
- Decision-Making Focus
- Business Opportunities
- Dashboards & Reports
- ETL Processing

## Statistics
- Population Inference
- Hypothesis Testing
- Regression Models
- P-values & Confidence

## Tools
- BI: Tableau, Power BI
- Stats: R, SPSS, SAS
- Python Libraries
- Data Visualization`
  },
  {
    id: 'big-data',
    title: 'Big Data',
    color: '#764ba2',
    markdown: `# Big Data

## 5 V's Characteristics
- Volume: Data Amount
- Velocity: Speed
- Variety: Data Types
- Veracity: Quality
- Value: Insights

## Technologies
- Hadoop HDFS
- Apache Spark
- NoSQL Databases
- Cloud Storage (S3)

## Benefits
- Enhanced Decisions
- Customer Insights
- Cost Savings
- Social Impact

## Challenges
- Architecture Design
- Skill Requirements
- Migration Complexity
- Data Accessibility`
  },
  {
    id: 'ml-intro',
    title: 'Machine Learning Introduction',
    color: '#00f2fe',
    markdown: `# Machine Learning Introduction

## Definition
- Subset of AI
- Pattern Identification
- No Explicit Instructions
- Data-Based Predictions

## ML Life Cycle
1. Gathering Data
2. Data Preparation
3. Data Wrangling
4. Analyse Data
5. Train Model
6. Test Model
7. Deployment

## Applications
- Natural Language Processing
- Computer Vision
- Healthcare Analytics
- Financial Fraud Detection`
  },
  {
    id: 'ml-types',
    title: 'ML Types',
    color: '#38f9d7',
    markdown: `# ML Types

## Supervised Learning
- Labeled Data Training
- Regression Tasks
- Classification Tasks
- Output Prediction

## Unsupervised Learning
- Unlabeled Data
- Pattern Discovery
- Clustering
- Association Tasks

## Semi-Supervised Learning
- Mixed Data Training
- Small Labeled Set
- Large Unlabeled Set
- Hybrid Approach

## Reinforcement Learning
- Environment Interaction
- Rewards & Penalties
- Strategy Learning
- Cumulative Maximization`
  },
  {
    id: 'supervised-algos',
    title: 'Supervised Learning Algorithms',
    color: '#fee140',
    markdown: `# Supervised Learning Algorithms

## Regression
- Linear Regression
- Logistic Regression
- Continuous Prediction
- Binary Classification

## Classification
- Support Vector Machines
- Decision Trees
- Random Forests
- Naive Bayes

## Advanced
- k-Nearest Neighbors
- Ensemble Methods
- Hyperplane Separation
- Feature-Based Splitting`
  },
  {
    id: 'unsupervised-algos',
    title: 'Unsupervised Learning Algorithms',
    color: '#f5576c',
    markdown: `# Unsupervised Learning Algorithms

## Clustering
- K-Means Clustering
- Hierarchical Clustering
- Feature Similarity
- Agglomerative/Divisive

## Dimensionality Reduction
- Principal Component Analysis
- t-SNE
- Data Visualization
- Feature Transformation

## Association
- Association Rules
- Apriori Algorithm
- Eclat Algorithm
- Pattern Relationships`
  },
  {
    id: 'advanced-ml',
    title: 'Advanced ML Algorithms',
    color: '#4facfe',
    markdown: `# Advanced ML Algorithms

## Reinforcement Learning
- Q-Learning
- Deep Q-Networks
- Policy Gradient
- Proximal Policy Optimization

## Ensemble Learning
- Bagging
- Boosting (AdaBoost)
- Gradient Boosting
- XGBoost
- Stacking

## Semi-Supervised
- Self-Training
- Co-Training
- Iterative Improvement
- Multi-Model Approach`
  }
]

export const module1Info = {
  title: 'Module 1: Data Science & Machine Learning',
  description: 'A comprehensive overview of data science fundamentals, analysis types, and machine learning concepts'
}
