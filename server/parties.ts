/// <reference path="../typings/tsd.d.ts" />
/*globals Meteor, Parties*/
Meteor.publish('parties', function () {
    'use strict';
    return Parties.find({
        $or: [
            {
                $and: [
                    {public: true},
                    {public: {$exists: true}}
                ]
            },
            {
                $and: [
                    {owner: this.userId},
                    {owner: {$exists: true}}
                ]
            }
        ]
    });
});