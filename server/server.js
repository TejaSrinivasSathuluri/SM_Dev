var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

var app = module.exports = loopback();

// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(loopback.token());

app.start = function() {
  return app.listen(function() {
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Study Monitor Application Is Now Running On ', baseUrl);
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  //if (require.main === module)
  //  app.start();
  if (require.main === module){
    app.start();
    //app.io = require('socket.io')(app.start());
    //app.io.on('connection', function(socket){
    //  console.log('a user connected');
    //
    //  socket.on('subscribe', function(room) {
    //    console.log('joining room', room);
    //    socket.join(room);
    //  });
    //  socket.on('disconnect', function(){
    //    console.log('user disconnected');
    //  });
    //});
  }
});
