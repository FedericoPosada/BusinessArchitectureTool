import {Mongo} from 'meteor/mongo';
export const bSheetsContainer = new Mongo.Collection('bsheets');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('bsheets', function bServPublication() {
        return bSheetsContainer.find();
    });
}