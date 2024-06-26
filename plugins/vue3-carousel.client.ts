// @ts-nocheck
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default defineNuxtPlugin(function (nuxtApp) {
    nuxtApp.vueApp.component('MyPrefixCarousel', Carousel);
    nuxtApp.vueApp.component('MyPrefixSlide', Slide);
    nuxtApp.vueApp.component('MyPrefixPagination', Pagination);
    nuxtApp.vueApp.component('MyPrefixNavigation', Navigation);
});
