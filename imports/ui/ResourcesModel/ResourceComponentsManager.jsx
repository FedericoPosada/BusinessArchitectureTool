import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import {componentsContainer} from "../../api/components";
import ResourceComponentsList from "./ResourceComponentsList";

export default class ResourceComponentsManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            componentcustomid:"",
            list:[],
            allcomponents:[]
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('tiresources');
            Meteor.subscribe('components');
            let resource = tiResourcesContainer.findOne({owner:Meteor.userId(),customid:this.props.resourcecustomid});
            let idsComps=resource.components;
            let comps=componentsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: idsComps,allcomponents:comps});
        })
    }
    handleSelectChange(){
        const target = event.target;
        const value = target.value;
        if(value.toString().length > 0) {
            let arrayComp=value.toString().split("-");
            this.setState({
                componentcustomid: arrayComp[0]
            });
        }
        else {
            this.setState({
                componentcustomid: value.toString()
            });
        }
    }
    handleClick(){
        if(this.state.componentcustomid.length===0){
            Materialize.toast("Debe escogerse un componente",3000);
        }
        else{
            let idsComps=this.state.list;
            if(idsComps.indexOf(this.state.componentcustomid) === -1){
                idsComps.push(this.state.componentcustomid);
                tiResourcesContainer.update({_id:this.props.resourceid},{$set:{"components":idsComps}});
                this.setState({
                    list:idsComps
                });
            }
            else{
                Materialize.toast("El componente ya fue asignado",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <ResourceComponentsList resourcecustomid={this.props.resourcecustomid} resourceid={this.props.resourceid}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" onChange={this.handleSelectChange.bind(this)} style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.allcomponents.map((val, index)=>{
                                    return(
                                        <option key={"opt"+this.props.resourcecustomid+index}>{val.customid+"-"+val.name}</option>
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