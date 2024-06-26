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
    <div class="breadcrumbs"></div>
    <h1 class="title">{{ instrumentId.name }}</h1>
    <div class="photo-info-price-block">
      <div class="photo-block">
        <p class="photo-subtitle">{{ instrumentId.id }}</p>
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
        <p class="warranty-text">
          <v-icon></v-icon>
          Гарантия 1 год
        </p>
        <div class="description-block">
          <p class="description-li-text" v-for="text in instrumentId.featureTopTitle">
            {{ text.featureTopTitleInfoTitle }} <span class="description-span-text">{{ text.featureTopTitleInfoText }}</span></p>
        </div>
      </div>
      <div class="price-block">
        <div class="card">
          <h1 class="title-price">{{ instrumentId.price }}</h1>
          <h1 class="subtitle-availability">В наличии > {{ instrumentId.availability }}</h1>
          <div class="v-btn-block-actions">
            <v-btn class="v-btn-price" @click="">В Корзину</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>