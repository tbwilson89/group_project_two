const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'dfb61617',
  apiSecret: '0vc6x9TKRR5psMqn'
})

const from = '13024401957'
const to = '14693077471'
const text = 'I would have jumped on a grenade for you but you tossed it in the trash'

nexmo.message.sendSms(from, to, text) 





