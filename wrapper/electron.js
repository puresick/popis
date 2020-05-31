const { app, BrowserWindow } = require("electron")
const path = require("path")
const { NODE_ENV } = process.env
const hasInstanceLock = app.requestSingleInstanceLock()
let win = null

const createWindow = () => {
	win = new BrowserWindow({
		height: 720,
		width: NODE_ENV === "development" ? 720 : 420
		// icon: path.join(__dirname, "/../statics/Icon-512x512.png")
		// icon: path.join(__dirname, "/Icon-512x512.png")
	})

	// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

	if (NODE_ENV !== "development") {
		win.setMenu(null)
	}

	win.loadFile(`${__dirname}/../dist/index.html`)

	if (NODE_ENV === "development") {
		win.webContents.openDevTools()
	}
}

if (!hasInstanceLock) {
	app.quit()
} else {
	app.on("second-instance", () => {
		if (win !== null) {
			if (win.isMinimized()) {
				win.restore()
			}

			win.focus()
		}
	})

	app.on("ready", () => {
		createWindow()
	})
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
