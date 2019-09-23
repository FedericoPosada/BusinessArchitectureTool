import React from 'react';
import {objectivesContainer} from "../../api/objectives";
import {goalsContainer} from "../../api/goals";
import {achIndicatorsContainer} from "../../api/achindicators";

export default class AchievementIndicator extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false
        };
    }

    checkFields(){
        if(this.refs.descriptionEdit.value.length === 0  ||this.refs.achdeadlineEdit.value.length === 0 )
        {
            Materialize.toast("Deben completarse todos los campos.",3000);
            return false;
        }
        return true;
    }
    updateAchievementIndicator(){
        let newValues={
            description:this.refs.descriptionEdit.value,
            deadline:this.refs.achdeadlineEdit.value
        };
        let query = {_id: this.props._id};
        achIndicatorsContainer.update(query, {$set:newValues}, (err, done) => {
            if (err)
                Materialize.toast("Ha ocurrido un error al actualizar el indicador",3000);
        });
    }
    deleteAchievementIndicator(){
        var id = this.props._id;
        achIndicatorsContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateAchievementIndicator();
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
                <td>{this.props.description}</td>
                <td>{this.props.goal}</td>
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
                    <input ref="descriptionEdit" placeholder="Descripción" type="text" style={{width:"80%"}}
                           defaultValue={this.props.description} className="validate" />
                </td>
                <td>
                    {this.props.goal}
                </td>
                <td>
                    <input ref="achdeadlineEdit" placeholder="Fecha límite" type="date" style={{width:"80%"}}
                           defaultValue={this.props.deadline} className="validate" />
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteAchievementIndicator.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
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