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
      </section>
      <IconGrid />
    </main>
    <footer class="footer" role="contentinfo">
      <p>&copy; 2025 crispicons. Open source icons under MIT License.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { iconCount } = useIcons()

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
}

.logo {
  height: 4rem;
  width: auto;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(1rem, 4vw, 1.5rem);
  font-weight: 400;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.counter {
  font-weight: 600;
  color: var(--primary-color);
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
