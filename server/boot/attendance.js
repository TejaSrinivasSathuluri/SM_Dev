module.exports = function(server) 
{

  var router = server.loopback.Router(); 


  //----------------Load Attendance

            // -CSVTOJSON DECLARATIONS 
            var Converter = require("csvtojson").Converter;
            var converter = new Converter({constructResult: false});
            
            //  -NODE SCHEDULER DECLARATIONS
            var schedule  = require('node-schedule');
            var rule = new schedule.RecurrenceRule();
            rule.minute = 35;

            //  -MODEL DECLARATIONS
            var Attendance = server.models.Attendance;
            var School     = server.models.School;
 
       
          //  -DATE FUNCTION
            function formatDate() 
            {
                        var d = new Date(),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;

                        return [year, month, day].join('-');
            }
            var dateString = formatDate();
          

          // - GET ALL SCHOOLS 
            var j = schedule.scheduleJob(rule, function()
            {
                var list = [];               
                School.find({"where":{ "attendance" : 'Y' }},
                function(err,data)
                      { 
                         data.forEach(function(record)
                                             { 
                                               addAttendance(record.code,list); 
                                              }) 
                      });
            });
            
           function addAttendance(schoolCode,list)
           {

                          // -VARIABLE DECLARATIONS
                          var date  = new Date();
                          var year  = parseInt(date.getFullYear());
                          var month = parseInt(date.getMonth()) ;
                          var day   = parseInt(date.getDate());
                          var countAdded=0;
                          var countParsed=0;
                          var countDuplicate=0;
                          var countError=0,i=0;

                          converter.on("record_parsed", function (jsonObj)
                          {
                                  var RFID  = jsonObj.CardNumber;
                                  var key = RFID + schoolCode +  year + month + day;
                                  // Attendance.findOne({"where": {"RFID": RFID, "day": day,"month":month,"year":year,"schoolCode":schoolCode}}, 
                                  // function (err, record)
                                  // {
                                  //             countParsed++;
                                  //             if (err)  
                                  //             {
                                  //               console.log(record);
                                  //               countError++ ;
                                  //             }
                                  //             else if (!record)
                                  //             {
                                  //             Attendance.create({RFID:RFID , day: day,month:month,year:year,schoolCode:schoolCode});
                                  //             countAdded++;
                                  //             }  
                                  //             else if (record)  countDuplicate++;
                                  //             console.log('Parsed:' +countParsed + '-'  + 'Added:' +countAdded + '-' +  'Duplicate:' +countDuplicate + '-'+ 'Error:' +countError);
                                  // });


                                              
                            Attendance.create({RFID:RFID , day: day,month:month,year:year,schoolCode:schoolCode,id:key},
                            function(err,record)
                            {
                                    countParsed++; 
                                    if (err) 
                                    {
                                      countDuplicate++;
                                      console.log(err);
                                    }
                                    else 
                                    {
                                      console.log(record);
                                      countAdded++;
                                    }
                            });
                                              
                        console.log('Parsed:' +countParsed + '-'  + 'Added:' +countAdded + '-' +  'Duplicate:' +countDuplicate);
                                  

                          });

                        var url ="http://studymonitor.net/prod/" + schoolCode  + "/CardsData" +  dateString + ".csv";
                        console.log(url);
                        require("request").get(url).pipe(converter);
           }            
          
  
  //----------------Load Attendance



  server.use(router);
};
