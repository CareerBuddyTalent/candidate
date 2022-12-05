import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
import VOtpInput from 'vue3-otp-input';

createApp(App).use(store).use(router).use(Toast).component('v-otp-input', VOtpInput).mount('#app');
