import React from 'react';
import {capacitiesContainer} from "../../api/capacities";
import Capacity from "./Capacity";

export default class CapacitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            subpackageSelected:this.props.subpackageSelected
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if( nextProps.subpackageSelected === "") {
            let caps = capacitiesContainer.find({owner: Meteor.userId()}, {sort: {customid: 1}}).fetch();
            this.setState({subpackageSelected: nextProps.subpackageSelected, list: caps});
        }
        else {
            console.log(nextProps.subpackageSelected);
            let caps = capacitiesContainer.find({owner: Meteor.userId(), "customid": new RegExp(nextProps.subpackageSelected)}, {sort: {customid: 1}}).fetch();
            this.setState({subpackageSelected: nextProps.subpackageSelected, list: caps});
        }
    }

    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('capacities');
            let caps = capacitiesContainer.find({owner:Meteor.userId()}, {sort:{customid:1}}).fetch();
            this.setState({list: caps});
        })
    }
    render(){
        return (
                <table className="bordered" style={{'height': '400px', 'width':'100%','overflow-y':'scroll', 'overflow-x':'hidden', 'display': 'block'}}>
                    <tbody>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <Capacity
                            id={val._id}
                            customid={val.customid}
                            category={val.category}
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