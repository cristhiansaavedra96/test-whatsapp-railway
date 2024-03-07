const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

const client = new Client({
	puppeteer: {
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-extensions',
			'--disable-dev-shm-usage',
			'--disable-gpu',
			'--no-first-run',
			'--no-zygote',
			'--single-process',
		],
		ignoreDefaultArgs: ['--disable-extensions'],
	},
});

// Ruta para obtener el código QR como imagen
app.get('/getQR', (req, res) => {
	const qrCode = client.generateQRCode();
	qrcode.generate(qrCode, { small: true });
	res.type('png');
	qrcode.toFileStream(res);
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.on('message', async (message) => {
	if (message.body === '!ping') {
		await client.sendMessage(message.from, 'pong');
	}
});

client.initialize();

// Iniciar el servidor web
app.listen(port, () => {
	console.log(`Servidor web iniciado en http://localhost:${port}`);
});