import {Mongo} from 'meteor/mongo';
export const objectivesContainer = new Mongo.Collection('objectives');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('objectives', function Publication() {
        return objectivesContainer.find();
    });
}