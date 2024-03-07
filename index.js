const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
	res.send('Servidor en línea');
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.on('message', async (message) => {
	if (message.body === '!ping') {
		await client.sendMessage(message.from, 'pong');
	}
});

client.on('qr', (qr) => {
	// Generate and scan this code with your phone
	qrcode.generate(qr, { small: true });
});

client.initialize();

// Iniciar el servidor web
app.listen(port, "0.0.0.0", function () {
	console.log(`Servidor web iniciado en puerto: ${port}`);
});

