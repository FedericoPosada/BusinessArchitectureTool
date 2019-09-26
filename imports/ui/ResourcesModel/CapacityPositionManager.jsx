import React from 'react';
import {opItemsContainer} from "../../api/opitems";
import {positionsContainer} from "../../api/positions";
import CapacityPositionsList from "./CapacityPositionsList";

export default class CapacityPositionManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[]
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('positions');
            let positions = positionsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: positions});
        })
    }
    handleClick(){
        if(this.refs.positionCapAdd.value.length===0){
            Materialize.toast("Debe escogerse un cargo",3000);
        }
        else{
            let arrayRes=this.refs.positionCapAdd.value.split("-");
            let posItem={
                customid:arrayRes[0],
                name:arrayRes[1]
            }
            let item=opItemsContainer.findOne({_id:this.props._id});
            let posList=item.positions;
            let indexItem=-1;
            for(let i=0;i<posList.length && i !== -1;i++)
            {
                if(posList[i].customid === posItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                posList.push(posItem);
                opItemsContainer.update({_id:this.props._id},{$set:{"positions":posList}});
            }
            else{
                Materialize.toast("El cargo ya fue asignado",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <CapacityPositionsList _id={this.props._id} capacitycustomid={this.props.capacitycustomid}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="positionCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"poscap"+this.props.capacityid+index}>{val.customid+"-"+val.name}</option>
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