import React from 'react';
import {cashFlowsContainer} from "../../api/cashflows";


export default class CashFlow extends React.Component{

    constructor(props){
        super(props);
        this.state={
            _id:"",
            cashbeginning:0,
            netincome:0,
            depreciation:0,
            stockcompensation:0,
            opexpense:0,
            deferredinc:0,
            inventories:0,
            accreceivable:0,
            accpayable:0,
            otherliabilities:0,
            purchasesproperty:0,
            incentivesproperty:0,
            salesmarketablesecurities:0,
            purchasesmarketablesecurities:0,
            proceedslongterm:0,
            repaymentslongterm:0,
            leasespayments:0,
            cashoperativeactivities:0,
            cashinvestmentactivities:0,
            cashfinancingactivities:0,
            cashincrease:0,
            finalcash:0,
            isInEditMode:false
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('cashflows');
            let cashFlow = cashFlowsContainer.findOne({owner:Meteor.userId()});
            if(typeof cashFlow !== 'undefined'){
                this.setState({
                    _id:cashFlow._id,
                    cashbeginning:cashFlow.cashbeginning,
                    netincome:cashFlow.netincome,
                    depreciation:cashFlow.depreciation,
                    stockcompensation:cashFlow.stockcompensation,
                    opexpense:cashFlow.opexpense,
                    deferredinc:cashFlow.deferredinc,
                    inventories:cashFlow.inventories,
                    accreceivable:cashFlow.accreceivable,
                    accpayable:cashFlow.accpayable,
                    otherliabilities:cashFlow.otherliabilities,
                    purchasesproperty:cashFlow.purchasesproperty,
                    incentivesproperty:cashFlow.incentivesproperty,
                    salesmarketablesecurities:cashFlow.salesmarketablesecurities,
                    purchasesmarketablesecurities:cashFlow.purchasesmarketablesecurities,
                    proceedslongterm:cashFlow.proceedslongterm,
                    repaymentslongterm:cashFlow.repaymentslongterm,
                    leasespayments:cashFlow.leasespayments,
                    cashoperativeactivities:cashFlow.cashoperativeactivities,
                    cashinvestmentactivities:cashFlow.cashinvestmentactivities,
                    cashfinancingactivities:cashFlow.cashfinancingactivities,
                    cashincrease:cashFlow.cashincrease,
                    finalcash:cashFlow.finalcash,
                });
            }
            else{
                const id=Meteor.userId()+"cashFlow";
                let newbSheet={
                    _id:id,
                    cashbeginning:0,
                    netincome:0,
                    depreciation:0,
                    stockcompensation:0,
                    opexpense:0,
                    deferredinc:0,
                    inventories:0,
                    accreceivable:0,
                    accpayable:0,
                    otherliabilities:0,
                    purchasesproperty:0,
                    incentivesproperty:0,
                    salesmarketablesecurities:0,
                    purchasesmarketablesecurities:0,
                    proceedslongterm:0,
                    repaymentslongterm:0,
                    leasespayments:0,
                    cashoperativeactivities:0,
                    cashinvestmentactivities:0,
                    cashfinancingactivities:0,
                    cashincrease:0,
                    finalcash:0,
                    owner:Meteor.userId()
                };
                this.setState({
                    _id:id
                })
                cashFlowsContainer.insert(newbSheet);
            }
        })
    }

    changeEditMode(){
        if(this.state.isInEditMode)
        {
            this.calculateTotals();
            this.updateStatement();
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })

        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }

    calculateTotals(){
        let operative=[];
        operative[0]=this.refs.netincome.value;
        operative[1]=this.refs.depreciation.value;
        operative[2]=this.refs.stockcompensation.value;
        operative[3]=this.refs.opexpense.value;
        operative[4]=this.refs.deferredinc.value;
        operative[5]=this.refs.inventories.value;
        operative[6]=this.refs.accreceivable.value;
        operative[7]=this.refs.accpayable.value;
        operative[8]=this.refs.otherliabilities.value;
        let totaloperative=0;
        for(let i=0;i <operative.length;i++)
        {
            console.log(operative[i]);
            if(operative[i].length===0)
                totaloperative+=0;
            else {
                try {
                    totaloperative += parseInt(operative[i]);
                }
                catch (e) {
                    totaloperative +=0;
                }
            }
        }
        let totalinv=0;
        let inversion=[];
        inversion[0]=this.refs.purchasesproperty.value;
        inversion[1]=this.refs.incentivesproperty.value;
        inversion[2]=this.refs.salesmarketablesecurities.value;
        inversion[3]=this.refs.purchasesmarketablesecurities.value;
        for(let i=0;i < inversion.length;i++)
        {
            if(inversion[i].length===0)
                totalinv+=0;
            else {
                try {
                    totalinv += parseInt(inversion[i]);
                }
                catch (e) {
                    totalinv +=0;
                }
            }
        }
        let totalfinance=0;
        let finance=[];
        finance[0]=this.refs.proceedslongterm.value;
        finance[1]=this.refs.repaymentslongterm.value;
        finance[2]=this.refs.leasespayments.value;
        for(let i=0;i < finance.length;i++)
        {
            if(finance[i].length===0)
                totalfinance+=0;
            else {
                try {
                    totalfinance += parseInt(finance[i]);
                }
                catch (e) {
                    totalfinance +=0;
                }
            }
        }
        let cashbeg=0;
        try {
            cashbeg = parseInt(this.refs.cashbeginning.value);
        }
        catch (e) {
        }
        let finalcash=totaloperative+totalinv+totalfinance+cashbeg;
        let inc=finalcash-this.state.cashbeginning;

        this.setState({
            cashoperativeactivities:totaloperative,
            cashinvestmentactivities:totalinv,
            cashfinancingactivities:totalfinance,
            finalcash:finalcash,
            cashincrease:inc
        });
        this.refs.cashoperativeactivities.value=totaloperative;
        this.refs.cashinvestmentactivities.value=totalinv;
        this.refs.cashfinancingactivities.value=totalfinance;
        this.refs.cashincrease.value=inc;
        this.refs.finalcash.value=finalcash;
    }

    updateStatement(){
        cashFlowsContainer.update({_id:this.state._id},
            {$set:{
                    cashbeginning:this.refs.cashbeginning.value,
                    netincome:this.refs.netincome.value,
                    depreciation:this.refs.depreciation.value,
                    stockcompensation:this.refs.stockcompensation.value,
                    opexpense:this.refs.opexpense.value,
                    deferredinc:this.refs.deferredinc.value,
                    inventories:this.refs.inventories.value,
                    accreceivable:this.refs.accreceivable.value,
                    accpayable:this.refs.accpayable.value,
                    otherliabilities:this.refs.otherliabilities.value,
                    purchasesproperty:this.refs.purchasesproperty.value,
                    incentivesproperty:this.refs.incentivesproperty.value,
                    salesmarketablesecurities:this.refs.salesmarketablesecurities.value,
                    purchasesmarketablesecurities:this.refs.purchasesmarketablesecurities.value,
                    proceedslongterm:this.refs.proceedslongterm.value,
                    repaymentslongterm:this.refs.repaymentslongterm.value,
                    leasespayments:this.refs.leasespayments.value,
                    cashoperativeactivities:this.refs.cashoperativeactivities.value,
                    cashinvestmentactivities:this.refs.cashinvestmentactivities.value,
                    cashfinancingactivities:this.refs.cashfinancingactivities.value,
                    cashincrease:this.refs.cashincrease.value,
                    finalcash:this.refs.finalcash.value,
                }
            }, (err,done)=>{
                if (err)
                    Materialize.toast("Ha ocurrido un error al guardar el componente motivacional.",3000);
                else
                    Materialize.toast("Se ha actualizado el estado de ingresos y egresos.",3000);
            });
    }

    renderEdit() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s3">
                    </div>
                    <div className="input-field col s5">
                        <h4 style={{"marginLeft":"20px"}} >Flujo de caja</h4>
                    </div>
                    <div className="input-field col s2">
                        <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{"marginTop":"20px"}}>
                            <i className="material-icons">check</i></a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s3">
                    </div>
                    <div className="input-field col s6">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo y equivalentes de efectivo al inicio del periodo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="cashbeginning" ref="cashbeginning" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.cashbeginning}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Utilidad neta del ejercicio:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="netincome" ref="netincome" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.netincome}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Depreciación:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="depreciation" ref="depreciation" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.depreciation}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Compensación basada en acciones:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="stockcompensation" ref="stockcompensation" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.stockcompensation}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Otros gastos operativos:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="opexpense" ref="opexpense" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.opexpense}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Impuestos diferidos sobre la renta:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="deferredinc" ref="deferredinc" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.deferredinc}/>
                                </div>
                            </div>
                            <div className="row">
                                <h5>Cambios en activos y pasivos:</h5>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Inventarios:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="inventories" ref="inventories" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.inventories}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Cuentas por cobrar:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="accreceivable" ref="accreceivable" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.accreceivable}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Cuentas por pagar:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="accpayable" ref="accpayable" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.accpayable}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Otros pasivos:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="otherliabilities" ref="otherliabilities" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.otherliabilities}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo neto provisto por actividades de operación:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="cashoperativeactivities" ref="cashoperativeactivities" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.cashoperativeactivities} disabled={true}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Adquisición de propiedad, planta y equipo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="purchasesproperty" ref="purchasesproperty" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.purchasesproperty}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Venta de propiedad, planta y equipo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="incentivesproperty" ref="incentivesproperty" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.incentivesproperty}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Compra de valores negociables:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="purchasesmarketablesecurities" ref="purchasesmarketablesecurities" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.purchasesmarketablesecurities}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Venta de valores negociables:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="salesmarketablesecurities" ref="salesmarketablesecurities" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.salesmarketablesecurities}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo neto provisto por actividades de inversión:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="cashinvestmentactivities" ref="cashinvestmentactivities" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.cashinvestmentactivities} disabled={true}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Ingresos por deudas a largo plazo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="proceedslongterm" ref="proceedslongterm" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.proceedslongterm}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Pago de deudas a largo plazo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="repaymentslongterm" ref="repaymentslongterm" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.repaymentslongterm}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Pago por arrendamientos financieros y de capital:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="leasespayments" ref="leasespayments" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.leasespayments} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo neto provisto por actividades de financiación:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="cashfinancingactivities" ref="cashfinancingactivities" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.cashfinancingactivities} disabled={true}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Incremento neto sobre el efectivo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="cashincrease" ref="cashincrease" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.cashincrease} disabled={true}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo y equivalentes de efectivo al final del periodo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <input id="finalcash" ref="finalcash" type="number" className="validate" style={{"text-align":"center"}}
                                           defaultValue={this.state.finalcash} disabled={true}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    renderDefault() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s3">
                    </div>
                    <div className="input-field col s5">
                        <h4 style={{"marginLeft":"20px"}} >Flujo de caja</h4>
                    </div>
                    <div className="input-field col s2">
                        <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{"marginTop":"20px"}}>
                            <i className="material-icons">edit</i></a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s3">
                    </div>
                    <div className="input-field col s6">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo y equivalentes de efectivo al inicio del periodo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.cashbeginning).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Utilidad neta del ejercicio:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.netincome).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Depreciación:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.depreciation).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Compensación basada en acciones:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.stockcompensation).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Otros gastos operativos:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.opexpense).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Impuestos diferidos sobre la renta:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.deferredinc).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <h5>Cambios en activos y pasivos:</h5>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Inventarios:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.inventories).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Cuentas por cobrar:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.accreceivable).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Cuentas por pagar:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.accpayable).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Otros pasivos:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.otherliabilities).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo neto provisto por actividades de operación:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.cashoperativeactivities).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Adquisición de propiedad, planta y equipo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.purchasesproperty).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Venta de propiedad, planta y equipo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.incentivesproperty).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Compra de valores negociables:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.purchasesmarketablesecurities).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Venta de valores negociables:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.salesmarketablesecurities).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo neto provisto por actividades de inversión:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.cashinvestmentactivities).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Ingresos por deudas a largo plazo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.proceedslongterm).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Pago de deudas a largo plazo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.repaymentslongterm).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Pago por arrendamientos financieros y de capital:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.leasespayments).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo neto provisto por actividades de financiación:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.cashfinancingactivities).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Incremento neto sobre el efectivo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.cashincrease).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="input-field col s8">
                                    <label style={{"marginLeft":"10px","marginRight":"30px"}}>Efectivo y equivalentes de efectivo al final del periodo:</label>
                                </div>
                                <div className="input-field col s4">
                                    <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.finalcash).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}