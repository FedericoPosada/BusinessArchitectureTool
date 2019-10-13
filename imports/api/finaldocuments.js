import { Meteor } from 'meteor/meteor';
import FinalDocuments from "./FinalDocumentsCol";


Meteor.methods({

    'RemoveFinalDocument'(id) {
        FinalDocuments.remove({_id: id}, function (error) {
            if (error) {
              console.error("File wasn't removed, error: " + error.reason)
            } else {
              console.info("File successfully removed");
            }
        });
    },
    
});

