import Vue from 'vue'
import Vuex from 'vuex'
import { httpRequest }  from '../src/App'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jokesAdmin: []
    },
    mutations: {
        loadJokesAdmin(state, payload) {
            state.jokesAdmin = payload
        }
    },
    actions: {
        loadJokesForAdmin(context){
            let jokes = httpRequest.get('admin/jokes')
            context.commit('loadJokesAdmin', jokes)
        }
    },
    getters: {
        jokeAdmin: state => state.jokesAdmin
    }
})