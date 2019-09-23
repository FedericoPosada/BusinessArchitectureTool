import {Mongo} from 'meteor/mongo';
export const opItemsContainer = new Mongo.Collection('opitems');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('opitems', function Publication() {
        return opItemsContainer.find();
    });
}