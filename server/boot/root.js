  module.exports = function(server) {
  var router = server.loopback.Router(); 

  //----------------Modify Response
    // var remotes = server.remotes();
    // remotes.after('**', function (ctx, next)  
    // {  
    //       // console.log(ctx.result); 
    //       if (ctx.result) ctx.result.success = true; 
    //       next();  
    // });
    //----------------Modify Response

 
  server.use(router);
};
