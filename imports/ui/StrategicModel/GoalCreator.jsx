import React from 'react';
import {goalsContainer} from "../../api/goals";
import GoalList from "./GoalList";
import {objectivesContainer} from "../../api/objectives";
import {stIndicatorsContainer} from "../../api/stindicators";

export default class GoalCreator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            objectivelist:[]
        }
        this.handleClick=this.handleClick.bind(this);
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('objectives');
            Meteor.subscribe('goals')
            let objectives = objectivesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({objectivelist: objectives});
        })
    }
    checkFields(){
        if(this.refs.goalNameCreate.value.length === 0 ||this.refs.objectiveSelectCreate.value.length === 0 ||this.refs.deadlineCreate.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let goalcustomid;
            let objective = this.refs.objectiveSelectCreate.value.toString();
            let objnumber = objective.substring(1,objective.length);
            if (goalsContainer.find({"objective": objective,owner:Meteor.userId()}).count() === 0) {
                goalcustomid = 'M'+objnumber+".1.";
            } else {
                let customIdLastNumber = '';
                let lastGoal = goalsContainer.find({"objective": objective,owner:Meteor.userId()}).fetch();
                let customIdLast = lastGoal[lastGoal.length - 1].customid;
                for (let i = 2+objnumber.length; i < customIdLast.length-1; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                goalcustomid = "M"+objnumber+"."+lastnumber+".";
            }
            let goalname = this.refs.goalNameCreate.value.toString();
            let deadline = this.refs.deadlineCreate.value.toString();
            let bgoal = {
                customid: goalcustomid,
                name: goalname,
                objective: objective,
                deadline: deadline,
                owner:Meteor.userId()
            };
            goalsContainer.insert(bgoal, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la meta. Inténtelo de nuevo.",3000);
            });
            this.refs.goalNameCreate.value = "";
            this.refs.objectiveSelectCreate.value = "";
            this.refs.deadlineCreate.value = "";
        }
    }
    render(){
        return (
            <div>
                <h4>Metas:</h4>
                <GoalList/>
                <div className="row">
                    <div className="input-field col s5">
                        <input  ref="goalNameCreate" type="text" className="validate"/>
                            <label htmlFor="goalname">Nombre</label>
                    </div>
                    <div className="input-field col s1">
                    <select className="browser-default" ref="objectiveSelectCreate" defaultValue={this.props.objective} style={{width:"100%"}}>
                        <option></option>
                        { this.state.objectivelist.map((val, index)=>{
                            return(
                                <option>{val.customid}</option>
                            )
                        }) }
                    </select>
                    </div>
                    <div className="input-field col s2">
                        <input ref="deadlineCreate" placeholder="Fecha límite" type="date" style={{width:"80%"}}
                               defaultValue={this.props.deadline} className="validate" />
                    </div>
                    <div className="input-field col s3">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
             </div>
    )
    }
}