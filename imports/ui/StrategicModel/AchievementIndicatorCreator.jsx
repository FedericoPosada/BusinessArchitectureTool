import React from 'react';
import {goalsContainer} from "../../api/goals";
import {achIndicatorsContainer} from "../../api/achindicators";
import AchievementIndicatorList from "./AchievementIndicatorList";

export default class AchievementIndicatorCreator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            goallist:[]
        }
        this.handleClick=this.handleClick.bind(this);

    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('goals');
            Meteor.subscribe('achindicators');
            let goals = goalsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({goallist: goals});
        })
    }
    checkFields(){
        if(this.refs.achDescCreate.value.length === 0 ||this.refs.achgoalSelectCreate.value.length === 0 ||this.refs.achdeadlineCreate.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let achindcustomid;
            let goal = this.refs.achgoalSelectCreate.value.toString();
            let tacfirstpart=goal.replace("M","IL");
            if (achIndicatorsContainer.find({"goal": goal,owner:Meteor.userId()}).count() === 0) {
                achindcustomid = tacfirstpart+"1.";
            } else {
                let customIdLastNumber = '';
                let lastTac = achIndicatorsContainer.find({"goal": goal,owner:Meteor.userId()}).fetch();
                let customIdLast = lastTac[lastTac.length - 1].customid;
                let arrayIdLast=customIdLast.split(".");
                let lastnumbers=arrayIdLast[2];
                for (let i = 0; i < lastnumbers.length; i++) {
                    customIdLastNumber += lastnumbers.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                achindcustomid = tacfirstpart+lastnumber+".";
            }
            let description = this.refs.achDescCreate.value.toString();
            let deadline = this.refs.achdeadlineCreate.value.toString();
            let ach = {
                customid: achindcustomid,
                description: description,
                goal: goal,
                deadline: deadline,
                owner:Meteor.userId()
            };
            achIndicatorsContainer.insert(ach, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el indicador. Inténtelo de nuevo.",3000);
            });
            this.refs.achDescCreate.value = "";
            this.refs.achgoalSelectCreate.value = "";
            this.refs.achdeadlineCreate.value = "";
        }
    }
    render(){
        return (
            <div>
                <h4 style={{"marginLeft":"14"}}>Indicadores de logro:</h4>
                <AchievementIndicatorList style={{"marginLeft":"14"}}/>
                <div className="row">
                    <div className="input-field col s4">
                        <input  ref="achDescCreate" type="text" className="validate"/>
                            <label htmlFor="achDescCreate">Nombre</label>
                    </div>
                    <div className="input-field col s1">
                    <select className="browser-default" ref="achgoalSelectCreate" style={{width:"100%"}}>
                        <option></option>
                        { this.state.goallist.map((val, index)=>{
                            return(
                                <option>{val.customid}</option>
                            )
                        }) }
                    </select>
                    </div>
                    <div className="input-field col s2">
                        <input ref="achdeadlineCreate" placeholder="Fecha límite" type="date" style={{width:"80%"}}
                               className="validate" />
                    </div>
                    <div className="input-field col s3">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>

             </div>
    )
    }
}