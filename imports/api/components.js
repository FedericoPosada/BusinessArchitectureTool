import {Mongo} from 'meteor/mongo';
export const componentsContainer = new Mongo.Collection('components');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('components', function Publication() {
        return componentsContainer.find();
    });
}