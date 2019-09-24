import React from 'react';
import {opItemsContainer} from "../../api/opitems";
import CapacityPosition from "./CapacityPosition"; // ES6

export default class CapacityPositionsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('opitems');
            let item = opItemsContainer.findOne({_id:this.props._id});
            let positions=item.positions;
            this.setState({list: positions});
        })
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Cargo</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <CapacityPosition
                                _id={this.props._id}
                                capacitycustomid={this.props.capacityid}
                                customid={val.customid}
                                name={val.name}
                                key={"cappos"+this.props.capacityid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}