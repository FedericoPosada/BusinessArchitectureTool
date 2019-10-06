import { Meteor } from 'meteor/meteor';
import OntologicModels from "./OntologicModelsCol";


Meteor.methods({

    'RemoveOntologicModel'(id) {
        OntologicModels.remove({_id: id}, function (error) {
            if (error) {
              console.error("File wasn't removed, error: " + error.reason)
            } else {
              console.info("File successfully removed");
            }
        });
    },
    
});

