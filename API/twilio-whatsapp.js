const client = require('twilio')();

//.env MUST HAVE these 2 variables:
//TWILIO_ACCOUNT_SID
//TWILIO_AUTH_TOKEN

//Untested and did not have the token included yet
//plans: destinationPhone parameter = phoneNumber from Users table; table need new column
//from: will be stored by the .env as the message sender after registering the twilio account

//might put this in middleware(?) or just call it as helper function, not sure yet

export function sendWhatsappMessagesTo(destinationPhone, msg) {
    client.messages.create({
        from: 'whatsapp:number',
        to: `whatsapp:${destinationPhone}`,
        body: msg
    })
        .then((message) => {
            console.log(message.sid);
        })
        .catch((err) => {
            console.log(err);
        })
}
