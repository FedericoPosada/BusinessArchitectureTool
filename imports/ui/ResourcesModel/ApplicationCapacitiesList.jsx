import React from 'react';
import {applicationsContainer} from "../../api/applications";
import ApplicationCapacity from "./ApplicationCapacity";


export default class ApplicationCapacitiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.capacitieslist,
            applicationid:this.props.applicationid,
            capacitieslist:this.props.capacitieslist
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('applications');
            let capacities;
            if(typeof this.state.applicationid !== "undefined")
            {let app = applicationsContainer.findOne({owner:Meteor.userId(),_id:this.state.applicationid});
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
                            <ApplicationCapacity
                                applicationid={this.props.applicationid}
                                customid={val.customid}
                                name={val.name}
                                key={"appcap"+this.props.applicationid+" "+index}
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