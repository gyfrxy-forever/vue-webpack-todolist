import Vue from 'vue';
import App from './app.vue';

// import './asstes/styles/test.css';

import './assets/styles/style.styl';
import './assets/styles/global.styl';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: (h) => h(App)
}).$mount(root)