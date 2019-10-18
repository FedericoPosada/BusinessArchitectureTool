import React from 'react';
import {componentsContainer} from "../../api/components";

export default class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            serMode:false,
            isInEditMode: false,
            name:this.props.name,
            description:this.props.description
        };
    }
    changePosMode(){
        this.setState({
            serMode: !this.state.serMode
        })
    }
    checkFields(){
        if(this.state.name.length === 0 || this.state.description.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    updateComponent(){
        let newComponentValues = {
            $set: {
                name: this.state.name,
                description: this.state.description
            }
        };
        let query = {_id: this.props.id};
        componentsContainer.update(query, newComponentValues, (err, done) => {
            if (err) throw err;
            console.log("Document updated");
        });
    }
    deleteComponent(){
        let id = this.props.id;
        componentsContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateComponent();
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
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
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
                    <input name="name" placeholder="Nombre" ref={"resservicenameedit"+this.props.customid} type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <input name="description" placeholder="Description" ref={"resservicedescriptionedit"+this.props.customid} type="text" style={{width:"80%"}}
                           defaultValue={this.props.description} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteComponent.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
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