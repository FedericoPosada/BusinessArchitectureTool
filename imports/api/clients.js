import {Mongo} from 'meteor/mongo';
export const clientsContainer = new Mongo.Collection('clients');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('clients', function clientsPublication() {
        return clientsContainer.find();
    });
}