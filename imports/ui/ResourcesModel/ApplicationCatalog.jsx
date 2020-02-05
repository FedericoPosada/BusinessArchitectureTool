import React from 'react';
import {exIndicatorsContainer} from "../../api/exindicators";
import Application from "./Application";
import ApplicationCreator from "./ApplicationCreator";
import {applicationsContainer} from "../../api/applications";
import PrivateLoggedHeader from "../PrivateLoggedHeader";

export default class ApplicationCatalog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInCreateMode:false,
            hideFields:false,
            list: []
        }
        this.handleApplicationDeletion=this.handleApplicationDeletion.bind(this);
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('applications');
            let apps = applicationsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: apps});
        })
    }
    changeCreateMode(){
        this.setState({
            isInCreateMode: !this.state.isInCreateMode
        })
    }
    handleApplicationDeletion(){
        this.setState({
            hideFields:true
        })
    }
    render(){
        return (
            <div>
                <PrivateLoggedHeader/>
                <h3 style={{"marginLeft":"20px"}}>Catálogo de aplicaciones</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons right">add</i>Nueva aplicación</a>}
                        <table className="striped" style={{"marginLeft":"20px"}}>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Aplicación</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"opind"}>
                            <td>{val.customid}</td>
                            <td>{val.name}</td>
                            <td><a className="waves-effect waves-light btn" onClick={() => (
                                this.setState({
                                hideFields:false,
                                _id:val._id,
                                name:val.name,
                                customid:val.customid,
                                cost:val.cost,
                                isInCreateMode:false,
                                capacitieslist:val.capacities,
                                componentslist:val.components
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
                        <div className="input-field col s1">
                        </div>
                        <div className="input-field col s6">
                            {
                                this.state.isInCreateMode && <ApplicationCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.name !== "undefined") &&
                                <Application
                                    hideFields={this.handleApplicationDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    name={this.state.name}
                                    cost={this.state.cost}
                                    componentslist={this.state.componentslist}
                                    capacitieslist={this.state.capacitieslist}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}