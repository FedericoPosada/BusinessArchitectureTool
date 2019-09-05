import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PrivateHeader from './../ui/PrivateHeader';

 

export default class Login extends React.Component {
	componentWillMount() {
		console.log('Login Component DID mount !!');
		console.log(Meteor.userId());
		if (Meteor.userId()) {
			this.props.history.replace('/links');
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

		Meteor.loginWithPassword(email,password,(er)=>{
			if(er)
			{
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

	render() {
		return (
			<div>
			<PrivateHeader/>
			<div className="row">
				<h4 className="text-center">Login</h4>
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
						<button className="waves-effect waves-light btn btn-block">Submit</button>
					</div>
				</form>
			</div>
			</div>
		);
	};
};