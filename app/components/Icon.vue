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
        const hasStrokeElements = hasElementsWithStroke(svgElement)
        const hasFillElements = hasElementsWithFill(svgElement)

        // Apply appropriate styling based on icon type
        if (hasStrokeElements && hasFillElements) {
          // Hybrid icon - apply both stroke and fill styling
          applyHybridStyling(svgElement)
        } else if (hasFillElements && !hasStrokeElements) {
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

// Helper function to check if SVG has stroke attributes
const hasElementsWithStroke = (svgElement: Element): boolean => {
  // Check root SVG element first
  const rootStroke = svgElement.getAttribute('stroke')
  if (rootStroke && rootStroke !== 'none' && rootStroke !== 'transparent') {
    return true
  }

  // Then check child elements
  const elements = svgElement.querySelectorAll('*')
  return Array.from(elements).some((element) => {
    const stroke = element.getAttribute('stroke')
    return stroke && stroke !== 'none' && stroke !== 'transparent'
  })
}

// Helper function to check if SVG has fill attributes
const hasElementsWithFill = (svgElement: Element): boolean => {
  // Check root SVG element first
  const rootFill = svgElement.getAttribute('fill')
  if (rootFill && rootFill !== 'none' && rootFill !== 'transparent') {
    return true
  }

  // Then check child elements
  const elements = svgElement.querySelectorAll('*')
  return Array.from(elements).some((element) => {
    const fill = element.getAttribute('fill')
    return fill && fill !== 'none' && fill !== 'transparent'
  })
}

// Apply styling for stroke-only icons
const applyStrokeOnlyStyling = (svgElement: Element) => {
  // Set stroke attributes on the root SVG
  svgElement.setAttribute('stroke', 'var(--icon-stroke)')
  svgElement.setAttribute('stroke-width', 'var(--icon-stroke-width)')
  svgElement.setAttribute('stroke-linecap', 'var(--icon-stroke-linecap)')
  svgElement.setAttribute('stroke-linejoin', 'var(--icon-stroke-linejoin)')

  // Remove hardcoded stroke attributes from child elements
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    // Ensure fill is none for stroke-only icons
    element.setAttribute('fill', 'none')
  })
}

// Apply styling for fill-only icons
const applyFillOnlyStyling = (svgElement: Element) => {
  // Set fill attribute on the root SVG
  svgElement.setAttribute('fill', 'var(--icon-fill)')

  // Remove hardcoded attributes from child elements
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    // Remove hardcoded fill to inherit from parent
    element.removeAttribute('fill')
  })
}

// Apply styling for hybrid icons
const applyHybridStyling = (svgElement: Element) => {
  // Set both stroke and fill attributes on the root SVG
  svgElement.setAttribute('stroke', 'var(--icon-stroke)')
  svgElement.setAttribute('stroke-width', 'var(--icon-stroke-width)')
  svgElement.setAttribute('stroke-linecap', 'var(--icon-stroke-linecap)')
  svgElement.setAttribute('stroke-linejoin', 'var(--icon-stroke-linejoin)')
  svgElement.setAttribute('fill', 'var(--icon-fill)')

  // Remove hardcoded attributes from child elements to inherit from parent
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    element.removeAttribute('fill')
  })
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
