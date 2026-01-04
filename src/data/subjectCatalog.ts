export interface SubjectCatalog {
  id: string
  name: string
  description: string
  availableContent: {
    mcq: boolean
    refresher: boolean
    theory: boolean
  }
}

export const subjectCatalog: SubjectCatalog[] = [
  {
    id: 'data-science',
    name: 'Introduction to Data Science',
    description: 'Data science fundamentals, machine learning, and analytics',
    availableContent: {
      mcq: true,
      refresher: false,
      theory: true
    }
  },
  {
    id: 'data-analysis-excel',
    name: 'Data Analysis with Excel',
    description: 'Excel data analysis tools and techniques',
    availableContent: {
      mcq: true,
      refresher: false,
      theory: false
    }
  },
  {
    id: 'programming-in-c',
    name: 'Programming in C',
    description: 'C programming language fundamentals and concepts',
    availableContent: {
      mcq: true,
      refresher: true,
      theory: false
    }
  }
]
