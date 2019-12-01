import React from 'react';
import PrivateLoggedHeader from "../PrivateLoggedHeader";
import ChannelsList from "./ChannelsList";
import {channelsContainer} from "../../api/channels";

export default class ChannelsModel extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);

    }
    checkFields(){
        if(this.refs.channelname.value.length === 0 || this.refs.channeltype.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let servicecustomid;
            if (this.refs.channeltype.value.includes("A")) {
                if (channelsContainer.find({owner: Meteor.userId(),"customid": new RegExp("A")}).count() === 0) {
                    servicecustomid = 'A1';
                } else {
                    let customIdLastNumber = '';
                    let lastService = channelsContainer.find({owner: Meteor.userId()}).fetch();
                    let customIdLast = lastService[lastService.length - 1].customid;
                    for (let i = 1; i < customIdLast.length; i++) {
                        customIdLastNumber += customIdLast.charAt(i);
                    }
                    let lastnumber = parseInt(customIdLastNumber);
                    lastnumber++;
                    servicecustomid = "A" + lastnumber;
                }
                let channelname = this.refs.channelname.value.toString();
                let channeltype = this.refs.channeltype.value.toString();
                let bservice = {
                    customid: servicecustomid,
                    name: channelname,
                    type: channeltype,
                    operations: [],
                    owner: Meteor.userId()
                };
                channelsContainer.insert(bservice, (err, done) => {
                    if (err)
                        Materialize.toast("Ha ocurrido un error al crear el servicio. Inténtelo de nuevo.", 3000);
                });
                this.refs.channelname.value = "";
                this.refs.channeltype.value = "";
            } else if (this.refs.channeltype.value.includes("R")) {
                let servicecustomid;
                if (channelsContainer.find({owner: Meteor.userId(),"customid": new RegExp("R")}).count() === 0) {
                    servicecustomid = 'R1';
                } else {
                    let customIdLastNumber = '';
                    let lastService = channelsContainer.find({owner: Meteor.userId()}).fetch();
                    let customIdLast = lastService[lastService.length - 1].customid;
                    for (let i = 1; i < customIdLast.length; i++) {
                        customIdLastNumber += customIdLast.charAt(i);
                    }
                    let lastnumber = parseInt(customIdLastNumber);
                    lastnumber++;
                    servicecustomid = "R" + lastnumber;
                }
                let channelname = this.refs.channelname.value.toString();
                let channeltype = this.refs.channeltype.value.toString();
                let bservice = {
                    customid: servicecustomid,
                    name: channelname,
                    type: channeltype,
                    operations: [],
                    owner: Meteor.userId()
                };
                channelsContainer.insert(bservice, (err, done) => {
                    if (err)
                        Materialize.toast("Ha ocurrido un error al crear el servicio. Inténtelo de nuevo.", 3000);
                });
                this.refs.channelname.value = "";
                this.refs.channeltype.value = "";
            } else {
                let servicecustomid;
                if (channelsContainer.find({owner: Meteor.userId(),"customid": new RegExp("M")}).count() === 0) {
                    servicecustomid = 'M1';
                } else {
                    let customIdLastNumber = '';
                    let lastService = channelsContainer.find({owner: Meteor.userId()}).fetch();
                    let customIdLast = lastService[lastService.length - 1].customid;
                    for (let i = 1; i < customIdLast.length; i++) {
                        customIdLastNumber += customIdLast.charAt(i);
                    }
                    let lastnumber = parseInt(customIdLastNumber);
                    lastnumber++;
                    servicecustomid = "M" + lastnumber;
                }
                let channelname = this.refs.channelname.value.toString();
                let channeltype = this.refs.channeltype.value.toString();
                let bservice = {
                    customid: servicecustomid,
                    name: channelname,
                    type: channeltype,
                    operations: [],
                    owner: Meteor.userId()
                };
                channelsContainer.insert(bservice, (err, done) => {
                    if (err)
                        Materialize.toast("Ha ocurrido un error al crear el servicio. Inténtelo de nuevo.", 3000);
                });
                this.refs.channelname.value = "";
                this.refs.channeltype.value = "";
            }
        }
    }
    
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s3">
                        <input id="channelname" ref="channelname" type="text" className="validate"/>
                            <label htmlFor="channelname">Nombre</label>
                    </div>
                    <div className="input-field col s2">
                        <select id="channeltype" ref="channeltype" className="browser-default" style={{"width":"100%"}} >
                            <option></option>
                            <option>Aprovisionamiento</option>
                            <option>Monetización</option>
                            <option>Relacionamiento</option>
                        </select>
                    </div>
                    <div className="input-field col s3">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s11" style={{marginLeft:5}}>
                <ChannelsList/>
                </div>
                </div>
             </div>
    )
    }
}