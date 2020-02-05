import React from 'react';
import {applicationsContainer} from "../../api/applications";
import ApplicationCapacityManager from "./ApplicationCapacityManager";
import ApplicationComponentManager from "./ApplicationComponentManager";


export default class Application extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            capacitieslist:this.props.capacitieslist,
            componentslist:this.props.componentslist

        }
        console.log(this.props._id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {
            this.setState({
                isInEditMode: false,
                capacitieslist:nextProps.capacitieslist,
                componentslist:nextProps.componentslist
            })
        }
    }
    updateApplication(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                name:this.refs.nameEdit.value,
                cost:this.refs.costEdit.value
            }
        }
        applicationsContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deleteApplication(){
        let query = {_id:this.props._id};
        applicationsContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateApplication();
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0
            || this.refs.costEdit.value.length === 0)
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
                                <a className="waves-effect waves-light btn red" onClick={this.deleteApplication.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="nameEdit" type="text" defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Costo mensual:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="costEdit" type="number" className="active"  defaultValue={this.props.cost} />
                            </div>
                        </div>
                        <div className="row">
                        <ApplicationCapacityManager
                            applicationid={this.props._id}
                            capacitieslist={this.state.capacitieslist}/>
                        </div>
                        <div className="row">
                            <ApplicationComponentManager
                                applicationid={this.props._id}
                                componentslist={this.state.componentslist}/>
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
                                <a className="waves-effect waves-light btn red" onClick={this.deleteApplication.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.name
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Costo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.cost
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label>Capacidades implementadas::</label>
                            </div>
                        <table className="bordered">
                            <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            { this.state.capacitieslist.map((val, index)=>{
                                return(
                                    <tr key={"Filapos"+index}>
                                        <td>{val.customid}</td>
                                        <td>{val.name}</td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </table>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label>Componentes tecnológicos relacionados:</label>
                            </div>
                        <table className="bordered">
                            <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            { this.state.componentslist.map((val, index)=>{
                                return(
                                    <tr key={"comp"+index}>
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