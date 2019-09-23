import {Mongo} from 'meteor/mongo';
export const achIndicatorsContainer = new Mongo.Collection('achindicators');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('achindicators', function Publication() {
        return achIndicatorsContainer.find();
    });
}