import React from 'react';
import {opIndicatorsContainer} from "../../api/opindicators";

export default class OperativeIndicatorProcess extends React.Component {
    constructor(props)
    {
        super(props);
        Meteor.subscribe('opindicators');
    }
    deleteOperativeIndicatorPosition(){
        let opItem = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:this.props.indicatorid});
        let processes=opItem.processes;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<processes.length && i !== -1;i++)
        {
            if(processes[i].customid === currentRes.customid)
                indexItem=i;
        }
        processes.splice(indexItem,1);
        opIndicatorsContainer.update({_id:this.props.indicatorid},{$set:{"processes":processes}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteOperativeIndicatorPosition.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}