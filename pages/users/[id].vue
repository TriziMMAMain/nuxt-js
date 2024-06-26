<script setup lang="js">
import {ref} from 'vue'
const route = useRoute()

const userId = ref(route.params.id)

</script>

<template>
  <div>
    <h1>User {{ userId }}</h1>
  </div>
</template>

<style scoped lang="scss">

</style>