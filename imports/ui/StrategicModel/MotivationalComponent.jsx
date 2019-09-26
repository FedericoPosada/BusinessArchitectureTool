import React from 'react';
import MotivationalComponentValue from "./MotivationalComponentValue";
import MotivationalComponentValueManager from "./MotivationalComponentValueManager";
import {motivCompContainer} from "../../api/motivcomp";


export default class MotivationalComponent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            valueList:[],
            _id:""
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('motivcomp');
            let motivC = motivCompContainer.find({}).fetch();
            let comp=motivC[0];
            if(typeof comp !== 'undefined'){
                console.log(comp);
            let tempList = comp.values;
            this.setState({valueList: tempList,_id:comp._id});}
        })
    }

    render() {
        return(
            <div>
                <h2>Componente motivacional</h2>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="superiorpurpose" type="text" className="validate"/>
                                    <label htmlFor="superiorpurpose">Propósito superior</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="challengingobjective" type="text" className="validate"/>
                                <label htmlFor="challengingobjective">Objetivo retador</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="vision" type="text" className="validate"/>
                                <label htmlFor="vision">Visión</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="mision" type="text" className="validate"/>
                                <label htmlFor="mision">Misión</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                    <table className="bordered">
                        <tr>
                            <th>Valores</th>
                        </tr>
                        <tbody>
                            { this.state.valueList.map((val, index)=>{
                                    return(
                                        <tr>
                                                <MotivationalComponentValue
                                                    _id={this.state._id}
                                                    name={val}
                                                    key={val}
                                                />
                                        </tr>
                                    )
                                }) }
                        </tbody>
                    </table>
                    </div>
                </div>
                <MotivationalComponentValueManager
                    _id={this.state._id}
                />
            </div>
    )
    }
}