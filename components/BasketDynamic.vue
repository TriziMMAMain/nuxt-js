<script setup lang="js">
import {ref, defineEmits} from 'vue'
import {useInstrumentStore} from "~/stores/store.js";
import {storeToRefs} from "pinia";
import _ from "lodash";

const store = useInstrumentStore()
const {enterToBasket} = store
const {instrumentAll, instrumentId} = storeToRefs(store)


console.log(instrumentId.value);

const instrument = ref(instrumentAll)
const instrumentIdObj = ref(_.find(instrument.value, {id: instrumentId.value}))
console.log(instrumentIdObj.value);

// Emit

const emit = defineEmits(['closeComponentSent']);
const sendId = () => {
  emit('closeComponentSent', false);
};

// V-Btn

const disabledVBtnMinus = ref(true)
const disabledVBtnPlus = ref(false)

if (instrumentIdObj.value.availability === 1) {
  disabledVBtnMinus.value = true
  disabledVBtnPlus.value = true
} else {
  disabledVBtnMinus.value = false
  disabledVBtnPlus.value = false
}

const clickToMinus = () => {
  if (instrumentIdObj.value.orderSum === 1) {
    disabledVBtnMinus.value = true
    disabledVBtnMinus.value = false
  } else if (instrumentIdObj.value.orderSum === instrumentIdObj.value.availability) {
    disabledVBtnMinus.value = false
    disabledVBtnPlus.value = true
    instrumentIdObj.value.orderSum = instrumentIdObj.value.orderSum - 1
    instrumentIdObj.value.priceOrder = instrumentIdObj.value.orderSum * instrumentIdObj.value.price
  } else {
    disabledVBtnMinus.value = false
    disabledVBtnPlus.value = false
    instrumentIdObj.value.orderSum = instrumentIdObj.value.orderSum - 1
    instrumentIdObj.value.priceOrder = instrumentIdObj.value.orderSum * instrumentIdObj.value.price
  }
}
const clickToPlus = () => {
  if (instrumentIdObj.value.orderSum === instrumentIdObj.value.availability) {
    disabledVBtnMinus.value = false
    disabledVBtnPlus.value = true
  } else {
    disabledVBtnMinus.value = false
    disabledVBtnPlus.value = false
    instrumentIdObj.value.orderSum = instrumentIdObj.value.orderSum + 1
    instrumentIdObj.value.priceOrder = instrumentIdObj.value.orderSum * instrumentIdObj.value.price
  }
}
const clickToBasket = async () => {
  console.log(instrumentIdObj.value);
  await enterToBasket(instrumentIdObj.value)
}
</script>

<template>
  <div class="wrap-basket">
    <div class="wrap-actions-block">
      <v-btn class="v-btn-close" @click="sendId()">
        <font-awesome class="v-btn-close-icon" :icon="['fas', 'x']"/>
      </v-btn>
    </div>
    <h1 class="basket-title">Товар будет добавлен в корзину</h1>
    <div class="basket-block">
      <div class="basket-photo-block">
        <div class="photo-block">
          <img :src="instrumentIdObj.imgTitle" alt="" class="photo-img">
        </div>
      </div>
      <div class="basket-info-block">
        <h1 class="basket-info-title">{{ instrumentIdObj.name }}</h1>
        <p class="basket-info-text">{{ instrumentIdObj.priceOrder }} р.</p>
        <div class="basket-actions-block">
          <v-btn class="v-btn-minus" elevation="0"
                 :disabled="disabledVBtnMinus"
                 @click="clickToMinus()">-
          </v-btn>
          <p class="basket-order-text">{{ instrumentIdObj.orderSum }}</p>
          <v-btn class="v-btn-plus" elevation="0"
                 :disabled="disabledVBtnPlus"
                 @click="clickToPlus()">+
          </v-btn>
        </div>
      </div>
      <div class="basket-price-block">
        <v-btn class="v-btn-price-buy"
               @click="clickToBasket()"
               elevation="0">Добавить в корзину
        </v-btn>
        <v-btn class="v-btn-price-continue" elevation="0"
               @click="sendId()">Продолжить покупки
        </v-btn>
        <p class="basket-price">В корзину будет добавлен <span class="basket-price-span">
          {{ instrumentIdObj.orderSum }}</span>
          шт товар на сумму <span class="basket-price-span">{{ instrumentIdObj.priceOrder }} р.</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

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

  .wrap-basket {
    width: 1100px;
    min-height: 60vh;
    margin: 50px auto;
    padding: 25px;
    border-radius: 15px;
    z-index: 1;
    background-color: #FFFFFF;
  }

  .wrap-actions-block {
    width: 100%;
    position: relative;
  }

  .v-btn-close {
    position: absolute;
    right: 0;
  }

  .v-btn-close-icon {
    font-size: 1.2rem;
  }

  .basket-title {
    font-size: 1.5rem;
    font-weight: 550;
    color: $textSpan;
  }

  .basket-block {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    //align-items: center;
  }

  // Photo

  .basket-photo-block {
    width: 250px;
  }

  .photo-block {
    width: 250px;
  }

  .photo-img {
    width: 100%;
    height: 100%;
  }

  // Info

  .basket-info-block {
    width: 600px;
    display: flex;
    align-self: start;
    flex-direction: column;
    padding: 0 15px 0 15px;
  }

  .basket-info-title {
    width: 90%;
    font-size: 1.2rem;
    font-weight: 550;
    color: $textSpan;
  }

  .basket-info-text {
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 20px;
    color: $text;
  }

  .basket-actions-block {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .v-btn-plus, .v-btn-minus {
    background-color: #c3bdbd;
  }

  .basket-order-text {
    margin: 0 35px 0 35px;
  }

  // Price

  .basket-price-block {
    width: 200px;
  }

  .v-btn-price-buy {
    width: 200px !important;
    height: 45px;
    font-size: 0.8rem;
    transition: all 0.3s ease-in-out;
    color: #FFFFFF;
    background-color: $primary;
  }

  .v-btn-price-buy:hover {
    transition: all 0.3s ease-in-out;
    color: $primary;
    background-color: #FFFFFF;
    border: 1px solid $primary;
  }

  .v-btn-price-continue {
    width: 200px !important;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 0.7rem;
    transition: all 0.3s ease-in-out;
    background-color: #bfbfbf;
  }

  .v-btn-price-continue:hover {
    transition: all 0.3s ease-in-out;
  }

  .basket-price {
    font-size: 1.1rem;
    font-weight: 400;
    color: $text;
  }

  .basket-price-span {
    font-weight: 700;
    color: black;
  }

}

@media screen and (min-width: 1920px) and (max-width: 2560px) {
}

@media screen and (min-width: 2560px) {
}

</style>