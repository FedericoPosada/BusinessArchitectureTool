import {Mongo} from 'meteor/mongo';
export const applicationsContainer = new Mongo.Collection('applications');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('applications', function Publication() {
        return applicationsContainer.find();
    });
}