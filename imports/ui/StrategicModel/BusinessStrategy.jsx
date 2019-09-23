import React from 'react';
import {bServicesContainer} from "../../api/bservices";
import {resourcesContainer} from "../../api/resources";
import {bStrategiesContainer} from "../../api/bstrategies";


export default class BusinessStrategy extends React.Component {
    constructor(props) {
        super(props);
        Meteor.subscribe('bservices');
        Meteor.subscribe('resources');
        this.state={
            channelList:[],
            serviceList:bServicesContainer.find({owner:Meteor.userId()}).fetch(),
            resourceList:resourcesContainer.find({owner:Meteor.userId()}).fetch(),
            opMode:false,
            isInEditMode: false,
            name:this.props.name,
            description:this.props.description,
            category:this.props.category,
            associatedid:this.props.associatedid,
            isChannel:this.props.category.includes("canal"),
            isService:this.props.category.includes("servicio"),
            isResource:this.props.category.includes("recurso")
        };
    }
    checkFields(){
        if(this.state.name.length === 0 ||
            this.state.description.length === 0 ||
            this.state.category.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        else if(this.state.associatedid.length === 0 && !this.state.category.includes("Global"))
        {
            Materialize.toast("Debe escogerse un elemento",3000);
            return false;
        }
        return true;
    }
    updateService(){
        let newServiceValues = { $set:{
                name: this.state.name,
                description: this.state.description,
                category: this.state.category,
                associatedid: this.state.associatedid}
            };
            let query = {_id: this.props.id};
            bStrategiesContainer.update(query, newServiceValues, (err, done) => {
                if (err) throw err;
                console.log("Document updated");
            });
    }
    deleteService(){
        var id = this.props.id;
        bStrategiesContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateService();
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
    handleCategoryChange(){
        const target = event.target;
        const value = target.value;
        if(value.length> 0) {
            this.setState({
                category: value,
                isService: value.includes("servicio"),
                isChannel: value.includes("canal"),
                isResource: value.includes("recurso")
            });
        }
        else
        {
            Materialize.toast("No se ha seleccionado una categoría",3000);
        }
    }
    handleSelectChange(){
        const target = event.target;
        const value = target.value;
        if(value.length> 0) {
            let arrayAId=value.split("-");
            this.setState({
                associatedid:arrayAId[0]
            });
        }
        else
        {
            Materialize.toast("No se ha seleccionado un elemento válido",3000);
        }
    }
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{this.props.category}</td>
                <td>{this.props.associatedid}</td>
                <td style={{width:"5%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                    className="material-icons">edit</i></a>
                </td>
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
                    <input name="description" placeholder="Descripción" type="text" style={{width:"80%"}}
                           defaultValue={this.props.description} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <select className="browser-default" ref="category" defaultValue={this.props.category} onChange={this.handleCategoryChange.bind(this)} style={{width:"90%"}}>
                        <option></option>
                        <option>Global</option>
                        <option>Por canal</option>
                        <option>Por servicio</option>
                        <option>Por recurso</option>
                    </select>
                </td>
                <td>
                    {this.state.isService && <select className="browser-default" onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                        <option></option>
                        {this.state.serviceList.map((val, index)=>{
                        return(
                            <option key={"serv"+this.props.customid+val.customid}>{val.customid+"-"+val.name}</option>
                        )})
                       }
                    </select>}
                    {this.state.isChannel && <select className="browser-default" onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                        <option></option>
                        {this.state.channelList.map((val, index)=>{
                            return(
                                <option key={"chan"+this.props.customid+val.customid}>{val.customid+"-"+val.name}</option>
                            )})
                        }
                    </select>}
                    {this.state.isResource && <select className="browser-default" defaultValue={this.props.associatedid} onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                        <option></option>
                        {this.state.resourceList.map((val, index)=>{
                            return(
                                <option key={"res"+this.props.customid+val.customid}>{val.customid+"-"+val.name}</option>
                            )})
                        }
                    </select>}
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteService.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">delete</i></a>
                    <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{marginRight:5,marginBottom:5}}><i
                        className="material-icons">check</i></a>
                </td>
            </>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}