import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';


class PrivateHeader extends React.Component {
	 constructor() {
    super();
    this.state = {color: "red"};
  this.logout= this.logout.bind(this);
  }
logout(){
	Meteor.logout((er)=>{
						if(er)
						{
							Materialize.toast(er.reason, 4000);
						}
						else{
							history.push('/');
						}
					});
}
		
	
  render() {
  	var navStyle= {
      backgroundColor: "#3f51b5",
      paddingLeft:"12px"
    };
     return(
     	<nav style={navStyle}>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Allchitect</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          	</ul>
        </div>
      </nav>
      );
   
}
}

export default PrivateHeader;
