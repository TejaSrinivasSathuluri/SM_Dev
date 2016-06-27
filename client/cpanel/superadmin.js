/**
 * Created by Mansoor on 6/9/2016.
 */

var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  // create an admin application
  var admin = nga.application('Study Monitor Admin')

<<<<<<< HEAD
    .baseApiUrl('http://meanprod.cloudapp.net:3000/api/'); // main API endpoint
    //.baseApiUrl('http://localhost:3000/api/'); // main API endpoint
=======
    //.baseApiUrl('http://smtest9.cloudapp.net:3000/api/'); // main API endpoint
    .baseApiUrl('http://localhost:3000/api/'); // main API endpoint
>>>>>>> dc53735cf5338dac64750582e574ff4fc1b0bc4b

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
    nga.field('endDate','date'),
  ]);
  school.creationView().fields([
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date'),
  ]);
  school.editionView().fields([
    nga.field('schoolName'),
    nga.field('schoolCode'),
    nga.field('schoolAddress'),
    nga.field('schoolCity'),
    nga.field('schoolState'),
    nga.field('schoolCountry'),
    nga.field('startDate','date'),
    nga.field('endDate','date'),
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
  school.showView().fields([
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

  var admins =nga.entity('Admins');
  admins.listView().fields([
    nga.field('id').label('Admin Id'),
    nga.field('email'),
    nga.field('school')

  ]);
  admins.creationView().fields([
    nga.field('email'),
    nga.field('password'),
    nga.field('schoolId','reference').label('School')
      .targetEntity(school)
      .targetField(nga.field('schoolName'))
  ]);
  admins.editionView().fields([
    nga.field('email'),
    nga.field('password'),
    nga.field('school','referenced_list')
      .targetEntity(nga.entity('Schools'))
      .targetReferenceField('schoolId')
      .targetFields([
        nga.field('id'),
        nga.field('schoolName')
      ])
  ]);
  admins.showView().fields([
    nga.field('email'),
    nga.field('password'),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolName'))
  ]);
  admins.deletionView().fields([
    nga.field('email'),
    nga.field('password'),
    nga.field('school')
  ]);

  var staff = nga.entity('Staffs');
  staff.listView().fields([
    nga.field('id').label('StaffId'),
    nga.field('username'),
    nga.field('lastName'),
    nga.field('gender'),
    nga.field('religion'),
    nga.field('caste'),
    nga.field('subCaste'),
    nga.field('staffBirthDate','date'),
    nga.field('motherTounge'),
    nga.field('email','email'),
    nga.field('isDisable'),
    nga.field('lastUpdated','date'),
    nga.field('updatedBy'),
    nga.field('RFID'),
    nga.field('staffImage'),
    nga.field('status'),
    nga.field('joinDate'),
    nga.field('address'),
    nga.field('contact'),
    nga.field('city'),
    nga.field('state'),
    nga.field('bloodGroup'),
    nga.field('regId'),
    nga.field('nationalIdType'),
    nga.field('nationalId'),
    nga.field('qualification'),
    nga.field('qualifiedUniversity'),
    nga.field('qualifiedYear'),
    nga.field('GPA'),
    nga.field('leavingDate'),
    nga.field('schoolId')

  ]);
  staff.creationView().fields([
    nga.field('id').label('StaffId'),
    nga.field('username'),
    nga.field('lastName'),
    nga.field('gender'),
    nga.field('religion'),
    nga.field('caste'),
    nga.field('subCaste'),
    nga.field('staffBirthDate','date'),
    nga.field('motherTounge'),
    nga.field('email','email'),
    nga.field('isDisable'),
    nga.field('RFID'),
    nga.field('staffImage'),
    nga.field('status'),
    nga.field('joinDate'),
    nga.field('address'),
    nga.field('contact'),
    nga.field('city'),
    nga.field('state'),
    nga.field('bloodGroup'),
    nga.field('regId'),
    nga.field('nationalIdType'),
    nga.field('nationalId'),
    nga.field('qualification'),
    nga.field('qualifiedUniversity'),
    nga.field('qualifiedYear'),
    nga.field('GPA'),
    nga.field('leavingDate'),
    nga.field('schoolId')

  ]);
  staff.editionView().fields([
    nga.field('id').label('StaffId'),
    nga.field('username'),
    nga.field('lastName'),
    nga.field('gender'),
    nga.field('religion'),
    nga.field('caste'),
    nga.field('subCaste'),
    nga.field('staffBirthDate','date'),
    nga.field('motherTounge'),
    nga.field('email','email'),
    nga.field('isDisable'),
    nga.field('lastUpdated','date'),
    nga.field('updatedBy'),
    nga.field('RFID'),
    nga.field('staffImage'),
    nga.field('status'),
    nga.field('joinDate'),
    nga.field('address'),
    nga.field('contact'),
    nga.field('city'),
    nga.field('state'),
    nga.field('bloodGroup'),
    nga.field('regId'),
    nga.field('nationalIdType'),
    nga.field('nationalId'),
    nga.field('qualification'),
    nga.field('qualifiedUniversity'),
    nga.field('qualifiedYear'),
    nga.field('GPA'),
    nga.field('leavingDate'),
    nga.field('schoolId')

  ]);

//
  var classes = nga.entity('Classes');
  classes.listView().fields([
    nga.field('id'),
    nga.field('className'),
    nga.field('sectionName'),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('')),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolName')),
  ]);
  classes.creationView().fields([

    nga.field('className'),
    nga.field('sectionName'),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('id')),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolName')),
  ]);
  classes.editionView().fields([
    nga.field('id'),
    nga.field('className'),
    nga.field('section'),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('')),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
    nga.field('roomId'),
    nga.field('noOfStudents','number')
  ]);
  classes.showView().fields([
    nga.field('id'),
    nga.field('className'),
    nga.field('section'),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('')),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
    nga.field('roomId'),
    nga.field('noOfStudents','number')
  ]);

  var subject = nga.entity('Subjects');
  subject.listView().fields([
    nga.field('id').label('Subject Id'),
    nga.field('subjectName'),
    nga.field('class','reference')
      .targetEntity(classes)
      .targetField(nga.field('className')),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('id'))

  ]);
  subject.creationView().fields([
    nga.field('subjectName'),
    nga.field('class','reference')
      .targetEntity(classes)
      .targetField(nga.field('id')),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('id')),
    nga.field('schoolId','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolName'))

  ]);
  subject.deletionView().fields([
    nga.field('subjectName'),
    nga.field('class','reference')
      .targetEntity(classes)
      .targetField(nga.field('className')),
    nga.field('section','reference')
      .targetEntity(classes)
      .targetField(nga.field('section')),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('staffName')),

  ]);
  subject.showView().fields([
    nga.field('subjectName'),
    nga.field('class','reference')
      .targetEntity(classes)
      .targetField(nga.field('className')),
    nga.field('section','reference')
      .targetEntity(classes)
      .targetField(nga.field('section')),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('staffName')),

  ]);
  subject.editionView().fields([
    nga.field('subjectName'),
    nga.field('class','reference')
      .targetEntity(classes)
      .targetField(nga.field('id')),
    nga.field('teacherId','reference')
      .targetEntity(staff)
      .targetField(nga.field('id')),
    nga.field('schoolId','reference')
      .targetEntity(school)
      .targetField(nga.field('id'))

  ]);
