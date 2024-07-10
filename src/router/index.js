import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from "../components/MainComponent.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'main',
            component: MainComponent,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/about-me'
        }
    ],
})
export default router