import React from 'react';
import {capacitiesContainer} from "../../api/capacities";

export default class Capacity extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false,
            name:this.props.name
        };
    }
    updateCapacity(){
        let newCapacityValues = {
            $set: {
                name: this.state.name,
                category: this.refs.capacitycategory.value
            }
        };
        let query = { _id:this.props.id };
        capacitiesContainer.update(query, newCapacityValues,(err,done)=>{
            if (err) throw err;
            console.log("Document updated");
        });
    }
    deleteCapacity(){
        var id = this.props.id;
        capacitiesContainer.remove({_id:id});
    }
    checkFields(){
        if(this.state.name.length === 0 || this.refs.capacitycategory.value.length === 0)
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
            this.updateCapacity();
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
                <td style={{'padding-right':"40px"}}>{this.props.category}</td>
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
                    <input ref="capacityname" name="name" placeholder="Nombre" type="text"
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td>
                    <select className="browser-default" ref="capacitycategory" style={{width:"100%"}}>
                        <option>Funcionamiento</option>
                        <option>Misional</option>
                        <option>Estratégico</option>
                    </select>
                </td>
                <td style={{width:"20%"}}><a onClick={this.deleteCapacity.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5}}>
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