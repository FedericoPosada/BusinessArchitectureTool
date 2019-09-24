import React from 'react';
import {resServicesContainer} from "../../api/resservices";
import ResourceService from "./ResourceService";

export default class ResourceServiceList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('resservices');
            let resourceServices = resServicesContainer.find({owner:Meteor.userId(),resourcecustomid:this.props.resourcecustomid}).fetch();
            this.setState({list: resourceServices});
        })
    }
    render(){
        return (
                <table className="bordered">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Servicio</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <ResourceService
                            id={val._id}
                            customid={val.customid}
                            resourcecustomid={this.props.resourcecustomid}
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