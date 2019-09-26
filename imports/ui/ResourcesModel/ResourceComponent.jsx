import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import {componentsContainer} from "../../api/components";

export default class ResourceComponent extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteResourceComponent(){
        let resource = tiResourcesContainer.findOne({owner:Meteor.userId(),customid:this.props.resourcecustomid});
        let idsComps=resource.components;
        idsComps.splice(idsComps.indexOf(this.props.componentcustomid),1);
        tiResourcesContainer.update({_id:this.props.resourceid},{$set:{"components":idsComps}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.componentcustomid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteResourceComponent.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}