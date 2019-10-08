import React from 'react';
import BalanceSheet from "./BalanceSheet";
import IncomeStatement from "./IncomeStatement";
export default class FinancialStatements extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            balanceMode: true,
            incomeMode: false,
            indMode:false
        };
    }
    changePurposeMode(){
        this.setState({
            balanceMode: !this.state.balanceMode,
            incomeMode: false,
            indMode:false
        })
    }
    changeMeansode(){
        this.setState({
            balanceMode: false,
            incomeMode: !this.state.meansMode,
            indMode:false
        })
    }
    changeIndMode(){
        this.setState({
            balanceMode: false,
            incomeMode: false,
            indMode:!this.state.indMode
        })
    }
    render() {
        return (
            <div>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4"><a onClick={this.changePurposeMode.bind(this)}>Balance general</a></li>
                        <li className="tab col s4"><a onClick={this.changeMeansode.bind(this)}>Ingresos y egresos</a></li>
                        <li className="tab col s4"><a onClick={this.changeIndMode.bind(this)}>Indicadores de logro</a></li>
                    </ul>
                </div>
                <div className="row">
                    {this.state.balanceMode && <BalanceSheet/>}
                    {this.state.incomeMode && <IncomeStatement/>}
                </div>
            </div>
        )
    }
}