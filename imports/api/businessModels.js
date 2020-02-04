import {Mongo} from 'meteor/mongo';
export const businessModels = new Mongo.Collection('businessModels');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('businessModels', function Publication() {
        return businessModels.find();
    });
}