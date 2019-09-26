import {Mongo} from 'meteor/mongo';
export const tiResourcesContainer = new Mongo.Collection('tiresources');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tiresources', function Publication() {
        return tiResourcesContainer.find();
    });
}