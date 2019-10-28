import React from 'react';
import {packagesContainer} from "../../api/packages";
import CapacitiesList from "./CapacitiesList";
import {capacitiesContainer} from "../../api/capacities";
import {subpackagesContainer} from "../../api/subpackages";
import PredefinedCapacitiesList from "./PredefinedCapacitiesList";

export default class PredefinedCapacityCreator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            packageslist:[],
            subpackageslist:[],
            subpackageSelected:""
    }
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('packages');
            Meteor.subscribe('subpackages');
            let packageslist = packagesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({packageslist: packageslist});
        })
    }
    checkFields(){
        if(this.refs.capacityname.value.length === 0 || this.refs.capacitysubpackage.value.length === 0 || this.refs.pcapacitypackage.value.length === 0
        || this.refs.capacitycategory.value.length === 0)
        {
            Materialize.toast("Deben completarse los campos.",3000);
            return false;
        }
        return true;

    }
    handlePackageChange(){
        const target = event.target;
        const value = target.value;
        const valArray = value.split("-");
        const subpId = valArray[0];
        let subpList = subpackagesContainer.find({owner:Meteor.userId(),"customid": new RegExp(subpId)}).fetch();
        this.setState({
            subpackageslist:subpList,
            subpackageSelected:""
        });
        this.refs.capacitysubpackage.value = "";

    }
    handleSubpackageChange(){
        const target = event.target;
        const value = target.value;
        let subparray=value.split("-");
        this.setState({
            subpackageSelected:subparray[0]
        })
    }

    render(){
        return(
        <div >
            <div className="row">
                <h5 style={{"marginLeft":"20px"}}>Capacidades disponibles:</h5>
            </div>
            <div className="row">
                <div className="input-field col s1">
                    <h5>Agregar a:</h5>
                </div>
                <div className="input-field col s2">
                    <select className="browser-default" ref="pcapacitypackage" onChange={this.handlePackageChange.bind(this)} style={{width:"100%"}}>
                        <option></option>
                        { this.state.packageslist.map((val, index)=>{
                            return(
                                <option>{val.customid+"-"+val.name}</option>
                            )
                        }) }
                    </select>
                </div>
                <div className="input-field col s3">
                    <select className="browser-default" id="pcapsubpackage" ref="capacitysubpackage" onChange={this.handleSubpackageChange.bind(this)} style={{width:"100%"}}>
                        <option></option>
                        { this.state.subpackageslist.map((val, index)=>{
                            return(
                                <option>{val.customid+"-"+val.name}</option>
                            )
                        }) }
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s8">
            <PredefinedCapacitiesList subpackageSelected={this.state.subpackageSelected}/>
                </div>
            </div>
        </div>
    )
    }
}