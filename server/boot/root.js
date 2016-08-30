  module.exports = function(server) {
  var router = server.loopback.Router(); 

  //----------------Modify Response
  var remotes = server.remotes();
  remotes.after('find', function (ctx, next)  {  if (ctx.result) ctx.result.success = true; next();  });
  //----------------Modify Response

           var Admin = server.models.Admin;
           var Student = server.models.Student;
           var Staff = server.models.Staff;
          //  var Staff = server.models.Staff;

  //  var list = Admin.find();
  //  console.log(list);
  //  for (var i=0;i<list.length-1;i++){
                 
  //              console.log(list[i].email);               
               
  //              var email = list[i].email.toLowercase();
  //              console.log(email);               
       
  //  }
  server.use(router);
};
