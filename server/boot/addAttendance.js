module.exports = function(server)
{
    var schedule = require('node-schedule');
    var j = schedule.scheduleJob('*/1 * * * *', function()
    {

              var Attendance = server.models.Attendance;
              var Student    = server.models.Student;
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({constructResult: false});

              converter.on("record_parsed", function (jsonObj)
              {
                      jsonObj.EPC = jsonObj.EPC.replace('#', '');
                      Student.findOne({"where": {"RFID": jsonObj.EPC}}, function (err, student)
                        {
                                  if       (err)    {         console.log('Error in Finding Student');  }
                                  else if (student)
                                  {
                                            var date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
                                            Attendance.findOne({"where": {"studentId": student.id, "date": date}}, function (err, record)
                                            {
                                                  if (err) {   console.log('Error Occured In Finding Attendance'); }
                                                  else if (!record)
                                                  {

                                                    Attendance.create({studentId: student.id, date: date});
                                                    console.log("added");

                                                  }
                                                  else if (record) { console.log('Already Exists'); }

                                          });
                                  }
                        });
                     require("request").get("http://studymonitor.net/dev/atten/LOG.CSV").pipe(converter);
              });

    });

}

