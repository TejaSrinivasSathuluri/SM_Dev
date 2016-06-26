/**
 * Created by lenovo on 6/21/2016.
 */

module.exports = function (server) {
  var remotes = server.remotes();
  // Set X-Total-Count for all search requests
  remotes.after('**', function (ctx, next) {
    if(ctx.req.originalUrl.toString().indexOf('/api/Containers/assignments/upload') > -1){
      console.log(JSON.stringify(ctx.req.originalUrl.toString()));
      console.log(JSON.stringify(ctx.result));
      var filesInfo = ctx.result.result.files['fileUpload'];

      var c = 0;
      for(var fi in filesInfo){

        var fileInfo = filesInfo[fi];
        var fileName = fileInfo.name;
        var container = fileInfo.container;

        var fs = require('fs');

        var newName = new Date().getTime().toString();
        fs.rename('client/uploads/'+container+"/"+fileName, 'client/uploads/'+container+"/"+newName, function(err, success){
          if(err) {
            console.log(err);
          } else {

          }
          filesInfo[fi].name = newName;
          c++;
          if(c == filesInfo.length) {

            ctx.result.result.files.fileUpload = filesInfo;
            console.log(ctx.result.result.files.fileUpload);
            next();

          }
        });
      }
    } else{
      next();
    }
  });
}
