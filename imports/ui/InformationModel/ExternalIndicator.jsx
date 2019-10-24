import React from 'react';
import {exIndicatorsContainer} from "../../api/exindicators";


export default class ExternalIndicator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {

            this.setState({
                isInEditMode: false
            })
        }
    }

    updateIndicator(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                description:this.refs.descEdit.value,
                calculation:this.refs.calcEdit.value,
                calcfrequency:this.refs.calcfreqEdit.value,
                dimensions:this.refs.dimensionsEdit.value,
                category: this.refs.categoryEdit.value
            }
        }
        exIndicatorsContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deleteIndicator(){
        let query = {_id:this.props._id};
        exIndicatorsContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateIndicator();
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    checkFields(){
        if(this.refs.descEdit.value.length === 0
            || this.refs.calcEdit.value.length === 0
            || this.refs.calcfreqEdit.value.length === 0
            || this.refs.dimensionsEdit.value.length === 0
            || this.refs.categoryEdit.value.length === 0)
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
                                <a className="waves-effect waves-light btn green" onClick={this.changeEditMode.bind(this)}><i className="material-icons">check</i></a>
                            </div>
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn red" onClick={this.deleteIndicator.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="descEdit" type="text"  defaultValue={this.props.description} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Forma de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="calcEdit" type="text" className="active"   defaultValue={this.props.calculation} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Frecuencia de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="calcfreqEdit"  defaultValue={this.props.calcfrequency}  className="browser-default" style={{"width":"49%"}} >
                                <option></option>
                                <option>Semanal</option>
                                <option>Mensual</option>
                                <option>Trimestral</option>
                                <option>Semestral</option>
                                <option>Anual</option>
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Dimensiones:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="dimensionsEdit" type="text"  defaultValue={this.props.dimensions} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Categoría:</label>
                            </div>
                            <div className="input-field col s8">
                                <select ref="categoryEdit"  defaultValue={this.props.category}  className="browser-default" style={{"width":"49%"}} >
                                    <option></option>
                                    <option>Mercado</option>
                                    <option>Competidores</option>
                                    <option>Entorno</option>
                                </select>
                            </div>
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
                                <a className="waves-effect waves-light btn" onClick={this.changeEditMode.bind(this)}><i className="material-icons">edit</i></a>
                            </div>
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn red" onClick={this.deleteIndicator.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.description
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Forma de cálculo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.calculation
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Frecuencia de cálculo:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.calcfrequency
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Dimensiones:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.dimensions
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Categoría:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":25}}>
                                {
                                    this.props.category
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}