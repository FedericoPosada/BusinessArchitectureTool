import React from 'react';
import {labelsContainer} from "../../api/labels";
import LabelsList from "./LabelsList";

export default class ComponentsCatalog extends React.Component {
    checkFields(){
        if(this.refs.idEdit.value.length === 0 || this.refs.descriptionEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let label = {
                _id: this.refs.idEdit.value,
                description: this.refs.descriptionEdit.value,
                owner:Meteor.userId()
            };
            labelsContainer.insert(label, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la etiqueta. Inténtelo de nuevo.",3000);
            });
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input ref="idEdit" type="text" className="validate"/>
                        <label htmlFor="componentname">Etiqueta</label>
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
                <LabelsList/>
                    </div>
                </div>
            </div>
        )
    }
}