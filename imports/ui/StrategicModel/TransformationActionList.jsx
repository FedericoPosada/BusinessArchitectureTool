import React from 'react';
import TransformationAction from "./TransformationAction";
import {transfActionsContainer} from "../../api/transfactions";
import TransformationActionCreator from "./TransformationActionCreator";

export default class TransformationActionList extends React.Component {
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
            Meteor.subscribe('transfactions');
            let opInd = transfActionsContainer.find({owner:Meteor.userId()}).fetch();
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
                <h3 style={{"marginLeft":"20px"}}>Acciones de transformación</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons right">add</i>Nueva acción</a>}
                        <table className="striped" style={{"marginLeft":"20px"}}>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Acción</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"opind"}>
                            <td>{val.customid}</td>
                            <td>{val.name}</td>
                            <td><a className="waves-effect waves-light btn" onClick={() => this.setState({
                                hideFields:false,
                                _id:val._id,
                                customid:val.customid,
                                description:val.description,
                                name:val.name,
                                artifact:val.artifact,
                                model:val.model,
                                cost:val.cost,
                                risk: val.risk
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
                                this.state.isInCreateMode && <TransformationActionCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.description !== "undefined") &&
                                <TransformationAction
                                    hideFields={this.handleIndicatorDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    description={this.state.description}
                                    name={this.state.name}
                                    artifact={this.state.artifact}
                                    model={this.state.model}
                                    cost={this.state.cost}
                                    risk={this.state.risk}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}