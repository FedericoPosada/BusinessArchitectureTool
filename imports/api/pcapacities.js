import {Mongo} from 'meteor/mongo';
export const pCapacitiesContainer = new Mongo.Collection('pcapacities');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('pcapacities', function Publication() {
        return pCapacitiesContainer.find();
    });
}