import React from 'react';
import {componentsContainer} from "../../api/components";
import {applicationsContainer} from "../../api/applications";
import ApplicationComponentsList from "./ApplicationComponentsList";

export default class ApplicationComponentManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[],
            currentlist:this.props.componentslist
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('components');
            Meteor.subscribe('applications');
            let components = componentsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: components});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currentlist: nextProps.componentslist});
    }
    handleClick(){
        if(this.refs.compitionCapAdd.value.length===0){
            Materialize.toast("Debe escogerse un cargo",3000);
        }
        else{
            let arrayRes=this.refs.compitionCapAdd.value.split("-");
            let compItem={
                customid:arrayRes[0],
                name:arrayRes[1]
            }
            let item=applicationsContainer.findOne({_id:this.props.applicationid});
            let compList=item.components;
            let indexItem=-1;
            for(let i=0;i<compList.length && i !== -1;i++)
            {
                if(compList[i].customid === compItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                compList.push(compItem);
                applicationsContainer.update({_id:this.props.applicationid},{$set:{"components":compList}});
                let tempList=this.state.currentlist;
                tempList.push(compItem);
                this.setState({
                    currentlist:tempList
                })
            }
            else{
                Materialize.toast("El cargo ya fue asignado",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <ApplicationComponentsList applicationid={this.props.applicationid} componentslist={this.state.currentlist}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="compitionCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"appcomp"+this.props.applicationid+index}>{val.customid+"-"+val.name}</option>
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