import React from 'react';
import {exIndicatorsContainer} from "../../api/exindicators";
import {labelsContainer} from "../../api/labels";


export default class ExternalIndicatorCreator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            labelList:[]
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('exindicators');
            Meteor.subscribe('labels');
            let labels = labelsContainer.find({ owner:Meteor.userId()}).fetch();
            this.setState({labelList: labels});
        })
    }

    createIndicator(){
        if(this.checkFields()) {
            let indicatorcustomid;
            let labelSelected = this.refs.labelCreate.value;
            if (exIndicatorsContainer.find({ owner:Meteor.userId(),"customid": new RegExp(labelSelected)}).count() === 0) {
                indicatorcustomid = labelSelected + "1";
            } else {
                let customIdLastNumber = '';
                let lastIndicators = exIndicatorsContainer.find({ owner:Meteor.userId(),"customid": new RegExp(labelSelected)}).fetch();
                console.log(lastIndicators);
                let customIdLast = lastIndicators[lastIndicators.length - 1].customid;
                for (let i = labelSelected.length; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                indicatorcustomid = labelSelected +lastnumber;
            }
            let createObj = {
                customid: indicatorcustomid,
                description: this.refs.descCreate.value,
                calculation: this.refs.calcCreate.value,
                calcfrequency: this.refs.calcfreqCreate.value,
                dimensions: this.refs.dimensionsCreate.value,
                category:this.refs.categoryCreate.value,
                owner:Meteor.userId()
            }
            exIndicatorsContainer.insert(createObj,(err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el indicador. Inténtelo de nuevo.",3000);
            });
            Materialize.toast("Se ha creado el indicador", 3000);
            this.refs.descCreate.value = "";
            this.refs.calcCreate.value = "";
            this.refs.calcfreqCreate.value = "";
            this.refs.dimensionsCreate.value = "";
            this.refs.labelCreate.value = "";
            this.refs.categoryCreate.value="";
        }
    }
    checkFields(){
        if(this.refs.labelCreate.value.length === 0
            ||this.refs.descCreate.value.length === 0
            || this.refs.calcCreate.value.length === 0
            || this.refs.calcfreqCreate.value.length === 0
            || this.refs.dimensionsCreate.value.length === 0
            || this.refs.categoryCreate.value.length == 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;

    }

    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <a className="waves-effect waves-light btn green" onClick={this.createIndicator.bind(this)}><i className="material-icons right">check</i>Crear</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Etiqueta:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="labelCreate"  className="browser-default" style={{"width":"49%"}} >
                                { this.state.labelList.map((val, index)=>{
                                        return(
                                    <option>{val._id}</option>
                                        )
                                })
                                }
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="descCreate" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Forma de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="calcCreate" type="text" className="active"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Frecuencia de cálculo:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="calcfreqCreate" className="browser-default" style={{"width":"49%"}} >
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
                            <div className="input-field col s3">
                                <label>Dimensiones:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="dimensionsCreate" type="text" defaultValue={this.props.dimensions} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Categoría:</label>
                            </div>
                            <div className="input-field col s8">
                                <select ref="categoryCreate" className="browser-default" style={{"width":"49%"}} >
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


}