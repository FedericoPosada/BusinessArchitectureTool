import React from 'react';
import {capacitiesContainer} from "../../api/capacities";
import {positionsContainer} from "../../api/positions";
import PositionCapacitiesList from "./PositionCapacitiesList";

export default class PositionCapacityManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[],
            currentlist:this.props.capacitieslist
        };
        console.log(this.props.positionid);
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('capacities');
            Meteor.subscribe('applications');
            let capacities = capacitiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: capacities});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currentlist: nextProps.capacitieslist});
    }

    handleClick(){

        if(this.refs.capitionCapAdd.value.length===0){
            Materialize.toast("Debe escogerse una capacidad",3000);
        }
        else{
            let arrayRes=this.refs.capitionCapAdd.value.split("-");
            let capItem={
                customid:arrayRes[0],
                name:arrayRes[1]
            }
            let item=positionsContainer.findOne({_id:this.props.positionid});
            let capList=item.capacities;
            let indexItem=-1;
            for(let i=0;i<capList.length && i !== -1;i++)
            {
                if(capList[i].customid === capItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                capList.push(capItem);
                positionsContainer.update({_id:this.props.positionid},{$set:{"capacities":capList}});
                let tempList=this.state.currentlist;
                tempList.push(capItem);
                this.setState({
                    currentlist:tempList
                })
            }
            else{
                Materialize.toast("La capacidad ya fue asignada",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <PositionCapacitiesList positionid={this.props.positionid} capacitieslist={this.state.currentlist}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="capitionCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"capcap"+this.props.positionid+index}>{val.customid+"-"+val.name}</option>
                                    )
                                }) }
                            </select>
                        </td>
                        <td><a onClick={this.handleClick.bind(this)}   className="waves-effect waves-light btn light-green" ><i
                            className="material-icons">add</i></a></td>
                    </div>

                </div>
            </div>
        )
    }

}