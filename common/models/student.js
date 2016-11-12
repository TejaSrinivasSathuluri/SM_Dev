var server = require('../../server/server');
module.exports = function(Student) 
{
      //------------------------Creating Student Date Handling---------------------------------
        Student.observe('before save', function addType(ctx, next) 
        {
        if (ctx.instance && ctx.isNewInstance) 
        {
                    var date1 = new Date(ctx.instance.dateofBirth);
                    var date2 = new Date(ctx.instance.dateofJoin);
                    ctx.instance.dateofBirth = new Date(date1.setDate(ctx.instance.dateofBirth.getDate()+1));
                    ctx.instance.dateofJoin  = new Date(date2.setDate(ctx.instance.dateofJoin.getDate()+1));
        }
        next();
        });
        // ---------------------------------------------------------


        //-----------------------Finding Student Date Handling----------------------------------
        Student.observe('loaded', function addType(ctx, next) 
        {
        if (ctx.instance) 
        {
                    // var date1 = new Date(ctx.instance.dateofBirth);
                    // var date2 = new Date(ctx.instance.dateofJoin);
                    // if(ctx.instance.dateofBirth) 
                    // ctx.instance.dateofBirth = new Date(date1.setDate(date1.getDate() -1));
                    // if(ctx.instance.dateofJoin) 
                    // ctx.instance.dateofJoin  = new Date(date2.setDate(date2.getDate() -1));
        }
        next();
        });
        // ---------------------------------------------------------
  

       //-----------------------Finding Student Date Handling----------------------------------
        Student.observe('before delete', function(ctx, next) 
        {
          var StudentParent = server.models.StudentParent;
          var Parent = server.models.Parent;
         
              StudentParent.find({ "where": { "studentId":ctx.where.id.inq[0] }},
              function(err,data)
              {
                data.forEach(function(record)
                {
                  StudentParent.deleteById({ "id" : record.id},function(err,success){
                    if (err) next(err);
                  });
                });
              });
          next();
        });
        // ---------------------------------------------------------
  
  
};
