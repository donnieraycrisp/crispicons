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
