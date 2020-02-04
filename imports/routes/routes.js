import { Meteor } from 'meteor/meteor';
import React from 'react';
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';
import Settings from './../ui/Settings';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import BusinessServicesPortfolio from "../ui/BusinessModel/BusinessServicesPortfolio";
import StrategicPlan from "../ui/StrategicModel/StrategicPlan";
import LabelsCreator from "../ui/InformationModel/LabelsCreator";
import ValueChain from "../ui/ProcessesModel/ValueChain";
import MotivationalComponent from "../ui/StrategicModel/MotivationalComponent";
import ApplicationCatalog from "../ui/ResourcesModel/ApplicationCatalog";
import OperativeModel from "../ui/ResourcesModel/OperativeModel";
import TIResourcesModel from "../ui/ResourcesModel/TIResourcesModel";
import ResourcesModel from "../ui/ResourcesModel/ResourcesModel";
import ComponentsCatalog from "../ui/ResourcesModel/ComponentsCatalog";
import BusinessStrategiesCatalog from "../ui/StrategicModel/BusinessStrategiesCatalog";
import ExternalIndicatorsList from "../ui/InformationModel/ExternalIndicatorsList";
import StrategicIndicatorsList from "../ui/InformationModel/StrategicIndicatorsList";
import OperativeIndicatorsList from "../ui/InformationModel/OperativeIndicatorsList";
import PositionCatalog from "../ui/OrganizationalStructure/PositionCatalog";
import ProcessCatalog from "../ui/ProcessesModel/ProcessCatalog";
import TransformationActionList from "../ui/StrategicModel/TransformationActionList";
import ProjectsList from "../ui/StrategicModel/ProjectsList";
import CapacitiesList from "../ui/CapacitiesMap/CapacitiesList";
import CapacityCreator from "../ui/CapacitiesMap/CapacityCreator";
import MapEditor from "../ui/CapacitiesMap/MapEditor";
import CapacitiesMap from "../ui/CapacitiesMap/CapacitiesMap";
import OntologicModelCreator from "../ui/BusinessModel/OntologicModelCreator";
import OrgChartCreator from "../ui/OrganizationalStructure/OrgChartCreator";
import BalanceSheet from "../ui/FinancialModel/BalanceSheet";
import FinancialStatements from "../ui/FinancialModel/FinancialStatements";
import FinancialIndicatorsList from "../ui/FinancialModel/FinancialIndicatorsList";
import FinalDocument from "../ui/Document/FinalDocument";
import BusinessModelEditorTwo from "../ui/BusinessModelEditor/BusinessModelEditorTwo";
import TestApp from "../ui/TestApp";
import * as joint from 'jointjs';
window.joint = joint;

/*
import jquery from "../ui/BusinessModelEditor/JS/jquery.js";
import angularMin from "../ui/BusinessModelEditor/node_modules/angular/angular.min.js";
import lodash from "../ui/BusinessModelEditor/JS/lodash.js";
import backbone from "../ui/BusinessModelEditor/JS/backbone.js";
import ports from "../ui/BusinessModelEditor/modules/ports.js";
import joint from "jointjs";
import FileSaver from "../ui/BusinessModelEditor/JS/FileSaver.js";
import estilosSave from "../ui/BusinessModelEditor/JS/estilosSave.js";
import svgPanZoom from "../ui/BusinessModelEditor/JS/svg-pan-zoom.js";
import Require from "../ui/BusinessModelEditor/JS/require.js";


import XMLWriter from "../ui/BusinessModelEditor/JS/XMLWriter.js";
import vectorizer from "../ui/BusinessModelEditor/JS/vectorizer.js";
import propsActive from "../ui/BusinessModelEditor/JS/propsActive.js";
import editor from "../ui/BusinessModelEditor/JS/editor.js";
import styles from "../ui/BusinessModelEditor/JS/styles.js";
import paperProperties from "../ui/BusinessModelEditor/JS/paperProperties.js";
import archivos from "../ui/BusinessModelEditor/JS/archivos.js";
*/

const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links','/settings','/businessModelEditor'];

export const onAuthChange = (isAuthenticated) => {
	console.log('isAuthenticated', isAuthenticated);

	const pathname = history.location.pathname;
	console.log(pathname);
	console.log(authenticatedPages.includes(pathname));
	if (isAuthenticated && unauthenticatedPages.includes(pathname)) {
		console.log('replacing with links');
		return history.replace('/links')
	} else if (!isAuthenticated && authenticatedPages.includes(pathname)) {
		console.log('replacing with /');
		return history.replace('/');
	}
}

export const routes = (
	<Router history={ history }>
		<Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/links" component={Link}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/BusinessServicesPortfolio" component={BusinessServicesPortfolio}/>
          <Route path="/StrategicPlan" component={StrategicPlan}/>
          <Route path="/LabelsCreator" component={LabelsCreator}/>
          <Route path="/ValueChain" component={ValueChain}/>
          <Route path="/MotivationalComponent" component={MotivationalComponent}/>
			<Route path="/ExternalIndicatorsList" component={ExternalIndicatorsList}/>
			<Route path="/StrategicIndicatorsList" component={StrategicIndicatorsList}/>
			<Route path="/OperativeIndicatorsList" component={OperativeIndicatorsList}/>
			<Route path="/ApplicationCatalog" component={ApplicationCatalog}/>
			<Route path="/OperativeModel" component={OperativeModel}/>
			<Route path="/TIResourcesModel" component={TIResourcesModel}/>
			<Route path="/ResourcesModel" component={ResourcesModel}/>
			<Route path="/ComponentsCatalog" component={ComponentsCatalog}/>
			<Route path="/BusinessStrategiesCatalog" component={BusinessStrategiesCatalog}/>
			<Route path="/PositionCatalog" component={PositionCatalog}/>
			<Route path="/ValueChain" component={ValueChain}/>
			<Route path="/ProcessCatalog" component={ProcessCatalog}/>
			<Route path="/TransformationActionList" component={TransformationActionList}/>
			<Route path="/ProjectsList" component={ProjectsList}/>
			<Route path="/CapacitiesMap" component={CapacitiesMap}/>
			<Route path="/OntologicModelCreator" component={OntologicModelCreator}/>
			<Route path="/OrgChartCreator" component={OrgChartCreator}/>
			<Route path="/FinancialStatements" component={FinancialStatements}/>
			<Route path="/FinancialIndicatorsList" component={FinancialIndicatorsList}/>
			<Route path="/FinalDocument" component={FinalDocument}/>
			<Route path="/businessModelEditor" component={BusinessModelEditorTwo}/>
			<Route path="/testApp" component={TestApp}/>

			<Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);