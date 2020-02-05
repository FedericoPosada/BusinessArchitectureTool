import {Mongo} from 'meteor/mongo';
export const channelsContainer = new Mongo.Collection('channels');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('channels', function Publication() {
        return channelsContainer.find();
    });
}