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
import ModalProcesosDeNegocio from "./ModalProcesosDeNegocio";


class Link extends React.Component {
	 constructor() {
    super();
    this.state = {color: "red"};
  }

render() {
		var containerStyle= {
	      backgroundColor: "#FFFFFF"
	    };
	    var cardStyle= {
	      backgroundColor: "#468C98"
	    };
	    var optionsStyle= {
	    	backgroundColor: "#A3B4A2"
	    };
	    var pageStyle= {
		      backgroundColor: "#E1E8F0",
		      paddingLeft:"12px"
		    };
		return (			
			<div>
			<PrivateLoggedHeader/>
			<div className="row" style = {pageStyle}>
		        <div className="col m9">
		          <div className="card" style={containerStyle}>
			          <div className="center-align">
			          	<div className="card-content black-text">
			          	 <div className="row">	            
			              <span className="card-title black-text">Modelo de Intención</span>
			              <div className="divider"></div>
			              </div>
			              <div className="row">
			              
			              <div className="col m4">
							  <ModalModeloDeNegocio />
			              </div>
			              <div className="col m4">
			              		<ModalModeloFinanciero />
			              </div>
			              <div className="col m4">
			              		<ModalModeloEstrategico />
			              </div>
			              
			            </div>
			            </div>
			          </div>		            
		          </div>
		           
		          <div className="card" style={containerStyle}>
		          	<div className="center-align">
			            <div className="card-content black-text">
				            <div className="row">	            
				              <span className="card-title black-text">Mapa de Capacidades</span>
				              <div className="divider"></div>
				            </div>
				            <div className="row">
				              <div className="col m4 offset-m4">
				              		<ModalCapacidadesDeNegocio />
				              </div>		             
			             	</div>
			            </div>
		            </div>
		          </div>
		          
		           
		          <div className="card" style={containerStyle}>
		          	<div className="center-align">
			            <div className="card-content black-text">
			            <div className="row">	
			              <span className="card-title black-text">Modelo Operativo</span>
			              <div className="divider"></div>
				        </div>
			            <div className="row">
			              <div className="col m4">
			              		<ModalModeloOrganizacional />
			              </div>
			              <div className="col m4">
			              		<ModalProcesosDeNegocio />
			              </div>
			              <div className="col m4">
			              		<ModalModeloDeRecursos />
			              </div>
			            </div>
			            </div>
			          </div>
			        </div>  
			        
		        </div>
		        <div className="col m3">
		        <p></p>
		        <p></p>
			        <div className="card large" style={containerStyle}>
				        <div className="center-align">
				        	<div className="card-content black-text">
				        	<div className="row">	
				              <span className="card-title black-text">Modelo de Informacion</span>
				              <div className="divider"></div>
			              	</div>
			              	<div className="row">
				              <div className="col m12">
				              		<ModalModeloDeInformacion />
				              </div>
				             </div>
				            </div>
				        </div>
		        	</div>
		        </div>
		      <div className="footer-copyright">
		      	<div className="center-align">
			            <div className="card-content black-text">
			            <div className="col m12">
			            <div className="row">
			              <div className="col m3">
			              	<a href="/FinalDocument" className="waves-effect waves-light btn-small light-blue darken-3">Descargar PDF</a>
			              </div>
			              <div className="col m3">
			              	<a className="waves-effect waves-light btn-small light-blue darken-3">Funcionalidad 2</a>
			              </div>
			              <div className="col m3">
			              	<a className="waves-effect waves-light btn-small light-blue darken-3">Funcionalidad 3</a>
			              </div>
			              <div className="col m3">
			              	<a className="waves-effect waves-light btn-small light-blue darken-3">Funcionalidad 4</a>
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