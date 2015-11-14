/*globals angular, Parties, Counts, Meteor, _*/
angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor, $rootScope) {
    'use strict';

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name: 1};
    $scope.orderProperty = '1';

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

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

            $scope.parties.forEach(function (party) {
                party.onClicked = function () {
                    $state.go('partyDetails', {partyId: party._id});
                }
            });
            $scope.map ={
                center: {
                    latitude: 45,
                    longitude: -73
                },
                zoom: 8
            };
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
        'name': "",
        'description': "",
        'public': false
    };
    $scope.addNewParty = function (e) {
        e.preventDefault();
        try {
            $scope.newParty.owner = $scope.$root.currentUser._id;
            $scope.parties.push($scope.newParty);
        } catch (error) {
            console.error(error);
        }
        return false;
    };

    $scope.pageChanged = function (newPage) {
        $scope.page = newPage;
    };

    $scope.getUserById = function (userId) {
        return Meteor.users.findOne(userId);
    };

    $scope.creator = function (party) {
        if (!party) {
            return;
        }
        var owner = $scope.getUserById(party.owner);
        if (!owner) {
            return 'nobody';
        }
        if ($rootScope.currentUser && $rootScope.currentUser._id && owner._id === $rootScope.currentUser._id) {
            return 'me';
        }
        return owner;
    };

    $scope.rsvp = function (partyId, rsvp) {
        $meteor.call('rsvp', partyId, rsvp).then(
            function (data) {
                console.log('success responding', data);
            },
            function (err) {
                console.log('failed', err);
            }
        );
    };
    $scope.outstandingInvitations = function (party) {
        return _.filter($scope.users, function (user) {
            return (_.contains(party.invited, user._id) && !_.findWhere(party.rsvps, {user: user._id}));
        });
    };
});