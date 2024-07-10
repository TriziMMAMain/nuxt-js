// @ts-nocheck


import {useFetch} from "#app";

export const useInstrumentStore = defineStore('instrument', () => {
    // State
    const instrumentAll = ref([])
    const cordlessInstrument = ref([])
    const gasolineInstrument = ref([])
    const networkInstrument = ref([])
    const pneumoInstrument = ref([])
    const dieselInstrument = ref([])
    const loading = ref(true)
    const instrumentId = ref(null)

    // Actions
    async function getInstrumentAll() {
        // Get All
        const instrumentsAll = await $fetch('https://backend-online-shop-mongodb.onrender.com/api/instruments/get/all')
        instrumentAll.value = instrumentsAll
        // Cordless
        const cordless = await $fetch('https://backend-online-shop-mongodb.onrender.com/api/instruments/get/cordless')
        cordlessInstrument.value = cordless
        // Gasoline
        const gasoline = await $fetch('https://backend-online-shop-mongodb.onrender.com/api/instruments/get/gasoline')
        gasolineInstrument.value = gasoline
        // Network
        const network = await $fetch('https://backend-online-shop-mongodb.onrender.com/api/instruments/get/network')
        networkInstrument.value = network
        // Pneumo
        const pneumo = await $fetch('https://backend-online-shop-mongodb.onrender.com/api/instruments/get/pneumo')
        pneumoInstrument.value = pneumo
        // Diesel
        const diesel = await $fetch('https://backend-online-shop-mongodb.onrender.com/api/instruments/get/pneumo')
        dieselInstrument.value = diesel

        loading.value = false
    }
    async function getInstrumentId(id) {
        instrumentId.value = id
    }
    async function enterToBasket(instrument) {
        let arrayForBasket = ref([]);
        if (JSON.parse(localStorage.getItem("basket_array")).length === 0) {
            localStorage.setItem("basket_array", JSON.stringify(arrayForBasket.value))
        }
        arrayForBasket.value = JSON.parse(localStorage.getItem("basket_array"))
        arrayForBasket.value.push(instrument)
        localStorage.setItem("basket_array", JSON.stringify(arrayForBasket.value));
    }

    // Getters
    // const doubleCount = computed(() => {})

    return {instrumentAll, instrumentId,
        cordlessInstrument, gasolineInstrument,
        networkInstrument, pneumoInstrument,
        dieselInstrument, loading,
        getInstrumentAll, getInstrumentId,
        enterToBasket}
})