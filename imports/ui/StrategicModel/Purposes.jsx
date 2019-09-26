import React from 'react';
import ObjectiveCreator from "./ObjectiveCreator";
import GoalCreator from "./GoalCreator";

export default class Purposes extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s12">
                        <ObjectiveCreator/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s12">
                        <GoalCreator />
                    </div>
                </div>
            </div>
        )
    }
}