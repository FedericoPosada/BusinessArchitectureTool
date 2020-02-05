import React from 'react';
import {channelActivitiesContainer} from "../../api/chanactivities";
import ChannelActivity from "./ChannelActivity";

export default class ChannelActivitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('channelactivities');
            let activities = channelActivitiesContainer.find({owner:Meteor.userId(),channelid:this.props.channelid}).fetch();
            this.setState({list: activities});

        })
    }
    render(){
        return (
                <table className="bordered">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Actividad</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <ChannelActivity
                            id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
                        />
                        </tr>
                    )
                }) }
                    </tbody>
                </table>
        )
    }
}