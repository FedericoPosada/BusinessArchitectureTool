import React from 'react';
import {bSheetsContainer} from "../../api/bsheets";


export default class AcidTest extends React.Component{

    constructor(props){
        super(props);
        let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
        if(typeof bSheet !== "undefined") {
            this.state={
                cassets: bSheet.totalcurrent,
                cliabilities: bSheet.totalcurrentl,
                inventories: bSheet.inventories,
                meaning:""
            };
            this.calculateValue();
        }
        else
        this.state ={
            value:"",
            cassets:0,
            cliabilities:0,
            inventories:0,
            meaning:""
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bsheets');
            let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
            console.log(bSheet);
            if(typeof bSheet !== "undefined") {
                this.setState({
                    cassets: bSheet.totalcurrent,
                    cliabilities: bSheet.totalcurrentl,
                    inventories: bSheet.inventories
                });
                this.calculateValue();
            }
        })
    }
    calculateValue(){
        if(this.state.cliabilities === 0)
            this.setState({
                value:"No se tiene suficiente información para calcularlo"
            });
        else
        {
            const acidt=(this.state.cassets-this.state.inventories)/this.state.cliabilities;
            let meanVal="No se tiene suficiente información.";
            if(acidt<1 && acidt>0)
                meanVal="La empresa está en problemas para pagar obligaciones a corto plazo.";
            else if(acidt>1)
                meanVal="La empresa tiene suficiente liquidez para manejar obligaciones a corto plazo.";
            this.setState({
                value:acidt,
                meaning:meanVal
            });
        }
    }
    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <h5>IF1.2. Razón ácida</h5>
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
                                <p style={{"font-style":"italic"}}>(Activos corrientes - Inventarios)/Pasivos corrientes</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}