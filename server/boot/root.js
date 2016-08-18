  module.exports = function(server) {
  var router = server.loopback.Router(); 

  //----------------Modify Response
  var remotes = server.remotes();
  remotes.after('find', function (ctx, next)  {  if (ctx.result) ctx.result.success = true; next();  });
  //----------------Modify Response

  //          var Admin = server.models.Admin;

  // Admin.afterRemote('login', function(ctx, unused, next) {
  //  ctx.result.ttl = 10;   
  //   next();
  // });
  server.use(router);
};
