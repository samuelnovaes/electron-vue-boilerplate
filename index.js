/* eslint-disable */

const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
	const window = new BrowserWindow({
		icon: path.join(__dirname, 'icon.png'),
		title: 'Electron and Vue Boilerplate',
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

	window.on('ready-to-show', () => {
		window.show();
	});

	if (process.env.NODE_ENV == 'development') {
		require('vue-devtools').install();
		const Bundler = require('parcel-bundler');
		const bundler = new Bundler(path.join(__dirname, 'src', 'index.html'), {
			publicUrl: './',
			outDir: path.join(__dirname, 'www'),
			target: 'electron'
		});
		bundler.on('bundled', () => {
			window.loadFile(path.join(__dirname, 'www', 'index.html'));
		});
		bundler.bundle();
	}
	else {
		window.loadFile(path.join(__dirname, 'www', 'index.html'));
		window.setMenu(null);
	}
}

app.on('ready', createWindow);

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});