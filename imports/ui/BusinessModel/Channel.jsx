import React from 'react';
import ChannelActivitiesManager from "./ChannelActivitiesManager";
import {channelsContainer} from "../../api/channels";
import ChannelOperationManager from "./ChannelOperationManager";

export default class Channel extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            opMode:false,
            isInEditMode: false,
            name:this.props.name,
            opeMode:false,
            actMode:false
        };
    }
    changeActMode(){
        this.setState({
            actMode: !this.state.actMode,
            opeMode:false
        })
    }
    changeOpMode(){
        this.setState({
            opMode: !this.state.opMode
        })
    }
    changeOpeMode(){
        this.setState({
            opeMode: !this.state.opeMode,
            actMode:false,
        })
    }
    checkFields(){
        if(this.state.name.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    updateService(){
        let newServiceValues = {
            $set: {
                name: this.state.name
            }
            };
            let query = {_id: this.props._id};
        channelsContainer.update(query, newServiceValues, (err, done) => {
                if (err) throw err;
                console.log("Document updated");
            });
    }
    deleteService(){
        var id = this.props._id;
        channelsContainer.remove({_id:id});
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
    renderDefault(){
        return(
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"5%"}}><a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">edit</i></a>
                    { this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}
                    ><i className="material-icons">keyboard_arrow_up</i></a>}
                    { !this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                        className="material-icons">keyboard_arrow_down</i></a>}
                    { this.state.opMode && !this.state.opeMode && <a onClick={this.changeOpeMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && this.state.opeMode &&<a onClick={this.changeOpeMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && !this.state.actMode && <a onClick={this.changeActMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">details</i></a>}
                    { this.state.opMode && this.state.actMode &&<a onClick={this.changeActMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">details</i></a>}
                </td>
                    { this.state.actMode &&
                        <ChannelActivitiesManager channelcustomid={this.props.customid} channelid={this.props._id}/>
                    }
                    { this.state.opeMode &&
                        <ChannelOperationManager _id={this.props._id}/>
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
                <td style={{width:"5%"}}><a onClick={this.deleteService.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">delete</i></a>
                    <a onClick={this.changeEditMode.bind(this)} className="waves-effect waves-light btn light-green" style={{marginRight:5,marginBottom:5}}><i
                        className="material-icons">check</i></a>
                    { this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}
                    ><i className="material-icons">keyboard_arrow_up</i></a>}
                    { !this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                        className="material-icons">keyboard_arrow_down</i></a>}
                    { this.state.opMode && !this.state.opeMode && <a onClick={this.changeOpeMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && this.state.opeMode &&<a onClick={this.changeOpeMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">settings_applications</i></a>}
                    { this.state.opMode && !this.state.actMode && <a onClick={this.changeActMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">details</i></a>}
                    { this.state.opMode && this.state.actMode &&<a onClick={this.changeActMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">details</i></a>}
                </td>
                { this.state.actMode &&
                <ChannelActivitiesManager channelcustomid={this.props.customid} channelid={this.props._id}/>
                }
                { this.state.opeMode &&
                <ChannelOperationManager _id={this.props._id}/>
                }
            </>
        )
    }

    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }
}