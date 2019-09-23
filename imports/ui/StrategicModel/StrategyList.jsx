import React from 'react';
import Strategy from "./Strategy";
import {strategiesContainer} from "../../api/strategies";

export default class StrategyList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('strategies');
            var strats = strategiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: strats});
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
                        <th>Estrategia</th>
                        <th>Objetivo</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"strategy"}>
                        <Strategy
                            _id={val._id}
                            customid={val.customid}
                            name={val.name}
                            objective={val.objective}
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