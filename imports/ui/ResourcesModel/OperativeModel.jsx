import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import ResourcesList from "./ResourcesList";
import TIResourcesList from "./TIResourcesList";
import {motivCompContainer} from "../../api/motivcomp";
import {capacitiesContainer} from "../../api/capacities";
import {opItemsContainer} from "../../api/opitems";
import OperativeModelList from "./OperativeModelList";

export default class OperativeModel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            capacitiesList:[]
        }
    }
    componentWillMount() {
        Tracker.autorun(()=> {
            Meteor.subscribe('capacities');
            Meteor.subscribe('opitems');
            let capacities = capacitiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({capacitiesList: capacities});
        });

    }
    checkFields(){
        if(this.refs.capacityAdd.value.length === 0)
        {
            Materialize.toast("Debe escogerse una capacidad.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let arrayCap = this.refs.capacityAdd.value.split("-");
            let item = {
                capacitycustomid: arrayCap[0],
                capacityname: arrayCap[1],
                positions:[],
                resources:[],
                owner:Meteor.userId()
            };
            let opitems=opItemsContainer.find({owner:Meteor.userId()}).fetch();
            let index=-1;
            for(let i=0;i<opitems.length;i++){
                console.log(opitems[i].capacitycustomid);
                console.log(arrayCap[0]);
                if(opitems[i].capacitycustomid === arrayCap[0])
                    index=i;
            }
            if(index === -1) {
                opItemsContainer.insert(item, (err, done) => {
                    if (err)
                        Materialize.toast("Ha ocurrido un error al agregar la capacidad. Inténtelo de nuevo.", 3000);
                });
            }
            else {
                Materialize.toast("La capacidad ya fue agregada.", 3000);
            }
            this.refs.capacityAdd.value = "";
        }
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="input-field col s1">
                        <label>Capacidad:</label>
                    </div>
                    <div className="input-field col s6">
                    <select className="browser-default" ref="capacityAdd" style={{width:"90%"}}>
                        <option></option>
                        {this.state.capacitiesList.map((val, index)=>{
                            return(
                                <option key={"cap"+this.props.customid+val.customid}>{val.customid+"-"+val.name}</option>
                            )})
                        }
                    </select>
                    </div>
                    <div className="input-field col s3">
                        <a onClick={this.handleClick.bind(this)} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
                <OperativeModelList/>
            </div>
        )
    }
}