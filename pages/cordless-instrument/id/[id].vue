<!--@ts-nocheck-->
<script setup lang="ts">
// @ts-nocheck
import {useInstrumentStore} from "@/stores/store";
import {storeToRefs} from "pinia";
import _ from 'lodash'

const route = useRoute()
const id = ref(route.params.id)

const store = useInstrumentStore()
const {cordlessInstrument} = storeToRefs(store)

const instrument = ref(cordlessInstrument)
const instrumentId = ref(_.find(instrument.value, {id: Number(id.value)}))
console.log(instrumentId.value);
//

const currentSlide = ref(0)

const slideTo = (val) => {
  currentSlide.value = val
}
</script>

<template>
  <div class="wrap-block-id">
    <div class="breadcrumbs">
      <p class="breadcrumbs-title">Главная // Аккумуляторный инстурмент // Дрель-шуруповерт</p>
    </div>
    <v-progress-linear color="primary" model-value="100" :height="2"></v-progress-linear>
    <h1 class="title">{{ instrumentId.name }}</h1>
    <div class="photo-info-price-block">
      <div class="photo-block">
        <p class="photo-subtitle">Код товара: {{ instrumentId.id }}</p>
        <div class="photo-actions">
          <MyPrefixCarousel class="carousel-gallery" id="gallery" :items-to-show="1" :wrap-around="false"
                            v-model="currentSlide">
            <MyPrefixSlide v-for="(slide, index) in instrumentId.imgArray" :key="index">
              <div class="carousel-gallery-block-img">
                <img class="carousel-gallery--img" :src="slide.src" alt="">
              </div>
            </MyPrefixSlide>
          </MyPrefixCarousel>

          <MyPrefixCarousel class="carousel-thumbnails" id="thumbnails" :items-to-show="4" :wrap-around="true"
                            v-model="currentSlide" ref="carousel">
            <MyPrefixSlide v-for="(slide, index) in instrumentId.imgArray" :key="index">
              <div class="carousel-thumbnails-block-img" @click="slideTo(index)">
                <img class="carousel-thumbnails--img" :src="slide.src" alt="">
              </div>
            </MyPrefixSlide>
          </MyPrefixCarousel>
        </div>
      </div>
      <div class="info-block">
        <div class="description-block">
          <h1 class="description-block-title">Краткое описание</h1>
          <p class="description-li-text" v-for="text in instrumentId.featureTopTitle">
            {{ text.featureTopTitleInfoTitle }} <span class="description-span-text">
            {{ text.featureTopTitleInfoText }}</span></p>
        </div>
      </div>
      <div class="price-block">
        <div class="card">
          <h1 class="title-price">{{ instrumentId.price }} р.</h1>
          <div class="v-btn-block-actions">
            <v-btn class="v-btn-price" elevation="0" @click="">
              <font-awesome class="v-btn-price-icon" :icon="['fas', 'cart-shopping']"/>
              В Корзину
            </v-btn>
          </div>
          <p class="subtitle-availability">В наличии > {{ instrumentId.availability }}</p>
          <p class="warranty-text">
            <font-awesome class="warranty-icon" :icon="['fas', 'award']"/>
            Гарантия магазина 1 год
          </p>
        </div>
      </div>
    </div>

    <div class="description-block-wrap">
      <h1 class="descripiton-title">Описание и характеристики</h1>
      <div class="description-characteristic">
        <div class="characteristic-text-block">
          <p class="characteristic-text-p">{{ instrumentId.featureTop }}</p>
        </div>
        <div class="characteristic-block-v-table-wrap">
          <h1 class="characteristic-block-v-table-title">Технические характеристики</h1>
          <div class="characteristic-block-v-table">
            <v-table class="characteristic-v-table" density="compact">
              <tbody>
              <tr
                  v-for="(item, index) in instrumentId.featureMiddle"
                  :key="index"
              >
                <td class="characteristic-v-table-text">{{ item.feature }}</td>
                <td class="characteristic-v-table-text">{{ item.featureValue }}</td>
              </tr>
              </tbody>
            </v-table>
          </div>
          <div class="characteristic-block-advantages">
            <h1 class="advantages-title">Преимущества {{ instrumentId.name }}</h1>
            <ul class="advantages-ul">
              <li class="advantages-li"
                  v-for="i in instrumentId.featureDownArray">{{ i.featureDown }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="description-equipment">
        <div class="equipment-brand">
          <h1 class="equipment-brand-title">{{ instrumentId.brand }}</h1>
          <h1 class="equipment-brand-text">{{ instrumentId.homeOfTheBrand }} - родина бренда</h1>
          <h1 class="equipment-brand-text">{{ instrumentId.countryOfOrigin }} - страна производитель</h1>
        </div>
        <div class="equipment-block">
          <h1 class="equipment-title">Комплектация</h1>
          <ul class="equipment-ul">
            <li class="equipment-li" v-for="equipment in instrumentId.equipmentArray">{{ equipment }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/mixins.scss";

@media screen and (max-width: 376px) {
}

@media screen and (min-width: 376px) and (max-width: 600px) {
}

@media screen and (min-width: 600px) and (max-width: 960px) {
}

@media screen and (min-width: 960px) and (max-width: 1280px) {
}

@media screen and (min-width: 1280px) and (max-width: 1920px) {
  .wrap-block-id {
    width: 1600px;
    min-height: 150vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .breadcrumbs {
    width: 100%;
    height: 50px;
  }

  .breadcrumbs-title {
    font-size: 1.2rem;
  }

  // Photo-info-price

  .title {
    font-size: 1.5rem;
    margin-top: 30px;
    color: $textSpan;
  }

  .photo-info-price-block {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  // photo

  .photo-block {
    width: 800px;
  }

  .photo-subtitle {
    font-size: 1rem;
  }

  .photo-actions {
    margin-top: 50px;
  }

  .carousel-gallery {
    width: 100%;
  }

  .carousel-gallery-block-img {
    height: 450px !important;
  }

  .carousel-gallery--img {
    width: 100%;
    height: 100%;
  }

  .carousel-thumbnails {
    margin-top: 50px;
  }

  .carousel-thumbnails-block-img {
    height: auto;
  }

  .carousel-thumbnails--img {
    width: 70%;
    transition: all 0.3s ease-in-out;
  }

  .carousel-thumbnails--img:hover {
    transition: all 0.3s ease-in-out;

    cursor: pointer;
  }

  // Info

  .info-block {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .description-block {
    display: flex;
    flex-direction: column;
  }

  .description-block-title {
    font-size: 1.5rem;
    font-weight: 450;
    letter-spacing: 2px;
    text-align: center;
    margin-bottom: 20px;
    color: $text;
  }

  .description-li-text {
    font-size: 1.1rem;
    font-weight: 450;
    color: $text;
  }

  .description-span-text {
    font-size: 1.2rem;
    font-weight: 550;
    color: $textSpan;
  }

  // Price

  .price-block {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .card {
    width: 380px;
    height: 450px;
    border-radius: 15px;
    padding: 20px;
    -webkit-box-shadow: 0 0 12px -4px rgba(76, 78, 79, 0.55);
    -moz-box-shadow: 0 0 12px -4px rgba(76, 78, 79, 0.55);
    box-shadow: 0 0 12px -4px rgba(76, 78, 79, 0.55);
  }

  .title-price {
    font-size: 2rem;
    letter-spacing: 1px;
    color: $textSpan;
  }

  .v-btn-block-actions {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .v-btn-price {
    width: 300px;
    height: 60px;
    letter-spacing: 1px;
    font-size: 1.2rem;
    border-radius: 15px;
    transition: all 0.3s ease-in-out;
    color: #FFFFFF;
    background-color: $primary;
  }

  .v-btn-price:hover {
    transition: all 0.3s ease-in-out;
    color: $primary;
    background-color: #FFFFFF;
    border: 1px solid $primary;
  }

  .v-btn-price-icon {
    margin-right: 5px;
  }

  .subtitle-availability {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 1.3rem;
    font-weight: 550;
    color: $success;
  }

  .warranty-text {
    font-size: 1.3rem;
    font-weight: 550;
    display: flex;
    align-items: center;
    color: $text;
  }

  .warranty-icon {
    font-size: 1.5rem;
    margin-right: 7px;
    color: $success;
  }

  // Description

  .description-block-wrap {
  }

  .descripiton-title {
  }

  .description-characteristic {
  }

  .characteristic-text-block {
  }

  .characteristic-text-p {
  }

  .characteristic-block-v-table-wrap {
  }

  .characteristic-block-v-table-title {
  }

  .characteristic-block-v-table {
  }

  .characteristic-v-table {
  }

  .characteristic-v-table-text {
  }

  .characteristic-block-advantages {
  }

  .advantages-title {
  }

  .advantages-ul {
  }

  .advantages-li {
  }

  .description-equipment {
  }

  .equipment-brand {
  }

  .equipment-brand-title {
  }

  .equipment-brand-text {
  }

  .equipment-block {
  }

  .equipment-title {
  }

  .equipment-ul {
  }

  .equipment-li {
  }
}

@media screen and (min-width: 1920px) and (max-width: 2560px) {
}

@media screen and (min-width: 2560px) {
}

</style>