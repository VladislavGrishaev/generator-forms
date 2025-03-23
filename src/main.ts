import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import {form} from './store/form.ts'

import './assets/styles/main.scss'

const app = createApp(App)
app.use(form)
app.mount('#app')
