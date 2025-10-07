<template>
  <div class="app">
    <header class="header" role="banner">
      <Logo />
      <NuxtLink
        to="https://github.com/donnieraycrisp/crispicons"
        target="_blank"
      >
        GitHub Repository
      </NuxtLink>
    </header>
    <main class="main-content" role="main">
      <section class="hero" aria-labelledby="hero-title">
        <h1 class="hero-title">
          <span class="counter">{{ iconCount }}</span> clean, minimal, and crisp
          open-source SVG UI icons made with ❤️ for designers and developers.
        </h1>
        <button
          class="hero-button"
          @click="downloadAllIcons"
          :disabled="isDownloading"
          :aria-label="
            isDownloading
              ? 'Generating zip file...'
              : 'Download all icons as zip'
          "
        >
          {{ isDownloading ? 'Preparing...' : 'Download all icons' }}
        </button>
      </section>
      <IconGrid />
    </main>
    <footer class="footer" role="contentinfo">
      <p>&copy; 2025 crispicons. Open source icons under MIT License.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import JSZip from 'jszip'
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

const { iconCount, getAllIcons } = useIcons()
const isDownloading = ref(false)

// Download all icons as a zip file
const downloadAllIcons = async () => {
  if (isDownloading.value) return

  isDownloading.value = true
  try {
    const zip = new JSZip()
    const icons = getAllIcons()

    // Default styling for downloaded icons
    const iconSize = '32px'
    const strokeWidth = 2
    const strokeLinecap = 'round'
    const strokeLinejoin = 'round'

    // Process each icon
    for (const icon of icons) {
      try {
        const response = await fetch(`/icons/${icon.name}.svg`)
        if (response.ok) {
          const svgText = await response.text()

          // Parse and modify the SVG
          const parser = new DOMParser()
          const doc = parser.parseFromString(svgText, 'image/svg+xml')
          const svgElement = doc.querySelector('svg')

          if (svgElement) {
            // Set basic SVG attributes
            svgElement.setAttribute('width', iconSize)
            svgElement.setAttribute('height', iconSize)

            // Add accessibility and attribution metadata
            addSvgMetadata(svgElement, icon.name)

            // Analyze and apply appropriate styling
            const hasStroke = hasElementsWithStroke(svgElement)
            const hasFill = hasElementsWithFill(svgElement)

            if (hasStroke && hasFill) {
              applyHybridStylingForDownload(
                svgElement,
                DEFAULT_DOWNLOAD_COLOR,
                strokeWidth,
                strokeLinecap,
                strokeLinejoin,
                DEFAULT_DOWNLOAD_COLOR
              )
            } else if (hasFill && !hasStroke) {
              applyFillOnlyStylingForDownload(
                svgElement,
                DEFAULT_DOWNLOAD_COLOR
              )
            } else {
              applyStrokeOnlyStylingForDownload(
                svgElement,
                DEFAULT_DOWNLOAD_COLOR,
                strokeWidth,
                strokeLinecap,
                strokeLinejoin
              )
            }

            // Add to zip
            zip.file(`${icon.name}.svg`, svgElement.outerHTML)
          }
        }
      } catch (error) {
        console.error(`Error processing ${icon.name}:`, error)
      }
    }

    // Generate and download the zip
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'crispicons.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up
    URL.revokeObjectURL(url)

    console.log(`Downloaded ${icons.length} icons as crispicons.zip`)
  } catch (error) {
    console.error('Error creating zip file:', error)
  } finally {
    isDownloading.value = false
  }
}

// --- SEO meta ---
useSeoMeta({
  title: 'crispicons — Free Open-Source SVG UI Icons',
  description:
    'Minimal, clean and crisp open-source SVG UI icons for designers and developers. Download individually or the full set. A lightweight Feather Icons alternative.',
  ogTitle: '%s',
  ogDescription: '%s',
  ogImage: 'https://www.crispicons.com/social-image.png',
  twitterCard: 'summary_large_image',
})

// --- JSON-LD structured data ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.crispicons.com/#org',
      name: 'crispicons',
      url: 'https://www.crispicons.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.crispicons.com/apple-touch-icon.png',
      },
      sameAs: ['https://twitter.com/donnieraycrisp'],
    },
    {
      '@type': 'Collection',
      '@id': 'https://www.crispicons.com/#collection',
      url: 'https://www.crispicons.com/',
      name: 'crispicons — SVG UI Icon Library',
      description:
        'Minimal, open-source SVG UI icon library with clean, crisp icons. Download individually or the full set.',
      isAccessibleForFree: true,
      numberOfItems: 43,
      license: 'https://opensource.org/licenses/MIT',
    },
  ],
}

// --- Global head setup (title template + JSON-LD) ---
useHead({
  titleTemplate: (title?: string) =>
    title
      ? `${title} · crispicons`
      : 'crispicons — Free Open-Source SVG UI Icons',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/main.scss' as *;

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem 0 2rem;

  a {
    font-size: 1rem;
    color: var(--font-color);
  }

  @media (max-width: $breakpoint-s) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

.logo {
  height: 4rem;
  width: auto;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (max-width: $breakpoint-s) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;

    .hero-button {
      flex: 1;
      width: 100%;
      padding: 2rem;
    }
  }
}

.hero-title {
  font-size: clamp(1rem, 4vw, 1.5rem);
  font-weight: 400;
  line-height: 1.5;
}

.counter {
  font-weight: 600;
  color: var(--primary-color);
}

.hero-button {
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  background-color: var(--bg-card-color);
  color: var(--font-color);
  white-space: nowrap;
  border: none;
  font-family: inherit;
  transition: all 0.3s ease;
  cursor: url('/icons/download.svg') 4 4, auto;

  &:hover:not(:disabled) {
    background-color: var(--primary-color);
    color: var(--bg-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
}

.footer {
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;

  p {
    font-size: 1rem;
    margin: 0;
    opacity: 0.5;
  }
}
</style>
