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

client.on('requestfailed', request => {
	console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
});
// Catch console log errors
client.on("pageerror", err => {
	console.log(`Page error: ${err.toString()}`);
});

client.on('authenticated', (session) => {
	console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
	console.error('AUTHENTICATION FAILURE', msg);
});

client.on('disconnected', (reason) => {
	console.log('Client was logged out', reason);
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

//unhandledRejection
process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', reason.stack || reason);
});

//uncaughtException

process.on('uncaughtException', (error) => {
	console.log('Uncaught Exception thrown', error.stack || error);
});

client.initialize();
