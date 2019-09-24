import React from 'react';
import SupportActivityList from "./SupportActivityList";
import {supActivitiesContainer} from "../../api/supactivities";

export default class SupportActivityCreator extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        Meteor.subscribe('supactivities');
    }
    checkFields(){
        if(this.refs.supactname.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let supactcustomid;
            if (supActivitiesContainer.find({category:this.props.category,owner:Meteor.userId()}).count() === 0) {
                supactcustomid = "AS"+this.props.categorynumber+".1.";
            } else {
                let customIdLastNumber = '';
                let lastSupportActivity = supActivitiesContainer.find({category:this.props.category,owner:Meteor.userId()}).fetch();
                let customIdLast = lastSupportActivity[lastSupportActivity.length - 1].customid;
                let arrayId=customIdLast.split(".");
                for (let i = 0; i < arrayId[1].length; i++) {
                    customIdLastNumber += arrayId[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                supactcustomid = "AS" + this.props.categorynumber + "." + lastnumber +"." ;
            }
            let supactname = this.refs.supactname.value.toString();
            let bsupact = {
                customid: supactcustomid,
                name: supactname,
                category:this.props.category,
                owner:Meteor.userId()
            };
            supActivitiesContainer.insert(bsupact, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la actividad. Inténtelo de nuevo.",3000);
            });
            this.refs.supactname.value = "";
        }
    }
    render(){
        return (
            <div>
                <h5>{this.props.category}</h5>
                <SupportActivityList category={this.props.category}/>
                <div className="row">
                    <div className="input-field col s6">
                        <input  ref="supactname" type="text" className="validate"/>
                            <label htmlFor="supactname">Nombre</label>
                    </div>
                    <div className="input-field col s4">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
             </div>
    )
    }
}