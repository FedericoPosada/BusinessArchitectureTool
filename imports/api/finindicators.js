import {Mongo} from 'meteor/mongo';
export const financialContainer = new Mongo.Collection('finindicators');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('finindicators', function Publication() {
        return financialContainer.find();
    });
}