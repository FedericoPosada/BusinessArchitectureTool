import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import PrivateHeader from './../ui/PrivateHeader';

export default class Signup extends React.Component {
	
	componentWillMount() {
		console.log('Component Will mount in Signup!!');
		console.log(Meteor.userId());
		//this.props.history.push('/');
		if (Meteor.userId()) {
			this.props.history.push('/links')
		}
	}

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			error: ''
		};
	}

	onSubmit(e){
		e.preventDefault();
		var ele =$(e.target);

		var email= ele.find("#email").val();
		var password= ele.find("#password").val();
		var confirmPassword= ele.find("#confirmPassword").val();

		if(password== confirmPassword && password!=="" && confirmPassword!=="")
		{
			var accountInfo= {
				email: email,
				password: password
			};
			Accounts.createUser(accountInfo, function(er){
				if(er){
					Materialize.toast(er.reason, 4000);
				}
				else
				{
					//Redirect
							console.log("success");
							history.push('/links');
				}
			});
		}
		else{
			Materialize.toast('Your passwords dont match!', 4000)
		}

		console.log(email);
		console.log(password);
		console.log(confirmPassword);
	}

	render() {
		return (
			<div>
			<PrivateHeader/>
			<div className="row">
				<h4 className="text-center">Register Account</h4>
				<form onSubmit={this.onSubmit} className="col offset-s4 s4">
					<div className="row">
						<div className="input-field col s12">
							<input id="email" type="text" className="validate" />
							<label htmlFor ="email">Email </label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" type="password" className="validate" />
							<label htmlFor ="password">Password </label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="confirmPassword" type="password" className="validate" />
							<label htmlFor ="confirmPassword">Confirm Password </label>
						</div>
					</div>
					<div className="row">
						<button className="waves-effect waves-light btn btn-block">Submit</button>
					</div>
				</form>
			</div>
			</div>
		);
	}
}