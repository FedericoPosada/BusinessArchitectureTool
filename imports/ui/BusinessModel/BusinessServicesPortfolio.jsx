import React from 'react';
import {bServicesContainer} from '../../api/bservices';
import BusinessServicesList from './BusinessServicesList';
import {clientsContainer} from "../../api/clients";

export default class BusinessServicesPortfolio extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
            clients:[]
        }

    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('clients')
            let clients = clientsContainer.find({}).fetch();
            this.setState({clients: clients});
        })
    }
    checkFields(){
        if(this.refs.servicename.value.length === 0 || this.refs.serviceobject.value.length === 0 || this.refs.serviceclient.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let servicecustomid;
            if (bServicesContainer.find({owner:Meteor.userId()}).count() === 0) {
                servicecustomid = 'S1';
            } else {
                let customIdLastNumber = '';
                let lastService = bServicesContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastService[lastService.length - 1].customid;
                for (let i = 1; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                servicecustomid = "S" + lastnumber;
            }
            let servicename = this.refs.servicename.value.toString();
            let serviceobject = this.refs.serviceobject.value.toString();
            let serviceclient = this.refs.serviceclient.value.toString();
            let bservice = {
                customid: servicecustomid,
                name: servicename,
                object: serviceobject,
                client: serviceclient,
                owner: Meteor.userId()
            };
            bServicesContainer.insert(bservice, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el servicio. Inténtelo de nuevo.",3000);
            });
            this.refs.servicename.value = "";
            this.refs.serviceobject.value = "";
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input id="servicename" ref="servicename" type="text" className="validate"/>
                            <label htmlFor="servicename">Nombre</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="serviceobject" ref="serviceobject" type="text" className="validate"/>
                            <label htmlFor="serviceobject">Objeto</label>
                    </div>
                    <div className="input-field col s3">
                        <select className="browser-default" ref="serviceclient" style={{width:"100%"}}>
                            { this.state.clients.map((val, index)=>{
                                return(
                                    <option>{val.name}</option>
                                )
                            }) }
                        </select>
                    </div>
                    <div className="input-field col s3">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s11" style={{marginLeft:5}}>
                <BusinessServicesList/>
                </div>
                </div>
             </div>
    )
    }
}