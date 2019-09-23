import React from 'react';
import Means from "./Means";
import AchievementIndicatorCreator from "./AchievementIndicatorCreator";
import Purposes from "./Purposes";

export default class StrategicPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            purposeMode: true,
            meansMode: false,
            indMode:false
        };
    }
    changePurposeMode(){
        this.setState({
            purposeMode: !this.state.purposeMode,
            meansMode: false,
            indMode:false
        })
    }
    changeMeansode(){
        this.setState({
            purposeMode: false,
            meansMode: !this.state.meansMode,
            indMode:false
        })
    }
    changeIndMode(){
        this.setState({
            purposeMode: false,
            meansMode: false,
            indMode:!this.state.indMode
        })
    }
    render() {
        return (
            <div>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a onClick={this.changePurposeMode.bind(this)}>Fines</a></li>
                        <li className="tab col s3"><a onClick={this.changeMeansode.bind(this)}>Medios</a></li>
                        <li className="tab col s3"><a onClick={this.changeIndMode.bind(this)}>Indicadores de logro</a></li>
                    </ul>
                </div>
                <div className="row">
                    {this.state.purposeMode && <Purposes/>}
                    {this.state.meansMode && <Means/>}
                    {this.state.indMode && <AchievementIndicatorCreator/>}
                </div>
            </div>
        )
    }
}