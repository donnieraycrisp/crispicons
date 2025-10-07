<template>
  <section class="icon-grid" role="grid" aria-label="Icon collection">
    <article
      v-for="icon in icons"
      :key="icon.name"
      class="icon-grid-item"
      role="gridcell"
      :aria-label="`${icon.name} icon - Click to download`"
      :title="`Download ${icon.name} SVG icon`"
      tabindex="0"
      @click="selectIcon(icon)"
      @keydown.enter="selectIcon(icon)"
      @keydown.space.prevent="selectIcon(icon)"
    >
      <div class="icon-container" aria-hidden="true">
        <Icon
          :name="icon.name"
          :size="iconSize"
          :stroke-color="strokeColor"
          :stroke-width="strokeWidth"
          :stroke-linecap="strokeLinecap"
          :stroke-linejoin="strokeLinejoin"
          :fill-color="fillColor"
        />
      </div>
      <h2 class="icon-name">{{ icon.name }}</h2>
      <span class="sr-only">SVG icon available for download</span>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Icon } from '~/types/icon'
import {
  hasElementsWithStroke,
  hasElementsWithFill,
  applyStrokeOnlyStylingForDownload,
  applyFillOnlyStylingForDownload,
  applyHybridStylingForDownload,
  addSvgMetadata,
} from '~/utils/svgHelpers'
import { DEFAULT_DOWNLOAD_COLOR } from '~/utils/constants'

const { getAllIcons } = useIcons()

// Icon styling controls
const iconSize = ref('32px')
const strokeColor = ref('var(--icon-color)')
const strokeWidth = ref(2)
const strokeLinecap = ref<'round' | 'square' | 'butt'>('round')
const strokeLinejoin = ref<'round' | 'miter' | 'bevel'>('round')
const fillColor = ref('var(--icon-color)')

// Get all icons
const icons = computed(() => getAllIcons())

// Handle icon selection and download
const selectIcon = async (icon: Icon) => {
  try {
    // Fetch the original SVG
    const response = await fetch(`/icons/${icon.name}.svg`)
    if (response.ok) {
      const svgText = await response.text()

      // Parse and modify the SVG with current styling
      const parser = new DOMParser()
      const doc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = doc.querySelector('svg')

      if (svgElement) {
        // Set basic SVG attributes
        svgElement.setAttribute('width', iconSize.value)
        svgElement.setAttribute('height', iconSize.value)

        // Add accessibility and attribution metadata
        addSvgMetadata(svgElement, icon.name)

        // Analyze the SVG to determine its type
        const hasStroke = hasElementsWithStroke(svgElement)
        const hasFill = hasElementsWithFill(svgElement)

        // Apply appropriate styling based on icon type
        if (hasStroke && hasFill) {
          // Hybrid icon - apply both stroke and fill styling
          applyHybridStylingForDownload(
            svgElement,
            DEFAULT_DOWNLOAD_COLOR,
            strokeWidth.value,
            strokeLinecap.value,
            strokeLinejoin.value,
            DEFAULT_DOWNLOAD_COLOR
          )
        } else if (hasFill && !hasStroke) {
          // Fill-only icon - apply only fill styling
          applyFillOnlyStylingForDownload(svgElement, DEFAULT_DOWNLOAD_COLOR)
        } else {
          // Stroke-only icon - apply only stroke styling
          applyStrokeOnlyStylingForDownload(
            svgElement,
            DEFAULT_DOWNLOAD_COLOR,
            strokeWidth.value,
            strokeLinecap.value,
            strokeLinejoin.value
          )
        }

        // Create the final SVG string
        const finalSvg = svgElement.outerHTML

        // Create and trigger download
        const blob = new Blob([finalSvg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `${icon.name}.svg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up the URL object
        URL.revokeObjectURL(url)

        console.log(`Downloaded: ${icon.name}.svg`)
      }
    }
  } catch (error) {
    console.error('Error downloading icon:', error)
  }
}
</script>

<style lang="scss" scoped>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.icon-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
  gap: 1rem;
  border-radius: 0.5rem;
  background-color: var(--bg-card-color);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &:hover {
    background-color: var(--primary-color);
    cursor: url('/icons/download.svg') 4 4, auto;
    --icon-color: var(--bg-card-color);
  }
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem;
}

.icon-name {
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  transition: color 0.3s ease;
  color: var(--icon-color);
  margin: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
