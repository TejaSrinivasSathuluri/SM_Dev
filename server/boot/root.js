module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
//  var nodemailer = require('nodemailer');
//
//// create reusable transporter object using the default SMTP transport
//  var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
//
//// setup e-mail data with unicode symbols
//  var mailOptions = {
//    from: '"Fred Foo 👥" <mannuhitler@gmail.com>', // sender address
//    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//    subject: 'Hello ✔', // Subject line
//    text: 'Hello world 🐴', // plaintext body
//    html: '<b>Hello world 🐴</b>' // html body
//  };
//
//// send mail with defined transport object
//  transporter.sendMail(mailOptions, function(error, info){
//    if(error){
//      return console.log(error);
//    }
//    console.log('Message sent: ' + info.response);
//  });





  server.use(router);




};
