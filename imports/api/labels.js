import {Mongo} from 'meteor/mongo';
export const labelsContainer = new Mongo.Collection('labels');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('labels', function Publication() {
        return labelsContainer.find();
    });
}