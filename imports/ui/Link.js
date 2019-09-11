import React from 'react';
import {BrowserHistory} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LinksList from './LinksList';
import PrivateLoggedHeader from './PrivateLoggedHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';
import { Session } from 'meteor/session';
import ModalCapacidadesDeNegocio from "./ModalCapacidadesDeNegocio";
import ModalModeloDeInformacion from "./ModalModeloDeInformacion";
import ModalModeloDeNegocio from "./ModalModeloDeNegocio";
import ModalModeloDeRecursos from "./ModalModeloDeRecursos";
import ModalModeloEstrategico from "./ModalModeloEstrategico";
import ModalModeloFinanciero from "./ModalModeloFinanciero";
import ModalModeloOrganizacional from "./ModalModeloOrganizacional";


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
							  <ModalModeloDeNegocio />
			              </div>
			              <div class="col m4">
			              		<ModalModeloFinanciero />
			              </div>
			              <div class="col m4">
			              		<ModalModeloEstrategico />
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
			              		<ModalCapacidadesDeNegocio />
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
			              		<ModalModeloOrganizacional />
			              </div>
			              <div class="col m4">
			              		
			              </div>
			              <div class="col m4">
			              		<ModalModeloDeRecursos />
			              </div>
			              <p></p>
			            </div>
			          </div>
			        </div>  
		        </div>
		        <div class="col m3">
			        <div class="card" style={containerStyle}>
			        <div class="center-align">
			        	<div class="card-content white-text">
			              <span class="card-title">Modelo de Informacion</span>
			              <p></p>
			              <div class="col m12">
			              		<ModalModeloDeInformacion />
			              </div>
			            </div>
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