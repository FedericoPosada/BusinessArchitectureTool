import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import TIResource from "./TIResource";
import {opItemsContainer} from "../../api/opitems";
import OperativeItem from "./OperativeItem";
export default class OperativeModelList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('opitems');
            let opitems = opItemsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: opitems});
        })
    }
    render(){
        return (
            <div>
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID Capacidad</th>
                        <th>Capacidad</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"service"}>
                        <OperativeItem
                            _id={val._id}
                            capacitycustomid={val.capacitycustomid}
                            capacityname={val.capacityname}
                            key={val._id+"cap"+index}
                        />
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
            </div>
        )
    }
}