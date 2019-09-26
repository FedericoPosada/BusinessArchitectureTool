import React from 'react';
import ProjectTransformationAction from "./ProjectTransformationAction";
import {opIndicatorsContainer} from "../../api/opindicators";
import {projectsContainer} from "../../api/projects";

export default class ProjectTransformationsList extends React.Component {
    constructor(props){
        super(props);
        let actions;
        Meteor.subscribe('projects');
        let indi = projectsContainer.findOne({owner:Meteor.userId(),_id:this.props.projectid});
        actions=indi.actions;
        this.state = {
            list: actions,
            projectid:this.props.projectid
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            let actions;
            if(typeof this.state.list === "undefined")
            {let indi = projectsContainer.findOne({owner:Meteor.userId(),_id:this.state.projectid});
                actions=indi.actions;}
            else
                actions=this.state.list;
            this.setState({list: actions});
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let actions;
        let indi = projectsContainer.findOne({owner:Meteor.userId(),_id:nextProps.projectid});
        actions=indi.actions;
        this.setState({list: actions});
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Proyecto</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <ProjectTransformationAction
                                projectid={this.props.projectid}
                                customid={val.customid}
                                name={val.name}
                                key={"projact"+this.props.projectid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}