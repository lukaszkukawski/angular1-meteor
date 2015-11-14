/*globals angular, Parties, Meteor*/
angular.module('socially').controller('PartyDetailsCtrl', function ($scope, $stateParams, $meteor) {
    'use stict';
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    
    var subscriptionHandle;
    $meteor.subscribe('parties').then(function(handle) {
      subscriptionHandle = handle;
    });
    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });
    $scope.save = function () {
        $scope.party.save().then(function (id) {
            console.log('save success doc affected ', id);
        }, function (error) {
            console.log('save error', error);
        });
    };

    $scope.reset = function () {
        console.log("Reset party");
        $scope.party.reset();
    };

    $scope.invite = function (user) {
        $meteor.call('invite', $scope.party._id, user._id).then(
            function (data) {
                console.log('success inviting', data);
            },
            function (error) {
                console.log('failed', error);
            }
        );
    };

    $scope.canInvite = function () {
        if (!$scope.party) {
            return false;
        }
        return !$scope.party.public && $scope.party.owner === Meteor.userId();
    };

    $scope.map = {
        center: {
            latitude: 52.2,
            longitude: 21
        },
        zoom: 8,
        events: {
            click: function (mapModel, eventName, originalEventArgs) {
                if (!$scope.party) {
                    return;
                }
                if (!$scope.party.location) {
                    $scope.party.location = {};
                }
                $scope.party.location.latitude = originalEventArgs[0].latLng.lat();
                $scope.party.location.longitude = originalEventArgs[0].latLng.lng();
                console.debug("New latitude", $scope.party.location.latitude);
                console.debug("New longitude", $scope.party.location.longitude);
                //scope apply required because this event handler is outside of the angular domain
                $scope.$apply();
            }
        },
        marker: {
            options: {
                draggable: true
            },
            events: {
                dragend: function (marker, eventName, args) {
                    if (!$scope.party.location) {
                        $scope.party.location = {};
                    }
                    $scope.party.location.latitude = marker.getPosition().lat();
                    $scope.party.location.longitude = marker.getPosition().lng();
                }
            }
        }
    };
});