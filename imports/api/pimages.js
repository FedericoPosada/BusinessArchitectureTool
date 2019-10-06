import ProcessesImages from "./ProcessesImagesCol";
import { Meteor } from 'meteor/meteor';


Meteor.methods({

    'RemoveFile'(id) {
        ProcessesImages.remove({_id: id}, function (error) {
            if (error) {
              console.error("File wasn't removed, error: " + error.reason)
            } else {
              console.info("File successfully removed");
            }
        });
    },
    
});

