import React from 'react';
import {positionsContainer} from "../../api/positions";

export default class PositionCapacity extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deletePositionCapacity(){
        let opItem = positionsContainer.findOne({_id:this.props.positionid});
        let capacities=opItem.capacities;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<capacities.length && i !== -1;i++)
        {
            if(capacities[i].customid === currentRes.customid)
                indexItem=i;
        }
        capacities.splice(indexItem,1);
        positionsContainer.update({_id:this.props.positionid},{$set:{"capacities":capacities}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deletePositionCapacity.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}