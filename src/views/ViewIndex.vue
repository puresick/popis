<template>
	<article
		class="flex flex-col w-full max-w-screen-md bg-white"
		:class="{
			'outline-enabled': areOutlinesEnabled,
			'outline-disabled': !areOutlinesEnabled
		}"
	>
		<AppHeader />
		<router-view />
	</article>
</template>

<script>
	import { mapActions, mapState } from "vuex"
	import AppHeader from "../components/AppHeader.vue"

	export default {
		name: "ViewIndex",
		components: {
			AppHeader
		},
		computed: {
			...mapState(["areOutlinesEnabled"])
		},
		methods: {
			...mapActions(["initApplication"])
		},
		mounted() {
			this.initApplication()
		}
	}
</script>

<style>
	@tailwind base;

	@font-face {
		font-family: "Inter Variable";
		src: url("../../statics/Inter.var.woff2") format("woff2-variations");
	}

	/* custom global css */

	:root {
		--color-purple: #65194b;
	}

	html,
	body {
		font-family: "Inter Variable", sans-serif;
	}

	body {
		@apply flex justify-center bg-popis-lightgray min-h-screen;
	}

	.outline-enabled input:focus,
	.outline-enabled button:focus {
		outline: 0.25rem solid var(--color-purple);
	}

	.outline-disabled input:focus,
	.outline-disabled button:focus {
		outline: none;
	}

	@tailwind components;
	@tailwind utilities;
</style>
