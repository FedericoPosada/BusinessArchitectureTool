import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";

export default class MotivationalComponentValueManager extends React.Component {
    constructor(props){
        super(props);
    }
    checkFields(){
        if(this.refs.valuename.value.length === 0)
        {
            Materialize.toast("Debe completarse el nombre.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let motivC = motivCompContainer.find({}).fetch();
            let comp=motivC[0];
            console.log(comp);
            let tempList = comp.values;
            if (tempList.indexOf(this.refs.valuename.value) === -1) {
                tempList.push(this.refs.valuename.value);
                motivCompContainer.update({_id: this.props._id}, {$set: {values: tempList}});
                this.refs.valuename.value="";
            }
            else {
                Materialize.toast("El valor "+this.refs.valuename.value+" ya fue agregado.",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <div className="row">
                    <div className="input-field col s2">
                        <input style={{"marginLeft":"10px"}} placeholder="Valor" ref="valuename" type="text" className="validate"/>
                    </div>
                    <a onClick={this.handleClick.bind(this)}   className="waves-effect waves-light btn light-green" style={{marginTop: 14, marginLeft:"10px"}}><i
                        className="material-icons left">add</i>Agregar</a>
                </div>
            </div>
        )
    }
}