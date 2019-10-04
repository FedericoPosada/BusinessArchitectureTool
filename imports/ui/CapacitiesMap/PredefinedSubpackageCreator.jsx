import React from 'react';
import {packagesContainer} from "../../api/packages";
import {subpackagesContainer} from "../../api/subpackages";
import SubpackagesList from "./SubpackagesList";
import PredefinedCapacitiesList from "./PredefinedCapacitiesList";
import PredefinedSubpackagesList from "./PredefinedSubpackagesList";

export default class PredefinedSubpackageCreator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            packageslist:[],
            packageSelected:""
        }
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('packages');
            let packageslist = packagesContainer.find({}).fetch();
            this.setState({packageslist: packageslist});
        })
    }
    handlePackageChange(){
        const target = event.target;
        const value = target.value;
        let parray=value.split("-");
        this.setState({
            packageSelected:parray[0]
        })
    }
    render(){
        return(
        <div>
            <div className="row">
                <h5 style={{"marginLeft":"20px"}}>Subpaquetes disponibles:</h5>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <select className="browser-default" ref="subpackagepackage" onChange={this.handlePackageChange.bind(this)} style={{width:"100%"}}>
                        <option></option>
                        { this.state.packageslist.map((val, index)=>{
                            return(
                                <option>{val.customid+"-"+val.name}</option>
                            )
                        }) }
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s5">
            <PredefinedSubpackagesList packageSelected={this.state.packageSelected}/>
                </div>
            </div>
        </div>
    )
    }
}