module.exports = function(server) {
  
        //******** module imports**********//    
        var router = server.loopback.Router();
        var nodemailer = require('nodemailer');
        var remotes = server.remotes();
        //******** module imports**********//    
   
 
        //******** model declarations**********//    
        var Email = server.models.Mail;
        var School = server.models.School;
        //******** model declarations**********//    



    remotes.after('**', function (ctx, next)  {  
    if (ctx.req.originalUrl.toString().indexOf('/api/Mails') > -1){

         email = JSON.parse(ctx.req.query.filter.toString()).where.email;
         message = JSON.parse(ctx.req.query.filter.toString()).where.message;
         subject = JSON.parse(ctx.req.query.filter.toString()).where.subject;
         schoolId =JSON.parse(ctx.req.query.filter.toString()).where.schoolId;
         console.log(subject);
         School.findOne({ "where":{ "id" : schoolId}},function(err,response)
         {
            if (err) next(err);
            var studyMonitorMailSender = nodemailer.createTransport({ service: 'Gmail',
                                                                        auth:  
                                                                        {user: response.schoolEmail ,
                                                                            pass: response.schoolPassword }
                                                                            });
            
             console.log(schoolEmail);
             console.log(schoolPassword);
             console.log(schoolName);
             console.log(schoolCode);
                                                var mailOptions = {
                                                    from: response.schoolEmail, 
                                                    to: email, 
                                                    subject: subject, 
                                                    text: message 
                                            };
                studyMonitorMailSender.sendMail(mailOptions, function(error, info){
                if(error)    console.log(error);
                else         console.log('Message sent');
                
                });


         });

       
        

        }
            next();
    });
  server.use(router);
};
