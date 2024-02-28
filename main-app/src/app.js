import Vue from "vue";
import App from "./App.vue";

import './hello'

console.log(2)

new Vue({
    el: '#app',
    render: h => h(App)
})