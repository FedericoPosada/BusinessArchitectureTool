import React from 'react';
import {capacitiesContainer} from "../../api/capacities";
import Capacity from "./Capacity";

export default class CapacitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('capacities');
            let caps = capacitiesContainer.find({owner:Meteor.userId(),bserviceid:this.props.bserviceid}).fetch();
            this.setState({list: caps});
            console.log(Meteor.userId());
        })
    }
    render(){
        return (
                <table className="bordered" style={{'height': '300px', 'width':'50%', 'overflow':'scroll', 'display': 'block'}}>
                    <tbody>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <Capacity
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