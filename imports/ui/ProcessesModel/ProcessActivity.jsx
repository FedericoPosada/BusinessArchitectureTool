import React from 'react';
import {processesContainer} from "../../api/processes";

export default class ProcessActivity extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteProcessActivity(){
        let opItem = processesContainer.findOne({_id:this.props.processid});
        let activities=opItem.activities;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<activities.length && i !== -1;i++)
        {
            if(activities[i].customid === currentRes.customid)
                indexItem=i;
        }
        activities.splice(indexItem,1);
        processesContainer.update({_id:this.props.processid},{$set:{"activities":activities}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.capacitycustomid}</td>
                <td>{this.props.capacityname}</td>
                <td style={{width:"10%"}}><a onClick={this.deleteProcessActivity.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}