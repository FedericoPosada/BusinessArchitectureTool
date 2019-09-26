import {Mongo} from 'meteor/mongo';
export const bServicesOperationsContainer = new Mongo.Collection('bservoperations');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('bservoperations', function bServOperationPublication() {
        return bServicesOperationsContainer.find();
    });
}