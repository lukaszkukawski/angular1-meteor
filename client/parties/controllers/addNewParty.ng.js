/*globals angular, Parties, Counts, Meteor, _*/
angular.module("socially").controller("AddNewPartyCtrl", function ($scope, $meteor, $rootScope, $state, $mdDialog, parties) {
    'use strict';
    $scope.newParty = {};
    $scope.addNewParty = function () {
        if ($scope.newParty.name) {
            $scope.newParty.owner = $rootScope.currentUser._id;
            parties.push($scope.newParty);
            $scope.newParty = '';
            $mdDialog.hide();
        }
    };
    $scope.close = function () {
        $mdDialog.hide();
    };
});