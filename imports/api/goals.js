import {Mongo} from 'meteor/mongo';
export const goalsContainer = new Mongo.Collection('goals');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('goals', function Publication() {
        return goalsContainer.find();
    });
}