import { createStore } from 'vuex'
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import * as data from './data'

const store = createStore({
    state,
    actions,
    mutations,
    getters,
    data,
})

export default store;