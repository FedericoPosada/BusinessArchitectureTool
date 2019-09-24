import React from 'react';
import {bServicesContainer} from '../../api/bservices';
import {resourcesContainer} from "../../api/resources";
import {bStrategiesContainer} from "../../api/bstrategies";
import BusinessStrategiesList from "./BusinessStrategiesList";

export default class BusinessStrategiesCatalog extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
            serviceList:bServicesContainer.find({}).fetch(),
            resourceList:resourcesContainer.find({}).fetch(),
            channelList:[],
            category:"",
            associatedid:"",
            isChannel:false,
            isService:false,
            isResource:false
        }
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bservices');
            Meteor.subscribe('resources');
            Meteor.subscribe('bstrategies');
            let services = bServicesContainer.find({}).fetch();
            let resources = resourcesContainer.find({}).fetch();
            this.setState({serviceList: services,resourceList:resources});
        })
    }
    checkFields(){
        if(this.refs.strategyname.value.length === 0 || this.refs.strategydescription.value.length === 0 || this.refs.strategycategory.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        else if(this.state.associatedid.length === 0 && !this.state.category.includes("Global"))
        {
            Materialize.toast("Debe escogerse un elemento",3000);
            return false;
        }
        return true;
    }
    handleCategoryChange(){
        const target = event.target;
        const value = target.value;
        if(value.length> 0) {
            this.setState({
                category: value,
                isService: value.includes("servicio"),
                isChannel: value.includes("canal"),
                isResource: value.includes("recurso")
            });
        }
        else
        {
            Materialize.toast("No se ha seleccionado una categoría",3000);
        }
    }
    handleSelectChange(){
        const target = event.target;
        const value = target.value;
        if(value.length> 0) {
            let arrayAId=value.split("-");
            this.setState({
                associatedid:arrayAId[0]
            });
        }
        else
        {
            Materialize.toast("No se ha seleccionado un elemento válido",3000);
        }
    }
    handleClick(){
        if(this.checkFields()) {
            let strategycustomid;
            if (bStrategiesContainer.find({owner:Meteor.userId()}).count() === 0) {
                strategycustomid = 'EN1';
            } else {
                let customIdLastNumber = '';
                let lastService = bStrategiesContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastService[lastService.length - 1].customid;
                for (let i = 2; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                strategycustomid = "EN" + lastnumber;
            }
            let strategyname = this.refs.strategyname.value.toString();
            let strategydescription = this.refs.strategydescription.value.toString();
            let strategycategory = this.refs.strategycategory.value.toString();
            let bservice = {
                customid: strategycustomid,
                name: strategyname,
                description: strategydescription,
                category: strategycategory,
                associatedid: this.state.associatedid,
                owner: Meteor.userId()
            };
            bStrategiesContainer.insert(bservice, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la estrategia. Inténtelo de nuevo.",3000);
            });
            this.refs.strategyname.value = "";
            this.refs.strategydescription.value = "";
            this.refs.strategycategory.value = "";
            this.setState({
                isService: false,
                isChannel: false,
                isResource: false})
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s2">
                        <input name="name" placeholder="Nombre" type="text" ref="strategyname"
                               defaultValue={this.props.name} className="validate"/>
                    </div>
                    <div className="input-field col s3">
                        <input name="description" placeholder="Descripción" type="text" ref="strategydescription" style={{width:"90%"}}
                               defaultValue={this.props.object} className="validate" />
                    </div>
                    <div className="input-field col s1">
                        <select className="browser-default" ref="strategycategory" onChange={this.handleCategoryChange.bind(this)} style={{width:"90%"}}>
                            <option></option>
                            <option>Global</option>
                            <option>Por canal</option>
                            <option>Por servicio</option>
                            <option>Por recurso</option>
                        </select>
                    </div>
                    <div className="input-field col s2">
                        {this.state.isService && <select className="browser-default" onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                            <option></option>
                            {this.state.serviceList.map((val, index)=>{
                                return(
                                    <option key={"serv"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                )})
                            }
                        </select>}
                        {this.state.isChannel && <select className="browser-default" onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                            <option></option>
                            {this.state.channelList.map((val, index)=>{
                                return(
                                    <option key={"chan"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                )})
                            }
                        </select>}
                        {this.state.isResource && <select className="browser-default" onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                            <option></option>
                            {this.state.resourceList.map((val, index)=>{
                                return(
                                    <option key={"res"+this.props.customid+val.customid}>{val.customid}-{val.name}</option>
                                )})
                            }
                        </select>}
                    </div>
                    <div className="input-field col s2">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Crear</a>
                    </div>
                </div>
                <BusinessStrategiesList/>
             </div>
    )
    }
}