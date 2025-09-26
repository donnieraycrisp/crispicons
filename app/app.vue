<template>
  <div class="app">
    <div class="header">
      <Logo />
    </div>
    <div class="content">
      <p>
        <span class="counter">{{ iconCount }}</span> Clean and crisp open source
        icons made with ❤️ for designers and developers.
      </p>
    </div>
    <IconGrid />
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
const { iconCount } = useIcons()
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 2rem;
}

.logo {
  height: 4rem;
  width: auto;
}

.content {
  padding: 0 2rem;
}

.counter {
  font-weight: 600;
  color: var(--primary-color);
}
</style>
