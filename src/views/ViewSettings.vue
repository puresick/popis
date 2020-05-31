<template>
	<ul>
		<li class="flex items-center justify-between">
			<span>
				Show/hide checked items:
			</span>
			<section class="flex">
				<AppButton
					:clickAction="checkedShow"
					:active="isCheckedItemVisible"
					type="toggle"
				>
					show
				</AppButton>
				<AppButton
					:clickAction="checkedHide"
					:active="!isCheckedItemVisible"
					type="toggle"
				>
					hide
				</AppButton>
			</section>
		</li>
		<li class="flex items-center justify-between">
			<span>
				Checking speed:
			</span>
			<section class="flex">
				<AppButton
					:clickAction="setCheckingSpeedSlow"
					:active="checkingSpeed === 'slow'"
					type="toggle"
				>
					slow
				</AppButton>
				<AppButton
					:clickAction="setCheckingSpeedFast"
					:active="checkingSpeed === 'fast'"
					type="toggle"
				>
					fast
				</AppButton>
			</section>
		</li>
		<li class="flex items-center justify-between">
			<span>
				Toggle accessibility outlines:
			</span>
			<section class="flex">
				<AppButton
					:clickAction="enableOutlines"
					:active="areOutlinesEnabled"
					type="toggle"
				>
					enabled
				</AppButton>
				<AppButton
					:clickAction="disableOutlines"
					:active="!areOutlinesEnabled"
					type="toggle"
				>
					disabled
				</AppButton>
			</section>
		</li>
		<li class="flex items-center justify-between">
			<span>
				Delete all checked items.
			</span>
			<AppButton :clickAction="deleteAllCheckedItems" type="single_action">
				Delete
			</AppButton>
		</li>
	</ul>
</template>

<script>
	import { mapActions, mapState } from "vuex"
	import AppButton from "../components/AppButton"

	export default {
		name: "ViewSettings",
		components: {
			AppButton
		},
		computed: {
			...mapState([
				"isCheckedItemVisible",
				"checkingSpeed",
				"areOutlinesEnabled"
			])
		},
		methods: {
			...mapActions([
				"checkedHide",
				"checkedShow",
				"setCheckingSpeedFast",
				"setCheckingSpeedSlow",
				"enableOutlines",
				"disableOutlines",
				"deleteAllCheckedItems"
			])
		}
	}
</script>

<style scoped>
	li {
		@apply px-6 py-4;
	}
</style>
