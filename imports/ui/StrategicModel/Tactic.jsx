import React from 'react';
import {tacticsContainer} from "../../api/tactics";

export default class Tactic extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false
        };
    }

    checkFields(){
        if(this.refs.tacnameEdit.value.length === 0)
        {
            Materialize.toast("Deben completarse todos los campos.",3000);
            return false;
        }
        return true;
    }
    updateService(){
        let newValues={
            name:this.refs.tacnameEdit.value
        };
        let query = {_id: this.props._id};
        tacticsContainer.update(query, {$set:newValues}, (err, done) => {
            if (err)
                Materialize.toast("Ha ocurrido un error al actualizar la táctica",3000);
        });
    }
    deleteTactic(){
        var id = this.props._id;
        tacticsContainer.remove({_id:id});
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
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.strategy}</td>
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
                    <input ref="tacnameEdit" placeholder="Nombre" type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" />
                </td>
                <td>
                    {this.props.strategy}
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteTactic.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
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