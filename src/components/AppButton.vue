<template>
	<button
		@click="clickAction"
		class="font-semibold flex flex-col justify-center relative p-2 items-center"
		:class="{
			'bg-popis-peach': isSingleAction,
			'text-gray-700': isToggleInactive || isSingleAction,
			'text-black': isToggleActive,
			'hover:text-black': isToggleInactive || isSingleAction,
			'bg-opacity-75': isSingleAction,
			'hover:bg-opacity-100': isSingleAction
		}"
	>
		<span class="z-10 relative">
			<slot />
		</span>
		<transition name="toggle">
			<div
				class="w-full h-3 bg-green-300 bottom-0 z-0 absolute mb-2"
				v-show="isToggleActive"
			/>
		</transition>
	</button>
</template>

<script>
	export default {
		name: "AppButton",
		props: {
			active: {
				default: false,
				type: Boolean
			},
			clickAction: {
				default: () => null,
				type: Function
			},
			type: {
				default: "single_action",
				type: String,
				validator(value) {
					return ["single_action", "toggle"].indexOf(value) !== -1
				}
			}
		},
		computed: {
			isToggleActive() {
				return this.active && this.type === "toggle"
			},
			isToggleInactive() {
				return !this.active && this.type === "toggle"
			},
			isSingleAction() {
				return this.type === "single_action"
			}
		}
	}
</script>

<style scoped>
	.toggle-enter-active,
	.toggle-leave-active {
		transition: all .08s ease-in-out;
	}

	button:first-child .toggle-enter,
	button:first-child .toggle-leave-to {
		margin-right: -4rem;
		width: 44%;
	}

	button:last-child .toggle-enter,
	button:last-child .toggle-leave-to {
		margin-left: -4rem;
		width: 44%;
	}
</style>
