module.exports = function(Container) {




  //// Set X-Total-Count for all search requests
  //Container.after('**', function (ctx, next) {
  //  if(ctx.req.originalUrl.toString().indexOf('/api/Containers') > -1){
  //    console.log(JSON.stringify(ctx.req.originalUrl.toString()));
  //    console.log(JSON.stringify(ctx.result));
  //
  //
  //  } else{
  //    next();
  //  }
  //});

};
