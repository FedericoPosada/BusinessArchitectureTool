import React from 'react';
import {componentsContainer} from "../../api/components";
import ComponentsList from "./ComponentsList";

export default class ComponentsCatalog extends React.Component {
    checkFields(){
        if(this.refs.componentname.value.length === 0 || this.refs.componentdescription.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            Meteor.subscribe('components');
            let componentcustomid;
            if (componentsContainer.find({owner:Meteor.userId()}).count() === 0) {
                componentcustomid = 'CT1';
            } else {
                let customIdLastNumber = '';
                let lastcomponent = componentsContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastcomponent[lastcomponent.length - 1].customid;
                for (let i = 2; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                componentcustomid = "CT" + lastnumber;
            }
            let componentname = this.refs.componentname.value.toString();
            let componentdescription = this.refs.componentdescription.value.toString();
            let bcomponent = {
                customid: componentcustomid,
                name: componentname,
                description: componentdescription,
                owner:Meteor.userId()
            };
            componentsContainer.insert(bcomponent, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el componente. Inténtelo de nuevo.",3000);
            });
            this.refs.componentname.value = "";
            this.refs.componentdescription.value = "";
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input id="componentname" ref="componentname" type="text" className="validate"/>
                        <label htmlFor="componentname">Nombre</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="componentdescription" ref="componentdescription" type="text" className="validate"/>
                        <label htmlFor="componentdescription">Descripción</label>
                    </div>
                    <div className="input-field col s3">
                        <a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s11">
                <ComponentsList/>
                    </div>
                </div>
            </div>
        )
    }
}