import React from 'react';
import {processesContainer} from "../../api/processes";
import {opIndicatorsContainer} from "../../api/opindicators";
import OperativeIndicatorProcessesList from "./OperativeIndicatorProcessesList";

export default class OperativeIndicatorProcessManager extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            list:[],
            currentlist:this.props.positionlist
        };
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('processes');
            let processes = processesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: processes});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currentlist: nextProps.positionlist});
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
            let item=opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:this.props.indicatorid});
            let posList=item.processes;
            let indexItem=-1;
            for(let i=0;i<posList.length && i !== -1;i++)
            {
                if(posList[i].customid === posItem.customid)
                    indexItem=i;
            }
            if(indexItem === -1){
                posList.push(posItem);
                opIndicatorsContainer.update({_id:this.props.indicatorid},{$set:{"processes":posList}});
            }
            else{
                Materialize.toast("El cargo ya fue asignado",3000);
            }
        }
    }
    render(){
        return(
            <div>
                <OperativeIndicatorProcessesList indicatorid={this.props.indicatorid}/>
                <div className="row">
                    <div className="input-field col s1">
                    </div>
                    <div className="input-field col s8">
                        <td>
                            <select className="browser-default" ref="positionCapAdd" style={{"border": "1px solid #320","background-color": "transparent"}} >
                                <option></option>
                                { this.state.list.map((val, index)=>{
                                    return(
                                        <option key={"opindpos"+this.props.indicatorid+index}>{val.customid+"-"+val.name}</option>
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