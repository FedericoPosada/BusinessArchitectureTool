import {Mongo} from 'meteor/mongo';
export const projectsContainer = new Mongo.Collection('projects');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('projects', function Publication() {
        return projectsContainer.find();
    });
}