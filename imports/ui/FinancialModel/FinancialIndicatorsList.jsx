import React from 'react';
import CurrentRatio from "./CurrentRatio";
import AcidTest from "./AcidTest";
import CashRatio from "./CashRatio";
import PrivateLoggedHeader from "../PrivateLoggedHeader";

export default class FinancialIndicatorsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cratio:false,
            acidtest:false,
            cashratio:false
        }
    }
    handleCurrentRatio(){
        this.setState({
            cratio:!this.state.cratio,
            acidtest:false,
            cashratio:false
        })
    }
    handleAcid(){
        this.setState({
            cratio:false,
            acidtest:!this.state.acidtest,
            cashratio:false
        })
    }
    handleCashRatio(){
        this.setState({
            cratio:false,
            acidtest:false,
            cashratio:!this.state.cashratio
        })
    }
    render(){
        return (
            <div>
                <PrivateLoggedHeader/>
                <h4 style={{"marginLeft":"20px"}}>Indicadores financieros</h4>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                        <table style={{"marginLeft":"20px"}} className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Indicador</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>IF1.1.</td>
                        <td>Razón corriente</td>
                        <td><a className="waves-effect waves-light btn" onClick={this.handleCurrentRatio.bind(this)}><i className="material-icons">keyboard_arrow_right</i></a></td>
                    </tr>
                    <tr>
                        <td>IF1.2.</td>
                        <td>Prueba ácida</td>
                        <td><a className="waves-effect waves-light btn" onClick={this.handleAcid.bind(this)}><i className="material-icons">keyboard_arrow_right</i></a></td>
                    </tr>
                    <tr>
                        <td>IF1.3.</td>
                        <td>Razón de efectivo</td>
                        <td><a className="waves-effect waves-light btn" onClick={this.handleCashRatio.bind(this)}><i className="material-icons">keyboard_arrow_right</i></a></td>
                    </tr>
                    </tbody>
                </table>
                        </div>
                        <div  style={{"marginLeft":"30px"}} className="input-field col s7">
                            {
                                this.state.cratio && <CurrentRatio />
                            }
                            {
                                this.state.acidtest && <AcidTest />
                            }
                            {
                                this.state.cashratio && <CashRatio />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}