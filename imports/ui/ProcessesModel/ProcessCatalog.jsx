import React from 'react';
import Process from "./Process";
import ProcessCreator from "./ProcessCreator";
import {processesContainer} from "../../api/processes";
import PrivateLoggedHeader from "../PrivateLoggedHeader";

export default class ProcessCatalog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInCreateMode:false,
            hideFields:false,
            list: []
        }
        this.handleProcessDeletion=this.handleProcessDeletion.bind(this);
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('processes');
            let apps = processesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: apps});
        })
    }
    changeCreateMode(){
        this.setState({
            isInCreateMode: !this.state.isInCreateMode
        })
    }
    handleProcessDeletion(){
        this.setState({
            hideFields:true
        })
    }
    render(){
        return (
            <div>
                <PrivateLoggedHeader/>
                <h3 style={{"marginLeft":"20px"}}>Catálogo de procesos</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s3" style={{"marginRight":"14px"}}>
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{"marginLeft":"20px",marginBottom:20}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20}}
                            onClick={this.changeCreateMode.bind(this)} style={{"marginLeft":"20px","marginBottom":"14px"}}><i className="material-icons right" >add</i>Nuevo proceso</a>}
                        <table className="striped" style={{"marginLeft":"20px"}} >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Proceso</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"proc"}>
                            <td>{val.customid}</td>
                            <td>{val.name}</td>
                            <td><a className="waves-effect waves-light btn" onClick={() => (
                                this.setState({
                                hideFields:false,
                                _id:val._id,
                                name:val.name,
                                category:val.category,
                                customid:val.customid,
                                activitieslist:val.activities,
                                imageid:val.imageid
                            })
                            )
                            }><i className="material-icons">keyboard_arrow_right</i></a></td>
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                        </div>
                        <div className="input-field col s8">
                            {
                                this.state.isInCreateMode && <ProcessCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.name !== "undefined") &&
                                <Process
                                    hideFields={this.handleProcessDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    name={this.state.name}
                                    category={this.state.category}
                                    activitieslist={this.state.activitieslist}
                                    imageid={this.state.imageid}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}