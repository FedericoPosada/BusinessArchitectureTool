import React from 'react';
import Goal from "./Goal";
import {goalsContainer} from "../../api/goals";

export default class ObjectiveList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('goals');
            var goals = goalsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: goals});
        })
    }
    render(){
        return (
            <div>
                <div className="input-field col s9">
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Meta</th>
                        <th>Objetivo</th>
                        <th>Fecha límite</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"objective"}>
                        <Goal
                            _id={val._id}
                            customid={val.customid}
                            name={val.name}
                            objective={val.objective}
                            deadline={val.deadline}
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