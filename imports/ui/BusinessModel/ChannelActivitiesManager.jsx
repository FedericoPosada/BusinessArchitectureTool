import React from 'react';
import ChannelActivitiesList from "./ChannelActivitiesList";
import {channelActivitiesContainer} from "../../api/chanactivities";


export default class ChannelActivitiesManager extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    checkFields(){
        if(this.refs.activityname.value.length === 0)
        {
            Materialize.toast("Debe completarse el nombre.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let channelCustomIdNumber = "";
            for (let i = 1; i < this.props.channelcustomid.length; i++) {
                channelCustomIdNumber += this.props.channelcustomid.charAt(i);
            }
            let channelcustomId;
            if (channelActivitiesContainer.find({channelid:this.props.channelid,channelcustomid: this.props.channelcustomid}).count() === 0) {
                channelcustomId = this.props.channelcustomid.charAt(0) + channelCustomIdNumber + ".1.";
            } else {
                let customIdLastNumber = "";
                let lastOperation = channelActivitiesContainer.find({channelid:this.props.channelid, channelcustomid: this.props.channelcustomid}).fetch();
                let customIdLast = lastOperation[lastOperation.length - 1].customid;
                let arrayOpID= customIdLast.split(".");
                for (let i = 0; i < arrayOpID[1].length; i++) {
                    customIdLastNumber += arrayOpID[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                channelcustomId = this.props.channelcustomid.charAt(0) + channelCustomIdNumber + "." + lastnumber + ".";
            }

            let activityname = this.refs.activityname.value;
            let activity = {
                customid: channelcustomId,
                name: activityname,
                channelid: this.props.channelid,
                channelcustomid: this.props.channelcustomid,
                owner:Meteor.userId()
            };
            channelActivitiesContainer.insert(activity, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
            this.refs.activityname.value = "";
        }
    }
    render(){
        return(
        <div>
            <ChannelActivitiesList channelid={this.props.channelid}/>
            <div className="row">
                <div className="input-field col s1">
                </div>
                <div className="input-field col s6">
                    <input placeholder="Nombre" id="activityname" ref="activityname" type="text" className="validate"/>
                </div>
                <a onClick={this.handleClick}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:14}}><i
                    className="material-icons">add</i></a>
            </div>
        </div>
    )
    }
}