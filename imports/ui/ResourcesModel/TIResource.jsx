import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import ResourceComponentsManager from "./ResourceComponentsManager";
import ResourceServicesManager from "./ResourceServicesManager";

export default class TIResource extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            compMode:false,
            servMode:false,
            opMode:false,
            isInEditMode: false,
            name:this.props.name,
            description:this.props.description,
            cost:this.props.cost
        };
    }
    changeCompMode(){
        this.setState({
            compMode: !this.state.compMode,
            servMode: false
        })
    }
    changeServMode(){
        this.setState({
            servMode: !this.state.servMode,
            compMode: false
        })
    }
    changeOpMode(){
        this.setState({
            opMode: !this.state.opMode
        })
    }
    checkFields(){
        if(this.state.name.length === 0 || this.state.description.length === 0 || this.state.cost.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    updateResource(){
        let newResourceValues ={$set:{
            "customid": this.props.customid,
            "name": this.state.name,
            "description": this.state.description,
            "cost": this.state.cost
        }};
        let query = {_id: this.props.id};
        tiResourcesContainer.update(query, newResourceValues, (err, done) => {
            if (err) throw err;
            console.log("Document updated");
        });
    }
    deleteService(){
        var id = this.props.id;
        tiResourcesContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateResource();
                this.setState({
                    isInEditMode: !this.state.isInEditMode
                })
            }
        }
        else {
            this.setState({
                opMode:false,
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    handleInputChange(){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value.toString()
        });
    }
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{this.props.cost}</td>
                <td style={{width:"5%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                    className="material-icons">edit</i></a>
                    { this.state.opMode &&  !this.state.isInEditMode &&<a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn"
                      style={{marginRight:5, marginBottom:5}}><i className="material-icons">keyboard_arrow_up</i></a>}
                    { !this.state.opMode && !this.state.isInEditMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn"><i
                        className="material-icons">keyboard_arrow_down</i></a>}
                    { this.state.opMode && !this.state.compMode && <a onClick={this.changeCompMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && this.state.compMode &&<a onClick={this.changeCompMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && !this.state.servMode && <a onClick={this.changeServMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">format_list_bulleted</i></a>}
                    { this.state.opMode && this.state.servMode && <a onClick={this.changeServMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">format_list_bulleted</i></a>}

                </td>
                { this.state.compMode &&
                    <ResourceComponentsManager resourcecustomid={this.props.customid} resourceid={this.props.id}/>
                }
                { this.state.servMode &&
                <ResourceServicesManager resourcecustomid={this.props.customid}/>
                }
            </>
        )
    }
    renderEdit(){
        return(
            <>
                <td>
                    {this.props.customid}
                </td>
                <td>
                    <input name="name" placeholder="Nombre" type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <input name="description" placeholder="Objeto" type="text" style={{width:"80%"}}
                           defaultValue={this.props.description} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <input name="cost" placeholder="Costo" type="number" style={{width:"80%"}}
                           defaultValue={this.props.cost} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteService.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">delete</i></a>
                    <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{marginRight:5,marginBottom:5}}><i
                        className="material-icons">check</i></a>

                    { this.state.opMode &&  !this.state.isInEditMode &&<a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn"style={{marginRight:5, marginBottom:5}} ><i
                        className="material-icons">keyboard_arrow_up</i></a>}
                    { !this.state.opMode && !this.state.isInEditMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn"><i
                        className="material-icons">keyboard_arrow_down</i></a>}
                    { this.state.opMode && !this.state.compMode && <a onClick={this.changeCompMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && this.state.compMode && <a onClick={this.changeCompMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && !this.state.servMode && <a onClick={this.changeServMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">format_list_bulleted</i></a>}
                    { this.state.opMode && this.state.servMode && <a onClick={this.changeServMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">format_list_bulleted</i></a>}
                </td>
                { this.state.compMode &&
                <ResourceComponentsManager resourcecustomid={this.props.customid} resourceid={this.props.id}/>
                }
                { this.state.servMode &&
                <ResourceServicesManager resourcecustomid={this.props.customid}/>
                }
            </>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}