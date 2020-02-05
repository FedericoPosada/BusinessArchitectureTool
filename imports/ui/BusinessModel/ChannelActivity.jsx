import React from 'react';
import {channelActivitiesContainer} from "../../api/chanactivities";

export default class ChannelActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isInEditMode: false,
            name:this.props.name
        };
    }
    updateChannelActivity(){
        let newServiceValues = {
            $set: {
                name: this.state.name
            }
        };
        let query = { _id:this.props.id };
        channelActivitiesContainer.update(query, newServiceValues,(err,done)=>{
            if (err) throw err;
        });
    }
    deleteChannelActivity(){
        var id = this.props.id;
        channelActivitiesContainer.remove({_id:id});
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
            this.updateChannelActivity();
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
                <td>{this.props.name}</td>
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
                    <input id="activitynameedit" name="name" placeholder="Actividad"  type="text"
                           defaultValue={this.props.name} className="validate" onChange={this.handleInputChange.bind(this)}/>
                </td>
                <td style={{width:"20%"}}><a onClick={this.deleteChannelActivity.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5}}>
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