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
                                  // --------------------------------------------
                                  var request = require('request');

                                  // Set the headers
                                  var headers = {
                                    'User-Agent':       'Super Agent/0.0.1',
                                    'Content-Type':     'application/json'
                                  }

                                  // Configure the request
                                  var options = {
                                    url: 'https://api.sendgrid.com/api/mail.send.json',
                                    method: 'POST',
                                    headers: headers,
                                    form: {
                                      "api_user":"teja.sathuluri",
                                      "api_key":"Tej@3047",
                                      "to":email,
                                      "subject":subject,
                                      "text":message,
                                      "from":response.schoolEmail
                                    }
                                  }

                                  // Start the request
                                  request(options, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                      // Print out the response body
                                      console.log(body)
                                      console.log("email sent!");
                                    } else {
                                      console.log("error: "+JSON.stringify(response));
                                      console.log("email sent!");
                                    }
                                  })
// ---------------------------------------------
            });
        }
            next();
    });
  server.use(router);
};
