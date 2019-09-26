import React from 'react';
import {opIndicatorsContainer} from "../../api/opindicators";
import OperativeIndicator from "./OperativeIndicator";
import OperativeIndicatorCreator from "./OperativeIndicatorCreator";

export default class OperativeIndicatorsList extends React.Component {
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
            Meteor.subscribe('opindicators');
            let opInd = opIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
            console.log(opInd);
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
                <h3>Indicadores operativos</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{marginBottom:20}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons right">add</i>Nuevo indicador</a>}
                        <table className="striped" >
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
                                positionlist:val.positions
                            })}><i className="material-icons">keyboard_arrow_right</i></a></td>
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                        </div>
                        <div className="input-field col s8">
                            {
                                this.state.isInCreateMode && <OperativeIndicatorCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.description !== "undefined") &&
                                <OperativeIndicator
                                    hideFields={this.handleIndicatorDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    description={this.state.description}
                                    calculation={this.state.calculation}
                                    calcfrequency={this.state.calcfrequency}
                                    dimensions={this.state.dimensions}
                                    label={this.state.label}
                                    positionlist={this.state.positionlist}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}