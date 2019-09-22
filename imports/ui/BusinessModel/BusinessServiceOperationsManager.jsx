import React from 'react';
import {bServicesOperationsContainer} from '../../api/bservoperations';
import BusinessServiceOperationsList from './BusinessServiceOperationsList.jsx';

export default class BusinessServiceOperationsManager extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    checkFields(){
        if(this.refs.bserviceopname.value.length === 0)
        {
            Materialize.toast("Debe completarse el nombre.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let serviceCustomIdNumber = "";
            for (let i = 1; i < this.props.bservicecustomid.length; i++) {
                serviceCustomIdNumber += this.props.bservicecustomid.charAt(i);
            }
            let bserviceopcustomid;
            if (bServicesOperationsContainer.find({bserviceid:this.props.bserviceid,bservicecustomid: this.props.bservicecustomid}).count() === 0) {
                bserviceopcustomid = "O" + serviceCustomIdNumber + ".1.";
            } else {
                let customIdLastNumber = "";
                let lastOperation = bServicesOperationsContainer.find({bserviceid:this.props.bserviceid, bservicecustomid: this.props.bservicecustomid}).fetch();
                let customIdLast = lastOperation[lastOperation.length - 1].customid;
                let arrayOpID= customIdLast.split(".");
                for (let i = 0; i < arrayOpID[1].length; i++) {
                    customIdLastNumber += arrayOpID[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                bserviceopcustomid = "O" + serviceCustomIdNumber + "." + lastnumber + ".";
            }

            let bserviceopname = this.refs.bserviceopname.value;
            let bserviceop = {
                customid: bserviceopcustomid,
                name: bserviceopname,
                bserviceid: this.props.bserviceid,
                bservicecustomid: this.props.bservicecustomid
            };
            bServicesOperationsContainer.insert(bserviceop, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
            this.refs.bserviceopname.value = "";
        }
    }
    render(){
        return(
        <div>
            <BusinessServiceOperationsList bserviceid={this.props.bserviceid}/>
            <div className="row">
                <div className="input-field col s1">
                </div>
                <div className="input-field col s6">
                    <input placeholder="Nombre" id="bserviceopname" ref="bserviceopname" type="text" className="validate"/>
                </div>
                <a onClick={this.handleClick}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:14}}><i
                    className="material-icons">add</i></a>
            </div>
        </div>
    )
    }
}