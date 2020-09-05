const client = require('twilio')();
//feature not implemented on core app yet
//Untested and did not have the token included yet

//.env MUST HAVE these 2 variables if decided to use this:
//TWILIO_ACCOUNT_SID
//TWILIO_AUTH_TOKEN  

//plans: destinationPhone parameter = phoneNumber from Users table; table need new column
//from: will be stored by the .env as the message sender after registering the twilio account

//might put this in middleware(?) or just call it as helper function, not sure yet
//but probably helper function; might add callback parameter(?) to pass error

//might change API for different feature (having 2nd thoughts for messaging on update)
function sendWhatsappMessagesTo(destinationPhone, msg) {
  client.messages.create({
    from: `whatsapp:${process.env.VERIFIED_WHATSAPP_NUMBER}`,
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

module.exports = sendWhatsappMessagesTo;