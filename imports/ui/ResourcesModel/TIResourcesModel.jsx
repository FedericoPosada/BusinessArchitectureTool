import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import ResourcesList from "./ResourcesList";
import TIResourcesList from "./TIResourcesList";

export default class TIResourcesModel extends React.Component {
    checkFields(){
        if(this.refs.tiresourcename.value.length === 0 || this.refs.tiresourcedescription.value.length === 0 || this.refs.tiresourcecost.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let tiresourcecustomid;
            if (tiResourcesContainer.find({owner:Meteor.userId()}).count() === 0) {
                tiresourcecustomid = 'RTI1';
            } else {
                let customIdLastNumber = '';
                let lasttiresource = tiResourcesContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lasttiresource[lasttiresource.length - 1].customid;
                for (let i = 3; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                tiresourcecustomid = "RTI" + lastnumber;
            }
            let tiresourcename = this.refs.tiresourcename.value.toString();
            let tiresourcedescription = this.refs.tiresourcedescription.value.toString();
            let tiresourcecost = this.refs.tiresourcecost.value;
            let tiresource = {
                customid: tiresourcecustomid,
                name: tiresourcename,
                description: tiresourcedescription,
                cost: tiresourcecost,
                components:[],
                owner:Meteor.userId()
            };
            tiResourcesContainer.insert(tiresource, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el recurso. Inténtelo de nuevo.",3000);
            });
            this.refs.tiresourcename.value = "";
            this.refs.tiresourcedescription.value = "";
            this.refs.tiresourcecost.value = "";
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input id="tiresourcename" ref="tiresourcename" type="text" className="validate"/>
                        <label htmlFor="tiresourcename">Nombre</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="tiresourcedescription" ref="tiresourcedescription" type="text" className="validate"/>
                        <label htmlFor="tiresourcedescription">Descripción</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="tiresourcecost" ref="tiresourcecost" type="number" className="validate"/>
                        <label htmlFor="tiresourcedescription">Costo mensual</label>
                    </div>
                    <div className="input-field col s3">
                        <a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <TIResourcesList/>
            </div>
        )
    }
}