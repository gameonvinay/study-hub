<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { subjects } from '../data/subjects'

const route = useRoute()
const router = useRouter()

const subject = computed(() => {
  const subjectId = route.params.subjectId as string
  return subjects.find(s => s.id === subjectId)
})

const currentIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)
const score = ref(0)
const answeredQuestions = ref<Set<number>>(new Set())

const STORAGE_KEY = 'mcq-quiz-state'

function saveState() {
  if (!subject.value) return
  const state = {
    subjectId: subject.value.id,
    currentIndex: currentIndex.value,
    score: score.value,
    answeredQuestions: Array.from(answeredQuestions.value)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function loadState() {
  if (!subject.value) return
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const state = JSON.parse(saved)
    if (state.subjectId === subject.value.id) {
      currentIndex.value = state.currentIndex
      score.value = state.score
      answeredQuestions.value = new Set(state.answeredQuestions)
    }
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY)
}

function goBack() {
  const subjectId = route.params.subjectId as string
  router.push({ name: 'subject-detail', params: { subjectId } })
}

onMounted(() => {
  loadState()
})

const currentQuestion = computed(() => subject.value?.questions[currentIndex.value])
const totalQuestions = computed(() => subject.value?.questions.length || 0)
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
const quizComplete = computed(() => answeredQuestions.value.size === totalQuestions.value)

function selectOption(index: number) {
  if (showResult.value) return
  selectedAnswer.value = index
}

function checkAnswer() {
  if (selectedAnswer.value === null || !currentQuestion.value) return
  showResult.value = true

  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer

  if (isCorrect) {
    if (!answeredQuestions.value.has(currentIndex.value)) {
      score.value++
    }
    answeredQuestions.value.add(currentIndex.value)

    // Auto-advance to next question if correct
    setTimeout(() => {
      if (!isLastQuestion.value) {
        nextQuestion()
      }
    }, 800) // Brief delay to show the correct answer feedback
  } else {
    // Only add to answered questions, don't auto-advance
    answeredQuestions.value.add(currentIndex.value)
  }
}

function nextQuestion() {
  if (isLastQuestion.value) return
  currentIndex.value++
  selectedAnswer.value = null
  showResult.value = false
  saveState()
}

function skipQuestion() {
  if (isLastQuestion.value) return
  currentIndex.value++
  selectedAnswer.value = null
  showResult.value = false
  saveState()
}

function prevQuestion() {
  if (currentIndex.value === 0) return
  currentIndex.value--
  selectedAnswer.value = null
  showResult.value = false
  saveState()
}

function restart() {
  currentIndex.value = 0
  selectedAnswer.value = null
  showResult.value = false
  score.value = 0
  answeredQuestions.value.clear()
  clearState()
}

function getOptionClass(index: number) {
  if (!showResult.value) {
    return selectedAnswer.value === index ? 'selected' : ''
  }
  if (!currentQuestion.value) return ''
  if (index === currentQuestion.value.correctAnswer) {
    return 'correct'
  }
  if (selectedAnswer.value === index) {
    return 'incorrect'
  }
  return ''
}
</script>

<template>
  <div v-if="!subject" class="error">
    <p>Subject not found</p>
    <button class="back-btn" @click="goBack">Back to Subject</button>
  </div>

  <div v-else class="quiz-container">
    <button class="back-btn" @click="goBack">← Back</button>

    <h2>{{ subject.name }}</h2>

    <div v-if="totalQuestions === 0" class="no-questions">
      No questions available for this subject yet.
    </div>

    <template v-else>
      <div class="progress">
        Question {{ currentIndex + 1 }} of {{ totalQuestions }}
        <span class="score">Score: {{ score }}/{{ totalQuestions }}</span>
      </div>

      <div v-if="currentQuestion" class="question-card">
        <p class="question-text">{{ currentQuestion.question }}</p>

        <div class="options">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="['option', getOptionClass(index)]"
            @click="selectOption(index)"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}.</span>
            {{ option }}
          </button>
        </div>

        <div class="actions">
          <button
            class="nav-btn"
            @click="prevQuestion"
            :disabled="currentIndex === 0"
          >
            Previous
          </button>

          <button
            v-if="!showResult"
            class="skip-btn"
            @click="skipQuestion"
            :disabled="isLastQuestion"
          >
            Skip
          </button>

          <button
            v-if="!showResult"
            class="check-btn"
            @click="checkAnswer"
            :disabled="selectedAnswer === null"
          >
            Check Answer
          </button>

          <button
            v-else-if="!isLastQuestion"
            class="next-btn"
            @click="nextQuestion"
          >
            Next
          </button>

          <button
            v-else
            class="nav-btn"
            disabled
          >
            End
          </button>
        </div>
      </div>

      <div v-if="quizComplete" class="final-score">
        <h3>Quiz Complete!</h3>
        <p>Final Score: {{ score }} / {{ totalQuestions }}</p>
        <p>{{ Math.round((score / totalQuestions) * 100) }}%</p>
        <button class="restart-btn" @click="restart">Restart Quiz</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 700px;
  margin: 0 auto;
}

.back-btn {
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid #666;
}

.back-btn:hover {
  background: #333;
}

h2 {
  margin-bottom: 1rem;
}

.no-questions {
  padding: 2rem;
  text-align: center;
  color: #888;
}

.progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #888;
}

.score {
  color: #4caf50;
}

.question-card {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
}

.question-text {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option {
  text-align: left;
  padding: 1rem;
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover:not(.correct):not(.incorrect) {
  border-color: #646cff;
}

.option.selected {
  border-color: #646cff;
  background: #1a1a3a;
}

.option.correct {
  border-color: #4caf50;
  background: #1a3a1a;
}

.option.incorrect {
  border-color: #f44336;
  background: #3a1a1a;
}

.option-letter {
  font-weight: bold;
  margin-right: 0.5rem;
  color: #888;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
}

.nav-btn, .check-btn, .next-btn, .skip-btn {
  padding: 0.75rem 1.5rem;
}

.skip-btn {
  background: transparent;
  border: 1px solid #666;
}

.skip-btn:hover:not(:disabled) {
  background: #333;
}

.skip-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.check-btn {
  background: #646cff;
  flex-grow: 1;
}

.check-btn:disabled {
  background: #444;
  cursor: not-allowed;
}

.next-btn {
  background: #4caf50;
  flex-grow: 1;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.final-score {
  margin-top: 2rem;
  padding: 2rem;
  background: #2a2a2a;
  border-radius: 12px;
  text-align: center;
}

.final-score h3 {
  color: #4caf50;
  margin-bottom: 1rem;
}

.restart-btn {
  margin-top: 1rem;
  background: #646cff;
}

@media (prefers-color-scheme: light) {
  .question-card {
    background: #f5f5f5;
  }

  .option {
    background: #fff;
    border-color: #ddd;
  }

  .option.selected {
    background: #e8e8ff;
  }

  .option.correct {
    background: #e8ffe8;
  }

  .option.incorrect {
    background: #ffe8e8;
  }

  .final-score {
    background: #f5f5f5;
  }
}
</style>
