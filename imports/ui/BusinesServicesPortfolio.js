import React from 'react';
import {bServicesContainer} from './../api/bservices';
import BusinessServicesList from './BusinessServicesList';

export default class BusinessServicesPortfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            todo: ""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    handleChange(e){
        var bservice = this.refs.input.value;
        this.setState({bservice: bservice});
    }

    handleClick(){
        let servicecustomid = this.refs.servicecustomid.value;
        let servicename = this.refs.servicename.value;
        let serviceobject = this.refs.serviceobject.value;
        let serviceclient = this.refs.serviceclient.value;
        let bservice = {
            customid:servicecustomid,
            name:servicename,
            object:serviceobject,
            client:serviceclient
        };
        bServicesContainer.insert(bservice,(err,done)=>{
            console.log(err + " id = " + done)
        });
        this.setState({bservice: bservice});
        this.refs.servicecustomid.value = "";
        this.refs.servicename.value = "";
        this.refs.serviceobject.value = "";
        this.refs.serviceclient.value = "";
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s2">
                        <input id="servicecustomid" ref="servicecustomid" type="text" className="validate"/>
                            <label htmlFor="servicecustomid">ID</label>
                    </div>
                    <div className="input-field col s2">
                        <input id="servicename" ref="servicename" type="text" className="validate"/>
                            <label htmlFor="servicename">Nombre del servicio</label>
                    </div>
                    <div className="input-field col s2">
                        <input id="serviceobject" ref="serviceobject" type="text" className="validate"/>
                            <label htmlFor="serviceobject">Objeto de negocio</label>
                    </div>
                    <div className="input-field col s2">
                        <input id="serviceclient" ref="serviceclient" type="text" className="validate"/>
                             <label htmlFor="serviceclient">Tipo de cliente</label>
                    </div>
                    <a onClick={this.handleClick}   className="waves-effect waves-light btn" style={{marginTop: 14, marginLeft:14}}><i
                        className="material-icons left">add</i>Agregar</a>

                </div>
                <BusinessServicesList/>
             </div>
    )
    }
}