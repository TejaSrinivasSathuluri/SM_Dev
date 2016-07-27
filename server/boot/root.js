module.exports = function(server) {
  var router = server.loopback.Router();

  //----------------Modify Response
  //Add status=true element with every success response
  var remotes = server.remotes();
  remotes.after('find', function (ctx, next)  {  if (ctx.result) ctx.result.success = true; next();  });
  //----------------Modify Response

//  var redis = require("redis"),
//    client = redis.createClient();
//
//// if you'd like to select database 3, instead of 0 (default), call
//// client.select(3, function() { /* ... */ });
//
//  client.on("error", function (err) {
//    console.log("Error " + err);
//  });
//
//  client.set("string key", "string val", redis.print);
//  client.hset("hash key", "hashtest 1", "some value", redis.print);
//  client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//  client.hkeys("hash key", function (err, replies) {
//    console.log(replies.length + " replies:");
//    replies.forEach(function (reply, i) {
//      console.log("    " + i + ": " + reply);
//    });
//    client.quit();
//  });

  //----------------Load Attendance

  var schedule = require('node-schedule');
  var j = schedule.scheduleJob('*/1 * * * *', function()
  {

            var Attendance = server.models.Attendance;
            var Student    = server.models.Student;
            var Converter = require("csvtojson").Converter;
            var converter = new Converter({constructResult: false});


             console.log('Started File Parsing');
             converter.on("record_parsed", function (jsonObj)
            {
                    console.log('Reading Record');
                    jsonObj.EPC = jsonObj.EPC.replace('#', '');
  			  //console.log(jsonObj.SID);
                                     console.log('Found Student');
                                          var date = new Date();
                                  var year = parseInt(date.getFullYear());
                                  var month = parseInt(date.getMonth()) ;
                                  var day = parseInt(date.getDate());
                                   var schoolCode = parseInt(jsonObj.SID);

                                    Attendance.findOne({"where": {"RFID": jsonObj.EPC, "day": day,"month":month,"year":year,"schoolCode":schoolCode}}, function (err, record)
                                          {
                                                if (err) {   console.log('Error Occured In Finding Attendance'); }
                                                else if (!record)
                                                {

                                                  Attendance.create({RFID:jsonObj.EPC , day: day,month:month,year:year,schoolCode:jsonObj.SID});
                                                  console.log("added");

                                                }
                                                else if (record) { console.log('Already Exists'); }

                                        });

            });
                require("request").get("http://studymonitor.net/dev/atten/LOG.CSV").pipe(converter);
             //var url ="http://localhost:3000/LOG.CSV"
             //require("request").get(url).pipe(converter);

  });
  //----------------Load Attendance



  server.use(router);
};
