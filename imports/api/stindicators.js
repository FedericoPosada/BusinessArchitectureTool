import {Mongo} from 'meteor/mongo';
export const stIndicatorsContainer = new Mongo.Collection('stindicators');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('stindicators', function Publication() {
        return stIndicatorsContainer.find();
    });
}