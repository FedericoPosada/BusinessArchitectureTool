import React from 'react';
import {capacitiesContainer} from "../../api/capacities";
import {processesContainer} from "../../api/processes";
import ProcessActivitiesList from "./ProcessActivitiesList";

export default class ProcessActivityManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[],
            currentlist:this.props.activitieslist
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('capacities');
            let capacities = capacitiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: capacities});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currentlist: nextProps.activitieslist});
    }
    checkFields(){
        if(this.refs.activityname.value.length === 0 ||
            this.refs.activitycapselect.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        else
            return true;
    }

    handleClick() {
        if (this.checkFields()) {
            let activitycustomid;
            let tempid = this.props.processcustomid.replace("P", "A")
            let proc = processesContainer.findOne({_id: this.props.processid,owner: Meteor.userId()})
            console.log(proc);
            let currentActivities=proc.activities;
            if (currentActivities.length === 0) {
                activitycustomid = tempid + "1.";
            } else {
                let customIdLastNumber = '';
                let lastActivity = currentActivities[currentActivities.length - 1];
                let customIdLast = lastActivity.customid;
                let arrayId = customIdLast.split(".");
                for (let i = 0; i < arrayId[2].length; i++) {
                    customIdLastNumber += arrayId[2].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                activitycustomid = tempid + lastnumber + ".";
            }
            let arrayRes = this.refs.activitycapselect.value.split("-");
            let actItem = {
                customid: activitycustomid,
                name: this.refs.activityname.value,
                capacitycustomid: arrayRes[0],
                capacityname: arrayRes[1]
            }
            currentActivities.push(actItem);
            processesContainer.update({_id: this.props.processid}, {$set: {"activities": currentActivities}});
            let tempList = this.state.currentlist;
            tempList.push(actItem);
            this.setState({
                currentlist: tempList
            })
            this.refs.activityname.value="";
            this.refs.activitycapselect.value="";
        }
    }

    render(){
        return(
            <div>
                <ProcessActivitiesList processid={this.props.processid} activitieslist={this.state.currentlist}/>
                <div className="row">
                    <div className="input-field col s3">
                        <input ref="activityname" type="text" className="validate"/>
                        <label htmlFor="activityname">Actividad</label>
                    </div>
                    <div className="input-field col s5">
                        <td>
                            <select className="browser-default" ref="activitycapselect" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"capcap"+this.props.processid+index}>{val.customid+"-"+val.name}</option>
                                    )
                                }) }
                            </select>
                        </td>
                        <td><a onClick={this.handleClick.bind(this)}   className="waves-effect waves-light btn light-green" ><i
                            className="material-icons">add</i></a></td>
                    </div>

                </div>
            </div>
        )
    }

}