import { createApp } from 'vue';
import './assets/style.scss';
import App from './App.vue';
import router from './router';
import VueFeather from 'vue-feather';

createApp(App).use(router).component('vue-feather', VueFeather).mount('#app');
