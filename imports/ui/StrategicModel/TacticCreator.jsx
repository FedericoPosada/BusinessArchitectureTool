import React from 'react';
import {strategiesContainer} from "../../api/strategies";
import {tacticsContainer} from "../../api/tactics";
import TacticList from "./TacticList";

export default class TacticCreator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            strategylist:[]
        }
        this.handleClick=this.handleClick.bind(this);
    }
    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('strategies');
            Meteor.subscribe('tactics');
            let strategies = strategiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({strategylist: strategies});
        })
    }
    checkFields(){
        if(this.refs.tacNameCreate.value.length === 0 ||this.refs.tacStrategySelectCreate.value.length === 0 )
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    handleClick(){
        if(this.checkFields()) {
            let tacticcustomid;
            let strategy = this.refs.tacStrategySelectCreate.value.toString();
            let tacfirstpart=strategy.replace("E","T");
            if (tacticsContainer.find({"strategy": strategy,owner:Meteor.userId()}).count() === 0) {
                tacticcustomid = tacfirstpart+"1.";
            } else {
                let customIdLastNumber = '';
                let lastTac = tacticsContainer.find({"strategy": strategy,owner:Meteor.userId()}).fetch();
                let customIdLast = lastTac[lastTac.length - 1].customid;
                let arrayIdLast=customIdLast.split(".");
                let lastnumbers=arrayIdLast[3];
                for (let i = 0; i < lastnumbers.length; i++) {
                    customIdLastNumber += lastnumbers.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                tacticcustomid = tacfirstpart+lastnumber+".";
            }
            let name = this.refs.tacNameCreate.value.toString();
            let bstrat = {
                customid: tacticcustomid,
                name: name,
                strategy: strategy,
                owner:Meteor.userId()
            };
            tacticsContainer.insert(bstrat, (err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear la tactica. Inténtelo de nuevo.",3000);
            });
            this.refs.tacNameCreate.value = "";
            this.refs.tacStrategySelectCreate.value = "";
        }
    }
    render(){
        return (
            <div>
                <h4>Tácticas:</h4>
                <TacticList/>
                <div className="row">
                    <div className="input-field col s4">
                        <input  ref="tacNameCreate" type="text" className="validate"/>
                            <label htmlFor="tacNameCreate">Nombre</label>
                    </div>
                    <div className="input-field col s1">
                    <select className="browser-default" ref="tacStrategySelectCreate" defaultValue={this.props.strategie} style={{width:"100%"}}>
                        <option></option>
                        { this.state.strategylist.map((val, index)=>{
                            return(
                                <option>{val.customid}</option>
                            )
                        }) }
                    </select>
                    </div>
                    <div className="input-field col s2">
                    <a onClick={this.handleClick} className="waves-effect waves-light btn light-green" style={{marginTop:5}}><i className="material-icons left">add</i>Agregar</a>
                    </div>
                </div>
             </div>
    )
    }
}