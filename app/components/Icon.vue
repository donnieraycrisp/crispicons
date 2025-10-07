<template>
  <div
    class="icon"
    :style="{
      width: size,
      height: size,
      '--icon-stroke': strokeColor,
      '--icon-stroke-width': strokeWidth,
      '--icon-stroke-linecap': strokeLinecap,
      '--icon-stroke-linejoin': strokeLinejoin,
      '--icon-fill': fillColor,
    }"
    v-html="svgContent"
  />
</template>

<script setup lang="ts">
import {
  hasElementsWithStroke,
  hasElementsWithFill,
  applyStrokeOnlyStyling,
  applyFillOnlyStyling,
  applyHybridStyling,
} from '~/utils/svgHelpers'

interface Props {
  name: string
  size?: string | number
  strokeColor?: string
  strokeWidth?: string | number
  strokeLinecap?: 'round' | 'square' | 'butt'
  strokeLinejoin?: 'round' | 'miter' | 'bevel'
  fillColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '32px',
  strokeColor: 'var(--icon-color)',
  strokeWidth: 'var(--icon-stroke-width)',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fillColor: 'var(--icon-color)',
})

const svgContent = ref<string>('')

const loadSvgContent = async () => {
  // Only run on client side
  if (typeof window === 'undefined') return

  try {
    // Use the current origin for the URL
    const url = new URL(`/icons/${props.name}.svg`, window.location.origin)
    const response = await fetch(url.toString())
    if (response.ok) {
      const svgText = await response.text()

      // Parse and modify the SVG to use CSS variables
      const parser = new DOMParser()
      const doc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = doc.querySelector('svg')
      if (svgElement) {
        // Set basic SVG attributes
        svgElement.setAttribute('width', '100%')
        svgElement.setAttribute('height', '100%')

        // Analyze the SVG to determine its type
        const hasStroke = hasElementsWithStroke(svgElement)
        const hasFill = hasElementsWithFill(svgElement)

        // Apply appropriate styling based on icon type
        if (hasStroke && hasFill) {
          // Hybrid icon - apply both stroke and fill styling
          applyHybridStyling(svgElement)
        } else if (hasFill && !hasStroke) {
          // Fill-only icon - apply only fill styling
          applyFillOnlyStyling(svgElement)
        } else {
          // Stroke-only icon - apply only stroke styling
          applyStrokeOnlyStyling(svgElement)
        }

        svgContent.value = svgElement.outerHTML
      }
    }
  } catch (error) {
    console.warn(`Icon "${props.name}" not found:`, error)
  }
}

watch(() => props.name, loadSvgContent, { immediate: true })
</script>

<style scoped>
.icon {
  display: block;
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
  transition: stroke 0.3s ease, fill 0.3s ease;
}
</style>
