import React from 'react';
import StrategyCreator from "./StrategyCreator";
import TacticCreator from "./TacticCreator";

export default class Means extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s12">
                        <StrategyCreator/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s12">
                        <TacticCreator />
                    </div>
                </div>
            </div>
        )
    }
}