<template>
	<header class="p-6 sticky top-0 flex justify-between mb-2 z-50">
		<button v-if="$route.name === 'list'" @click="inputToggleHandler">
			<XIcon v-if="isInputVisible" />
			<PlusIcon v-else />
		</button>
		<router-link v-else tag="button" to="/">
			<ArrowLeftIcon />
		</router-link>

		<h2 class="uppercase text-xl tracking-tightest select-none">
			{{ label }}
		</h2>
		<router-link v-if="$route.name === 'list'" tag="button" to="/settings">
			<SettingsIcon />
		</router-link>
		<div v-else>
			&nbsp;
		</div>
	</header>
</template>

<script>
	import { mapActions, mapState } from "vuex"
	import {
		ArrowLeftIcon,
		PlusIcon,
		SettingsIcon,
		XIcon
	} from "vue-feather-icons"

	export default {
		name: "AppHeader",
		components: {
			ArrowLeftIcon,
			PlusIcon,
			SettingsIcon,
			XIcon
		},
		computed: {
			...mapState(["isInputVisible"]),
			label() {
				const { name } = this.$route
				switch (name) {
					case "list":
						return "popis"
						break
					case "settings":
						return "settings"
						break
					default:
						return "popis"
						break
				}
			}
		},
		methods: {
			...mapActions(["inputShow", "inputHide"]),
			inputToggleHandler() {
				if (this.isInputVisible) {
					this.inputHide()
				} else {
					window.scrollTo({ top: 0 })
					this.inputShow()
				}
			}
		},
		mounted() {
			console.log(this.$route)
		}
	}
</script>

<style scoped>
	header {
		background: linear-gradient(
			rgba(255, 255, 255, 1) 80%,
			rgba(255, 255, 255, 0.9)
		);
	}

	h2 {
		font-variation-settings: "wght" 900;
	}
</style>
