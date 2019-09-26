import React from 'react';
import {processesContainer} from "../../api/processes";
import PrimaryActivityList from "./PrimaryActivityList";

export default class PrimaryActivityCreator extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        Meteor.subscribe('processes');
    }
    checkFields(){
        if(this.refs.primactname.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let primactcustomid;
            if (processesContainer.find({category:this.props.category,owner:Meteor.userId()}).count() === 0) {
                primactcustomid = "P"+this.props.categorynumber+".1.";
            } else {
                let customIdLastNumber = '';
                let lastSupportActivity = processesContainer.find({category:this.props.category,owner:Meteor.userId()}).fetch();
                let customIdLast = lastSupportActivity[lastSupportActivity.length - 1].customid;
                let arrayId=customIdLast.split(".");
                for (let i = 0; i < arrayId[1].length; i++) {
                    customIdLastNumber += arrayId[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                primactcustomid = "P" + this.props.categorynumber + "." + lastnumber +"." ;
            }
            let primactname = this.refs.primactname.value.toString();
            let bprimact = {
                customid: primactcustomid,
                name: primactname,
                category:this.props.category,
                owner:Meteor.userId(),
                activities:[]
            };
            processesContainer.insert(bprimact, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la actividad. Inténtelo de nuevo.",3000);
            });
            this.refs.primactname.value = "";
        }
    }
    render(){
        return (
            <div>
                <h5>{this.props.category}</h5>
                <PrimaryActivityList category={this.props.category}/>
                <div className="row">
                    <div className="input-field col s6">
                        <input  ref="primactname" type="text" className="validate"/>
                            <label htmlFor="primactname">Nombre</label>
                    </div>
                    <div className="input-field col s4">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
             </div>
    )
    }
}