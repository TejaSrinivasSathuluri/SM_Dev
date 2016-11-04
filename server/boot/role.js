 module.exports = function(server) {
 var router = server.loopback.Router(); 
 User = server.models.User;
 Role = server.models.Role;
 RoleMapping = server.models.RoleMapping;


//  Creating New Role For Super Admin
Role.findOne({where: {name: "Gsrhrhhvxivgilovxivzgvwulihfkvizwnrm42647310"}}, 
function(err, role) 
{
      if (err) {return console.log(err);}
      if(role);
      else
      {
          Role.create({ name: 'Gsrhrhhvxivgilovxivzgvwulihfkvizwnrm42647310'}, 
          function(err, role) 
          {
            if (err) return console.log(err);
          });
      }
});


// Assigning  Super Admin Role For User Model
User.observe('after save', function addRole(ctx, next) 
{
  if (ctx.instance) 
  {
    if(ctx.isNewInstance) 
    {
 
      Role.findOne({where: {name: ctx.instance.type}}, 
      function(err, role) 
      {
            if (err) {return console.log(err);}
            RoleMapping.create({ principalType: "USER", principalId: ctx.instance.id, roleId: role.id}, 
            function(err, roleMapping) 
            {
              console.log('User created with role') 
              if (err) {return console.log(err);}
            });
      });

    }
  }
  next();
});






 
  server.use(router);
};
