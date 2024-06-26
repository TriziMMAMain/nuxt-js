<script setup lang="js">
import {ref} from 'vue'

const route = useRouter()

const users = ref([1, 2, 3, 4, 5])
</script>

<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user">
        <NuxtLink :to="{name: 'users-id', params: { id: user} }">User: {{ user }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

</style>