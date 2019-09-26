import React from 'react';
import {resServicesContainer} from "../../api/resservices";
import ResourceServiceList from "./ResourceServicesList";

export default class ResourceServicesManager extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    checkFields(){
        if(this.refs.resservicename.value.length === 0)
        {
            Materialize.toast("Debe completarse el nombre.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            Meteor.subscribe('resservices');
            let resourceCustomIdNumber = "";
            if (!this.props.resourcecustomid.includes("RTI")) {
                for (let i = 1; i < this.props.resourcecustomid.length; i++) {
                    resourceCustomIdNumber += this.props.resourcecustomid.charAt(i);
                }
            }
            else {
                for (let i = 3; i < this.props.resourcecustomid.length; i++) {
                    resourceCustomIdNumber += this.props.resourcecustomid.charAt(i);
                }
            }
            let resservicecustomid;
            if (resServicesContainer.find({owner:Meteor.userId(),resourcecustomid: this.props.resourcecustomid}).count() === 0) {
                if (!this.props.resourcecustomid.includes("RTI"))
                    resservicecustomid = "S" + resourceCustomIdNumber + ".1.";
                else
                    resservicecustomid = "STI" + resourceCustomIdNumber + ".1.";
            }
             else {
                let customIdLastNumber = "";
                let lastService = resServicesContainer.find({owner:Meteor.userId(),resourcecustomid: this.props.resourcecustomid}).fetch();
                let customIdLast = lastService[lastService.length - 1].customid;
                let arraySerID= customIdLast.split(".");
                for (let i = 0; i < arraySerID[1].length; i++) {
                    customIdLastNumber += arraySerID[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                if (!this.props.resourcecustomid.includes("RTI"))
                    resservicecustomid = "S" + resourceCustomIdNumber + "." + lastnumber + ".";
                else
                    resservicecustomid = "STI" + resourceCustomIdNumber + "." + lastnumber + ".";
            }

            let resservicename = this.refs.resservicename.value;
            let resservice = {
                customid: resservicecustomid,
                name: resservicename,
                resourcecustomid: this.props.resourcecustomid,
                owner:Meteor.userId()
            };
            resServicesContainer.insert(resservice, (err, done) => {
                console.log(err + " id = " + done)
            });
            this.refs.resservicename.value = "";
        }
    }
    render(){
        return(
        <div>
            <ResourceServiceList resourcecustomid={this.props.resourcecustomid}/>
            <div className="row">
                <div className="input-field col s1">
                </div>
                <div className="input-field col s6">
                    <input placeholder="Servicio" id="resservicename" ref="resservicename" type="text" className="validate"/>
                </div>
                <a onClick={this.handleClick}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:14}}><i
                    className="material-icons">add</i></a>
            </div>
        </div>
    )
    }
}