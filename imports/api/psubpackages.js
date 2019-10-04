import {Mongo} from 'meteor/mongo';
export const pSubpackagesContainer = new Mongo.Collection('psubpackages');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('psubpackages', function Publication() {
        return pSubpackagesContainer.find();
    });
}