import React from 'react';
import ProcessActivityManager from "./ProcessActivityManager";
import {processesContainer} from "../../api/processes";


export default class Process extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            activitieslist:this.props.activitieslist

        }
        console.log(this.props._id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {
            this.setState({
                isInEditMode: false,
                activitieslist:nextProps.activitieslist
            })
        }
    }
    updateProcess(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                name:this.refs.nameEdit.value
            }
        }
        processesContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deleteProcess(){
        let query = {_id:this.props._id};
        processesContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateProcess();
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0)
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
                                <a className="waves-effect waves-light btn green" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">check</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deleteProcess.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s2" style={{"marginTop":15}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="" ref="nameEdit" type="text" defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Tipo de actividad:</label>
                            </div>
                            <div className="input-field col s4" style={{"marginTop":15}}>
                                {
                                    this.props.category
                                }
                            </div>
                        </div>
                        <div className="row">
                        <ProcessActivityManager
                            processid={this.props._id}
                            processcustomid={this.props.customid}
                            activitieslist={this.state.activitieslist}/>
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
                                <a className="waves-effect waves-light btn" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">edit</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deleteProcess.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s2" style={{"marginTop":15}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":15}}>
                                {
                                    this.props.name
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Tipo de actividad:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":15}}>
                                {
                                    this.props.category
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Actividades del proceso:</label>
                            </div>
                            <div className="row">
                            </div>
                        <table className="bordered">
                            <tbody>
                            <tr>
                                <th></th>
                                <th>Actividad</th>
                                <th></th>
                                <th>Capacidad</th>
                            </tr>
                            { this.state.activitieslist.map((val, index)=>{
                                return(
                                    <tr key={"Filapos"+index}>
                                        <td style={{width:"13%"}}>{val.customid}</td>
                                        <td>{val.name}</td>
                                        <td>{val.capacitycustomid}</td>
                                        <td>{val.capacityname}</td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}