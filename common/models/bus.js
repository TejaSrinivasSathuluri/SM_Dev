module.exports = function(Bus)
{
    Bus.validatesUniquenessOf('busNo', {message: 'Bus Number Already Exists'});
};
