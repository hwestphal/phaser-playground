console.log('this is just a dummy to start VUE-CLI')
import { createApp } from "vue";
import App from "./App.vue";
import router from './router' // <---

createApp(App).use(router).mount('#app')
