// @ts-ignore
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// @ts-ignore
export default defineNuxtConfig({
    //...
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        (_options: any, nuxt: { hooks: { hook: (arg0: string, arg1: (config: any) => void) => void } }) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        '@pinia/nuxt',
        'nuxt-lodash',
        'vue3-carousel-nuxt',
        '@vesp/nuxt-fontawesome',

        //...
    ],
    pinia: {
        storesDirs: ['./stores/**', './custom-folder/stores/**'],
    },
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    router: {
        options: {
            linkActiveClass: "active",
            linkExactActiveClass: "exact-active"
        }
    },
    carousel: {
        prefix: 'MyPrefix'
    },
    fontawesome: {
        icons: {
            solid: ['dollar-sign', 'cog', 'circle', 'check', 'calendar', 'house', 'award', 'cart-shopping', 'x'],
            regular: ['user']
        }
    }
})