//
  var student = nga.entity('Students');
  student.listView().fields([
    nga.field('id').label('StudentId'),
    nga.field('studentName'),
    nga.field('parent'),
    nga.field('email'),
    nga.field('password'),
    nga.field('studentSuffix'),
    nga.field('schoolCode','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
  ]);


  student.deletionView().fields([
    nga.field('id').label('StudentId'),
    nga.field('studentName'),
    nga.field('password'),
  ]);
  student.showView().fields([
    nga.field('id').label('StudentId'),
    nga.field('userame'),
    nga.field('password'),
  ]);


  var parent = nga.entity('Parents');
  parent.editionView().fields([
    nga.field('username'),
    nga.field('password'),
    nga.field('email'),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('id')),
  ])
  parent.listView().fields([
    nga.field('username'),
    nga.field('password'),
    nga.field('email'),
    nga.field('school','reference')
      .targetEntity(school)
      .targetField(nga.field('id')),
  ])

  student.creationView().fields([
    nga.field('username'),
    nga.field('password'),
    nga.field('email'),
    nga.field('schoolCode','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
  ]);
  student.editionView().fields([
    nga.field('username'),
    nga.field('password'),
    nga.field('email'),
    nga.field('schoolCode','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
  ]);

  var bus = nga.entity('Buses');
  bus.listView().fields([
    nga.field('id').label('Bus Id'),
    nga.field('busCode'),
    nga.field('schoolCode','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
    nga.field('fromRoute'),
    nga.field('toRoute')
  ])
  bus.creationView().fields([
    nga.field('busCode'),
    nga.field('schoolCode','reference')
      .targetEntity(school)
      .targetField(nga.field('schoolCode')),
    nga.field('fromRoute'),
    nga.field('toRoute')
  ])



  admin.addEntity(school);
  admin.addEntity(admins);
  admin.addEntity(staff);
  admin.addEntity(classes);
  admin.addEntity(subject);
  admin.addEntity(student);
  admin.addEntity(parent);
  admin.addEntity(bus);

  nga.configure(admin);

}]);
