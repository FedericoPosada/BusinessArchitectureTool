import React from 'react';
import {resourcesContainer} from "../../api/resources";
import ResourcesList from "./ResourcesList";

export default class ResourcesModel extends React.Component {
    checkFields(){
        if(this.refs.resourcename.value.length === 0 || this.refs.resourcedescription.value.length === 0 || this.refs.resourcecost.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let resourcecustomid;
            if (resourcesContainer.find({owner:Meteor.userId()}).count() === 0) {
                resourcecustomid = 'R1';
            } else {
                let customIdLastNumber = '';
                let lastresource = resourcesContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastresource[lastresource.length - 1].customid;
                for (let i = 1; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                resourcecustomid = "R" + lastnumber;
            }
            let resourcename = this.refs.resourcename.value.toString();
            let resourcedescription = this.refs.resourcedescription.value.toString();
            let resourcecost = this.refs.resourcecost.value;
            let bresource = {
                customid: resourcecustomid,
                name: resourcename,
                description: resourcedescription,
                cost: resourcecost,
                owner:Meteor.userId()
            };
            resourcesContainer.insert(bresource, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear un recurso. Inténtelo de nuevo.",3000);
            });
            this.refs.resourcename.value = "";
            this.refs.resourcedescription.value = "";
            this.refs.resourcecost.value = "";
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input id="resourcename" ref="resourcename" type="text" className="validate"/>
                        <label htmlFor="resourcename">Nombre</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="resourcedescription" ref="resourcedescription" type="text" className="validate"/>
                        <label htmlFor="resourcedescription">Descripción</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="resourcecost" ref="resourcecost" type="number" className="validate"/>
                        <label htmlFor="resourcedescription">Costo mensual</label>
                    </div>
                    <div className="input-field col s3">
                        <a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s11">
                <ResourcesList/>
                    </div>
                </div>
            </div>
        )
    }
}