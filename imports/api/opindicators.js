import {Mongo} from 'meteor/mongo';
export const opIndicatorsContainer = new Mongo.Collection('opindicators');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('opindicators', function Publication() {
        return opIndicatorsContainer.find();
    });
}