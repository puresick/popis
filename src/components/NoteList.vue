<template>
	<section>
		<ul>
			<NoteListInput />
			<NoteListItem v-for="item in collection" :key="item._id" :item="item" />
		</ul>
	</section>
</template>

<script>
	import { mapState, mapActions } from "vuex"
	import NoteListItem from "./NoteListItem.vue"
	import NoteListInput from "./NoteListInput.vue"

	export default {
		name: "NoteList",
		components: {
			NoteListInput,
			NoteListItem
		},
		computed: {
			...mapState(["collection", "isInputVisible"])
		},
		methods: {
			...mapActions(["collectionFetchFromDb", "inputShow", "inputHide"]),
			handleInputOnKey({ key }) {
				switch (key) {
					case "n":
						if (!this.isInputVisible) {
							window.scrollTo({ top: 0 })
							this.inputShow()
						}
						break
					case "Escape":
						if (this.isInputVisible) {
							this.inputHide()
						}
						break
				}
			}
		},
		mounted() {
			this.collectionFetchFromDb()
			window.addEventListener("keyup", this.handleInputOnKey)
		},
		destroyed() {
			window.removeEventListener("keyup", this.handleInputOnKey)
		}
	}
</script>
