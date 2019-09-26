import {Mongo} from 'meteor/mongo';
export const exIndicatorsContainer = new Mongo.Collection('exindicators');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('exindicators', function Publication() {
        return exIndicatorsContainer.find();
    });
}