import {Mongo} from 'meteor/mongo';
export const capacitiesContainer = new Mongo.Collection('capacities');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('capacities', function Publication() {
        return capacitiesContainer.find();
    });
}