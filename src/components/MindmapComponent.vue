<template>
  <div class="mindmap-wrapper">
    <div class="mindmap-header">
      <h2>{{ title }}</h2>
      <div class="controls">
        <button @click="fit" class="btn btn-primary">Fit to View</button>
        <button @click="toggleFullscreen" class="btn btn-secondary">
          {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
        </button>
      </div>
    </div>
    <svg ref="svgRef" class="mindmap-svg"></svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { Markmap } from 'markmap-view'
import { Transformer } from 'markmap-lib'

interface Props {
  markdown: string
  title: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '#4facfe'
})

const svgRef = ref<SVGSVGElement | null>(null)
const isFullscreen = ref(false)
let mm: Markmap | null = null

const transformer = new Transformer()

const renderMarkmap = async () => {
  if (!svgRef.value) return

  await nextTick()

  const { root } = transformer.transform(props.markdown)

  if (mm) {
    mm.setData(root)
    mm.fit()
  } else {
    mm = Markmap.create(svgRef.value, {
      color: () => props.color,
      duration: 0,
      maxWidth: 300,
      initialExpandLevel: 3,
      zoom: true,
      pan: true,
      autoFit: true,
      spacingVertical: 10,
      spacingHorizontal: 80,
      paddingX: 20
    }, root)
  }
}

const fit = () => {
  if (mm) {
    mm.fit()
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    svgRef.value?.parentElement?.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

onMounted(() => {
  renderMarkmap()

  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})

watch(() => props.markdown, () => {
  renderMarkmap()
})

watch(() => props.color, () => {
  renderMarkmap()
})
</script>

<style scoped>
.mindmap-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.mindmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}

.mindmap-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.mindmap-svg {
  flex: 1;
  width: 100%;
  height: 100%;
  background: #fafafa;
}

.mindmap-svg :deep(.markmap-node) {
  cursor: pointer;
}

.mindmap-svg :deep(.markmap-node:hover) {
  opacity: 0.8;
}

.mindmap-svg :deep(.markmap-node circle) {
  transition: all 0.3s ease;
}

.mindmap-svg :deep(.markmap-node:hover circle) {
  stroke-width: 3px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.mindmap-svg :deep(.markmap-link) {
  transition: all 0.3s ease;
}

.mindmap-svg :deep(.markmap-node:hover ~ .markmap-link) {
  stroke-width: 2px;
}
</style>
