var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Parent) {
  Parent.afterRemote('create', function(context, userInstance, next) {
    console.log('> Parent.afterRemote triggered');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../client/views/signup.html'),
      redirect: '/verified',
      user: Parent
    };


    userInstance.verify(options, function(err, response, next) {
      if (err) return next(err);

      console.log('> verification email sent:', response);

      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
        'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
};
