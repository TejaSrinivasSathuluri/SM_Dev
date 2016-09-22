  module.exports = function(server) {
  var router = server.loopback.Router(); 

  //----------------Modify Response
    var remotes = server.remotes();
    remotes.after('**', function (ctx, next)  
    {  
          // console.log(ctx.result); 
          if (ctx.result) ctx.result.success = true; 
          next();  
    });
            //----------------Modify Response


//             var TMClient = require('textmagic-rest-client');
  
// var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
// c.Messages.send({text: 'test message', phones:'9705629205'}, function(err, res){
//     console.log('Messages.send()', err, res);
// });
  server.use(router);
};
