import {Mongo} from 'meteor/mongo';
export const transfActionsContainer = new Mongo.Collection('transfactions');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('transfactions', function bServPublication() {
        return transfActionsContainer.find();
    });
}