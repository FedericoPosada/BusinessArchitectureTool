import React from 'react';
import Tactic from "./Tactic";
import {tacticsContainer} from "../../api/tactics";

export default class TacticList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('tactics');
            var tacs = tacticsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: tacs});
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
                        <th>Táctica</th>
                        <th>Estrategia</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"tactic"}>
                        <Tactic
                            _id={val._id}
                            customid={val.customid}
                            name={val.name}
                            strategy={val.strategy}
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