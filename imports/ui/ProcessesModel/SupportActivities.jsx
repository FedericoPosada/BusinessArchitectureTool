import React from 'react';
import StrategyCreator from "../StrategicModel/StrategyCreator";
import TacticCreator from "../StrategicModel/TacticCreator";
import SupportActivityCreator from "./SupportActivityCreator";

export default class SupportActivities extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s6">
                        <SupportActivityCreator category="Infraestructura" categorynumber="1"/>
                    </div>
                    <div className="input-field col s6">
                        <SupportActivityCreator category="Recursos humanos" categorynumber="2"/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s6">
                        <SupportActivityCreator category="Tecnología" categorynumber="3"/>
                    </div>
                    <div className="input-field col s6">
                        <SupportActivityCreator category="Compras" categorynumber="4"/>
                    </div>
                </div>
            </div>
        )
    }
}