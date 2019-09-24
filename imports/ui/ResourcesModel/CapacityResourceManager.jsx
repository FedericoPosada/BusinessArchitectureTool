import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import {componentsContainer} from "../../api/components";
import ResourceComponentsList from "./ResourceComponentsList";
import {opItemsContainer} from "../../api/opitems";
import {resourcesContainer} from "../../api/resources";
import CapacityResourcesList from "./CapacityResourcesList";

export default class CapacityResourceManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[]
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('resources');
            Meteor.subscribe('opitems');
            let resources = resourcesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: resources});
        })
    }
    handleClick(){
        if(this.refs.resourceCapAdd.value.length===0){
            Materialize.toast("Debe escogerse una capacidad",3000);
        }
        else{
            let arrayRes=this.refs.resourceCapAdd.value.split("-");
            let resItem={
                customid:arrayRes[0],
                name:arrayRes[1]
            }
            let item=opItemsContainer.findOne({_id:this.props._id});
            let resList=item.resources;
            let indexItem=-1;
            for(let i=0;i<resList.length && i !== -1;i++)
            {
                if(resList[i].customid === resItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                resList.push(resItem);
                opItemsContainer.update({_id:this.props._id},{$set:{"resources":resList}});
            }
            else{
                Materialize.toast("El recurso ya fue asignado",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <CapacityResourcesList _id={this.props._id} capacitycustomid={this.props.capacitycustomid}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="resourceCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"rescap"+this.props.capacitycustomid+index}>{val.customid+"-"+val.name}</option>
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