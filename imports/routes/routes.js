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

const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links','/settings'];

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





			<Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);