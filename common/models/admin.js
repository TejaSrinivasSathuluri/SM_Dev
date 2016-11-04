module.exports = function(Admin) 
{

        //---------------------------------------------------------
        Admin.observe('before save', function addType(ctx, next) 
        {
        if (ctx.instance) 
        {
            if(ctx.isNewInstance) 
            {
            
            ctx.instance.type = 'Admin'; 
            console.log(ctx.instance);

            }
        }
        next();
        });
        // ---------------------------------------------------------


};
