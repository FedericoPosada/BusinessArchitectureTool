import {Mongo} from 'meteor/mongo';
export const strategiesContainer = new Mongo.Collection('strategies');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('strategies', function Publication() {
        return strategiesContainer.find();
    });
}