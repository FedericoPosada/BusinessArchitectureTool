import React from 'react';
import {packagesContainer} from "../../api/packages";
import PackagesList from "./PackagesList";

export default class PackageCreator extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);

    }
    checkFields(){
        if(this.refs.packagename.value.length === 0)
        {
            Materialize.toast("Deben completarse los campos.",3000);
            return false;
        }
        return true;

    }
    handleClick(){
        if(this.checkFields()) {
            let packagecustomid="";
            if (packagesContainer.find({owner:Meteor.userId()}).count() === 0) {
                packagecustomid = "C1.";
            } else {
                let customIdLastNumber = "";
                let lastSubpackage = packagesContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastSubpackage[lastSubpackage.length - 1].customid;
                for (let i = 1; i < customIdLast.length-1; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                packagecustomid ="C" + lastnumber + ".";
            }
            let packagename = this.refs.packagename.value;
            let packageop = {
                customid: packagecustomid,
                name: packagename,
                owner:Meteor.userId()
            };
            packagesContainer.insert(packageop, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
            this.refs.packagename.value = "";
            this.refs.packagepackage.value = "";
        }
    }
    render(){
        return(
        <div >
            <div className="row">
                <h5 style={{"marginLeft":"10px"}}>Paquetes:</h5>
            </div>
            <div className="row">
                <div className="input-field col s8">
                    <input placeholder="Nombre" id="packagename" ref="packagename" type="text" className="validate"/>
                </div>
                <a onClick={this.handleClick}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:14}}><i
                    className="material-icons">add</i></a>
            </div>
            <div className="row">
                <div className="input-field col s10">
            <PackagesList />
                </div>
            </div>
        </div>
    )
    }
}