/*globals angular, Parties, Counts*/
angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor) {
    'use strict';

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name: 1};
    $scope.orderProperty = '1';

    $scope.parties = $meteor.collection(function () {
        return Parties.find({}, {
            sort: $scope.getReactively('sort')
        });
    });

    $meteor.autorun($scope, function () {
        $meteor.subscribe('parties', {
            limit: parseInt($scope.getReactively('perPage'), 10),
            skip: (parseInt($scope.getReactively('page'), 10) - 1) * parseInt($scope.getReactively('perPage'), 10),
            sort: $scope.getReactively('sort')
        }, $scope.getReactively('search')).then(function () {
            $scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
            console.log("$scope.partiesCount ", $scope.partiesCount);
        });
    });

    $scope.$watch('orderProperty', function () {
        if ($scope.orderProperty) {
            $scope.sort = {name: parseInt($scope.orderProperty, 10)};
        }
    });

    $scope.remove = function (party) {
        $scope.parties.remove(party);
    };

    $scope.removeAll = function () {
        $scope.parties.remove();
    };

    $scope.newParty = {
        name: "",
        owner: $scope.$root.currentUser._id,
        description: "",
        public: false
    };
    $scope.addNewParty = function (e) {
        e.preventDefault();
        try {
            //$scope.newParty.owner = $scope.$root.currentUser._id;
            $scope.parties.save($scope.newParty);
            $scope.newParty.name = "";
            $scope.newParty.description = "";
        } catch (error) {
            console.error(error);
        }
        return false;
    };

    $scope.pageChanged = function (newPage) {
        $scope.page = newPage;
    };
});