import React from 'react';
import {opItemsContainer} from "../../api/opitems";
import CapacityResource from "./CapacityResource"; // ES6

export default class CapacityResourcesList extends React.Component {
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
            let resources=item.resources;
            this.setState({list: resources});
        })
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Recurso</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Fila"+index}>
                            <CapacityResource
                                _id={this.props._id}
                                capacitycustomid={this.props.capacitycustomid}
                                customid={val.customid}
                                name={val.name}
                                key={"capres"+this.props.capacitycustomid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}