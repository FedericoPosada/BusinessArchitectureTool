import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";
import {bSheetsContainer} from "../../api/bsheets";


export default class Assets extends React.Component{

    constructor(props){
        super(props);
        this.state={
            _id:"",
            cash:0,
            marketablesecurities:0,
            inventories:0,
            accountsreceivable:0,
            property:0,
            intangible:0,
            investment:0,
            otherassets:0,
            totalcurrent:0,
            totalnoncurrent:0,
            totalassets:0,
            isInEditMode:false
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bsheets');
            let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
            if(typeof bSheet !== 'undefined'){
                this.setState({
                    cash:bSheet.cash,
                    marketablesecurities:bSheet.marketablesecurities,
                    inventories:bSheet.inventories,
                    accountsreceivable:bSheet.accountsreceivable,
                    property: bSheet.property,
                    intangible:bSheet.intangible,
                    investment:bSheet.investment,
                    otherassets:bSheet.otherassets,
                    totalcurrent:bSheet.totalcurrent,
                    totalnoncurrent:bSheet.totalnoncurrent,
                    totalassets:bSheet.totalassets,
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
        currentassets[0]=this.refs.cash.value;
        currentassets[1]=this.refs.marketablesecurities.value;
        currentassets[2]=this.refs.inventories.value;
        currentassets[3]=this.refs.accountsreceivable.value;
        let totalcurrent=0;
        for(let i=0;i <currentassets.length;i++)
        {
            console.log(currentassets[i]);
            if(currentassets[i].length===0)
                totalcurrent+=0;
            else
                totalcurrent+=parseInt(currentassets[i]);
        }
        let totalnoncurrent=0;
        let noncurrent=[];
        noncurrent[0]=this.refs.property.value;
        noncurrent[1]=this.refs.intangible.value;
        noncurrent[2]=this.refs.investment.value;
        noncurrent[3]=this.refs.otherassets.value;
        for(let i=0;i < noncurrent.length;i++)
        {
            if(noncurrent[i].length===0)
                totalnoncurrent+=0;
            else
                totalnoncurrent+=parseInt(noncurrent[i]);
        }
        this.setState({
            totalcurrent:totalcurrent,
            totalnoncurrent:totalnoncurrent,
            totalassets:totalcurrent+totalnoncurrent
        })
        this.refs.totalcurrent.value=totalcurrent;
        this.refs.totalnoncurrent.value=totalnoncurrent;
        this.refs.totalassets.value=totalnoncurrent+totalcurrent;

    }

    updateAssets(){
        bSheetsContainer.update({_id:this.state._id},
            {$set:{
                        cash:this.refs.cash.value,
                        marketablesecurities:this.refs.marketablesecurities.value,
                        inventories:this.refs.inventories.value,
                        accountsreceivable:this.refs.accountsreceivable.value,
                        property:this.refs.property.value,
                        intangible:this.refs.intangible.value,
                        investment:this.refs.investment.value,
                        otherassets:this.refs.otherassets.value,
                        totalcurrent:this.refs.totalcurrent.value,
                        totalnoncurrent:this.refs.totalnoncurrent.value,
                        totalassets:this.refs.totalassets.value
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
                        <h4 style={{"marginLeft":"20px"}} >Activos</h4>
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
                                <h5 style={{"marginLeft":"20px"}}>Activos corrientes</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Caja y equivalentes de caja:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="cash" ref="cash" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.cash}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Valores negociables:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="marketablesecurities" ref="marketablesecurities" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.marketablesecurities}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Inventarios:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="inventories" ref="inventories" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.inventories}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Cuentas por cobrar:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="accountsreceivable" ref="accountsreceivable" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.accountsreceivable}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total activos corrientes:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalcurrent" ref="totalcurrent" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalcurrent} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <h5 style={{"marginLeft":"20px"}}>Activos fijos</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Propiedades y equipos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="property" ref="property" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.property}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Activos intangibles:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="intangible" ref="intangible" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.intangible}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Inversiones:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="investment" ref="investment" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.investment}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Otros activos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="otherassets" ref="otherassets" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.otherassets}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total activos fijos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalnoncurrent" ref="totalnoncurrent" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalnoncurrent} disabled={true}/>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <label style={{"marginLeft":"10px"}}>Total activos:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="totalassets" ref="totalassets" type="number" className="validate" style={{"text-align":"center"}}
                                       defaultValue={this.state.totalassets} disabled={true}/>
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
                        <h4 style={{"marginLeft":"20px"}}>Activos</h4>
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
                                <h5 style={{"marginLeft":"20px"}}>Activos corrientes</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Caja y equivalentes de caja:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.cash}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Valores negociables:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.marketablesecurities}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Inventarios:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.inventories}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Cuentas por cobrar:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.accountsreceivable}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total activos corrientes:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.totalcurrent}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s4">
                                <h5 style={{"marginLeft":"20px"}}>Activos fijos</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Propiedades y equipos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.property}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Activos intangibles:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.intangible}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Inversiones:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.investment}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Otros activos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.otherassets}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total activos fijos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.totalnoncurrent}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="input-field col s6">
                                <label style={{"marginLeft":"10px"}}>Total activos:</label>
                            </div>
                            <div className="input-field col s6">
                                <p style={{"font-size":"90%","marginTop":"8px"}}>{this.state.totalassets}</p>
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