import React from 'react';
import {positionsContainer} from "../../api/positions";
import ProcessActivity from "./ProcessActivity";
import {processesContainer} from "../../api/processes";


export default class ProcessActivitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.activitieslist,
            processid:this.props.processid,
            activitieslist:this.props.activitieslist
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('processes');
            let activities;
            if(typeof this.state.processid !== "undefined")
            {let app = processesContainer.findOne({owner:Meteor.userId(),_id:this.state.processid});
             activities=app.activities;}
            else
                activities=this.state.activitieslist;
            this.setState({list: activities});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.activitieslist});
    }

    render(){
        return (
            <div>
                <div className="input-field col s4">
                    <label>Actividades del proceso:</label>
                </div>
                <div className="row">
                </div>
            <table className="bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Actividad</th>
                    <th></th>
                    <th>Capacidad</th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <ProcessActivity
                                processid={this.props.processid}
                                customid={val.customid}
                                name={val.name}
                                capacitycustomid={val.capacitycustomid}
                                capacityname={val.capacityname}
                                key={"procact"+this.props.processid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
            </div>
        )
    }
}