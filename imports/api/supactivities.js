import {Mongo} from 'meteor/mongo';
export const supActivitiesContainer = new Mongo.Collection('supactivities');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('supactivities', function Publication() {
        return supActivitiesContainer.find();
    });
}