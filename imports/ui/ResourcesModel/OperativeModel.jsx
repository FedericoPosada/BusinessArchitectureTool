import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import ResourcesList from "./ResourcesList";
import TIResourcesList from "./TIResourcesList";
import {motivCompContainer} from "../../api/motivcomp";
import {capacitiesContainer} from "../../api/capacities";
import {opItemsContainer} from "../../api/opitems";
import OperativeModelList from "./OperativeModelList";
import {positionsContainer} from "../../api/positions";
import PrivateLoggedHeader from "../PrivateLoggedHeader";

export default class OperativeModel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            capacitiesList:[],
            opItemsList:[],
            positionsList:[]
        }
    }
    componentWillMount() {
        Tracker.autorun(()=> {
            Meteor.subscribe('capacities');
            Meteor.subscribe('positions');
            Meteor.subscribe('opitems');
            let capacities = capacitiesContainer.find({owner:Meteor.userId()}).fetch();
            let positions = positionsContainer.find({owner:Meteor.userId()}).fetch();
            let opitems = opItemsContainer.find({owner:Meteor.userId()}, {sort: {capacitycustomid: 1}}).fetch();
            this.setState({capacitiesList: capacities,positionsList:positions,opItemsList:opitems});
        });
    }
    createItems(){
        for(let i=0;i<this.state.positionsList.length;i++) {
            let pos = this.state.positionsList[i];
            for (let j = 0; j < pos.capacities.length; j++) {
                let opItem = "";
                console.log(this.state.opItemsList.length);
                for (let l = 0; l < this.state.opItemsList.length; l++) {
                    console.log(this.state.opItemsList[l].capacitycustomid + " vs " + pos.capacities[j].customid)
                    if (this.state.opItemsList[l].capacitycustomid === pos.capacities[j].customid) {
                        opItem = this.state.opItemsList[l];
                        console.log("sipaso");
                    }
                }
                if (opItem !== "") {
                    let listPos = opItem.positions;
                    let isThere = false;
                    for (let k = 0; k < listPos.length && !isThere; k++) {
                        if (listPos[k].customid === pos.customid)
                            isThere = true;
                    }
                    if (!isThere) {
                        listPos.push({customid: pos.customid, name: pos.name});
                        opItemsContainer.update({_id: opItem._id}, {$set: {positions: listPos}})
                    }
                } else {
                    let item = {
                        capacitycustomid: pos.capacities[j].customid,
                        capacityname: pos.capacities[j].name,
                        positions: [{customid: pos.customid, name: pos.name}],
                        resources: [],
                        owner: Meteor.userId()
                    };
                    opItemsContainer.insert(item);
                }
            }
        }
        this.setState({
            loaded:true
        })

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
                <PrivateLoggedHeader/>
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
                    <div className="row">
                    <div className="input-field col s11">
                <OperativeModelList/>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}