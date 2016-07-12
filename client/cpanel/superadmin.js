/*** Created by Mansoor on 6/9/2016.*/

  var myApp = angular.module('myApp', ['ng-admin']);
  myApp.config(['NgAdminConfigurationProvider', function (nga) {

    // create an admin application
    var admin = nga.application('Study Monitor Admin')

    //.baseApiUrl('http://smtest9.cloudapp.net:3000/api/'); // main API endpoint
    .baseApiUrl('http://localhost:3000/api/'); // main API endpoint

  // create a user entity
  // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com
  var school = nga.entity('Schools');
    school.listView().fields([
    nga.field('id').label('School Id'),
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.creationView().fields([
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.deletionView().fields([
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.editionView().fields([
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.showView().fields([
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);

var admins = nga.entity('Admins');
    admins.listView().fields([
      nga.field('id'),
      nga.field('email'),
      nga.field('firstName'),
      nga.field('type'),
      nga.field('schoolId')
    ]);
    admins.creationView().fields([
      nga.field('firstName'),
      nga.field('email'),
      nga.field('password'),
      nga.field('type'),
      nga.field('schoolId','reference').label('School')
        . targetEntity(school)
        .targetField(nga.field('schoolName'))

    ]);
    admins.deletionView().fields([
      nga.field('id'),
      nga.field('firstName'),
      nga.field('type'),
      nga.field('schoolId')
    ]);
    admins.editionView().fields([
      nga.field('firstName'),
      nga.field('email'),
      nga.field('type'),
      nga.field('schoolId','reference').label('School')
        .targetEntity(school)
        .targetField(nga.field('schoolName'))
    ]);
    admins.showView().fields([
      nga.field('id'),
      nga.field('email'),
      nga.field('firstName'),
      nga.field('type'),
      nga.field('schoolId')
    ]);


  admin.addEntity(school);
  admin.addEntity(admins);
  nga.configure(admin);

}]);
