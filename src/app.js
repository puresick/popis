import Vue from "vue"

import router from "./router"
import store from "./store"
import i18n from "./i18n"
import App from "./views/ViewIndex"

new Vue({
	router,
	store,
	i18n,
	el: "#app",
	render: h => h(App)
})
