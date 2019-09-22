import {Mongo} from 'meteor/mongo';
export const bServicesContainer = new Mongo.Collection('bservices');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('bservices', function bServPublication() {
        return bServicesContainer.find();
    });
}