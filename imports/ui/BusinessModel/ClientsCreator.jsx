import React from 'react';
import PrivateLoggedHeader from "../PrivateLoggedHeader";
import ClientsList from "./ClientsList";
import {clientsContainer} from "../../api/clients";

export default class ClientsCreator extends React.Component {
    checkFields(){
        if(this.refs.nameEdit.value.length === 0 || this.refs.descriptionEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let label = {
                name: this.refs.nameEdit.value,
                description: this.refs.descriptionEdit.value,
                owner:Meteor.userId()
            };
            clientsContainer.insert(label, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el cliente. Inténtelo de nuevo.",3000);
            });
            this.refs.nameEdit.value="";
            this.refs.descriptionEdit.value="";
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input ref="nameEdit" type="text" className="validate"/>
                        <label htmlFor="componentname">Cliente</label>
                    </div>
                    <div className="input-field col s3">
                        <input ref="descriptionEdit" type="text" className="validate"/>
                        <label htmlFor="componentdescription">Descripción</label>
                    </div>
                    <div className="input-field col s3">
                        <a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s8">
                <ClientsList/>
                    </div>
                </div>
            </div>
        )
    }
}