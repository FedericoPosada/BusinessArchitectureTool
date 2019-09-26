import React from 'react';
import {positionsContainer} from "../../api/positions";
import PositionCapacity from "./PositionCapacity";


export default class PositionCapacitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.capacitieslist,
            positionid:this.props.positionid,
            capacitieslist:this.props.capacitieslist
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('applications');
            let capacities;
            if(typeof this.state.positionid !== "undefined")
            {let app = positionsContainer.findOne({owner:Meteor.userId(),_id:this.state.positionid});
             capacities=app.capacities;}
            else
                capacities=this.state.capacitieslist;
            this.setState({list: capacities});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.capacitieslist});
    }

    render(){
        return (
            <div>
                <div className="input-field col s4">
                    <label>Capacidades implementadas:</label>
                </div>
            <table className="bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <PositionCapacity
                                positionid={this.props.positionid}
                                customid={val.customid}
                                name={val.name}
                                key={"appcap"+this.props.positionid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
            </div>
        )
    }
}