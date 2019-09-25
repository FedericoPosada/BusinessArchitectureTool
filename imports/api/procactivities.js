import {Mongo} from 'meteor/mongo';
export const procActivitiesContainer = new Mongo.Collection('procactivities');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('procactivities', function Publication() {
        return procActivitiesContainer.find();
    });
}