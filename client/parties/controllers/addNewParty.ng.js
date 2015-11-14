/*globals angular, Parties, Counts, Meteor, _*/
angular.module("socially").controller("AddNewPartyCtrl", ['$scope', '$meteor', '$rootScope', '$state', '$modalInstance', 'parties', function ($scope, $meteor, $rootScope, $state, $modalInstance, parties) {
    'use strict';
    $scope.addNewParty = function () {
        $scope.newParty.owner = $rootScope.currentUser._id;
        parties.push($scope.newParty);
        $scope.newParty = '';
        $modalInstance.close();
    };
}]);