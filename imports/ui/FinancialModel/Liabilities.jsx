import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";
import {bSheetsContainer} from "../../api/bsheets";


export default class Liabilities extends React.Component{

    constructor(props){
        super(props);
        this.state={
            _id:"",
            accountspayable:0,
            financialliabilities:0,
            unearnedrevenue:0,
            longtermdebt:0,
            otherlongtermliabilities:0,
            treasuryshares:0,
            additionalpaidin:0,
            comprehensiveloss:0,
            retainedearnings:0,
            totalcurrentl:0,
            totalnoncurrentl:0,
            totalequity:0,
            total:0,
            isInEditMode:false
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bsheets');
            let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
            if(typeof bSheet !== 'undefined'){
                this.setState({
                    accountspayable:bSheet.accountspayable,
                    financialliabilities:bSheet.financialliabilities,
                    unearnedrevenue:bSheet.unearnedrevenue,
                    longtermdebt:bSheet.longtermdebt,
                    otherlongtermliabilities: bSheet.otherlongtermliabilities,
                    treasuryshares:bSheet.treasuryshares,
                    additionalpaidin:bSheet.additionalpaidin,
                    comprehensiveloss:bSheet.comprehensiveloss,
                    retainedearnings:bSheet.retainedearnings,
                    totalcurrentl:bSheet.totalcurrentl,
                    totalnoncurrentl:bSheet.totalnoncurrentl,
                    totalequity:bSheet.totalequity,
                    total:bSheet.total,
                    _id:bSheet._id
                });
            }
        })
    }

    changeEditMode(){
        if(this.state.isInEditMode)
        {
                this.calculateTotals();
                this.updateAssets();
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
        let currentassets=[];
        currentassets[0]=this.refs.accountspayable.value;
        currentassets[1]=this.refs.financialliabilities.value;
        currentassets[2]=this.refs.unearnedrevenue.value;
        let totalcurrentl=0;
        for(let i=0;i <currentassets.length;i++)
        {
            console.log(currentassets[i]);
            if(currentassets[i].length===0)
                totalcurrentl+=0;
            else
                totalcurrentl+=parseInt(currentassets[i]);
        }
        let totalnoncurrentl=0;
        let noncurrent=[];
        noncurrent[0]=this.refs.otherlongtermliabilities.value;
        noncurrent[1]=this.refs.longtermdebt.value;
        for(let i=0;i < noncurrent.length;i++)
        {
            if(noncurrent[i].length===0)
                totalnoncurrentl+=0;
            else
                totalnoncurrentl+=parseInt(noncurrent[i]);
        }
        let totalequity=0;
        let equity=[];
        equity[0]=this.refs.retainedearnings.value;
        equity[1]=this.refs.treasuryshares.value;
        equity[2]=this.refs.additionalpaidin.value;
        equity[3]=this.refs.comprehensiveloss.value;
        for(let i=0;i < equity.length;i++)
        {
            if(equity[i].length===0)
                totalequity+=0;
            else
                totalequity+=parseInt(equity[i]);
        }
        this.setState({
            totalcurrentl:totalcurrentl,
            totalnoncurrentl:totalnoncurrentl,
            totalequity:totalcurrentl+totalnoncurrentl
        })
        this.refs.totalcurrentl.value=totalcurrentl;
        this.refs.totalnoncurrentl.value=totalnoncurrentl;
        this.refs.totalequity.value=totalequity;
        this.refs.total.value=totalnoncurrentl+totalcurrentl+totalequity;

    }

    updateAssets(){
        bSheetsContainer.update({_id:this.state._id},
            {$set:{
                        accountspayable:this.refs.accountspayable.value,
                        financialliabilities:this.refs.financialliabilities.value,
                        unearnedrevenue:this.refs.unearnedrevenue.value,
                        longtermdebt:this.refs.longtermdebt.value,
                        otherlongtermliabilities:this.refs.otherlongtermliabilities.value,
                        treasuryshares:this.refs.treasuryshares.value,
                        additionalpaidin:this.refs.additionalpaidin.value,
                        comprehensiveloss:this.refs.comprehensiveloss.value,
                        retainedearnings:this.refs.retainedearnings.value,
                        totalcurrentl:this.refs.totalcurrentl.value,
                        totalnoncurrentl:this.refs.totalnoncurrentl.value,
                        totalequity:this.refs.totalequity.value,
                        total:this.refs.total.value,
                    }
                }, (err,done)=>{
                    if (err)
                        Materialize.toast("Ha ocurrido un error al guardar el componente motivacional.",3000);
                    else
                        Materialize.toast("Se han actualizado los activos",3000);
                });
    }

    renderEdit() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s4">
                        <h4 style={{"marginLeft":"20px"}} >Pasivos</h4>
                    </div>
                    <div className="input-field col s2">
                        <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{"marginTop":"20px"}}>
                            <i className="material-icons">check</i></a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s4">
                                <h5 style={{"marginLeft":"20px"}}>Pasivos corrientes</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Cuentas por pagar:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="accountspayable" ref="accountspayable" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.accountspayable}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Gastos acumulados:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="financialliabilities" ref="financialliabilities" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.financialliabilities}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ingresos no devengados:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="unearnedrevenue" ref="unearnedrevenue" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.unearnedrevenue}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total pasivos corrientes:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalcurrentl" ref="totalcurrentl" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalcurrentl} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <h5 style={{"marginLeft":"20px"}}>Pasivos no corrientes</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Deuda a largo plazo:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="longtermdebt" ref="longtermdebt" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.longtermdebt}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Otros pasivos a largo plazo:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="otherlongtermliabilities" ref="otherlongtermliabilities" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.otherlongtermliabilities}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total pasivos no corrientes:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalnoncurrentl" ref="totalnoncurrentl" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalnoncurrentl} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <h4 style={{"marginLeft":"20px"}}>Patrimonio:</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Autocartera:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="treasuryshares" ref="treasuryshares" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.treasuryshares}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Capital pagado adicional:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="additionalpaidin" ref="additionalpaidin" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.additionalpaidin}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Otra pérdida integral acumulada:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="comprehensiveloss" ref="comprehensiveloss" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.comprehensiveloss}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Utilidades retenidas:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="retainedearnings" ref="retainedearnings" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.retainedearnings}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total patrimonio:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalequity" ref="totalequity" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalequity} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total patrimonio:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="total" ref="total" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.total} disabled={true}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
    }

    renderDefault() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s4">
                        <h4 style={{"marginLeft":"20px"}}>Pasivos</h4>
                    </div>
                    <div className="input-field col s2">
                        <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{"marginTop":"20px"}}>
                            <i className="material-icons">edit</i></a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s4">
                                <h5 style={{"marginLeft":"20px"}}>Pasivos corrientes</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Cuentas por pagar:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.accountspayable}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Gastos acumulados:</label>
                            </div>
                            <div className="input-field col s6">
                            <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.financialliabilities}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ingresos no devengados:</label>
                            </div>
                            <div className="input-field col s6">
                            <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.unearnedrevenue}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total pasivos corrientes:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.totalcurrentl}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <h5 style={{"marginLeft":"20px"}}>Pasivos no corrientes</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Deuda a largo plazo:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.longtermdebt}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Otros pasivos a largo plazo:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.otherlongtermliabilities}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total pasivos no corrientes:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.totalnoncurrentl} </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <h4 style={{"marginLeft":"20px"}}>Patrimonio:</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Autocartera:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.treasuryshares}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Capital pagado adicional:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.additionalpaidin}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Otra pérdida integral acumulada:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.comprehensiveloss}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Utilidades retenidas:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.retainedearnings}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total patrimonio:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.totalequity}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total pasivos y patrimonio:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.total} </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}