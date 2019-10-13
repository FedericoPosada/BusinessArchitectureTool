import React from 'react';
import {bSheetsContainer} from "../../api/bsheets";
import {financialContainer} from "../../api/finindicators";


export default class CurrentRatio extends React.Component{

    constructor(props){
        super(props);
        let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
        if(typeof bSheet !== "undefined") {
            this.state={
                cassets: bSheet.totalcurrent,
                cliabilities: bSheet.totalcurrentl,
                meaning:"",
                indid:""
            };
            this.calculateValue();
        }
        else
        this.state ={
            value:"",
            cassets:0,
            cliabilities:0,
            meaning:""
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bsheets');
            Meteor.subscribe('finindicators');
            let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
            console.log(bSheet);
            if(typeof bSheet !== "undefined") {
                this.setState({
                    cassets: bSheet.totalcurrent,
                    cliabilities: bSheet.totalcurrentl
                });
                this.calculateValue();
            }
            let finAcid=financialContainer.findOne({name:"Razón corriente"});
            if(typeof finAcid !== "undefined")
                this.setState({
                    indid:finAcid._id
                })
        })
    }
    calculateValue(){
        if(this.state.cliabilities === 0)
            this.setState({
                value:"No se tiene suficiente información para calcularlo"
            });
        else
        {
            const cratio=this.state.cassets/this.state.cliabilities;
            let meanVal="";
            if(cratio<1)
                meanVal="La empresa podría tener problemas para pagar obligaciones a corto plazo.";
            else
                meanVal="La empresa es capaz de manejar obligaciones a corto plazo.";
            this.setState({
                value:cratio,
                meaning:meanVal
            });
            if(this.state.indid !== "")
                financialContainer.update({_id:this.state.indid},{$set:{value:cratio}});
            else
                financialContainer.insert({name:"Razón corriente",value:cratio});
        }
    }
    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <h5>IF1.1. Razón corriente</h5>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Valor:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                <p>{
                                    this.state.value
                                }
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Significado:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                <p style={{"font-style":"italic"}}>{
                                    this.state.meaning
                                }</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Cálculo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                <p style={{"font-style":"italic"}}>Activos corrientes/Pasivos corrientes</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}