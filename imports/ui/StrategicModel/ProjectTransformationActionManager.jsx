 import React from 'react';
 import {transfActionsContainer} from "../../api/transfactions";
 import ProjectTransformationsList from "./ProjectTransformationsList";
 import {projectsContainer} from "../../api/projects";

export default class ProjectTransformationActionManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[],
            currentlist:this.props.actionlist
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('transfactions');
            Meteor.subscribe('projects');
            let actions = transfActionsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: actions});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currentlist: nextProps.actionlist});
    }

    handleClick(){
        if(this.refs.actitionCapAdd.value.length===0){
            Materialize.toast("Debe escogerse una acción",3000);
        }
        else{
            let arrayRes=this.refs.actitionCapAdd.value.split("-");
            let actItem={
                customid:arrayRes[0],
                name:arrayRes[1]
            }
            let item=projectsContainer.findOne({owner:Meteor.userId(),_id:this.props.projectid});
            let actList=item.actions;
            let indexItem=-1;
            for(let i=0;i<actList.length && i !== -1;i++)
            {
                if(actList[i].customid === actItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                actList.push(actItem);
                projectsContainer.update({_id:this.props.projectid},{$set:{"actions":actList}});
            }
            else{
                Materialize.toast("La acción ya fue asignada",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <ProjectTransformationsList projectid={this.props.projectid}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="actitionCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"opindact"+this.props.projectid+index}>{val.customid+"-"+val.name}</option>
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