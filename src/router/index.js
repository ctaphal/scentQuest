import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import PageOptions from '../views/PageOptions.vue'

const routes = [
    {
        path: '/',
        name: 'home', 
        component: Home
    },

    {
        path: '/map/:page',
        name: 'selectPage', 
        component: PageOptions
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;