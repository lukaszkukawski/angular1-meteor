/*globals angular, Parties*/
angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor) {
    'use strict';
    $scope.parties = $meteor.collection(Parties);

    $scope.remove = function (party) {
        $scope.parties.remove(party);
    };

    $scope.removeAll = function () {
        $scope.parties.remove();
    };
});