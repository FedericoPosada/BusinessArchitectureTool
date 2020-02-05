import React from 'react';
import {exIndicatorsContainer} from "../../api/exindicators";
import ExternalIndicator from "./ExternalIndicator";
import ExternalIndicatorCreator from "./ExternalIndicatorCreator";
import PrivateLoggedHeader from "../PrivateLoggedHeader";

export default class ExternalIndicatorsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInCreateMode:false,
            hideFields:false,
            list: []
        }
        this.handleIndicatorDeletion=this.handleIndicatorDeletion.bind(this);
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('exindicators');
            let opInd = exIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: opInd});
        })
    }
    changeCreateMode(){
        this.setState({
            isInCreateMode: !this.state.isInCreateMode
        })
    }
    handleIndicatorDeletion(){
        this.setState({
            hideFields:true
        })
    }
    render(){
        return (
            <div>
                <PrivateLoggedHeader/>
                <h3 style={{"marginLeft":"20px"}}>Indicadores externos</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20,"marginLeft":"20px"}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons right">add</i>Nuevo indicador</a>}
                        <table className="striped" style={{"marginLeft":"20px"}}>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Indicador</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"opind"}>
                            <td>{val.customid}</td>
                            <td>{val.description}</td>
                            <td><a className="waves-effect waves-light btn" onClick={() => this.setState({
                                hideFields:false,
                                _id:val._id,
                                customid:val.customid,
                                description:val.description,
                                calculation:val.calculation,
                                calcfrequency:val.calcfrequency,
                                dimensions:val.dimensions,
                                label:val.label,
                                isInCreateMode:false,
                                category: val.category
                            })}><i className="material-icons">keyboard_arrow_right</i></a></td>
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                        </div>
                        <div className="input-field col s1">
                        </div>
                        <div className="input-field col s7">
                            {
                                this.state.isInCreateMode && <ExternalIndicatorCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.description !== "undefined") &&
                                <ExternalIndicator
                                    hideFields={this.handleIndicatorDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    description={this.state.description}
                                    calculation={this.state.calculation}
                                    calcfrequency={this.state.calcfrequency}
                                    dimensions={this.state.dimensions}
                                    label={this.state.label}
                                    category={this.state.category}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}