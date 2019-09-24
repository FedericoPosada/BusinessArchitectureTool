import React from 'react';
import {opItemsContainer} from "../../api/opitems";

export default class CapacityResource extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteCapacityResource(){
        let opItem = opItemsContainer.findOne({_id:this.props._id});
        let resources=opItem.resources;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<resources.length && i !== -1;i++)
        {
            if(resources[i].customid === currentRes.customid)
                indexItem=i;
        }
        resources.splice(indexItem,1);
        opItemsContainer.update({_id:this.props._id},{$set:{"resources":resources}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteCapacityResource.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}