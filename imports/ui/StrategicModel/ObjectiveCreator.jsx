import React from 'react';
import {objectivesContainer} from "../../api/objectives";
import ObjectiveList from "./ObjectiveList";

export default class ObjectiveCreator extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        Meteor.subscribe('objectives');
    }
    checkFields(){
        if(this.refs.objectivename.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let objectivecustomid;
            if (objectivesContainer.find({owner:Meteor.userId()}).count() === 0) {
                objectivecustomid = 'O1';
            } else {
                let customIdLastNumber = '';
                let lastObjective = objectivesContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastObjective[lastObjective.length - 1].customid;
                for (let i = 1; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                objectivecustomid = "O" + lastnumber;
            }
            let objectivename = this.refs.objectivename.value.toString();
            let bobjective = {
                customid: objectivecustomid,
                name: objectivename,
                owner:Meteor.userId()
            };
            objectivesContainer.insert(bobjective, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el objetivo. Inténtelo de nuevo.",3000);
            });
            this.refs.objectivename.value = "";
        }
    }
    render(){
        return (
            <div>
                <h4>Objetivos:</h4>
                <ObjectiveList/>
                <div className="row">
                    <div className="input-field col s6">
                        <input  ref="objectivename" type="text" className="validate"/>
                            <label htmlFor="objectivename">Nombre</label>
                    </div>
                    <div className="input-field col s3">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
             </div>
    )
    }
}