<script setup lang="ts">

</script>

<template>
  <div class="wrap-menu">
    <nuxt-link exact-active-class="active" to="/">Главная</nuxt-link>
    <nuxt-link active-class="active" to="/basket/">Корзина</nuxt-link>

  </div>
</template>

<style scoped lang="scss">

.active {
  color: red;
}
</style>