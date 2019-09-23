import React from 'react';
import Goal from "./Goal";
import {goalsContainer} from "../../api/goals";
import {achIndicatorsContainer} from "../../api/achindicators";
import AchievementIndicator from "./AchievementIndicator";

export default class AchievementIndicatorList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('achindicators');
            var achinds = achIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: achinds});
        })
    }
    render(){
        return (
            <div>
                <div className="input-field col s9">
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Meta</th>
                        <th>Fecha límite</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"achindicator"}>
                        <AchievementIndicator
                            _id={val._id}
                            customid={val.customid}
                            description={val.description}
                            goal={val.goal}
                            deadline={val.deadline}
                        />
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}