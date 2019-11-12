import React from 'react';
import Project from "./Project";
import ProjectCreator from "./ProjectCreator";
import {projectsContainer} from "../../api/projects";

export default class ProjectsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInCreateMode:false,
            hideFields:false,
            list: []
        }
        this.handleIndicatorDeletion=this.handleIndicatorDeletion.bind(this);
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('projects');
            let opInd = projectsContainer.find({owner:Meteor.userId()}).fetch();
            console.log(opInd);
            this.setState({list: opInd});
        })
    }
    changeCreateMode(){
        this.setState({
            isInCreateMode: !this.state.isInCreateMode
        })
    }
    handleIndicatorDeletion(){
        this.setState({
            hideFields:true
        })
    }
    render(){
        return (
            <div>
                <h4 style={{"marginLeft":"20px"}}>Proyectos:</h4>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons right">add</i>Nuevo proyecto</a>}
                        <table className="striped" style={{"marginLeft":"20px"}}>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Proyecto</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"opind"}>
                            <td>{val.customid}</td>
                            <td>{val.description}</td>
                            <td><a className="waves-effect waves-light btn" onClick={() => this.setState({
                                hideFields:false,
                                _id:val._id,
                                customid:val.customid,
                                description:val.description,
                                name:val.name,
                                priority:val.priority,
                                deadline:val.deadline,
                                actionlist:val.actions
                            })}><i className="material-icons">keyboard_arrow_right</i></a></td>
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                        </div>
                        <div className="input-field col s1">
                        </div>
                        <div className="input-field col s6">
                            {
                                this.state.isInCreateMode && <ProjectCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.description !== "undefined") &&
                                <Project
                                    hideFields={this.handleIndicatorDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    description={this.state.description}
                                    name={this.state.name}
                                    priority={this.state.priority}
                                    deadline={this.state.deadline}
                                    actionlist={this.state.actionlist}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}