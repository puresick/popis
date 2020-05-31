<template>
	<transition name="animation">
		<li
			v-show="isInputVisible"
			class="flex border-solid bg-puresick-gray mx-6 rounded"
		>
			<input
				v-model="input"
				v-focus="isInputVisible"
				placeholder="Insert new note content..."
				name="input-note"
				type="text"
				@keyup.enter="addNewItem"
				@blur="clearInput"
				class="bg-transparent w-full p-4 placeholder-puresick-darkgray"
			/>
		</li>
	</transition>
</template>

<script>
	import { mapState, mapActions } from "vuex"

	export default {
		name: "NoteListInput",
		directives: {
			focus: {
				update(element) {
					element.focus()
				}
			}
		},
		data() {
			return {
				input: ""
			}
		},
		computed: {
			...mapState(["isInputVisible"])
		},
		methods: {
			...mapActions(["itemAdd", "inputHide"]),
			addNewItem() {
				if (this.input !== "") {
					this.itemAdd(this.input)
					this.input = ""
					this.inputHide()
				}
			},
			clearInput() {
				this.input = ""
			}
		}
	}
</script>

<style scoped>
	.animation-enter,
	.animation-leave-to {
		opacity: 0;
		margin-top: -3.5rem;
	}

	.animation-enter-active,
	.animation-leave-active {
		transition: all 0.2s;
	}
</style>
