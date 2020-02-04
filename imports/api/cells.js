import {Mongo} from 'meteor/mongo';

const Cells = new Mongo.Collection('cells');
export default Cells;