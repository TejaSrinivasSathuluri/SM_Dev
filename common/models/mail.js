        //******** module imports**********//    
        var nodemailer = require('nodemailer');
        var server = require('../../server/server');
        //******** module imports**********//  

module.exports = function(Mail) {
    // ----------------------------
   Mail.observe('after save', function (ctx, next)  {  
    if (ctx.instance)
    {

  //******** model declarations**********//    
        var School = server.models.School;
        console.log(ctx.instance.email);
        //******** model declarations**********//  
         School.findOne({ "where":{ "id" : ctx.instance.schoolId}},function(err,response)
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
                                      "to":ctx.instance.email,
                                      "subject": ctx.instance.subject,
                                      "text": ctx.instance.message,
                                      "from": response.schoolEmail
                                    }
                                  }

                                  // Start the request
                                  request(options, function (error, response, body) 
                                  {
                                    if (!error && response.statusCode == 200) 
                                    {
                                      // Print out the response body
                                      console.log(body)
                                      console.log("email sent!");
                                    } else {
                                      console.log("error: "+JSON.stringify(response));
                                      console.log("Email No Sent!");
                                    }
                                  })
// ---------------------------------------------
            });
        }
            next();
    });
// ---------------------------------
};
