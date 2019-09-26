import {Mongo} from 'meteor/mongo';
export const resourcesContainer = new Mongo.Collection('resources');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('resources', function Publication() {
        return resourcesContainer.find();
    });
}