/*globals Meteor, Mongo, Parties */
Parties = new Mongo.Collection("parties");

if (Meteor.isServer) {
    Meteor.startup(function () {
        'use strict';
        if (Parties.find().count() === 0) {
            var i;
            var parties = [
                {
                    name: 'Dubstep-Free Zone',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis expedita quo beatae, quae quisquam, natus tempora sed saepe debitis dolorum quidem dolorem iste illo maxime nisi harum repellat id nam.'
                }, {
                    name: 'All dubstep all the time',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente omnis excepturi commodi odit unde odio debitis deserunt quaerat illo iusto temporibus iure similique nisi quo quibusdam optio, minus magnam fugit.'
                }, {
                    name: 'Savage louding',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia corporis repudiandae quo, magnam illum, illo porro sint, voluptatem enim quos amet quaerat saepe fuga eius ad repellendus sed natus ipsam!'
                }
            ];
            for (i = 0; i < parties.length; i += 1) {
                Parties.insert(parties[i]);
            }
        }
    });
}