/*globals Meteor,angular, Mongo, Parties*/

angular.module('socially', ['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination', 'uiGmapgoogle-maps']);

function onReady() {
    'use strict';
    angular.bootstrap(document, ['socially'], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}