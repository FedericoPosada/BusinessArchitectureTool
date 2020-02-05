import React from 'react';
import {bServicesOperationsContainer} from "../../api/bservoperations";
import ChannelOperationsList from "./ChannelOperationsList";
import {channelsContainer} from "../../api/channels";

export default class ChannelOperationManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[]
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('bservoperations');
            let operations = bServicesOperationsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: operations});
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
            let item=channelsContainer.findOne({_id:this.props._id});
            let opList=item.operations;
            let indexItem=-1;
            for(let i=0;i<opList.length && i !== -1;i++)
            {
                if(opList[i].customid === posItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                opList.push(posItem);
                channelsContainer.update({_id:this.props._id},{$set:{"operations":opList}});
            }
            else{
                Materialize.toast("La operación ya fue asignada",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <ChannelOperationsList _id={this.props._id}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="positionCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"poscap"+index}>{val.customid+"-"+val.name}</option>
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