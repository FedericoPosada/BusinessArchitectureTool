import React from 'react';
import PrimaryActivities from "./PrimaryActivities";
import SupportActivities from "./SupportActivities";
import PrivateLoggedHeader from "../PrivateLoggedHeader";

export default class ValueChain extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            supportMode: true,
            primaryMode: false
        };
    }
    changeSupportMode(){
        this.setState({
            supportMode: !this.state.supportMode,
            primaryMode: false
        })
    }
    changePrimaryode(){
        this.setState({
            supportMode: false,
            primaryMode: !this.state.primaryMode
        })
    }
    render() {
        return (
            <div>
                <PrivateLoggedHeader/>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a onClick={this.changeSupportMode.bind(this)}>Actividades de soporte</a></li>
                        <li className="tab col s3"><a onClick={this.changePrimaryode.bind(this)}>Actividades primarias</a></li>
                    </ul>
                </div>
                <div className="row">
                    {this.state.supportMode && <SupportActivities />}
                    {this.state.primaryMode && <PrimaryActivities />}
                </div>
            </div>
        )
    }
}