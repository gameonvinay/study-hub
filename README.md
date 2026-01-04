# Study Hub

A comprehensive study platform built with Vue 3, TypeScript, and Vite for managing and practicing multiple subjects with various content types including MCQs, theory questions, refreshers, and interactive mindmaps.

## Features

- **Multiple Content Types**: MCQ practice, theory questions, quick refreshers, and interactive mindmaps
- **Progress Tracking**: Resume quiz functionality with localStorage
- **Interactive Mindmaps**: Visual learning with Markmap integration
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Theme**: Eye-friendly dark mode interface
- **Modular Architecture**: Easy to add new subjects and content

## Tech Stack

- **Frontend Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: Vue Router
- **Mindmap Visualization**: Markmap (v0.17.1)
- **Styling**: Scoped CSS with dark theme

## Project Architecture

### Folder Structure

```
study-hub/
├── src/
│   ├── assets/              # Static assets (images, etc.)
│   ├── components/          # Reusable Vue components
│   │   └── MindmapComponent.vue
│   ├── data/                # All subject data (TypeScript)
│   │   ├── types.ts         # Common TypeScript interfaces
│   │   ├── subjectCatalog.ts # Subject configuration
│   │   ├── subjects.ts      # MCQ data aggregator
│   │   ├── theorySubjects.ts # Theory data aggregator
│   │   ├── refreshers.ts    # Refresher data aggregator
│   │   │
│   │   ├── data-science/
│   │   │   └── question-bank/
│   │   │       ├── mcq/
│   │   │       │   ├── mcq-set-1.ts (10 questions)
│   │   │       │   ├── mcq-set-2.ts (10 questions)
│   │   │       │   ├── ... (15 sets total)
│   │   │       │   └── index.ts
│   │   │       ├── theory/
│   │   │       │   ├── theory-1.ts
│   │   │       │   ├── theory-2.ts
│   │   │       │   ├── ... (35 questions)
│   │   │       │   └── index.ts
│   │   │       └── mindmap/
│   │   │           └── module1.ts
│   │   │
│   │   ├── data-analysis-excel/
│   │   │   └── question-bank/
│   │   │       └── mcq/
│   │   │           ├── mcq-set-1.ts
│   │   │           ├── ... (17 sets)
│   │   │           └── index.ts
│   │   │
│   │   └── programming-in-c/
│   │       └── question-bank/
│   │           ├── mcq/
│   │           │   ├── mcq-set-1.ts
│   │           │   ├── ... (7 sets)
│   │           │   └── index.ts
│   │           └── refresher/
│   │               ├── module-1.ts
│   │               ├── ... (16 modules)
│   │               └── index.ts
│   │
│   ├── views/               # Page components
│   │   ├── HomeView.vue
│   │   ├── SubjectDetailView.vue
│   │   ├── MCQListView.vue
│   │   ├── TheoryListView.vue
│   │   ├── RefresherListView.vue
│   │   ├── MindmapView.vue
│   │   └── NotFoundView.vue
│   │
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   │
│   ├── App.vue              # Root component
│   └── main.ts              # Application entry point
│
├── scripts/                 # Utility scripts
│   └── split-questions.cjs  # Script to split JSON into TS files
├── public/                  # Public assets
└── package.json             # Dependencies and scripts
```

### Data Organization

#### Question Bank Structure

Each subject follows a consistent **question-bank** structure:

```
{subject-name}/
└── question-bank/
    ├── mcq/          # Multiple Choice Questions (10 per file)
    ├── theory/       # Theory questions (detailed answers)
    ├── refresher/    # Quick revision modules (if applicable)
    └── mindmap/      # Interactive mindmaps (if applicable)
```

#### Content Type Interfaces

**MCQ (Multiple Choice Question)**
```typescript
interface MCQ {
  id: number
  question: string
  options: string[]
  correctAnswer: number  // Index of correct option
}
```

**Theory Question**
```typescript
interface TheoryQuestion {
  id: number
  title: string
  content: string  // Markdown formatted content
}
```

**Mindmap Category**
```typescript
interface MindmapCategory {
  id: string
  title: string
  markdown: string  // Markdown for mindmap generation
  color: string     // Category color
}
```

### Subject Configuration

Subjects are configured in `src/data/subjectCatalog.ts`:

```typescript
interface SubjectCatalog {
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
```

