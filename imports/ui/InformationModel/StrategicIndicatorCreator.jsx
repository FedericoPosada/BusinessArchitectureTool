import React from 'react';
import {stIndicatorsContainer} from "../../api/stindicators";
import {labelsContainer} from "../../api/labels";
import {bServicesContainer} from "../../api/bservices";
import {resourcesContainer} from "../../api/resources";


export default class StrategicIndicatorCreator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            labelList:[],
            serviceList:[],
            resourceList:[],
            channelList:[],
            isChannel:false,
            isService:false,
            isResource:false,
            category:""
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('labels');
            Meteor.subscribe('bservices');
            Meteor.subscribe('resources');
            Meteor.subscribe('stindicators');
            let labels = labelsContainer.find({owner:Meteor.userId()}).fetch();
            let services = bServicesContainer.find({owner:Meteor.userId()}).fetch();
            let resources = resourcesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({labelList: labels,serviceList: services,resourceList:resources});
        })
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
    createIndicator(){
        if(this.checkFields()) {
            let indicatorcustomid;
            let labelSelected = this.refs.labelCreate.value;
            if (stIndicatorsContainer.find({"customid": new RegExp(labelSelected)}).count() === 0) {
                indicatorcustomid = labelSelected + "1";
            } else {
                let customIdLastNumber = '';
                let lastIndicators = stIndicatorsContainer.find({"customid": new RegExp(labelSelected)}).fetch();
                console.log(lastIndicators);
                let customIdLast = lastIndicators[lastIndicators.length - 1].customid;
                console.log(customIdLast);
                for (let i = labelSelected.length; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                indicatorcustomid = labelSelected +lastnumber;
            }
            let associatedIdValue="";
            if(typeof this.refs.associatedIdCreate !== "undefined") {
                let arrayAId = this.refs.associatedIdCreate.value.split("-");
                associatedIdValue=arrayAId[0];
            }
            else
                associatedIdValue="";
            let createObj = {
                customid: indicatorcustomid,
                description: this.refs.descCreate.value,
                calculation: this.refs.calcCreate.value,
                calcfrequency: this.refs.calcfreqCreate.value,
                dimensions: this.refs.dimensionsCreate.value,
                type:this.refs.typeCreate.value,
                associatedId:associatedIdValue,
                owner:Meteor.userId()
            }
            stIndicatorsContainer.insert(createObj,(err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el indicador. Inténtelo de nuevo.",3000);
            });
            Materialize.toast("Se ha creado el indicador", 3000);
            this.refs.descCreate.value = "";
            this.refs.calcCreate.value = "";
            this.refs.calcfreqCreate.value = "";
            this.refs.dimensionsCreate.value = "";
            this.refs.labelCreate.value = "";
            this.refs.typeCreate.value = "";
            if(typeof this.refs.associatedIdCreate !== "undefined" )
            this.refs.associatedIdCreate.value = "";
        }
    }
    checkFields(){
        if(this.refs.labelCreate.value.length === 0
            ||this.refs.descCreate.value.length === 0
            || this.refs.calcCreate.value.length === 0
            || this.refs.calcfreqCreate.value.length === 0
            || this.refs.dimensionsCreate.value.length === 0
            || this.refs.typeCreate.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        if (typeof this.refs.associatedIdCreate !== "undefined" && this.refs.associatedIdCreate.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;

    }

    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <a className="waves-effect waves-light btn green" onClick={this.createIndicator.bind(this)}><i className="material-icons right">check</i>Crear</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Etiqueta:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="labelCreate"  className="browser-default" style={{"width":"49%"}} >
                                { this.state.labelList.map((val, index)=>{
                                        return(
                                    <option>{val._id}</option>
                                        )
                                })
                                }
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="descCreate" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Forma de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="calcCreate" type="text" className="active"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Frecuencia de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="calcfreqCreate" className="browser-default" style={{"width":"49%"}} >
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
                            <div className="input-field col s3">
                                <label>Dimensiones:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="dimensionsCreate" type="text" defaultValue={this.props.dimensions} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Asociado a:</label>
                            </div>
                            <div className="input-field col s8">
                            <select className="browser-default" ref="typeCreate" onChange={this.handleCategoryChange.bind(this)} style={{width:"90%"}}>
                                <option></option>
                                <option>Global</option>
                                <option>Canal</option>
                                <option>Servicio</option>
                                <option>Recurso</option>
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>ID asociada:</label>
                            </div>
                            <div className="input-field col s8">
                            {this.state.isService && <select className="browser-default" ref="associatedIdCreate" style={{width:"90%"}}>
                                <option></option>
                                {this.state.serviceList.map((val, index)=>{
                                    return(
                                        <option key={"serv"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                    )})
                                }
                            </select>}
                            {this.state.isChannel && <select className="browser-default" ref="associatedIdCreate" style={{width:"90%"}}>
                                <option></option>
                                {this.state.channelList.map((val, index)=>{
                                    return(
                                        <option key={"chan"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                    )})
                                }
                            </select>}
                            {this.state.isResource && <select className="browser-default" ref="associatedIdCreate" style={{width:"90%"}}>
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


}