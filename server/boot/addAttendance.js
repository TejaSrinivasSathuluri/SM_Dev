module.exports = function(server)
{
    var schedule = require('node-schedule');
    var j = schedule.scheduleJob('*/60 * * * *', function()
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
                                       console.log('Found Student');
                                            var date = new Date();
                                    var year = date.getFullYear();
                                    var month = date.getMonth() ;
                                    var day = date.getDate();
                                      Attendance.findOne({"where": {"RFID": jsonObj.EPC, "day": day,"month":month,"year":year}}, function (err, record)
                                            {
                                                  if (err) {   console.log('Error Occured In Finding Attendance'); }
                                                  else if (!record)
                                                  {

                                                    Attendance.create({RFID:jsonObj.EPC , day: day,month:month,year:year});
                                                    console.log("added");

                                                  }
                                                  else if (record) { console.log('Already Exists'); }

                                          });

              });
                       require("request").get("http://studymonitor.net/dev/atten/LOG.CSV").pipe(converter);
                     //require("request").get("http://localhost:3000/LOG.CSV").pipe(converter);

    });

}

