const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const whatsappClient = new Client({
	puppeteer: { args: ['--no-sandbox'] },
	authStrategy: new LocalAuth
})

whatsappClient.on("qr", (qr) => qrcode.generate(qr, { small: true }))
whatsappClient.on("ready", () => console.log("client is ready"))

whatsappClient.initialize()