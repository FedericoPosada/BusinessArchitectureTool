import React from 'react';
import PositionCapacityManager from "./PositionCapacityManager";
import DependentPositionManager from "./DependentPositionManager";
import {positionsContainer} from "../../api/positions";


export default class Position extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            capacitieslist:this.props.capacitieslist,
            dependentslist:this.props.dependentslist

        }
        console.log(this.props._id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {
            this.setState({
                isInEditMode: false,
                capacitieslist:nextProps.capacitieslist,
                dependentslist:nextProps.dependentslist
            })
        }
    }
    updatePosition(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                name:this.refs.nameEdit.value,
                salary:this.refs.salaryEdit.value,
                number:this.refs.numberEdit.value
            }
        }
        positionsContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deletePosition(){
        let query = {_id:this.props._id};
        positionsContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updatePosition();
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0
            || this.refs.salaryEdit.value.length === 0
            || this.refs.numberEdit.value.length == 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }

    renderEdit() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn green" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">check</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deletePosition.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="nameEdit" type="text" defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Salario:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="salaryEdit" type="number" className="active"  defaultValue={this.props.salary} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Número de empleados:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="numberEdit" type="number" className="active"  defaultValue={this.props.salary} />
                            </div>
                        </div>
                        <div className="row">
                        <PositionCapacityManager
                            positionid={this.props._id}
                            capacitieslist={this.state.capacitieslist}/>
                        </div>
                        <div className="row">
                            <DependentPositionManager
                                positionid={this.props._id}
                                positioncustomid={this.props.customid}
                                dependentslist={this.state.dependentslist}/>
                        </div>
                    </form>
                </div>
            </div>
    )
    }

    renderDefault() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">edit</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deletePosition.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.name
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Salario:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.salary
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Número de empleados:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.number
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Capacidades implementadas::</label>
                            </div>
                        <table className="bordered">
                            <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            { this.state.capacitieslist.map((val, index)=>{
                                return(
                                    <tr key={"Filapos"+index}>
                                        <td style={{width:"13%"}}>{val.customid}</td>
                                        <td>{val.name}</td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </table>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label>Cargos dependientes:</label>
                            </div>
                        <table className="bordered">
                            <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            { this.state.dependentslist.map((val, index)=>{
                                return(
                                    <tr key={"comp"+index}>
                                        <td style={{width:"13%"}}>{val.customid}</td>
                                        <td>{val.name}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}