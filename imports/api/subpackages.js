import {Mongo} from 'meteor/mongo';
export const subpackagesContainer = new Mongo.Collection('subpackages');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('subpackages', function Publication() {
        return subpackagesContainer.find();
    });
}