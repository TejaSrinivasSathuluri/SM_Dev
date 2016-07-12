module.exports = function(server)
{
    //var schedule = require('node-schedule');
    //var j = schedule.scheduleJob('*/60 * * * *', function()
    //{
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
    //                                var year = date.getFullYear();
    //                                var month = date.getMonth() ;
    //                                var day = date.getDate();
    //                                  Attendance.findOne({"where": {"RFID": jsonObj.EPC, "day": day,"month":month,"year":year}}, function (err, record)
    //                                        {
    //                                              if (err) {   console.log('Error Occured In Finding Attendance'); }
    //                                              else if (!record)
    //                                              {
    //
    //                                                Attendance.create({RFID:jsonObj.EPC , day: day,month:month,year:year});
    //                                                console.log("added");
    //
    //                                              }
    //                                              else if (record) { console.log('Already Exists'); }
    //
    //                                      });
    //
    //          });
    //           //   require("request").get("http://studymonitor.net/dev/atten/LOG.CSV").pipe(converter);
    //           var url ="http://localhost:3000/LOG.CSV"
    //           require("request").get(url).pipe(converter);
    //
    //});


  //var node_dropbox = require('node-dropbox');
  //console.log('came');
  //var key='myubuhchxkq6kv0';
  //var secret = 'ki6rph6rhyrxz0j';
  //var redirect_url = 'http://localhost:3000/#/email';
  //console.log(key);
  //console.log(secret);
  //node_dropbox.Authenticate('key', 'secret', 'redirect_url', function(err, url){
  //  // redirect user to the url.
  //  console.log('Imran Came Here');
  //  if (err){
  //    console.log('Error Occured');
  //    console.log(err);
  //
  //  }
  //  else {
  //    console.log(url);
  //    node_dropbox.AccessToken('key', 'secret', '-p5lctzPHiwAAAAAAAAA26d67003YRt6cxu6q97Zva_ZP_ER8ttsNVaS56k7GGgw', 'redirect_url', function(err, body) {
  //
  //      if(err){
  //        console.log(err);
  //      }
  //      else{
  //        access_token = body.access_token;
  //        console.log('Came Here');
  //        console.log(access_token);
  //
  //      }
  //    });
  //  }
  //  // looks like this: "https://www.dropbox.com/1/oauth2/authorize?client_id=<key_here>&response_type=code&redirect_uri=<redirect_url_here>"
  //});











  //var Dropbox = require('dropbox');
  //var dbx = new Dropbox({ accessToken: '-p5lctzPHiwAAAAAAAAA3HJXnHTVKWBHtA4VPYwZpv3B6yOe25I1nKDQRiWTQpqY' });
  //dbx.filesListFolder({path: ''})
  //  .then(function(response) {
  //    //console.log(response);
  //    //var path='';
  //    api.getFile(path, callback)
  //  })
  //  .catch(function(error) {
  //    console.log(error);
  //  });
 //
 // var xhr = new XMLHttpRequest();
 //
 // xhr.upload.onprogress = function(evt) {
 //   var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
 //   // Upload in progress. Do something here with the percent complete.
 // };
 //
 // xhr.onload = function() {
 //   if (xhr.status === 200) {
 //     var fileInfo = JSON.parse(xhr.response);
 //     // Upload succeeded. Do something here with the file info.
 //   }
 //   else {
 //     var errorMessage = xhr.response || 'Unable to upload file';
 //     // Upload failed. Do something here with the error.
 //   }
 // };
 // var file ='/LOG.CSV';
 //var dropboxToken = '-p5lctzPHiwAAAAAAAAA3HJXnHTVKWBHtA4VPYwZpv3B6yOe25I1nKDQRiWTQpqY';
 // xhr.open('POST', 'https://www.dropbox.com/home/Apps/SM');
 // xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
 // xhr.setRequestHeader('Content-Type', 'application/octet-stream');
 // xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
 //   path: '/immi' +  file.name,
 //   mode: 'add',
 //   autorename: true,
 //   mute: false
 // }));
 //
 // xhr.send(file);















}

