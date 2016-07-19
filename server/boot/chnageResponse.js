module.exports = function (server) {



  
    var remotes = server.remotes();
    // Set X-Total-Count for all search requests
   
    

 


   

    remotes.after('**', function (ctx, next) {
            
     
                ctx.result.success = true;
              
             
      

        next();
	});


 

};