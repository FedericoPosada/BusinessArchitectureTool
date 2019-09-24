import React from 'react';
import Position from "./Position";
import PositionCreator from "./PositionCreator";
import {positionsContainer} from "../../api/positions";

export default class PositionCatalog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInCreateMode:false,
            hideFields:false,
            list: []
        }
        this.handlePositionDeletion=this.handlePositionDeletion.bind(this);
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('positions');
            let apps = positionsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: apps});
            console.log(apps);
        })
    }
    changeCreateMode(){
        this.setState({
            isInCreateMode: !this.state.isInCreateMode
        })
    }
    handlePositionDeletion(){
        this.setState({
            hideFields:true
        })
    }
    render(){
        return (
            <div>
                <h3>Catálogo de cargos</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            {this.state.isInCreateMode && <a className="waves-effect waves-light btn red" style={{marginBottom:20}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons">cancel</i></a>}
                            {!this.state.isInCreateMode && <a className="waves-effect waves-light btn green" style={{marginBottom:20}}
                            onClick={this.changeCreateMode.bind(this)}><i className="material-icons right">add</i>Nuevo cargo</a>}
                        <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Cargo</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"opind"}>
                            <td>{val.customid}</td>
                            <td>{val.name}</td>
                            <td><a className="waves-effect waves-light btn" onClick={() => (
                                this.setState({
                                hideFields:false,
                                _id:val._id,
                                name:val.name,
                                customid:val.customid,
                                salary:val.salary,
                                number:val.number,
                                isInCreateMode:false,
                                capacitieslist:val.capacities,
                                dependentslist:val.dependents
                            })
                            )
                            }><i className="material-icons">keyboard_arrow_right</i></a></td>
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
                        </div>
                        <div className="input-field col s8">
                            {
                                this.state.isInCreateMode && <PositionCreator />
                            }
                            {
                                !this.state.hideFields && !this.state.isInCreateMode && (typeof this.state.name !== "undefined") &&
                                <Position
                                    hideFields={this.handlePositionDeletion}
                                    _id={this.state._id}
                                    customid={this.state.customid}
                                    name={this.state.name}
                                    salary={this.state.salary}
                                    number={this.state.number}
                                    dependentslist={this.state.dependentslist}
                                    capacitieslist={this.state.capacitieslist}
                                />
                            }
                        </div>
                    </div>
                    </form>
            </div>
        )
    }
}