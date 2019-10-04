import React from 'react';
import {pCapacitiesContainer} from "../../api/pcapacities";
import {capacitiesContainer} from "../../api/capacities";

export default class PredefinedCapacity extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false,
            name:this.props.name,
            subpackageSelected:this.props.subpackageSelected
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            subpackageSelected:nextProps.subpackageSelected
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
            let capacityop = {
                customid: capacitycustomid,
                name: this.props.name,
                category:this.props.category,
                owner:Meteor.userId()
            };
            capacitiesContainer.insert(capacityop, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error",3000);
            });
            this.deleteCapacity();
        }
    }
    deleteCapacity(){
        var id = this.props.id;
        pCapacitiesContainer.remove({_id:id});
    }
    checkFields(){
        if(this.state.subpackageSelected.length === 0)
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
                <td style={{'padding-right':"70px"}}>{this.props.category}</td>
                <td style={{width:"20%"}}><a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn"><i
                    className="material-icons">add</i></a>
                </td>
            </>
        )
    }
}