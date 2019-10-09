import {Mongo} from 'meteor/mongo';
export const cashFlowsContainer = new Mongo.Collection('cashflows');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('cashflows', function bServPublication() {
        return cashFlowsContainer.find();
    });
}