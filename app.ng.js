/*globals Meteor,angular, Mongo, Parties*/

if (Meteor.isClient) {
    angular.module('socially', ['angular-meteor', 'ui.router']);

    angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        'use strict';
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('parties', {
                url: '/parties',
                templateUrl: 'parties-list.ng.html',
                controller: 'PartiesListCtrl'
            })
            .state('partyDetails', {
                url: '/parties/:partyId',
                templateUrl: 'party-details.ng.html',
                controller: 'PartyDetailsCtrl'
            });
        $urlRouterProvider.otherwise('/parties');
    });

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

    angular.module('socially').controller('PartyDetailsCtrl', function ($scope, $stateParams, $meteor) {
        'use stict';
        $scope.party = $meteor.object(Parties, $stateParams.partyId, false);

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
}