import {Mongo} from 'meteor/mongo';
export const bStrategiesContainer = new Mongo.Collection('bstrategies');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('bstrategies', function Publication() {
        return bStrategiesContainer.find();
    });
}