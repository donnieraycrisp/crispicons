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
    }"
    v-html="svgContent"
  />
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: string | number
  strokeColor?: string
  strokeWidth?: string | number
  strokeLinecap?: 'round' | 'square' | 'butt'
  strokeLinejoin?: 'round' | 'miter' | 'bevel'
}

const props = withDefaults(defineProps<Props>(), {
  size: '32px',
  strokeColor: 'var(--icon-color)',
  strokeWidth: 'var(--icon-stroke-width)',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

const svgContent = ref<string>('')

const loadSvgContent = async () => {
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
        // Update the SVG to use CSS variables
        svgElement.setAttribute('width', '100%')
        svgElement.setAttribute('height', '100%')
        svgElement.setAttribute('stroke', 'var(--icon-stroke)')
        svgElement.setAttribute('stroke-width', 'var(--icon-stroke-width)')
        svgElement.setAttribute('stroke-linecap', 'var(--icon-stroke-linecap)')
        svgElement.setAttribute(
          'stroke-linejoin',
          'var(--icon-stroke-linejoin)'
        )

        // Remove hardcoded stroke attributes from child elements
        const allElements = svgElement.querySelectorAll('*')
        allElements.forEach((element) => {
          element.removeAttribute('stroke')
          element.removeAttribute('stroke-width')
          element.removeAttribute('stroke-linecap')
          element.removeAttribute('stroke-linejoin')
        })

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
  transition: stroke 0.3s ease;
}
</style>
