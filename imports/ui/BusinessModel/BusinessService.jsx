import React from 'react';
import {bServicesContainer} from '../../api/bservices';
import BusinessServiceOperationsManager from "./BusinessServiceOperationsManager";
import {clientsContainer} from "../../api/clients";

export default class BusinessService extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            opMode:false,
            isInEditMode: false,
            name:this.props.name,
            object:this.props.object,
            client:this.props.client,
            clientslist:clientsContainer.find({}).fetch()
        };
    }
    changeOpMode(){
        this.setState({
            opMode: !this.state.opMode
        })
    }
    checkFields(){
        if(this.state.name.length === 0 || this.state.object.length === 0 || this.state.client.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    updateService(){
        let newServiceValues = {
            $set: {
                name: this.state.name,
                object: this.state.object,
                client: this.state.client
            }
            };
            let query = {_id: this.props.id};
            bServicesContainer.update(query, newServiceValues, (err, done) => {
                if (err) throw err;
                console.log("Document updated");
            });
    }
    deleteService(){
        var id = this.props.id;
        bServicesContainer.remove({_id:id});
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
    handleSelectChange(){
        const target = event.target;
        const value = target.value;
        this.setState({
            client: value.toString()
        });
    }
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.object}</td>
                <td>{this.props.client}</td>
                <td style={{width:"5%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                    className="material-icons">edit</i></a>
                    { this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" ><i
                        className="material-icons">chevron_left</i></a>}
                    { !this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn"><i
                        className="material-icons">chevron_right</i></a>}
                </td>
                    { this.state.opMode &&
                        <BusinessServiceOperationsManager bservicecustomid={this.props.customid} bserviceid={this.props._id}/>
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
                    <input id="servicenameedit" name="name" placeholder="Nombre" ref={"servicenameedit"+this.props.customid} type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <input id="serviceobjectedit" name="object" placeholder="Objeto" ref={"serviceobjectedit"+this.props.customid} type="text" style={{width:"80%"}}
                           defaultValue={this.props.object} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <select className="browser-default" ref="serviceclient" onChange={this.handleSelectChange.bind(this)} style={{width:"90%"}}>
                        { this.state.clientslist.map((val, index)=>{
                            return(
                                <option>{val.name}</option>
                            )
                        }) }
                    </select>
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteService.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">delete</i></a>
                    <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{marginRight:5,marginBottom:5}}><i
                        className="material-icons">check</i></a>
                    { this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                        className="material-icons">chevron_left</i></a>}
                    { !this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                        className="material-icons">chevron_right</i></a>}
                </td>
                    { this.state.opMode &&
                    <BusinessServiceOperationsManager bservicecustomid={this.props.customid} bserviceid={this.props._id}/>
                    }
            </>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}