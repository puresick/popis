import Vue from "vue"
import Vuex from "vuex"
import PouchDB from "pouchdb"

Vue.use(Vuex)

const db = new PouchDB("collection")

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== "production",
	state: {
		collection: [],
		isInputVisible: false,
		isCheckedItemVisible: false,
		checkingSpeed: "fast",
		areOutlinesEnabled: true
	},
	mutations: {
		setCollection(state, collection) {
			state.collection = collection
		},
		setShowInput(state, isVisible) {
			state.isInputVisible = isVisible
		},
		setIsCheckedItemVisible(state, isVisible) {
			state.isCheckedItemVisible = isVisible
		},
		setCheckingSpeed(state, speed) {
			state.checkingSpeed = speed
		},
		setAreOutlinesEnabled(state, isEnabled) {
			state.areOutlinesEnabled = isEnabled
		}
	},
	actions: {
		async collectionFetchFromDb({ commit }) {
			const response = await db.allDocs({
				include_docs: true
			})

			const collection = response.rows.map(item => item.doc).reverse()

			commit("setCollection", collection)
		},
		async itemAdd({ dispatch }, content) {
			try {
				const now = Date.now()

				// NOTE: Consider to put the item schema into a class or something similar
				const item = {
					_id: now.toString(),
					content,
					created: now,
					lastUpdated: now,
					checked: false
				}

				await db.put(item)
				dispatch("collectionFetchFromDb")
			} catch (error) {
				console.error(error)
			}
		},
		async itemChecked({ dispatch }, _id) {
			try {
				const item = await db.get(_id)

				item.checked = true
				item.lastUpdated = Date.now()

				await db.put(item)
				dispatch("collectionFetchFromDb")
			} catch (error) {
				console.error(error)
			}
		},
		inputShow({ commit }) {
			commit("setShowInput", true)
		},
		inputHide({ commit }) {
			commit("setShowInput", false)
		},
		checkedShow({ commit }) {
			commit("setIsCheckedItemVisible", true)
			localStorage.setItem("settings-isCheckedItemVisible", true)
		},
		checkedHide({ commit }) {
			commit("setIsCheckedItemVisible", false)
			localStorage.setItem("settings-isCheckedItemVisible", false)
		},
		initApplication({ commit }) {
			const localSettingsIsCheckedItemVisible = localStorage.getItem(
				"settings-isCheckedItemVisible"
			)
			const localSettingsCheckingSpeed = localStorage.getItem(
				"settings-checkingSpeed"
			)
			const localSettingsAreOutlinesEnabled = localStorage.getItem(
				"settings-areOutlinesEnabled"
			)

			commit(
				"setIsCheckedItemVisible",
				JSON.parse(
					localSettingsIsCheckedItemVisible === null
						? false
						: localSettingsIsCheckedItemVisible
				) // using JSON.parse to return bool-string as bool
			)

			commit(
				"setCheckingSpeed",
				localSettingsCheckingSpeed === null
					? "fast"
					: localSettingsCheckingSpeed
			)

			commit(
				"setAreOutlinesEnabled",
				JSON.parse(
					localSettingsAreOutlinesEnabled === null
						? true
						: localSettingsAreOutlinesEnabled
				) // using JSON.parse to return bool-string as bool
			)
		},
		setCheckingSpeedFast({ commit }) {
			const speed = "fast"
			commit("setCheckingSpeed", speed)
			localStorage.setItem("settings-checkingSpeed", speed)
		},
		setCheckingSpeedSlow({ commit }) {
			const speed = "slow"
			commit("setCheckingSpeed", speed)
			localStorage.setItem("settings-checkingSpeed", speed)
		},
		enableOutlines({ commit }) {
			const value = true
			commit("setAreOutlinesEnabled", value)
			localStorage.setItem("settings-areOutlinesEnabled", value)
		},
		disableOutlines({ commit }) {
			const value = false
			commit("setAreOutlinesEnabled", value)
			localStorage.setItem("settings-areOutlinesEnabled", value)
		},
		deleteAllCheckedItems({ commit, state }) {
			try {
				if (confirm("Are you sure to delete all checked items?")) {
					const { collection } = state

					// NOTE: Maybe waiting for all Promises to finish and then resolve
					// with a final message for more accurate message to the user
					collection.forEach(async entry => {
						const { checked } = entry

						if (checked) {
							await db.remove(entry)
						}
					})
				}
			} catch (error) {
				console.error(error)
			}
		}
	}
})

export default store
