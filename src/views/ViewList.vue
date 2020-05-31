<template>
	<article>
		<NoteList />
	</article>
</template>

<script>
	import NoteList from "../components/NoteList.vue"

	export default {
		name: "ViewList",
		components: {
			NoteList
		}
	}
</script>
