/*** Created by Mansoor on 6/9/2016.*/

  var myApp = angular.module('myApp', ['ng-admin']);
  myApp.config(['NgAdminConfigurationProvider', function (nga) {

    // create an admin application
    var admin = nga.application('Study Monitor Admin')

    .baseApiUrl(window.location.origin + '/api/' ); // main API endpoint


// School Corner
  var school = nga.entity('Schools');
    school.listView().fields([
    nga.field('id').label('School Id'),
    nga.field('schoolName'),
     nga.field('code','number').label('School Code'),
    nga.field('address'),
    nga.field('city'),
    nga.field('state'),
    nga.field('schoolEmail'),
    nga.field('schoolPassword'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.creationView().fields([
    nga.field('schoolName'),
    nga.field('code','number').label('School Code'),
    nga.field('address'),
    nga.field('city'),
    nga.field('state'),
    nga.field('schoolEmail'),
    nga.field('schoolPassword'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.deletionView().fields([
    nga.field('schoolName'),
    nga.field('code','number')
    .label('School Code'),
    nga.field('address'),
    nga.field('city'),
    nga.field('state'),
    nga.field('schoolEmail'),
    nga.field('schoolPassword'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.editionView().fields([
    nga.field('schoolName'),
    nga.field('code','number').label('School Code'),
    nga.field('address'),
    nga.field('city'),
    nga.field('state'),
    nga.field('schoolEmail'),
    nga.field('schoolPassword'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);
    school.showView().fields([
    nga.field('schoolName'),
    nga.field('code').label('School Code'),
    nga.field('address'),
    nga.field('city'),
    nga.field('state'),
    nga.field('schoolEmail'),
    nga.field('schoolPassword'),
    nga.field('startDate','date'),
    nga.field('endDate','date')
  ]);

var admins = nga.entity('Admins');
    admins.listView().fields([
      nga.field('id'),
      nga.field('email'),
      nga.field('firstName'),
nga.field('schoolId','reference').label('School')
        .targetEntity(school)
        .targetField(nga.field('schoolName'))
    ]);
    admins.creationView().fields([
      nga.field('firstName'),
      nga.field('email'),
      nga.field('password'),
      nga.field('schoolId','reference').label('School')
        . targetEntity(school)
        .targetField(nga.field('schoolName'))

    ]);
    admins.deletionView().fields([
      nga.field('id'),
      nga.field('firstName'),
      nga.field('schoolId')
    ]);
    admins.editionView().fields([
      nga.field('firstName'),
      nga.field('email'),
      nga.field('schoolId','reference').label('School')
        .targetEntity(school)
        .targetField(nga.field('schoolName'))
    ]);
    admins.showView().fields([
      nga.field('id'),
      nga.field('email'),
      nga.field('firstName'),
      nga.field('schoolId','reference').label('School')
        .targetEntity(school)
        .targetField(nga.field('schoolName'))
    ]);


  admin.addEntity(school);
  admin.addEntity(admins);
  nga.configure(admin);

}]);
