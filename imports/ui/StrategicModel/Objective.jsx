import React from 'react';
import {objectivesContainer} from "../../api/objectives";

export default class Objective extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false
        };
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0)
        {
            Materialize.toast("Debe completarse el nombre.",3000);
            return false;
        }
        return true;
    }
    updateObjective(){
        let newname=this.refs.nameEdit.value;
        let query = {_id: this.props._id};
        objectivesContainer.update(query, {$set:{name:newname}}, (err, done) => {
            if (err)
                Materialize.toast("Ha ocurrido un error al actualizar el objetivo",3000);
        });
    }
    deleteObjective(){
        var id = this.props._id;
        objectivesContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateObjective();
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
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"5%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                    className="material-icons">edit</i></a> </td>
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
                    <input ref="nameEdit" placeholder="Nombre" type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" />
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteObjective.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
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