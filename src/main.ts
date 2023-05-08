import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '/@/i18n';
import router from '/@/router';
import store from '/@/store';
import './assets/font/iconfont.css';
import './assets/app.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

const app = createApp(App);

// 路由
app.use(router);

// 状态管理
app.use(store);

// 国际化
app.use(i18n);
app.mount('#app');
