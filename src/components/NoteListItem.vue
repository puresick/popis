<template>
	<transition name="animation">
		<li
			v-if="isItemVisible"
			class="bg-white cursor-pointer relative select-none transition duration-200 ease-in-out"
			:class="{
				'bg-green-100': pressed,
				'hover:bg-gray-100': !pressed
			}"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"
			@mousemove="onMouseUp"
			@touchstart="onMouseDown"
			@touchend="onMouseUp"
			@touchmove="onMouseUp"
		>
			<div
				class="absolute top-0 left-0 w-0 h-full z-10 bg-green-400"
				:class="{
					'background-progress': pressed,
					'background-progress-duration-fast': checkingSpeed === 'fast',
					'background-progress-duration-slow': checkingSpeed === 'slow'
				}"
			/>
			<div
				class="relative top-0 left-0 w-full h-full flex p-6 z-20"
				:class="{
					'text-gray-500': item.checked,
					'line-through': item.checked
				}"
			>
				<p class="truncate">
					{{ item.content }}
				</p>
			</div>
		</li>
	</transition>
</template>

<script>
	import { mapActions, mapState } from "vuex"

	export default {
		name: "NoteListItem",
		props: {
			item: {
				default: () => ({}),
				type: Object
			}
		},
		data() {
			return {
				pressed: false,
				userInteractionTimeout: null
			}
		},
		computed: {
			...mapState(["isCheckedItemVisible", "checkingSpeed"]),
			isItemVisible() {
				const { isCheckedItemVisible, item } = this

				return isCheckedItemVisible || !item.checked
			}
		},
		methods: {
			...mapActions(["itemChecked"]),
			userChecksItem() {
				this.itemChecked(this.item._id)
			},
			onMouseDown() {
				const { checkingSpeed } = this
				const speed = checkingSpeed === "fast" ? 400 : 1000

				if (!this.item.checked) {
					this.pressed = true
					this.userInteractionTimeout = setTimeout(() => {
						this.userChecksItem()
						this.pressed = false
					}, speed)
				}
			},
			onMouseUp() {
				this.pressed = false
				clearTimeout(this.userInteractionTimeout)
			}
		}
	}
</script>

<style scoped>
	.background-progress {
		animation-name: progress-animation;
		animation-fill-mode: both;
		animation-timing-function: ease-in-out;
	}

	.background-progress-duration-fast {
		animation-duration: 0.4s;
	}

	.background-progress-duration-slow {
		animation-duration: 1s;
	}

	@keyframes progress-animation {
		from {
			@apply w-0 bg-green-100;
		}

		to {
			@apply w-full bg-green-400;
		}
	}

	.animation-leave-to {
		opacity: 0;
		margin-top: -3.5rem;
	}

	.animation-leave-active {
		transition: all 0.2s;
	}
</style>
