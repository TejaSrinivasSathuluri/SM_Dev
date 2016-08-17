module.exports = function(server) {
  var router = server.loopback.Router(); 


  //----------------Load Attendance

  //var schedule = require('node-schedule');
  //var j = schedule.scheduleJob('*/1 * * * *', function() {
  //
  //          var Attendance = server.models.Attendance;
  //          var Student    = server.models.Student;
  //          var Converter = require("csvtojson").Converter;
  //          var converter = new Converter({constructResult: false});
  //
  //
  //           console.log('Started File Parsing');
  //           converter.on("record_parsed", function (jsonObj)
  //          {
  //                  console.log('Reading Record');
  //                  jsonObj.EPC = jsonObj.EPC.replace('#', '');
  //			  //console.log(jsonObj.SID);
  //                                   console.log('Found Student');
  //                                        var date = new Date();
  //                                var year = parseInt(date.getFullYear());
  //                                var month = parseInt(date.getMonth()) ;
  //                                var day = parseInt(date.getDate());
  //                                 var schoolCode = parseInt(jsonObj.SID);
  //
  //                                  Attendance.findOne({"where": {"RFID": jsonObj.EPC, "day": day,"month":month,"year":year,"schoolCode":schoolCode}}, function (err, record)
  //                                        {
  //                                              if (err) {   console.log('Error Occured In Finding Attendance'); }
  //                                              else if (!record)
  //                                              {
  //
  //                                                Attendance.create({RFID:jsonObj.EPC , day: day,month:month,year:year,schoolCode:jsonObj.SID});
  //                                                console.log("added");
  //
  //                                              }
  //                                              else if (record) { console.log('Already Exists'); }
  //
  //                                      });
  //
  //          });
  //              require("request").get("http://studymonitor.net/dev/atten/LOG.CSV").pipe(converter);
  //           //var url ="http://localhost:3000/LOG.CSV"
  //           //require("request").get(url).pipe(converter);
  //
  //});
  //----------------Load Attendance



  server.use(router);
};
