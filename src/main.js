import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import i18n from './i18n'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { routes } from './routes'

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const router = new VueRouter({routes});

new Vue({
    render: h => h(App),
    router,
    i18n,
}).$mount('#app')

