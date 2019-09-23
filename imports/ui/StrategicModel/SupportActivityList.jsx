import React from 'react';
import {supActivitiesContainer} from "../../api/supactivities";
import SupportActivity from "./SupportActivity";

export default class SupportActivityList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('supactivities');
            var activities = supActivitiesContainer.find({category:this.props.category,owner:Meteor.userId()}).fetch();
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
                        <th>Actividad</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={val._id}>
                        <SupportActivity
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