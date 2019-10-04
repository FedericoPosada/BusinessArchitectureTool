import React from 'react';
import {pCapacitiesContainer} from "../../api/pcapacities";
import PredefinedCapacity from "./PredefinedCapacity";

export default class PredefinedCapacitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            subpackageSelected:this.props.subpackageSelected
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
            this.setState({subpackageSelected: nextProps.subpackageSelected});
    }

    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('pcapacities');
            let caps = pCapacitiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: caps});
        })
    }
    render(){
        return (
                <table className="bordered" style={{'height': '400px', 'width':'100%','overflow-y':'scroll', 'overflow-x':'hidden', 'display': 'block'}}>
                    <tbody>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index+"rowpdefcap"}>
                        <PredefinedCapacity
                            subpackageSelected={this.state.subpackageSelected}
                            id={val._id}
                            category={val.category}
                            name={val.name}
                            key={val.customid+"pdefcap"}
                        />
                        </tr>
                    )
                }) }
                    </tbody>
                </table>
        )
    }
}