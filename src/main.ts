import Vue from "vue";
import "./plugins/fontawesome";
import vueDebounce from "vue-debounce";
import App from "./App.vue";
import "./assets/index.css";

Vue.use(vueDebounce);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
