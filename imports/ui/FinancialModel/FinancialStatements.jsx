import React from 'react';
import BalanceSheet from "./BalanceSheet";
import IncomeStatement from "./IncomeStatement";
import CashFlow from "./CashFlow";
import PrivateLoggedHeader from "../PrivateLoggedHeader";
export default class FinancialStatements extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            balanceMode: true,
            incomeMode: false,
            flowMode:false
        };
    }
    changePurposeMode(){
        this.setState({
            balanceMode: !this.state.balanceMode,
            incomeMode: false,
            flowMode:false
        })
    }
    changeMeansode(){
        this.setState({
            balanceMode: false,
            incomeMode: !this.state.meansMode,
            flowMode:false
        })
    }
    changeFlowMode(){
        this.setState({
            balanceMode: false,
            incomeMode: false,
            flowMode:!this.state.flowMode
        })
    }
    render() {
        return (
            <div>
                <PrivateLoggedHeader/>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4"><a onClick={this.changePurposeMode.bind(this)}>Balance general</a></li>
                        <li className="tab col s4"><a onClick={this.changeMeansode.bind(this)}>Ingresos y egresos</a></li>
                        <li className="tab col s4"><a onClick={this.changeFlowMode.bind(this)}>Flujo de caja</a></li>
                    </ul>
                </div>
                <div className="row">
                    {this.state.balanceMode && <BalanceSheet/>}
                    {this.state.incomeMode && <IncomeStatement/>}
                    {this.state.flowMode && <CashFlow />}
                </div>
            </div>
        )
    }
}