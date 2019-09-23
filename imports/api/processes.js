import {Mongo} from 'meteor/mongo';
export const processesContainer = new Mongo.Collection('processes');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('processes', function Publication() {
        return processesContainer.find();
    });
}