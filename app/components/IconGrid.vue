<template>
  <div class="icon-grid">
    <div
      v-for="icon in icons"
      :key="icon.name"
      class="icon-grid-item"
      @click="selectIcon(icon)"
    >
      <Icon
        :name="icon.name"
        :size="iconSize"
        :stroke-color="strokeColor"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke-linejoin="strokeLinejoin"
      />
      <span>{{ icon.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAllIcons } = useIcons()

// Icon styling controls
const iconSize = ref('32px')
const strokeColor = ref('var(--icon-color)')
const strokeWidth = ref(2)
const strokeLinecap = ref<'round' | 'square' | 'butt'>('round')
const strokeLinejoin = ref<'round' | 'miter' | 'bevel'>('round')

// Get all icons
const icons = computed(() => getAllIcons())

// Handle icon selection and download
const selectIcon = async (icon: any) => {
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
        // Apply current styling to the SVG
        svgElement.setAttribute('width', iconSize.value)
        svgElement.setAttribute('height', iconSize.value)
        svgElement.setAttribute('stroke', '#151414')
        svgElement.setAttribute('stroke-width', strokeWidth.value.toString())
        svgElement.setAttribute('stroke-linecap', strokeLinecap.value)
        svgElement.setAttribute('stroke-linejoin', strokeLinejoin.value)

        // Remove hardcoded stroke attributes from child elements
        const allElements = svgElement.querySelectorAll('*')
        allElements.forEach((element) => {
          element.removeAttribute('stroke')
          element.removeAttribute('stroke-width')
          element.removeAttribute('stroke-linecap')
          element.removeAttribute('stroke-linejoin')
        })

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
  padding: 2rem;
}

.icon-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
  gap: 2rem;
  border-radius: 0.5rem;
  background-color: var(--bg-card-color);
  cursor: pointer;
  transition: background-color 0.3s ease;

  span {
    font-size: 0.75rem;
    text-align: center;
    transition: color 0.3s ease;
    color: var(--icon-color);
  }

  &:hover {
    background-color: var(--primary-color);
    cursor: url('icons/download.svg') 4 4, auto;

    --icon-color: var(--bg-card-color);
  }
}
</style>
