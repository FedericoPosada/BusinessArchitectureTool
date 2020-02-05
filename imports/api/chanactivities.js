import {Mongo} from 'meteor/mongo';
export const channelActivitiesContainer = new Mongo.Collection('channelactivities');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('channelactivities', function Publication() {
        return channelActivitiesContainer.find();
    });
}