import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../views/Calendar.vue'  // Importeer de Calendar pagina
import Note from '../views/Note.vue'  // Importeer de Note pagina

const routes = [
    {
        path: '/',
        name: 'Calendar',
        component: Calendar
    },
    {
        path: '/note',
        name: 'Note',
        component: Note
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
