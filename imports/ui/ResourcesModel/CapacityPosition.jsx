import React from 'react';
import {opItemsContainer} from "../../api/opitems";

export default class CapacityPosition extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteCapacityPosition(){
        let opItem = opItemsContainer.findOne({_id:this.props._id});
        let positions=opItem.positions;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<positions.length && i !== -1;i++)
        {
            if(positions[i].customid === currentRes.customid)
                indexItem=i;
        }
        positions.splice(indexItem,1);
        opItemsContainer.update({_id:this.props._id},{$set:{"positions":positions}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteCapacityPosition.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}