import React from 'react';
import {objectivesContainer} from "../../api/objectives";
import Objective from "./Objective";

export default class ObjectiveList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('objectives');
            var objectives = objectivesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: objectives});
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
                        <th>Objetivo</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"objective"}>
                        <Objective
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