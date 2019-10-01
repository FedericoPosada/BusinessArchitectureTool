import {Mongo} from 'meteor/mongo';
export const packagesContainer = new Mongo.Collection('packages');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('packages', function Publication() {
        return packagesContainer.find();
    });
}