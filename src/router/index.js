import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import POMap from '../views/POMap.vue'
import StructMap from '../views/StructMap.vue'

const routes = [
    {
        path: '/scentQuest/',
        name: 'home', 
        component: Home
    },

    {
        path: '/scentQuest/explore/:page',
        name: 'POMap', 
        component: POMap
    },
    
    {
        path: '/scentQuest/explore/:page',
        name: 'StructMap', 
        component: StructMap
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;