import React from 'react';
import MotivationalComponentValue from "./MotivationalComponentValue";
import MotivationalComponentValueManager from "./MotivationalComponentValueManager";
import {motivCompContainer} from "../../api/motivcomp";


export default class MotivationalComponent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            valueList:[],
            _id:"",
            superiorpurpose:"",
            challengingobjective:"",
            vision:"",
            mision:"",
            isInEditMode:false
        }
    }

    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateMotivationalComponent();
                this.setState({
                    isInEditMode: !this.state.isInEditMode
                })
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('motivcomp');
            let motivC = motivCompContainer.findOne({owner:Meteor.userId()});
            if(typeof motivC !== 'undefined'){
                let tempList = motivC.values;
                this.setState({
                    superiorpurpose:motivC.superiorpurpose,
                    challengingobjective:motivC.challengingobjective,
                    vision:motivC.vision,
                    mision:motivC.mision,
                    valueList: tempList,
                    _id:motivC._id
                });
            }
            else{
                const id=Meteor.userId()+"motivC";
                let newMotivC={
                    _id:id,
                    values:[],
                    owner:Meteor.userId()
                };
                this.setState({
                    _id:id
                })
                motivCompContainer.insert(newMotivC);
            }
        })
    }

    updateMotivationalComponent(){
        if(this.checkFields())
        {
            motivCompContainer.update({_id:this.state._id},
                {$set:{
                        superiorpurpose:this.refs.superiorpurpose.value,
                        challengingobjective:this.refs.challengingobjective.value,
                        vision:this.refs.vision.value,
                        mision:this.refs.mision.value
                    }
                }, (err,done)=>{
                    if (err)
                        Materialize.toast("Ha ocurrido un error al guardar el componente motivacional.",3000);
                    else
                        Materialize.toast("Se ha actualizado el componente motivacional.",3000);
                });

        }
    }

    checkFields(){
        if(this.refs.superiorpurpose.value.length === 0 || this.refs.challengingobjective.value.length === 0
            || this.refs.vision.value.length === 0 || this.refs.mision.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }

    renderEdit() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s4">
                        <h4 style={{"marginLeft":"20px"}}>Componente motivacional</h4>
                    </div>
                    <div className="input-field col s2">
                        <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{"marginTop":"20px"}}>
                            <i className="material-icons">check</i></a>
                    </div>
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Propósito superior:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="superiorpurpose" ref="superiorpurpose" type="text" className="validate"
                                       defaultValue={this.state.superiorpurpose}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Objetivo retador:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="challengingobjective" ref="challengingobjective" type="text" className="validate"
                                       defaultValue={this.state.challengingobjective}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Visión:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="vision" ref="vision"  type="text" className="validate"
                                       defaultValue={this.state.vision}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Misión:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="mision" ref="mision" type="text" className="validate"
                                       defaultValue={this.state.mision}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                    <table className="bordered" style={{"marginLeft":"10px"}}>
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

    renderDefault() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s4">
                    <h4 style={{"marginLeft":"20px"}}>Componente motivacional</h4>
                    </div>
                    <div className="input-field col s2">
                        <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{"marginTop":"20px"}}>
                            <i className="material-icons">edit</i></a>
                    </div>
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Propósito superior:</label>
                            </div>
                            <div className="input-field col s6">
                                <p>{this.state.superiorpurpose}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Objetivo retador:</label>
                            </div>
                            <div className="input-field col s6">
                                <p>{this.state.challengingobjective}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Visión:</label>
                            </div>
                            <div className="input-field col s6">
                                <p>{this.state.vision}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label style={{"marginLeft":"10px"}}>Misión:</label>
                            </div>
                            <div className="input-field col s6">
                                <p>{this.state.mision}</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <table className="bordered" style={{"marginLeft":"10px"}}>
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

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}