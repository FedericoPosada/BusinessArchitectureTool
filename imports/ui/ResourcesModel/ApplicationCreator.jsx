import React from 'react';
import {applicationsContainer} from "../../api/applications";


export default class ApplicationCreator extends React.Component{

    createApplication(){
        if(this.checkFields()) {
            let applicationcustomid;
            if (applicationsContainer.find({owner:Meteor.userId()}).count() === 0) {
                applicationcustomid = "A1";
            } else {
                let customIdLastNumber = '';
                let lastApplications = applicationsContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastApplications[lastApplications.length - 1].customid;
                for (let i = 1; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                applicationcustomid = "A" + lastnumber;
            }
            let createObj = {
                customid: applicationcustomid,
                name: this.refs.nameEdit.value,
                cost:  this.refs.costEdit.value,
                capacities:[],
                components:[],
                owner:Meteor.userId()
            }
            applicationsContainer.insert(createObj,(err, done) => {
                if(err)
                    console.log(err);
               // Materialize.toast("Ha ocurrido un error al crear la aplicación. Inténtelo de nuevo.",3000);
            });
            Materialize.toast("Se ha creado la aplicación", 3000);
            this.refs.nameEdit.value = "";
            this.refs.costEdit.value = "";
        }
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0
            || this.refs.costEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;

    }

    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <a className="waves-effect waves-light btn green" onClick={this.createApplication.bind(this)}><i className="material-icons right">check</i>Crear</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="nameEdit" type="text"  defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Costo mensual:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="costEdit" type="number" className="active"   defaultValue={this.props.cost} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
    }


}