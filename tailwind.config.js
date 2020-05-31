module.exports = {
	purge: [
		"./src/**/*.vue"
	],
	theme: {
		extend: {
			colors: {
				popis: {
					pink: "#e69acb",
					peach: "#e69aa5",
					lightgray: "rgb(249, 249, 249)"
				},
				puresick: {
					black: "#404040",
					red: "#b85466",
					green: "#4b9f68",
					yellow: "#d59e33",
					blue: "#2c85a1",
					purple: "#cd86d9",
					cyan: "#379292",
					gray: "#d1d1d1",
					darkgray: "#909090",
					lightred: "#d993a0",
					lightgreen: "#63c985",
					lightyellow: "#dbd284",
					lightblue: "#67acc2",
					lightpurple: "#d7adde",
					lightcyan: "#69b3b3",
					white: "#ebe7e2"
				}
			},
			letterSpacing: {
				tightest: "-0.125rem"
			}
		}
	}
}
