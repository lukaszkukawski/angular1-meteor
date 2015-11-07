/*globals Meteor*/
Meteor.publish('users', function () {
    'use strict';
    return Meteor.users.find({}, {
        fields: {
            emails: 1,
            profile: 1
        }
    });
});