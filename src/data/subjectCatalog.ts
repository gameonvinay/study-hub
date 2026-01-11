export interface SubjectCatalog {
  id: string
  name: string
  description: string
  availableContent: {
    mcq: boolean
    refresher: boolean
    theory: boolean
    mindmap: boolean
  }
}

export const subjectCatalog: SubjectCatalog[] = [
  {
    id: 'data-science',
    name: 'Introduction to Data Science',
    description: 'Data science fundamentals, machine learning, and analytics',
    availableContent: {
      mcq: true,
      refresher: true,
      theory: true,
      mindmap: true
    }
  },
  {
    id: 'data-analysis-excel',
    name: 'Data Analysis with Excel',
    description: 'Excel data analysis tools and techniques',
    availableContent: {
      mcq: true,
      refresher: false,
      theory: false,
      mindmap: false
    }
  },
  {
    id: 'programming-in-c',
    name: 'Programming in C',
    description: 'C programming language fundamentals and concepts',
    availableContent: {
      mcq: true,
      refresher: true,
      theory: false,
      mindmap: false
    }
  },
  {
    id: 'business-english',
    name: 'Business English',
    description: 'Professional English communication for business contexts',
    availableContent: {
      mcq: true,
      refresher: false,
      theory: true,
      mindmap: false
    }
  }
]
