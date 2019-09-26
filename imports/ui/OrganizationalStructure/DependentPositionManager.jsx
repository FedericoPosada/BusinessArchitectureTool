import React from 'react';
import {componentsContainer} from "../../api/components";
import {applicationsContainer} from "../../api/applications";
import DependentPositionsList from "./DependentPositionsList";
import {positionsContainer} from "../../api/positions";

export default class DependentPositionManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[],
            currentlist:this.props.dependentslist
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('positions');
            let positions = positionsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: positions});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currentlist: nextProps.dependentslist});
    }
    handleClick() {
        if (this.refs.depPosAdd.value.length === 0) {
            Materialize.toast("Debe escogerse un cargo", 3000);
        }
        else if(this.refs.depPosAdd.value.split("-")[0] === this.props.positioncustomid)
        {
            Materialize.toast("No puede escogerse el mismo cargo como dependiente.", 3000);
        }
        else{
            let arrayRes=this.refs.depPosAdd.value.split("-");
            let compItem={
                customid:arrayRes[0],
                name:arrayRes[1]
            }
            let item=positionsContainer.findOne({_id:this.props.positionid});
            let depList=item.dependents;
            let indexItem=-1;
            for(let i=0;i<depList.length && i !== -1;i++)
            {
                if(depList[i].customid === compItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                depList.push(compItem);
                positionsContainer.update({_id:this.props.positionid},{$set:{"dependents":depList}});
                let tempList=this.state.currentlist;
                tempList.push(compItem);
                this.setState({
                    currentlist:tempList
                })
            }
            else{
                Materialize.toast("El cargo dependiente ya fue asignado",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <DependentPositionsList positionid={this.props.positionid} dependentslist={this.state.currentlist}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="depPosAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"deppos"+this.props.positionid+index}>{val.customid+"-"+val.name}</option>
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