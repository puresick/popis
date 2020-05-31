#!/usr/bin/gjs

imports.gi.versions.Gtk = "3.0"
imports.gi.versions.WebKit2 = "4.0"

const { Gtk, GLib, WebKit2 } = imports.gi

Gtk.init(null)

const win = new Gtk.Window()
const box = new Gtk.Box({
	orientation: Gtk.Orientation.VERTICAL,
	spacing: 8
})
const view = new WebKit2.WebView()
const uri = GLib.filename_to_uri(
	`${GLib.get_current_dir()}/dist/index.html`,
	null
)
view.load_uri(
	GLib.filename_to_uri(`${GLib.get_current_dir()}/dist/index.html`, null)
)

win.add(box)
box.pack_start(view, true, true, 1)

win.connect("destroy", () => {
	Gtk.main_quit()
})

win.set_size_request(420, 720)
win.show_all()

Gtk.main()
