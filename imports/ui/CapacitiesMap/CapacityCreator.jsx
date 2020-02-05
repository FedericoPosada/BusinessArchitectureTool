import React from 'react';
import {packagesContainer} from "../../api/packages";
import CapacitiesList from "./CapacitiesList";
import {capacitiesContainer} from "../../api/capacities";
import {subpackagesContainer} from "../../api/subpackages";

export default class CapacityCreator extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
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
        if(this.refs.capacityname.value.length === 0 || this.refs.capacitysubpackage.value.length === 0 || this.refs.capacitypackage.value.length === 0
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
    handleClick(){
        if(this.checkFields()) {
            let capacitycustomid="";
            if (capacitiesContainer.find({owner:Meteor.userId(),"customid": new RegExp(this.state.subpackageSelected)}).count() === 0) {
                capacitycustomid = this.state.subpackageSelected+ "1.";
            } else {
                let customIdLastNumber = "";
                let lastCapacity = capacitiesContainer.find({owner:Meteor.userId(),"customid": new RegExp(this.state.subpackageSelected)}).fetch();
                let customIdLast = lastCapacity[lastCapacity.length - 1].customid;
                let arrayOpID= customIdLast.split(".");
                for (let i = 0; i < arrayOpID[2].length; i++) {
                    customIdLastNumber += arrayOpID[2].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                capacitycustomid =this.state.subpackageSelected + lastnumber + ".";
            }

            let capacityname = this.refs.capacityname.value;
            let capcat=this.refs.capacitycategory.value;
            let capacityop = {
                customid: capacitycustomid,
                name: capacityname,
                category:capcat,
                owner:Meteor.userId()
            };
            capacitiesContainer.insert(capacityop, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
            this.refs.capacityname.value = "";
            this.refs.capacitypackage.value = "";
            this.refs.capacitysubpackage.value = "";
            this.refs.capacitycategory.value = "";
        }
    }
    render(){
        return(
        <div >
            <div className="row">
                <h5 style={{"marginLeft":"20px"}}>Capacidades:</h5>
            </div>
            <div className="row">
                <div className="input-field col s2">
                    <select className="browser-default" ref="capacitypackage" onChange={this.handlePackageChange.bind(this)} style={{width:"100%"}}>
                        <option></option>
                        { this.state.packageslist.map((val, index)=>{
                            return(
                                <option>{val.customid+"-"+val.name}</option>
                            )
                        }) }
                    </select>
                </div>
                <div className="input-field col s3">
                    <select className="browser-default" id="capsubpackage" ref="capacitysubpackage" onChange={this.handleSubpackageChange.bind(this)} style={{width:"100%"}}>
                        <option></option>
                        { this.state.subpackageslist.map((val, index)=>{
                            return(
                                <option>{val.customid+"-"+val.name}</option>
                            )
                        }) }
                    </select>
                </div>
                <div className="input-field col s2">
                    <select className="browser-default" ref="capacitycategory" style={{width:"100%"}}>
                        <option>Funcionamiento</option>
                        <option>Misional</option>
                        <option>Estratégico</option>
                    </select>
                </div>
                <div className="input-field col s3">
                    <input placeholder="Nombre" id="capacityname" ref="capacityname" type="text" className="validate"/>
                </div>
                <a onClick={this.handleClick}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:14}}><i
                    className="material-icons">add</i></a>
            </div>
            <div className="row">
                <div className="input-field col s10">
            <CapacitiesList subpackageSelected={this.state.subpackageSelected}/>
                </div>
            </div>
        </div>
    )
    }
}