const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
/*
{ args: ['--no-sandbox', '--disable-setuid-sandbox'] } and ignoreDefaultArgs: ['--disable-extensions']
*/

const sessionName = 'session-name';

const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			"--disable-dev-shm-usage"
		],
		ignoreDefaultArgs: ['--disable-extensions'],
	},
});

client.on('qr', (qr) => {
	//qr code smallest posible
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
