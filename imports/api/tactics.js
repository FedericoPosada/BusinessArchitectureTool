import {Mongo} from 'meteor/mongo';
export const tacticsContainer = new Mongo.Collection('tactics');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tactics', function Publication() {
        return tacticsContainer.find();
    });
}