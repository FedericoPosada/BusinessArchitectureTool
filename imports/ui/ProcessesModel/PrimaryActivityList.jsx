import React from 'react';
import SupportActivity from "./SupportActivity";
import {processesContainer} from "../../api/processes";
import PrimaryActivity from "./PrimaryActivity";

export default class PrimaryActivityList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('processes');
            var activities = processesContainer.find({category:this.props.category,owner:Meteor.userId()}).fetch();
            this.setState({list: activities});
        })
    }
    render(){
        return (
            <div>
                <div className="input-field col s11">
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Proceso</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={val._id}>
                        <PrimaryActivity
                            _id={val._id}
                            customid={val.customid}
                            name={val.name}
                        />
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}