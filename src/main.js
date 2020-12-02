import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import './assets/lib/flexible.js'
import './assets/lib/Chart'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
/**使用vux的插件提示功能*/
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(ViewUI)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
