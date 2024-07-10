<script setup lang="js">
import {useInstrumentStore} from '@/stores/store.js'
import {storeToRefs} from 'pinia'
import {computed, ref} from "vue";
import BasketDynamic from '@/components/BasketDynamic.vue'

const router = useRouter()

const store = useInstrumentStore()
const {getInstrumentId} = store
const { cordlessInstrument} = storeToRefs(store)


const instrument = ref(cordlessInstrument)
console.log(instrument.value);

const instrumentShow = ref(10)
const visibleItems = computed(() => instrument.value.slice(0, instrumentShow.value))
const allItemsShown = computed(() => instrumentShow.value >= instrument.value.length)

function showMore() {
  instrumentShow.value += 10
}


// Logic
// To ID
const hrefToId = async (id) => {
  await router.push({name: 'cordless-instrument-id-id', params: {id: id}})
}
// To Basket
const basketDynamicId = ref(false)
const hrefToBasket = async (id) => {
  await getInstrumentId(id)
      .then(() => {
        console.log('Fetch ID')
      })
      .catch((err) => {
        console.log(err)
      })
  basketDynamicId.value = true
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Плавно прокручиваем
  });
}
const instrumentIdToBasket = ref(0)

const logId = (close) => {
  basketDynamicId.value = close
};


//

</script>

<template>
  <div class="basket-dynamic" v-if="basketDynamicId">
    <BasketDynamic @closeComponentSent="logId"></BasketDynamic>
  </div>
  <div class="wrap-block">
    <div class="filter-block">
      <v-progress-linear color="primary" model-value="100" :height="1"></v-progress-linear>
      <h1>Filter</h1>
    </div>
    <div class="card-block">
      <div class="card" v-for="item in visibleItems" :key="item">
        <v-progress-linear color="primary" model-value="100" :height="1"></v-progress-linear>
        <div class="card-info">
          <div class="photo-block">
            <h1 class="photo-code-instrument">Код: {{ item.id }}</h1>
            <div class="photo">
              <img :src="item.imgTitle" alt="" class="photo-img">
            </div>
          </div>
          <div class="description-block">
            <h1 class="title" @click="hrefToId(item.id)">{{ item.name }}</h1>
            <!--          <h1 class="subtitle"></h1>-->
            <div class="description">
              <p class="description-li" v-for="info in item.featureTopTitle">{{ info.featureTopTitleInfoTitle }} <span
                  class="descripiton-li-span">
                {{ info.featureTopTitleInfoText }}</span></p>
            </div>
          </div>
          <div class="price-block">
            <h1 class="title-price">{{ item.price }} р.</h1>
            <v-btn class="basket-btn" elevation="0" @click="hrefToBasket(item.id)">
              <font-awesome class="v-btn-price-icon" :icon="['fas', 'cart-shopping']"/>В корзину</v-btn>
            <p class="text-availability">В наличии > {{ item.availability }}</p>
          </div>
        </div>
      </div>
      <div class="v-btn-block-actions"
           v-if="!allItemsShown">
        <v-btn class="v-btn-color"
               width="100%"
               height="100%"
               @click="showMore()">Загрузить еще 10
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// import
@import '@/assets/mixins';

// Media

@media screen and (max-width: 376px) {
}

@media screen and (min-width: 376px) and (max-width: 600px) {
}

@media screen and (min-width: 600px) and (max-width: 960px) {
}

@media screen and (min-width: 960px) and (max-width: 1280px) {
}

@media screen and (min-width: 1280px) and (max-width: 1920px) {
  .wrap-block {
    width: 1600px;
    min-height: 50vh;
    margin: 100px auto;
    display: flex;
    justify-content: space-between;
  }

  // Basket Dynamic

  .basket-dynamic {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    overflow-y: hidden;
    z-index: 1006;
    backdrop-filter: blur(5px);
    background-color: rgba(83, 83, 83, 0.87);
  }

  // Filter

  .filter-block {
    width: 350px;
    height: 100%;
    margin-top: 20px;
  }

  // Card

  .card-block {
    width: 1100px;
  }

  .card {
    width: 100%;
    min-height: 300px;
    margin: 20px 0 20px 0;
  }

  .card-info {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 25px 0 25px 0;
  }

  // Photo

  .photo-block {
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .photo-code-instrument {
    font-size: 1rem;
    color: $text;
  }

  .photo {
    margin-top: 20px;
    width: 200px;
  }

  .photo-img {
    width: 100%;
  }

  // Description

  .description-block {
    width: 650px;
    height: 100%;
  }

  .title {
    width: 85%;
    font-size: 1.3rem;
    font-weight: 550;
    color: $textSecondary;
  }

  .title:hover {
    cursor: pointer;
  }

  .description {
    width: 100%;
    height: 100%;
    margin-top: 30px;
  }

  .description-li {
    font-size: 1.1rem;
    line-height: 1.5;
    color: $text;
  }

  .descripiton-li-span {
    font-weight: 600;
    color: $textSecondary;
  }

  // Price

  .price-block {
    width: 200px;
  }

  .title-price {
    font-size: 1.5rem;
    font-weight: 600;
    color: $textSpan;
  }

  .basket-btn {
    width: 100% !important;
    height: 40px !important;
    margin-top: 30px;
    color: #FFFFFF;
    background-color: $primary;
    transition: all 0.3s ease-in-out;
  }

  .basket-btn:hover {
    color: $primary;
    background-color: #FFFFFF;
    border: 1px solid $primary;
    transition: all 0.3s ease-in-out;
  }

  .v-btn-price-icon {
    margin-right: 10px;
  }

  .text-availability {
    font-size: 0.9rem;
    font-weight: 450;
    margin-top: 10px;
    color: $success;
  }

  // BTN

  .v-btn-block-actions {
    width: 100%;
  }

  .v-btn-color {
    width: 100% !important;
    height: 40px !important;
    font-size: 1.2rem;
    font-weight: 450;
    color: $primary;
  }

}

@media screen and (min-width: 1920px) and (max-width: 2560px) {
}

@media screen and (min-width: 2560px) {
}

</style>