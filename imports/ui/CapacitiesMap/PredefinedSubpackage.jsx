import React from 'react';
import {subpackagesContainer} from "../../api/subpackages";
import {pSubpackagesContainer} from "../../api/psubpackages";

export default class PredefinedSubpackage extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false,
            name:this.props.name,
            packageSelected:this.props.packageSelected
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            packageSelected:nextProps.packageSelected
        })
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
                subpackagecustomid =this.state.packageSelected + lastnumber + ".";
            }
            let subpackageop = {
                customid: subpackagecustomid,
                name: this.props.name,
                owner:Meteor.userId()
            };
            subpackagesContainer.insert(subpackageop, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
        }
        this.deleteSubpackage();
    }
    deleteSubpackage(){
        var id = this.props.id;
        pSubpackagesContainer.remove({_id:id});
    }
    checkFields(){
        if(this.state.packageSelected.length === 0)
        {
            Materialize.toast("No se ha escogido un subpaquete.",3000);
            return false;
        }
        return true;
    }
    render(){
        return(
            <>
                <td style={{'padding-right':"70px"}}>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn"><i
                    className="material-icons">add</i></a>
                </td>
            </>
        )
    }
}