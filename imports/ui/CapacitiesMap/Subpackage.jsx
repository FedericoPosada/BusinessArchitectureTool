import React from 'react';
import {subpackagesContainer} from "../../api/subpackages";

export default class Subpackage extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false,
            name:this.props.name
        };
    }
    updateSubpackage(){
        let newSubpackageValues = {
            $set: {
                name: this.state.name
            }
        };
        let query = { _id:this.props.id };
        subpackagesContainer.update(query, newSubpackageValues,(err,done)=>{
            if (err)
                Materialize.toast("Ha ocurrido un error. Inténtelo de nuevo.",3000);
        });
    }
    deleteSubpackage(){
        var id = this.props.id;
        subpackagesContainer.remove({_id:id});
    }
    checkFields(){
        if(this.state.name.length === 0)
        {
            Materialize.toast("Debe completarse el nombre.",3000);
            return false;
        }
        return true;
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()){
            this.updateSubpackage();
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
            }
        }
        else
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }
    handleInputChange(){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    renderDefault(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td style={{'padding-right':"70px"}}>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn"><i
                    className="material-icons">edit</i></a>
                </td>
            </>
        )
    }
    renderEdit(){
        return(
            <>
                <td style={{width:"10%"}}>
                    {this.props.customid}
                </td>
                <td>
                    <input ref="subpackagename" name="name" placeholder="Nombre" type="text"
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td style={{width:"20%"}}><a onClick={this.deleteSubpackage.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5}}>
                    <i className="material-icons">delete</i></a>
                    <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green"><i
                        className="material-icons">check</i></a>
                </td>
            </>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}