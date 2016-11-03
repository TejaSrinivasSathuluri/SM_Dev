 module.exports = function(server) {
 var router = server.loopback.Router(); 
 User = server.models.User;
 Role = server.models.Role;
 RoleMapping = server.models.RoleMapping;



User.observe('after save', function setRoleMapping(ctx, next) {
  if (ctx.instance) {
    if(ctx.isNewInstance) {
 
      Role.findOne({where: {name: ctx.instance.type}}, function(err, role) {
        if (err) {return console.log(err);}
        RoleMapping.create({
          principalType: "USER",
          principalId: ctx.instance.id,
          roleId: role.id
        }, function(err, roleMapping) {
               
          if (err) {return console.log(err);}
        });
      });

    }
  }
  next();
});






 
  server.use(router);
};
