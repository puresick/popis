import Vue from "vue"
import VueRouter from "vue-router"

import ViewList from "./views/ViewList"
import ViewSettings from "./views/ViewSettings"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "list",
		component: ViewList
	},
	{
		path: "/settings",
		name: "settings",
		component: ViewSettings
	}
]

const router = new VueRouter({
	routes
})

export default router
