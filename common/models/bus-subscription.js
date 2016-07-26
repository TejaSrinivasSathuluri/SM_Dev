module.exports = function(BusSubscription) {
    BusSubscription.validatesUniquenessOf('studentId', {message: 'This Student Has Already Subscribed Bus Service'});

};
