import React from 'react';
import {packagesContainer} from "../../api/packages";
import {subpackagesContainer} from "../../api/subpackages";
import SubpackagesList from "./SubpackagesList";

export default class SubpackageCreator extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
            packageslist:[],
            packageSelected:""
        }
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('packages');
            let packageslist = packagesContainer.find({owner:Meteor.userId()}).fetch();
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
    checkFields(){
        if(this.refs.subpackagename.value.length === 0 || this.refs.subpackagepackage.value.length === 0)
        {
            Materialize.toast("Deben completarse los campos.",3000);
            return false;
        }
        return true;

    }
    handleClick(){
        if(this.checkFields()) {
            let subpackagecustomid="";
            if (subpackagesContainer.find({owner:Meteor.userId(),"customid": new RegExp(this.state.packageSelected)}).count() === 0) {
                subpackagecustomid = this.state.packageSelected+ "1.";
            } else {
                let customIdLastNumber = "";
                let lastSubpackage = subpackagesContainer.find({owner:Meteor.userId(),"customid": new RegExp(this.state.packageSelected)}).fetch();
                let customIdLast = lastSubpackage[lastSubpackage.length - 1].customid;
                let arrayOpID= customIdLast.split(".");
                for (let i = 0; i < arrayOpID[1].length; i++) {
                    customIdLastNumber += arrayOpID[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                subpackagecustomid =this.state.packageSelected +"."+ lastnumber + ".";
            }
            let subpackagename = this.refs.subpackagename.value;
            let subpackageop = {
                customid: subpackagecustomid,
                name: subpackagename,
                owner:Meteor.userId()
            };
            subpackagesContainer.insert(subpackageop, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
            this.refs.subpackagename.value = "";
            this.refs.subpackagepackage.value = "";
        }
    }
    render(){
        return(
        <div>
            <div className="row">
                <h5>Subpaquetes:</h5>
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
                <div className="input-field col s5">
                    <input placeholder="Nombre" id="subpackagename" ref="subpackagename" type="text" className="validate"/>
                </div>
                <a onClick={this.handleClick}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:14}}><i
                    className="material-icons">add</i></a>
            </div>
            <div className="row">
                <div className="input-field col s11">
            <SubpackagesList packageSelected={this.state.packageSelected}/>
                </div>
            </div>
        </div>
    )
    }
}