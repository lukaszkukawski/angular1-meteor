/*globals angular, _*/
angular.module('socially').filter('uninvited', function () {
    'use strict';
    return function (users, party) {
        if (!party) {
            return false;
        }
        return _.filter(users, function (user) {
            return (!(user._id === party.owner || _.contains(party.invited, user._id)));
        });
    };
});