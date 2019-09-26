import React from 'react';
import ProjectTransformationActionManager from "./ProjectTransformationActionManager";
import {projectsContainer} from "../../api/projects";


export default class Project extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            actionlist:this.props.actionlist
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {
            this.setState({
                isInEditMode: false,
                actionlist:nextProps.actionlist
            })
        }
    }

    updateIndicator(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                description:this.refs.descEdit.value,
                name:this.refs.nameEdit.value,
                priority:this.refs.priorityEdit.value,
                deadline:this.refs.deadlineEdit.value
            }
        }
        projectsContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deleteIndicator(){
        let query = {_id:this.props._id};
        projectsContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateIndicator();
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    checkFields(){
        if(this.refs.descEdit.value.length === 0
            || this.refs.nameEdit.value.length === 0
            || this.refs.priorityEdit.value.length === 0
            || this.refs.deadlineEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }

    renderEdit() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn green" onClick={this.changeEditMode.bind(this)}><i className="material-icons">check</i></a>
                            </div>
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn red" onClick={this.deleteIndicator.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="nameEdit" type="text"  defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="descEdit" type="text"  defaultValue={this.props.description} />
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col s3">
                            <label>Prioridad:</label>
                        </div>
                        <div className="input-field col s8">
                            <select ref="priorityEdit" className="browser-default" style={{"width":"49%"}} >
                                <option></option>
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                            </select>
                        </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Fecha límite:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="deadlineEdit" type="date" className="active"   defaultValue={this.props.deadline} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Acciones de transformación:</label>
                            </div>
                            <div className="input-field col s8">
                                <ProjectTransformationActionManager projectid={this.props._id}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
    }

    renderDefault() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn" onClick={this.changeEditMode.bind(this)}><i className="material-icons">edit</i></a>
                            </div>
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn red" onClick={this.deleteIndicator.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.name
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.description
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Prioridad:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.priority
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Fecha límite:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.deadline
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label>Acciones de transformación:</label>
                            </div>
                            <table className="bordered">
                                <tbody>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                                { this.state.actionlist.map((val, index)=>{
                                    return(
                                        <tr key={"act"+index}>
                                            <td style={{width:"13%"}}>{val.customid}</td>
                                            <td>{val.name}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}