import ProcessesImages from "./ProcessesImagesCol";
import { Meteor } from 'meteor/meteor';
import OrgCharts from "./OrgChartCol";


Meteor.methods({

    'RemoveOrgChart'(id) {
        OrgCharts.remove({_id: id}, function (error) {
            if (error) {
              console.error("File wasn't removed, error: " + error.reason)
            } else {
              console.info("File successfully removed");
            }
        });
    },
    
});

