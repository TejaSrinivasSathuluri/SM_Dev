module.exports = function(server) {
  
        //******** module imports**********//    
        var router = server.loopback.Router();
        var nodemailer = require('nodemailer');
        var remotes = server.remotes();
        //******** module imports**********//    
   
 
        //******** model declarations**********//    
        var School = server.models.School;
        //******** model declarations**********//    

    remotes.after('**', function (ctx, next)  {  
    if (ctx.req.originalUrl.toString().indexOf('/api/Mails') > -1){


        

         email = JSON.parse(ctx.req.query.filter.toString()).where.email;
         message = JSON.parse(ctx.req.query.filter.toString()).where.message;
         subject = JSON.parse(ctx.req.query.filter.toString()).where.subject;
         schoolId =JSON.parse(ctx.req.query.filter.toString()).where.schoolId;
         console.log(message);
         School.findOne({ "where":{ "id" : schoolId}},function(err,response)
         {
            if (err) next(err);
            // var studyMonitorMailSender = nodemailer.createTransport({ service: 'Gmail',
            //                                                             auth:  
            //                                                             {user: response.schoolEmail ,
            //                                                                 pass: response.schoolPassword }
            //                                                                 });
            
            
            
            //                                     var mailOptions = {
            //                                         from: response.schoolEmail, 
            //                                         to: email, 
            //                                         subject: subject, 
            //                                         text: message 
            //                                 };
            //     studyMonitorMailSender.sendMail(mailOptions, function(error, info){
            //     if(error)    console.log(error);
            //     else         console.log('Message sent');
                
            //     });

                    var nodemailer = require('nodemailer');
                    var smtpTransport = require('nodemailer-smtp-transport');
                    var transporter = nodemailer.createTransport(smtpTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                        user: 'mansoorshaik0201@gmail.com',
                        pass: 'mannubh@i'
                        }
                    }));

                    var mailOptions = {
                        from: "mansoorshaik0201@gmail.com",
                        to: email,
                        subject: "Welcome Spiceboxer", // Subject line
                        text: '2324343', // plaintext body
                        html: "Hi " + ctx.req.body.name + ", <br><br>We are glad to have a SpiceBoxer like you.You are successfully registered with us" + " <br><br> Team Spicebox"
                    };

                    transporter.sendMail(mailOptions, function (error, info) 
                    {
                        if (error) 
                        {
                        return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });

// -----------------------------------------------------------------------------------------

            // var smtpTransport = nodemailer.createTransport("SMTP",{
            // service: "Gmail", 
            // auth: {
            //     user: response.schoolEmail,
            //     pass: response.schoolPassword
            // }
            // });



                        // smtpTransport.sendMail(
                        //     { 
                        //         from: "<" + response.schoolEmail+ ">",
                        //         to: "<" + email  + ">", 
                        //         subject: subject, 
                        //         text: message
                        //     }, 
                        //     function(error, response)
                        //     {  
                        //             if(error) console.log(error);
                        //             else console.log("Message sent: " + response.message);
                        //             smtpTransport.close(); 
                        //     });
 // -------------------------------------------------------------------------------------

            });
        }
            next();
    });
  server.use(router);
};
