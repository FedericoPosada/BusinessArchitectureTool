import React from 'react';
import {positionsContainer} from "../../api/positions";


export default class PositionCreator extends React.Component{

    createPosition(){
        if(this.checkFields()) {
            let applicationcustomid;
            if (positionsContainer.find({owner:Meteor.userId()}).count() === 0) {
                applicationcustomid = "CA1";
            } else {
                let customIdLastNumber = '';
                let lastPositions = positionsContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastPositions[lastPositions.length - 1].customid;
                for (let i = 2; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                applicationcustomid = "CA" + lastnumber;
            }
            let createObj = {
                customid: applicationcustomid,
                name: this.refs.nameEdit.value,
                salary:  this.refs.salaryEdit.value.length,
                number: this.refs.numberEdit.value,
                capacities:[],
                dependents:[],
                owner:Meteor.userId()
            }
            positionsContainer.insert(createObj,(err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el cargo. Inténtelo de nuevo.",3000);
            });
            Materialize.toast("Se ha creado el cargo", 3000);
            this.refs.nameEdit.value = "";
            this.refs.salaryEdit.value = "";
            this.refs.numberEdit.value = "";
        }
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0
            || this.refs.salaryEdit.value.length === 0
            || this.refs.numberEdit.value.length === 0)
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
                                <a className="waves-effect waves-light btn green" onClick={this.createPosition.bind(this)}><i className="material-icons right">check</i>Crear</a>
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
                                <label>Salario:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="salaryEdit" type="number" className="active"   defaultValue={this.props.salary} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Número de empleados:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="numberEdit" type="number" className="active"   defaultValue={this.props.number} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
    }


}