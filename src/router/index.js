import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import POMap from '../views/POMap.vue'
import StructMap from '../views/StructMap.vue'

const routes = [
    {
        path: '/',
        name: 'home', 
        component: Home
    },

    {
        path: '/explore/:page',
        name: 'POMap', 
        component: POMap
    },
    
    {
        path: '/explore/:page',
        name: 'StructMap', 
        component: StructMap
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;