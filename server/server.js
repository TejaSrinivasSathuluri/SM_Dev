var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

var app = module.exports = loopback();


app.use(loopback.token());

app.start = function() {
  return app.listen(function() {
    console.log('Study Monitor Application Is Now Running');
  });
};

boot(app, __dirname, function(err) 
{
  if (err) throw err;
  if (require.main === module){
   app.start();
  }
});
