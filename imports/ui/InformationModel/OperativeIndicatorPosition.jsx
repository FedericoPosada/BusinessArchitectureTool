import React from 'react';
import {opIndicatorsContainer} from "../../api/opindicators";

export default class OperativeIndicatorPosition extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteOperativeIndicatorPosition(){
        Meteor.subscribe('opindicators');
        let opItem = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:this.props.indicatorid});
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
        opIndicatorsContainer.update({_id:this.props.indicatorid},{$set:{"positions":positions}});
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