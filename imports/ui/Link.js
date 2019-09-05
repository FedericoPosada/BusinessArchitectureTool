import React from 'react';
import {BrowserHistory} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LinksList from './LinksList';
import PrivateLoggedHeader from './PrivateLoggedHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';
import { Session } from 'meteor/session';

class Link extends React.Component {
	 constructor() {
    super();
    this.state = {color: "red"};
  }

render() {
		var containerStyle= {
	      backgroundColor: "#2589BD"
	    };
	    var cardStyle= {
	      backgroundColor: "#468C98"
	    };
	    var optionsStyle= {
	    	backgroundColor: "#A3B4A2"
	    };
		return (
			<div>
			<PrivateLoggedHeader/>
			<div className="row">
				<div class="row">

		        <div class="col m9">
		          <div class="card" style={containerStyle}>
			          <div class="center-align">
			          	<div class="card-content white-text">		            
			              <span class="card-title">Modelo de Intención</span>
			              <p></p>
			              <div class="col m4">
							  <a class="waves-effect waves-light btn modal-trigger" href="#modalModeloDeNegocio">Modelo de Negocio</a>

							  <div id="modalModeloDeNegocio" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <div class="col m4">
			              		<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modelo Financiero</a>

							  <div id="modal1" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <div class="col m4">
			              		<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modelo Estratégico</a>

							  <div id="modal1" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <p></p>
			            </div>
			          </div>		            
		          </div>
		          <div class="card" style={containerStyle}>
		          	<div class="center-align">
			            <div class="card-content white-text">
			              <span class="card-title">Mapa de Capacidades</span>
			              <p></p>
			              <div class="col m4 offset-m4">
			              		<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Capacidades de Negocio</a>

							  <div id="modal1" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <p></p>
			            </div>
		            </div>
		          </div>
		          <div class="card" style={containerStyle}>
		          	<div class="center-align">
			            <div class="card-content white-text">
			              <span class="card-title">Modelo Operativo</span>
			              <p></p>
			              <div class="col m4">
			              		<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modelo Organizacional</a>

							  <div id="modal1" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <div class="col m4">
			              		<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Procesos de Negocio</a>

							  <div id="modal1" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <div class="col m4">
			              		<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modelos de recursos</a>

							  <div id="modal1" class="modal">
							    <div class="modal-content">
							      <h4>Modal Header</h4>
							      <p>A bunch of text</p>
							    </div>
							    <div class="modal-footer">
							      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
							    </div>
							  </div>
			              </div>
			              <p></p>
			            </div>
			          </div>
			        </div>  
		        </div>
		        <div class="col m3">
			        <div class="card" style={containerStyle}>
			        <div class="center-align">
			        	<span class="card-title">Modelo de Información</span>
			        </div>
		        </div>
		        </div>
		      </div>
		      <div class="row">
			      <div class="col m12">
			      	<div class="card" style={optionsStyle}>
			      	<div class="center-align">
			            <div class="card-content white-text">
			              <span class="card-title">Card Title</span>
			              <p></p>
			              <div class="col m3">
			              	<a class="waves-effect waves-light btn-large">Descargar PDF</a>
			              </div>
			              <div class="col m3">
			              	<a class="waves-effect waves-light btn-large">Funcionalidad 2</a>
			              </div>
			              <div class="col m3">
			              	<a class="waves-effect waves-light btn-large">Funcionalidad 3</a>
			              </div>
			              <div class="col m3">
			              	<a class="waves-effect waves-light btn-large">Funcionalidad 4</a>
			              </div>
			            </div>
		            </div>
		          </div>
			      </div>
		      </div>
			</div>
			</div>
		);
	};
   

}

export default Link;