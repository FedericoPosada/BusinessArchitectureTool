import React from 'react';
import {bSheetsContainer} from "../../api/bsheets";


export default class CashRatio extends React.Component{

    constructor(props){
        super(props);
        let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
        if(typeof bSheet !== "undefined") {
            this.state={
                cash: bSheet.cash,
                cliabilities: bSheet.totalcurrentl,
                meaning:""
            };
            this.calculateValue();
        }
        else
        this.state ={
            value:"",
            cash:0,
            cliabilities:0,
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
                    cash: bSheet.cash,
                    cliabilities: bSheet.totalcurrentl
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
            const cashr=this.state.cash/this.state.cliabilities;
            let meanVal="";
            if(cashr<1 && cashr>0)
                meanVal="La empresa está empleando su liquidez para generar ganancias.";
            else if(cashr>1)
                meanVal="La empresa podría no estar usando su liquidez para obtener ganancias.";
            else
                meanVal="La empresa tiene suficiente efectivo para pagar sus pasivos.";
            this.setState({
                value:cashr,
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
                            <h5>IF1.2. Razón de efectivo</h5>
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
                                <p style={{"font-style":"italic"}}>Efectivo y equivalentes de efectivo/Pasivos corrientes</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}