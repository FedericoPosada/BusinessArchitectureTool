import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";
import {bSheetsContainer} from "../../api/bsheets";
import {incomeStatementsContainer} from "../../api/istatements";


export default class IncomeStatement extends React.Component{

    constructor(props){
        super(props);
        this.state={
            _id:"",
            productnetsales:0,
            servicenetsales:0,
            salescost:0,
            marketing:0,
            technology:0,
            adminexpenses:0,
            otheropexpenses:0,
            operationalincome:0,
            interestincome:0,
            interestexpense:0,
            othernetincome:0,
            taxes:0,
            investmentincome:0,
            totalnetsales:0,
            totalopexpenses:0,
            incomebeftaxes:0,
            netincome:0,
            isInEditMode:false
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('istatements');
            let iStatement = incomeStatementsContainer.findOne({owner:Meteor.userId()});
            if(typeof iStatement !== 'undefined'){
                this.setState({
                    _id:iStatement._id,
                    productnetsales:iStatement.productnetsales,
                    servicenetsales:iStatement.servicenetsales,
                    salescost:iStatement.salescost,
                    marketing:iStatement.marketing,
                    technology:iStatement.technology,
                    adminexpenses:iStatement.adminexpenses,
                    otheropexpenses:iStatement.otheropexpenses,
                    operationalincome:iStatement.operationalincome,
                    interestincome:iStatement.interestincome,
                    interestexpense:iStatement.interestexpense,
                    othernetincome:iStatement.othernetincome,
                    taxes:iStatement.taxes,
                    investmentincome:iStatement.investmentincome,
                    totalnetsales:iStatement.totalnetsales,
                    totalopexpenses:iStatement.totalopexpenses,
                    incomebeftaxes:iStatement.incomebeftaxes,
                    netincome:iStatement.netincome
                });
            }
            else{
                const id=Meteor.userId()+"iStatement";
                let newbSheet={
                    _id:id,
                    productnetsales:0,
                    servicenetsales:0,
                    salescost:0,
                    marketing:0,
                    technology:0,
                    adminexpenses:0,
                    otheropexpenses:0,
                    operationalincome:0,
                    interestincome:0,
                    interestexpense:0,
                    othernetincome:0,
                    taxes:0,
                    investmentincome:0,
                    totalnetsales:0,
                    totalopexpenses:0,
                    incomebeftaxes:0,
                    netincome:0,
                    owner:Meteor.userId()
                };
                this.setState({
                    _id:id
                })
                incomeStatementsContainer.insert(newbSheet);
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
        let sales=[];
        sales[0]=this.refs.productnetsales.value;
        sales[1]=this.refs.servicenetsales.value;
        let totalsales=0;
        for(let i=0;i <sales.length;i++)
        {
            console.log(sales[i]);
            if(sales[i].length===0)
                totalsales+=0;
            else
                totalsales+=parseInt(sales[i]);
        }
        let totalopexp=0;
        let opexpenses=[];
        opexpenses[0]=this.refs.salescost.value;
        opexpenses[1]=this.refs.marketing.value;
        opexpenses[2]=this.refs.technology.value;
        opexpenses[3]=this.refs.adminexpenses.value;
        opexpenses[4]=this.refs.otheropexpenses.value;
        for(let i=0;i < opexpenses.length;i++)
        {
            if(opexpenses[i].length===0)
                totalopexp+=0;
            else
                totalopexp+=parseInt(opexpenses[i]);
        }
        let incbeftax=0;
        let incomesbeftax=[];
        incomesbeftax[0]=this.refs.operationalincome.value;
        incomesbeftax[1]=this.refs.interestincome.value;
        incomesbeftax[2]=this.refs.interestexpense.value;
        incomesbeftax[3]=this.refs.othernetincome.value;
        for(let i=0;i < incomesbeftax.length;i++)
        {
            if(incomesbeftax[i].length===0)
                incbeftax+=0;
            else
                incbeftax+=parseInt(incomesbeftax[i]);
        }
        let other=[];
        other[0]=this.refs.taxes.value;
        other[1]=this.refs.investmentincome.value;
        let finalNumber=0;
        for(let i=0;i <other.length;i++)
        {
            console.log(other[i]);
            if(other[i].length===0)
                finalNumber+=0;
            else
                finalNumber+=parseInt(other[i]);
        }
        this.setState({
            totalnetsales:totalsales,
            totalopexpenses:totalopexp,
            incomebeftaxes:incbeftax,
            netincome:totalsales+totalopexp+incbeftax+finalNumber
        });
        this.refs.totalnetsales.value=totalsales;
        this.refs.totalopexpenses.value=totalopexp;
        this.refs.incomebeftaxes.value=incbeftax;
        this.refs.netincome.value=totalsales+totalopexp+incbeftax+finalNumber;
    }

    updateStatement(){
        incomeStatementsContainer.update({_id:this.state._id},
            {$set:{
                productnetsales:this.refs.productnetsales.value,
                    servicenetsales:this.refs.servicenetsales.value,
                    salescost:this.refs.salescost.value,
                    marketing:this.refs.marketing.value,
                    technology:this.refs.technology.value,
                    adminexpenses:this.refs.adminexpenses.value,
                    otheropexpenses:this.refs.otheropexpenses.value,
                    operationalincome:this.refs.operationalincome.value,
                    interestincome:this.refs.interestincome.value,
                    interestexpense:this.refs.interestexpense.value,
                    othernetincome:this.refs.othernetincome.value,
                    taxes:this.refs.taxes.value,
                    investmentincome:this.refs.investmentincome.value,
                    totalnetsales:this.refs.totalnetsales.value,
                    totalopexpenses:this.refs.totalopexpenses.value,
                    incomebeftaxes:this.refs.incomebeftaxes.value,
                    netincome:this.refs.netincome.value
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
                        <h4 style={{"marginLeft":"20px"}} >Estado de ingresos y egresos</h4>
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
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ventas netas de productos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="productnetsales" ref="productnetsales" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.productnetsales}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ventas netas de servicios:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="servicenetsales" ref="servicenetsales" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.servicenetsales}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ventas netas:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalnetsales" ref="totalnetsales" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalnetsales} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Costos por ventas:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="salescost" ref="salescost" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.salescost}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Publicidad:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="marketing" ref="marketing" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.marketing}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Tecnología y contenido:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="technology" ref="technology" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.technology}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Gastos administrativos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="adminexpenses" ref="adminexpenses" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.adminexpenses}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Otros gastos operativos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="otheropexpenses" ref="otheropexpenses" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.otheropexpenses}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total gastos operativos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalopexpenses" ref="totalopexpenses" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalopexpenses} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ingresos operacionales:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="operationalincome" ref="operationalincome" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.operationalincome}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ingresos por intereses:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="interestincome" ref="interestincome" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.interestincome}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Gastos por intereses:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="interestexpense" ref="interestexpense" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.interestexpense}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Otros ingresos netos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="othernetincome" ref="othernetincome" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.othernetincome}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ingresos antes de impuestos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="incomebeftaxes" ref="incomebeftaxes" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.incomebeftaxes} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Impuestos sobre la renta:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="taxes" ref="taxes" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.taxes}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ingresos por inversiones:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="investmentincome" ref="investmentincome" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.investmentincome}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Ingresos netos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="netincome" ref="netincome" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.netincome} disabled={true}/>
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
                        <h4 style={{"marginLeft":"20px"}}>Estado de ingresos y egresos</h4>
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
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ventas netas de productos:</label>
                            </div>
                            <div className="input-field col s3">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.productnetsales).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ventas netas de servicios:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.servicenetsales).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ventas netas:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.totalnetsales).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })} </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Costos por ventas:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.salescost).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Publicidad:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.marketing).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Tecnología y contenido:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.technology).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Gastos administrativos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.adminexpenses).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Otros gastos operativos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.otheropexpenses).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total gastos operativos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.totalopexpenses).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })} </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ingresos operacionales:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.operationalincome).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ingresos por intereses:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.interestincome).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Gastos por intereses:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.interestexpense).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Otros ingresos netos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.othernetincome).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ingresos antes de impuestos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.incomebeftaxes).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })} </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Impuestos sobre la renta:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.taxes).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ingresos por inversiones:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.investmentincome).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Ingresos netos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{Number(this.state.netincome).toLocaleString('en-US', {
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