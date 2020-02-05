import React from 'react';
import {resourcesContainer} from "../../api/resources";
import ResourceServicesManager from "./ResourceServicesManager";

export default class Resource extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            serMode:false,
            isInEditMode: false,
            name:this.props.name,
            description:this.props.description,
            cost:this.props.cost
        };
    }
    changeSerMode(){
        this.setState({
            serMode: !this.state.serMode
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
        let newResourceValues = {
            $set: {
                name: this.state.name,
                description: this.state.description,
                cost: this.state.cost
            }
        };
        let query = {_id: this.props.id};
        resourcesContainer.update(query, newResourceValues, (err, done) => {
            if (err) throw err;
            console.log("Document updated");
        });
    }
    deleteService(){
        var id = this.props.id;
        resourcesContainer.remove({_id:id});
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
    handleSelectChange(){
        const target = event.target;
        const value = target.value;
        this.setState({
            cost: value.toString()
        });
    }
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{Number(this.props.cost).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}</td>
                <td style={{width:"5%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                    className="material-icons">edit</i></a>
                    { this.state.serMode && <a onClick={this.changeSerMode.bind(this)} className="waves-effect waves-light btn" ><i
                        className="material-icons">chevron_left</i></a>}
                    { !this.state.serMode && <a onClick={this.changeSerMode.bind(this)} className="waves-effect waves-light btn"><i
                        className="material-icons">chevron_right</i></a>}
                </td>
                { this.state.serMode &&
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
                    <input name="name" placeholder="Nombre" ref={"resservicenameedit"+this.props.customid} type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <input name="description" placeholder="Objeto" ref={"resservicedescriptionedit"+this.props.customid} type="text" style={{width:"80%"}}
                           defaultValue={this.props.description} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <input name="cost" placeholder="Costo" ref={"resservicecostedit"+this.props.customid} type="number" style={{width:"80%"}}
                           defaultValue={this.props.cost} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteService.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">delete</i></a>
                    <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{marginRight:5,marginBottom:5}}><i
                        className="material-icons">check</i></a>
                    { this.state.serMode && <a onClick={this.changeSerMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                        className="material-icons">chevron_left</i></a>}
                    { !this.state.serMode && <a onClick={this.changeSerMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                        className="material-icons">chevron_right</i></a>}
                </td>
                { this.state.serMode &&
                <ResourceServicesManager resourcecustomid={this.props.customid}/>
                }
            </>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}