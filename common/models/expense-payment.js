module.exports = function(ExpensePayment) {


    //---------------------------------------------------------
        ExpensePayment.observe('before save', function addType(ctx, next) 
        {
        if (ctx.instance) 
        {
            if(ctx.isNewInstance) 
            {
            
            ctx.instance.date = new Date(ctx.instance.date);

            }
            else{
            console.log(ctx.instance);
                
            }
        }
        next();
        });
        // ---------------------------------------------------------


};
