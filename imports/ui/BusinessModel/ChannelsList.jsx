import React from 'react';
import {channelsContainer} from "../../api/channels";
import Channel from "./Channel";


export default class ChannelsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('channels');
            var bServices = channelsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: bServices});
        })
    }
    render(){
        return (
            <div>
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th style={{width:"10%"}}>ID</th>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"service"}>
                        <Channel
                            _id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
                        />
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
            </div>
        )
    }
}