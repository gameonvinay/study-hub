import {
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
  module10,
  module11,
  module12,
  module13,
  module14,
  module15,
  module16
} from './programming-in-c/question-bank/refresher'

import {
  module1 as dsModule1,
  module2 as dsModule2,
  module3 as dsModule3,
  module4 as dsModule4,
  module5 as dsModule5
} from './data-science/question-bank/refresher'

export interface RefresherSubject {
  id: string
  name: string
  content: string
}

const programmingInC = `
# Programming in C - Refresher

A quick revision guide for C programming concepts.

---

${module1}

---

${module2}

---

${module3}

---

${module4}

---

${module5}

---

${module6}

---

${module7}

---

${module8}

---

${module9}

---

${module10}

---

${module11}

---

${module12}

---

${module13}

---

${module14}

---

${module15}

---

${module16}
`

const dataScience = `
# Data Science - Exam Refresher

A comprehensive quick revision guide covering all high-yield topics for acing your Data Science exam.

**Coverage:**
- Module 1: Databases (SQL, NoSQL, MongoDB, Neo4j, CAP Theorem)
- Module 2: Data Processing (ETL, Data Cleaning, Feature Engineering)
- Module 3: NLP & Text Analytics (Sentiment Analysis, Text Summarization, LDA)
- Module 4: AI & Chatbots (AI Reasoning Types, Fuzzy Logic, Chatbot Types)
- Module 5: ML Fundamentals (Classification, Regression, Predictive Analytics)

---

${dsModule1}

---

${dsModule2}

---

${dsModule3}

---

${dsModule4}

---

${dsModule5}
`

export const refresherSubjects: RefresherSubject[] = [
  {
    id: 'programming-in-c',
    name: 'Programming in C',
    content: programmingInC
  },
  {
    id: 'data-science',
    name: 'Introduction to Data Science',
    content: dataScience
  }
]

export type { RefresherSubject as RefresherSubjectType }
