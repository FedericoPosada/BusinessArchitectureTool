import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import PrivateLoggedHeader from './PrivateLoggedHeader';

export default class Settings extends React.Component {
	
	componentWillMount() {
		console.log('Component Will mount in Settings!!');
		console.log(Meteor.userId());
		//this.props.history.push('/');
		//if (Meteor.userId()) {
		//	this.props.history.push('/links')
		//}
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
		var oldPassword= ele.find("#oldPassword").val();
		var newPassword= ele.find("#newPassword").val();
		var confirmPassword= ele.find("#confirmPassword").val();

		if(newPassword== confirmPassword && newPassword!=="" && confirmPassword!=="")
		{
			Accounts.changePassword(oldPassword, newPassword, (er)=>{
				if(er){
					Materialize.toast(er.reason, 4000);
				}
				else
				{
					Materialize.toast("Your password is changed!", 4000);
					console.log("success");
					history.push('/links');
				}
			});
		}
		else{
			Materialize.toast('Your passwords dont match!', 4000)
		}
	}

	render() {
		return (
			<div>
			<PrivateLoggedHeader/>
			<div className="row">
				<div className="col m4">
				</div>
				<div className="col m4">
				<h4 className="center-align">Change Password</h4>
				</div>
				<div className="col m4">
				</div>
				<form onSubmit={this.onSubmit} className="col offset-s4 s4">
					<div className="row">
						<div className="input-field col s12">
							<input id="oldPassword" type="password" className="validate" />
							<label htmlFor ="oldPassword">Old Password </label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="newPassword" type="password" className="validate" />
							<label htmlFor ="newPassword">New Password </label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="confirmPassword" type="password" className="validate" />
							<label htmlFor ="confirmPassword">Confirm Password </label>
						</div>
					</div>
					<div className="row">
						<button className="waves-effect waves-light btn light-blue darken-4 btn-block">Submit</button>
					</div>
				</form>
			</div>
			</div>
		);
	}
}