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
                    var date1 = new Date(ctx.instance.dateofBirth);
                    var date2 = new Date(ctx.instance.dateofJoin);
                    ctx.instance.dateofBirth = new Date(date1.setDate(ctx.instance.dateofBirth.getDate() -1));
                    ctx.instance.dateofJoin  = new Date(date2.setDate(ctx.instance.dateofJoin.getDate() -1));
        }
        next();
        });
        // ---------------------------------------------------------

};
