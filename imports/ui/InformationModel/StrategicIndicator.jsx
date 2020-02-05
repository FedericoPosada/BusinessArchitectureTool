import React from 'react';
import {stIndicatorsContainer} from "../../api/stindicators";
import {labelsContainer} from "../../api/labels";
import {bServicesContainer} from "../../api/bservices";
import {resourcesContainer} from "../../api/resources";


export default class StrategicIndicator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            descEdit:"",
            calcEdit:"",
            calcfreqEdit:"",
            dimensionsEdit:"",
            labelEdit:"",
            serviceList:[],
            resourceList:[],
            channelList:[],
            isService: this.props.type.includes("Servicio"),
            isChannel: this.props.type.includes("Canal"),
            isResource: this.props.type.includes("Recurso"),
            category:this.props.type
        }
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bservices');
            Meteor.subscribe('resources');
            Meteor.subscribe('stindicators');
            let services = bServicesContainer.find({owner:Meteor.userId()}).fetch();
            let resources = resourcesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({serviceList: services,resourceList:resources});
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {

            this.setState({
                isInEditMode: false
            })
        }
    }

    updateIndicator(){
        let query = {_id:this.props._id};
        let assvalue="";
        if(this.refs.typeEdit.value === "Global")
            assvalue=""
        else {
            let arrayAId = this.refs.associatedIdEdit.value.split("-");
            assvalue=arrayAId[0];
        }
        let updateObj= {
            $set:{
                description:this.refs.descEdit.value,
                calculation:this.refs.calcEdit.value,
                calcfrequency:this.refs.calcfreqEdit.value,
                dimensions:this.refs.dimensionsEdit.value,
                type: this.refs.typeEdit.value,
                associatedId:assvalue
            }
        }
        stIndicatorsContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deleteIndicator(){
        let query = {_id:this.props._id};
        stIndicatorsContainer.remove(query);
        this.props.hideFields();
    }
    handleCategoryChange(){
        const target = event.target;
        const value = target.value;
        if(value.length> 0) {
            this.setState({
                category: value,
                isService: value.includes("Servicio"),
                isChannel: value.includes("Canal"),
                isResource: value.includes("Recurso")
            });
        }
        else
        {
            Materialize.toast("No se ha seleccionado una categoría",3000);
        }
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
            || this.refs.calcEdit.value.length === 0
            || this.refs.calcfreqEdit.value.length === 0
            || this.refs.dimensionsEdit.value.length === 0
            || this.refs.typeEdit.value.length === 0
            || this.refs.associatedIdEdit.value.length === 0)
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
                                <a className="waves-effect waves-light btn red" onClick={this.deleteIndicator.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="descEdit" type="text"  defaultValue={this.props.description} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Forma de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="calcEdit" type="text" className="active"   defaultValue={this.props.calculation} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Frecuencia de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="calcfreqEdit"  defaultValue={this.props.calcfrequency}  className="browser-default" style={{"width":"49%"}} >
                                <option></option>
                                <option>Semanal</option>
                                <option>Mensual</option>
                                <option>Trimestral</option>
                                <option>Semestral</option>
                                <option>Anual</option>
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Dimensiones:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="dimensionsEdit" type="text"  defaultValue={this.props.dimensions} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Asociado a:</label>
                            </div>
                            <div className="input-field col s8">
                            <select className="browser-default" defaultValue={this.props.type} ref="typeEdit" onChange={this.handleCategoryChange.bind(this)} style={{width:"90%"}}>
                                <option></option>
                                <option>Global</option>
                                <option>Canal</option>
                                <option>Servicio</option>
                                <option>Recurso</option>
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID asociada:</label>
                            </div>
                            <div className="input-field col s8">
                            {this.state.isService && <select className="browser-default" defaultValue={this.props.associatedId} ref="associatedIdEdit" style={{width:"90%"}}>
                                <option></option>
                                {this.state.serviceList.map((val, index)=>{
                                    return(
                                        <option key={"serv"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                    )})
                                }
                            </select>}
                            {this.state.isChannel && <select className="browser-default" defaultValue={this.props.associatedId} ref="associatedIdEdit" style={{width:"90%"}}>
                                <option></option>
                                {this.state.channelList.map((val, index)=>{
                                    return(
                                        <option key={"chan"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                    )})
                                }
                            </select>}
                            {this.state.isResource && <select className="browser-default" defaultValue={this.props.associatedId} ref="associatedIdEdit" style={{width:"90%"}}>
                                <option></option>
                                {this.state.resourceList.map((val, index)=>{
                                    return(
                                        <option key={"res"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                    )})
                                }
                            </select>}
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
                                <a className="waves-effect waves-light btn" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">edit</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deleteIndicator.bind(this)}><i className="material-icons">delete</i></a>
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
                            <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.description
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Forma de cálculo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.calculation
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Frecuencia de cálculo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.calcfrequency
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Dimensiones:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.dimensions
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Asociado a:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.type
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID asociada:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.associatedId
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}