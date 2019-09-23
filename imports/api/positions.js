import {Mongo} from 'meteor/mongo';
export const positionsContainer = new Mongo.Collection('positions');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('positionsContainer', function Publication() {
        return positions.find();
    });
}