Example:
```typescript
{
  id: 'data-science',
  name: 'Introduction to Data Science',
  description: 'Data science fundamentals, machine learning, and analytics',
  availableContent: {
    mcq: true,
    refresher: false,
    theory: true,
    mindmap: true
  }
}
```

### Routing Architecture

The application uses dynamic routing based on subject IDs:

- `/` - Home page with subject cards
- `/:subjectId` - Subject detail page showing available content types
- `/:subjectId/mcq` - MCQ quiz interface
- `/:subjectId/theory` - Theory questions list
- `/:subjectId/refresher` - Quick refresher content
- `/:subjectId/mindmap` - Interactive mindmap viewer

## Adding New Content

### Adding a New Subject

1. **Create subject folder structure:**
   ```bash
   mkdir -p src/data/{subject-id}/question-bank/mcq
   ```

2. **Add MCQ questions** (sets of 10):
   ```typescript
   // src/data/{subject-id}/question-bank/mcq/mcq-set-1.ts
   import type { MCQ } from '../../../types'

   export const mcqSet1: MCQ[] = [
     {
       id: 1,
       question: "Your question here?",
       options: ["Option A", "Option B", "Option C", "Option D"],
       correctAnswer: 0
     },
     // ... 9 more questions
   ]
   ```

3. **Create index file:**
   ```typescript
   // src/data/{subject-id}/question-bank/mcq/index.ts
   export { mcqSet1 } from './mcq-set-1'
   export { mcqSet2 } from './mcq-set-2'
   // ... etc
   ```

4. **Update subject catalog:**
   ```typescript
   // src/data/subjectCatalog.ts
   {
     id: 'your-subject-id',
     name: 'Your Subject Name',
     description: 'Subject description',
     availableContent: {
       mcq: true,
       refresher: false,
       theory: false,
       mindmap: false
     }
   }
   ```

5. **Update subjects.ts:**
   ```typescript
   // src/data/subjects.ts
   import * as yourSubject from './your-subject-id/question-bank/mcq/index'

   const yourSubjectMcqs = [
     ...yourSubject.mcqSet1,
     ...yourSubject.mcqSet2,
     // ... all sets
   ]

   // Add to subjects array
   ```

### Adding Theory Questions

1. Create theory files (one per question):
   ```typescript
   // src/data/{subject-id}/question-bank/theory/theory-1.ts
   import type { TheoryQuestion } from '../../../types'

   export const theoryQuestion1: TheoryQuestion = {
     id: 1,
     title: "Question Title",
     content: `# Question content in Markdown

     Your detailed answer here with formatting...
     `
   }
   ```

2. Create index with imports and exports

3. Update `theorySubjects.ts`

### Adding Mindmaps

1. Create mindmap module:
   ```typescript
   // src/data/{subject-id}/question-bank/mindmap/module1.ts
   import type { MindmapCategory } from '../../../types'

   export const module1Info = {
     title: "Module 1",
     description: "Module description"
   }

   export const module1Categories: MindmapCategory[] = [
     {
       id: 'topic-1',
       title: 'Topic Title',
       color: '#4facfe',
       markdown: `# Topic

       ## Subtopic 1
       - Point 1
       - Point 2

       ## Subtopic 2
       - Point A
       - Point B
       `
     }
   ]
   ```

2. Update MindmapView.vue to import from the new path

3. Enable mindmap in subject catalog

## Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Utility Scripts

**Split large JSON files into TypeScript sets:**
```bash
node scripts/split-questions.cjs
```

This script:
- Splits MCQ JSON files into sets of 10 questions
- Creates individual theory question files
- Generates index files with exports
- Organizes into question-bank structure

## Design Principles

### Maintainability
- **Small Files**: Each question set contains max 10 questions
- **TypeScript**: Type safety across the application
- **Modular**: Each subject is self-contained
- **Consistent Structure**: All subjects follow the same pattern

### User Experience
- **Dark Theme**: Reduced eye strain
- **Progress Saving**: Resume quizzes where you left off
- **Responsive**: Works on all screen sizes
- **Visual Learning**: Interactive mindmaps for better retention

### Performance
- **Code Splitting**: Dynamic imports per subject
- **Lazy Loading**: Routes loaded on demand
- **Optimized Builds**: Vite for fast HMR and builds

## Contributing

When adding new content:
1. Follow the established folder structure
2. Keep MCQ sets to 10 questions each
3. Use TypeScript interfaces from `types.ts`
4. Update subject catalog configuration
5. Test on both desktop and mobile
6. Maintain dark theme color palette

## License

This project is built for educational purposes.
