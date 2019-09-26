import React from 'react';
import {objectivesContainer} from "../../api/objectives";
import {strategiesContainer} from "../../api/strategies";
import StrategyList from "./StrategyList";

export default class StrategyCreator extends React.Component {
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
            Meteor.subscribe('strategies')
            let objectives = objectivesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({objectivelist: objectives});
        })
    }
    checkFields(){
        if(this.refs.stratNameCreate.value.length === 0 ||this.refs.stratobjectiveSelectCreate.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let stratcustomid;
            let objective = this.refs.stratobjectiveSelectCreate.value.toString();
            let objnumber = objective.substring(1,objective.length);
            if (strategiesContainer.find({"objective": objective,"owner":Meteor.userId()}).count() === 0) {
                stratcustomid = 'E.'+objnumber+".1.";
            } else {
                let customIdLastNumber = '';
                let lastGoal = strategiesContainer.find({"objective": objective,"owner":Meteor.userId()}).fetch();
                let customIdLast = lastGoal[lastGoal.length - 1].customid;
                for (let i = 3+objnumber.length; i < customIdLast.length-1; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                stratcustomid = "E."+objnumber+"."+lastnumber+".";
            }
            let stratname = this.refs.stratNameCreate.value.toString();
            let bstrat = {
                customid: stratcustomid,
                name: stratname,
                objective: objective,
                owner:Meteor.userId()
            };
            strategiesContainer.insert(bstrat, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la estrategia. Inténtelo de nuevo.",3000);
            });
            this.refs.stratNameCreate.value = "";
            this.refs.stratobjectiveSelectCreate.value = "";
        }
    }
    render(){
        return (
            <div>
                <h4>Estrategias:</h4>
                <StrategyList/>
                <div className="row">
                    <div className="input-field col s4">
                        <input  ref="stratNameCreate" type="text" className="validate"/>
                            <label htmlFor="stratNameCreate">Nombre</label>
                    </div>
                    <div className="input-field col s1">
                    <select className="browser-default" ref="stratobjectiveSelectCreate" defaultValue={this.props.objective} style={{width:"100%"}}>
                        <option></option>
                        { this.state.objectivelist.map((val, index)=>{
                            return(
                                <option>{val.customid}</option>
                            )
                        }) }
                    </select>
                    </div>
                    <div className="input-field col s3">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
             </div>
    )
    }
}