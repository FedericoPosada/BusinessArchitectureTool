import React from 'react';
import {channelsContainer} from "../../api/channels";
import ChannelOperation from "./ChannelOperation";

export default class ChannelOperationsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('opitems');
            let item = channelsContainer.findOne({_id:this.props._id});
            let operations=item.operations;
            this.setState({list: operations});
        })
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Operacion</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <ChannelOperation
                                _id={this.props._id}
                                customid={val.customid}
                                name={val.name}
                                key={"cappos"+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}