export interface MCQ {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface TheoryQuestion {
  id: number
  title: string
  content: string
}

export interface MindmapCategory {
  id: string
  title: string
  markdown: string
  color: string
}

export interface RefresherItem {
  id: number
  title: string
  content: string
}
