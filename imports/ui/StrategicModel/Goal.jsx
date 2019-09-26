import React from 'react';
import {objectivesContainer} from "../../api/objectives";
import {goalsContainer} from "../../api/goals";

export default class Goal extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false
        };
    }

    checkFields(){
        if(this.refs.nameEdit.value.length === 0  ||this.refs.deadlineEdit.value.length === 0 )
        {
            Materialize.toast("Deben completarse todos los campos.",3000);
            return false;
        }
        return true;
    }
    updateGoal(){
        let newValues={
            name:this.refs.nameEdit.value,
            deadline:this.refs.deadlineEdit.value
        };
        let query = {_id: this.props._id};
        goalsContainer.update(query, {$set:newValues}, (err, done) => {
            if (err)
                Materialize.toast("Ha ocurrido un error al actualizar la meta",3000);
        });
    }
    deleteGoal(){
        var id = this.props._id;
        goalsContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateGoal();
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
                <td>{this.props.objective}</td>
                <td>{this.props.deadline}</td>
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
                <td>
                    {this.props.objective}
                </td>
                <td>
                    <input ref="deadlineEdit" placeholder="Fecha límite" type="date" style={{width:"80%"}}
                           defaultValue={this.props.deadline} className="validate" />
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteGoal.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
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