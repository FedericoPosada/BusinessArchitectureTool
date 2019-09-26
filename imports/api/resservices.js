import {Mongo} from 'meteor/mongo';
export const resServicesContainer = new Mongo.Collection('resservices');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('resservices', function Publication() {
        return resServicesContainer.find();
    });
}