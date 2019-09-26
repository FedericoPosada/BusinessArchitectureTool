import React from 'react';
import {projectsContainer} from "../../api/projects";

export default class ProjectTransformationAction extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteProjectTransformationAction(){
        Meteor.subscribe('projects');
        let opItem = projectsContainer.findOne({owner:Meteor.userId(),_id:this.props.projectid});
        let actions=opItem.actions;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<actions.length && i !== -1;i++)
        {
            if(actions[i].customid === currentRes.customid)
                indexItem=i;
        }
        actions.splice(indexItem,1);
        projectsContainer.update({_id:this.props.projectid},{$set:{"actions":actions}});
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteProjectTransformationAction.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}