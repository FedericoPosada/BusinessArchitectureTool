import { Meteor } from 'meteor/meteor';
import './../imports/api/users.js';
import { Links } from './../imports/api/links.js';
import './../imports/startup/simple-schema-configuration';
import { WebApp } from 'meteor/webapp';
import {bServicesContainer} from '../imports/api/bservices'
import {bServicesOperationsContainer} from '../imports/api/bservoperations'
import {clientsContainer} from "../imports/api/clients";
import {resourcesContainer} from "../imports/api/resources";
import {resServicesContainer} from "../imports/api/resservices";
import {tiResourcesContainer} from "../imports/api/tiresources";
import {componentsContainer} from "../imports/api/components";
import {bStrategiesContainer} from "../imports/api/bstrategies";
import {motivCompContainer} from "../imports/api/motivcomp";
import {opIndicatorsContainer} from "../imports/api/opindicators";
import {exIndicatorsContainer} from "../imports/api/exindicators";
import {stIndicatorsContainer} from "../imports/api/stindicators";
import {labelsContainer} from "../imports/api/labels";
import {capacitiesContainer} from "../imports/api/capacities";
import {opItemsContainer} from "../imports/api/opitems";
import {positionsContainer} from "../imports/api/positions";
import {applicationsContainer} from "../imports/api/applications";
import {processesContainer} from "../imports/api/processes";
import {objectivesContainer} from "../imports/api/objectives";
import {goalsContainer} from "../imports/api/goals";
import {strategiesContainer} from "../imports/api/strategies";
import {tacticsContainer} from "../imports/api/tactics";
import {achIndicatorsContainer} from "../imports/api/achindicators";
import {supActivitiesContainer} from "../imports/api/supactivities";
import {transfActionsContainer} from "../imports/api/transfactions";
import {projectsContainer} from "../imports/api/projects";
import {packagesContainer} from "../imports/api/packages";
import {subpackagesContainer} from "../imports/api/subpackages";
import {pCapacitiesContainer} from "../imports/api/pcapacities";
import {pSubpackagesContainer} from "../imports/api/psubpackages";
import {bSheetsContainer} from "../imports/api/bsheets";
import {incomeStatementsContainer} from "../imports/api/istatements";
import {cashFlowsContainer} from "../imports/api/cashflows";
import {financialContainer} from "../imports/api/finindicators";
import '../imports/api/pimages';
import '../imports/api/ontologicmodels';
import '../imports/api/orgcharts';

Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use((req, res, next) => {
  	const _id = req.url.slice(1);
  	const link = Links.findOne({_id});
  	console.log(Links.findOne({_id}));
  	if(link) {
  		res.statusCode = 302;
  		res.setHeader('Location', link.url);
  		res.end();
  		Links.update({_id}, {
  			$inc: {
  				visitedCount: 1
  			}, 

  			$set: {
  				lastVisited: new Date().getTime()
  			}
  		})
  	} else {
  		next();
  	}

  });

  // WebApp.connectHandlers.use((req, res, next) => {
  // 	console.log('This is my new header!');
  // 	//res.setHeader('Location', 'http://google.com');
  // 	// res.statusCode = 302;
  // 	// res.end();
  // 	console.log(res);
  // });

  // const petSchema = new SimpleSchema({	
  // 		name: {
  // 			type: String
  // 		}
  // });

  // petSchema.validate({
  // 	name: 'Adnan'
  // });

  // const employeeSchema = new SimpleSchema({
  // 	name: {
  // 		type: String,
  // 		min: 1,
  // 		max: 200
  // 	},

  // 	hourlyWage: {
  // 		type: Number,
  // 		min: 1
  // 	},

  // 	email: {
  // 		type: String,
  // 		regEx: SimpleSchema.RegEx.Email
  // 	}

  // });

  // employeeSchema.validate({
  // 	name: 'Adnan',
  // 	hourlyWage: 13,
  // 	email: 'adnan@gm.com'
  // })
  // 
  

});
