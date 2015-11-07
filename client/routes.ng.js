/*globals angular*/
angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    'use strict';
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('parties', {
            url: '/parties',
            templateUrl: 'client/parties/views/parties-list.ng.html',
            controller: 'PartiesListCtrl'
        })
        .state('partyDetails', {
            url: '/parties/:partyId',
            templateUrl: 'client/parties/views/party-details.ng.html',
            controller: 'PartyDetailsCtrl'
        });
    $urlRouterProvider.otherwise('/parties');
});