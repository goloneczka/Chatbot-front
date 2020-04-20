import Vue from 'vue'
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

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    if (to.path.includes("/admin") && !authorizationStorage.isEmpty()) {
        next();
    } else if (!to.path.includes("/admin")) {
        next();
    } else {
        next(false);
    }
});

new Vue({
    render: h => h(App),
    router,
    i18n,
}).$mount('#app');

