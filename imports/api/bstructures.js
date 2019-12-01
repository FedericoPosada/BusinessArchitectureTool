import { Meteor } from 'meteor/meteor';
import BusinessStructures from "./BusinessStructureCol";


Meteor.methods({

    'RemoveBusinessStructure'(id) {
        BusinessStructures.remove({_id: id}, function (error) {
            if (error) {
              console.error("File wasn't removed, error: " + error.reason)
            } else {
              console.info("File successfully removed");
            }
        });
    },
    
});

