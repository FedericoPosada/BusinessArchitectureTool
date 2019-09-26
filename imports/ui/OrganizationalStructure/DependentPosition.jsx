import React from 'react';
import {positionsContainer} from "../../api/positions";

export default class DependentPosition extends React.Component {
    constructor(props)
    {
        super(props);
        Meteor.subscribe('positions');
    }
    deleteApplicationComponent(){
        let opItem = positionsContainer.findOne({_id:this.props.positionid});
        let dependents=opItem.dependents;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<dependents.length && i !== -1;i++)
        {
            if(dependents[i].customid === currentRes.customid)
                indexItem=i;
        }
        dependents.splice(indexItem,1);
        positionsContainer.update({_id:this.props.positionid},{$set:{"dependents":dependents}});
    }
    render(){
        return(
            <>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteApplicationComponent.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}