import React from 'react';
import {strategiesContainer} from "../../api/strategies";

export default class Strategy extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false
        };
    }

    checkFields(){
        if(this.refs.stnameEdit.value.length === 0)
        {
            Materialize.toast("Deben completarse todos los campos.",3000);
            return false;
        }
        return true;
    }
    updateStrategy(){
        let newValues={
            name:this.refs.stnameEdit.value
        };
        let query = {_id: this.props._id};
        strategiesContainer.update(query, {$set:newValues}, (err, done) => {
            if (err)
                Materialize.toast("Ha ocurrido un error al actualizar la estrategia",3000);
        });
    }
    deleteStrategy(){
        var id = this.props._id;
        strategiesContainer.remove({_id:id});
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateStrategy();
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
                    <input ref="stnameEdit" placeholder="Nombre" type="text" style={{width:"80%"}}
                           defaultValue={this.props.name} className="validate" />
                </td>
                <td>
                    {this.props.objective}
                </td>
                <td style={{width:"5%"}}><a onClick={this.deleteStrategy.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
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