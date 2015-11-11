/*globals angular*/
/**
*  Module
*
* Description
*/
angular.module('socially').filter('displayName', function () {
    'use strict';
    return function (user) {
        if (!user) {
            return;
        }
        if (user.profile && user.profile.name) {
            return user.prodile.name;
        } else if (user.emails) {
            return user.emails[0].address;
        } else {
            return user;
        }
    };
});