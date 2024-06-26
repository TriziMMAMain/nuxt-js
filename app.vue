<script setup lang="js">
import {useInstrumentStore} from '@/stores/store.js'
import {ref} from "vue";
import {storeToRefs} from "pinia";

const store = useInstrumentStore()
const {getInstrumentAll} = store
const { loading } = storeToRefs(store)

getInstrumentAll()
    .then(() => {
      console.log('Good')
    })
    .catch((e) => {
      console.log(e);
    })

const navigationDrawer = ref(false)
const trueOrFalseNavigationDrawer = ref(true)
const navigationDrawerClick = () => {
  navigationDrawer.value = !navigationDrawer.value
}
const clickToCatalog = () => {
  trueOrFalseNavigationDrawer.value = true
}
const clickToFilter = () => {
  trueOrFalseNavigationDrawer.value = false
}

//


</script>

<template>
  <v-app full-height>
    <v-app-bar elevation="0">
      <Menu></Menu>
    </v-app-bar>

    <v-main>
      <div class="actions-block">
        <v-btn
            class="v-btn-navigation-drawer"
            prepend-icon="fa-solid fa-bars"
            @click="navigationDrawerClick()">
          Каталог инструмента
        </v-btn>
      </div>

      <v-navigation-drawer
          width="500"
          v-model="navigationDrawer"
          color="background"
          elevation="0"
          border="none"
          temporary
          class="pa-4">
        <div class="actionsVBtnNavigationDrawer w-100 d-flex justify-space-evenly">
          <v-btn
              class="VBtnNavigationDrawer"
              @click="clickToCatalog()">Каталог
          </v-btn>
          <v-btn
              class="VBtnNavigationDrawer"
              @click="clickToFilter()">Фильтр
          </v-btn>
        </div>
        <div class="blockNavigationDrawer d-flex justify-center ma-6">
          <CatalogInstrument v-if="trueOrFalseNavigationDrawer"></CatalogInstrument>
          <!--        <FilterInstrument v-else></FilterInstrument>-->
        </div>

      </v-navigation-drawer>

      <NuxtLayout name="loading" v-if="loading"></NuxtLayout>
      <NuxtLayout name="default" v-else></NuxtLayout>
    </v-main>
  </v-app>

</template>


<style scoped lang="scss">

.v-main {
  display: flex;
  flex-direction: column;
}

.v-app-bar {
  background-color: rgba(198, 196, 196, 0.84);
}

.actions-block {
  width: 1600px;
  display: flex;
  justify-content: left;
  margin: 20px auto;
}

.v-btn-navigation-drawer {
  width: 350px !important;
}
</style>