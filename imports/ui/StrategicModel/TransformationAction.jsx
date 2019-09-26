import React from 'react';
import {transfActionsContainer} from "../../api/transfactions";


export default class TransformationAction extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            model:this.props.model
        }
    }

    componentWillMount() {
        this.setState({
            isBusiness: this.state.model.includes("negocio"),
            isFinancial: this.state.model.includes("financiero"),
            isStrategic: this.state.model.includes("estratégico"),
            isCapacities: this.state.model.includes("Capacidades"),
            isOrganizational: this.state.model.includes("organizacional"),
            isProcesses: this.state.model.includes("procesos"),
            isResources: this.state.model.includes("recursos"),
            isInformation: this.state.model.includes("información")
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {

            this.setState({
                isInEditMode: false
            })
        }
    }

    updateAction(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                description:this.refs.descEdit.value,
                name:this.refs.nameEdit.value,
                artifact:this.refs.artifactEdit.value,
                model:this.refs.modelEdit.value,
                cost: this.refs.costEdit.value,
                risk:this.refs.riskEdit.value
            }
        }
        transfActionsContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado la acción",3000);
    }
    deleteAction(){
        let query = {_id:this.props._id};
        transfActionsContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateAction();
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
            || this.refs.artifactEdit.value.length === 0
            || this.refs.modelEdit.value.length === 0
            || this.refs.costEdit.value.length === 0
            || this.refs.riskEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleModelChange(){
        const value = this.refs.modelEdit.value;
        if(value.length> 0) {
            this.setState({
                model: value,
                isBusiness:value.includes("negocio"),
                isFinancial:value.includes("financiero"),
                isStrategic:value.includes("estratégico"),
                isCapacities:value.includes("Capacidades"),
                isOrganizational:value.includes("organizacional"),
                isProcesses:value.includes("procesos"),
                isResources:value.includes("recursos"),
                isInformation:value.includes("información")
            });
        }
        else
        {
            Materialize.toast("No se ha seleccionado una categoría",3000);
        }
    }
    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
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
                                <a className="waves-effect waves-light btn red" onClick={this.deleteAction.bind(this)}><i className="material-icons">delete</i></a>
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
                                <label>Costo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.cost
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Riesgo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.risk
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Modelo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.model
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Artefacto:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.artifact
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
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
                                <a className="waves-effect waves-light btn red" onClick={this.deleteAction.bind(this)}><i className="material-icons">delete</i></a>
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
                                <label>Costo:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="costEdit" type="number" className="active"   defaultValue={this.props.cost} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Riesgo:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="riskEdit" type="number" className="active"   defaultValue={this.props.risk} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Modelo:</label>
                            </div>
                            <div className="input-field col s8">
                                <select className="browser-default" ref="modelEdit" onChange={this.handleModelChange.bind(this)}>
                                    <option></option>
                                    <option>Modelo de negocio</option>
                                    <option>Modelo financiero</option>
                                    <option>Modelo estratégico</option>
                                    <option>Capacidades</option>
                                    <option>Modelo organizacional</option>
                                    <option>Modelo de procesos</option>
                                    <option>Modelo de recursos</option>
                                    <option>Modelo de información</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Artefacto:</label>
                            </div>
                            <div className="input-field col s8">
                                {this.state.isBusiness && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Modelo ontológico</option>
                                    <option>Portafolio de servicios</option>
                                </select>}
                                {this.state.isFinancial && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Balance general</option>
                                    <option>Pérdidas y Ganancias</option>
                                    <option>Flujos de caja</option>
                                </select>}
                                {this.state.isStrategic && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Componente motivacional</option>
                                    <option>Estrategias de negocio</option>
                                    <option>Plan estratégico</option>
                                    <option>Portafolio de proyectos</option>
                                </select>}
                                {this.state.isCapacities && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Mapa de capacidades</option>
                                </select>}
                                {this.state.isOrganizational && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Catálogo de cargos</option>
                                    <option>Organigrama</option>
                                </select>}
                                {this.state.isProcesses && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Cadena de valor</option>
                                    <option>Catálogo de procesos</option>
                                </select>}
                                {this.state.isResources && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Modelo de recursos</option>
                                    <option>Modelo de recursos TI</option>
                                    <option>Catálogo de componentes</option>
                                    <option>Catálogo de aplicaciones</option>
                                    <option>Modelo operativo</option>
                                </select>}
                                {this.state.isInformation && <select className="browser-default" defaultValue={this.props.artifact} ref="artifactEdit" style={{width:"90%"}}>
                                    <option>Indicadores operativos</option>
                                    <option>Indicadores estratégicos</option>
                                    <option>Indicadores externos</option>
                                </select>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}