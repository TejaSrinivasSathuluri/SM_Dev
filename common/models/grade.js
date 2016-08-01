module.exports = function(Grade) {
    Grade.validatesUniquenessOf('gradeName', {message: 'Grade Already Exists'});
    Grade.validatesUniquenessOf('gradePoint', {message: 'Grade Point Already Exists'});
    Grade.validatesUniquenessOf('percentageRangeFrom', {message: 'This Grade Range From Limit Already Exists'});
    Grade.validatesUniquenessOf('percentageRangeTo', {message: 'This Grade Range To Limit Already Exists'});
    

};
