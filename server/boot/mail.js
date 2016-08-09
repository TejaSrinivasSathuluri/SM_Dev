// module.exports = function(server) 
// {
//       var router     = server.loopback.Router();
//       var remotes    = server.remotes();
//       var nodemailer = require('nodemailer');

      
//       var Email = server.models.Mail;
//       var School = server.models.School;

//       remotes.after('**', function (ctx, next)  
//       {  
//         if (ctx.req.originalUrl.toString().indexOf('/api/Mails') > -1) {

//               email    = JSON.parse(ctx.req.query.filter.toString()).where.email;
//               message  = JSON.parse(ctx.req.query.filter.toString()).where.message;
//               subject  = JSON.parse(ctx.req.query.filter.toString()).where.subject;
//               schoolId = JSON.parse(ctx.req.query.filter.toString()).where.schoolId;
//                 console.log(schoolId);
//                School.findOne({ "where":{ "id" : schoolId}},function(err,response)
//                {
//                         if (err) next(err);
//                         var studyMonitorMailSender = nodemailer.createTransport({ service: 'Gmail',
//                                                                                   auth: {
//                                                                                             user: response.schoolEmail,
//                                                                                             pass: response.schoolPassword  
//                                                                                         }
//                                                                                 });
//                         var mailOptions = { from: response.schoolEmail, to: email,subject: subject, text: message };
//                           studyMonitorMailSender.sendMail(mailOptions, function(error, info){
//                                     if(error)    console.log(error);
//                                     else         console.log('Message sent');
                      
//                             });

//                });

                  
            


//         }
//         next();
//     });
//       server.use(router);
// };
