import {Mongo} from 'meteor/mongo';
export const motivCompContainer = new Mongo.Collection('motivcomp');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('motivcomp', function Publication() {
        return motivCompContainer.find();
    });
}