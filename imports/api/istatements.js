import {Mongo} from 'meteor/mongo';
export const incomeStatementsContainer = new Mongo.Collection('istatements');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('istatements', function bServPublication() {
        return incomeStatementsContainer.find();
    });
}