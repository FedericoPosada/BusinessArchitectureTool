import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import PrivateLoggedHeader from '../PrivateLoggedHeader';
import * as joint from 'jointjs';
window.joint = joint;
import "./BusinessModelEditor.css";

//import  "./JS/vectorizer.js";
//import  "./JS/styles.js";



import TestApp from '../TestApp.js';

export default class BusinessModelEditorTwo extends React.Component {
	
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
		
		//this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
		
	


	    

	}
   
	


	componentDidMount() {   
    let self = this;

    
  }


  
 

   
	

	render() {
		  

		var containerStyle= {
	      backgroundColor: "#FFFFFF"
	    };

		
		return (			 
			<div>
			<PrivateLoggedHeader/>
			<div className="row">
				
				

				    <div>
				        <TestApp/>
				      </div>

				

				 
				


				<div style={{width: "50%",margin:"0 auto"}} id="textareadiv" style={{textDecorationColor: "red"}}>
				  <div style={{marginTop: "200px"}}>
					</div>
				</div>



			</div>
		</div>
		);
	}


}
