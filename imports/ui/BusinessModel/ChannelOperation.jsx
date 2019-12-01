import React from 'react';
import {channelsContainer} from "../../api/channels";

export default class ChannelOperation extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteChannelOperation(){
        let opItem = channelsContainer.findOne({_id:this.props._id});
        let operations=opItem.operations;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<operations.length && i !== -1;i++)
        {
            if(operations[i].customid === currentRes.customid)
                indexItem=i;
        }
        operations.splice(indexItem,1);
        channelsContainer.update({_id:this.props._id},{$set:{"operations":operations}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteChannelOperation.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}