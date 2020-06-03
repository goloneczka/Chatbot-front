import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import i18n from './i18n'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {routes} from './routes'
import {authorizationStorage} from "./App";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    if (!to.path.includes("/admin") || !authorizationStorage.isEmpty()) {
        next();
    } else {
        next(false);
    }
});

const store = new Vuex.Store({
    state: {
        themes: [{
            themeName: "light",
            imageSource: require('./assets/light_bot.png'),
            isActiveTheme: true
        }, {
            themeName: "dark",
            imageSource: require('./assets/dark_bot.png'),
            isActiveTheme: false
        }, {
            themeName: "blue",
            imageSource: require('./assets/blue_bot.png'),
            isActiveTheme: false
        }
        ]
    },
    mutations: {
        changeTheme(state, payload) {
            for (let theme of state.themes) {
                theme.isActiveTheme = false;
            }
            state.themes[payload.themeIndex].isActiveTheme = true;
        }
    },
    getters: {
        allThemes: state => {
            return state.themes;
        },
        activeTheme: state => {
            for (let theme of state.themes) {
                if (theme.isActiveTheme) {
                    return theme;
                }
            }
            return state.themes[0];
        }
    }
});

new Vue({
    render: h => h(App),
    router,
    store,
    i18n,
}).$mount('#app');

