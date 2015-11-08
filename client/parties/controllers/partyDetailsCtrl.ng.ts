/// <reference path="../../../typings/tsd.d.ts" />
/*globals angular, Parties, Meteor*/
angular.module('socially').controller('PartyDetailsCtrl', function ($scope, $stateParams, $meteor) {
    'use stict';
    $scope.party = $meteor.object(Parties, $stateParams.partyId).subscribe('parties');
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.save = function () {
        $scope.party.save().then(function (id) {
            console.log('save success doc affected ', id);
        }, function (error) {
            console.log('save error', error);
        });
    };

    $scope.reset = function () {
        $scope.party.reset();
    };
});