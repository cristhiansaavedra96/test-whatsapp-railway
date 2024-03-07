const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
/*
{ args: ['--no-sandbox', '--disable-setuid-sandbox'] } and ignoreDefaultArgs: ['--disable-extensions']
*/
const client = new Client({
	puppeteer: {
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox'
		],
		ignoreDefaultArgs: ['--disable-extensions'],
	},
});

client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true });
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
