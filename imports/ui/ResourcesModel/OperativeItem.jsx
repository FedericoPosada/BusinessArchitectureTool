import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import ResourceComponentsManager from "./ResourceComponentsManager";
import ResourceServicesManager from "./ResourceServicesManager";
import CapacityResourceManager from "./CapacityResourceManager";
import {opItemsContainer} from "../../api/opitems";
import CapacityPositionManager from "./CapacityPositionManager";

export default class OperativeItem extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            opMode: false,
            resMode: false,
            posMode: false
        }
    }
    changeResMode(){
        this.setState({
            resMode: !this.state.resMode,
            posMode: false
        })
    }
    changePosMode(){
        this.setState({
            posMode: !this.state.posMode,
            resMode: false
        })
    }
    changeOpMode(){
        this.setState({
            opMode: !this.state.opMode
        })
    }
    deleteItem(){
        opItemsContainer.remove({_id:this.props._id});
    }
    render(){
        return(
            <>
                <td>{this.props.capacitycustomid}</td>
                <td>{this.props.capacityname}</td>
                <td style={{width:"5%"}}><a onClick={this.deleteItem.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                    className="material-icons">delete</i></a>
                    { this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}
                      ><i className="material-icons">keyboard_arrow_up</i></a>}
                    { !this.state.opMode && <a onClick={this.changeOpMode.bind(this)} className="waves-effect waves-light btn" style={{marginBottom:5}}><i
                          className="material-icons">keyboard_arrow_down</i></a>}
                    { this.state.opMode && !this.state.resMode && <a onClick={this.changeResMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">work</i></a>}
                    { this.state.opMode && this.state.resMode &&<a onClick={this.changeResMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">work</i></a>}
                    { this.state.opMode && !this.state.posMode && <a onClick={this.changePosMode.bind(this)} className="waves-effect waves-light btn" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">person</i></a>}
                    { this.state.opMode && this.state.posMode &&<a onClick={this.changePosMode.bind(this)} className="waves-effect waves-light btn orange" style={{marginRight:5, marginBottom:5}}><i
                        className="material-icons">person</i></a>}
                </td>
                { this.state.resMode &&
                    <CapacityResourceManager _id={this.props._id} capacitycustomid={this.props.capacitycustomid}/>
                }
                { this.state.posMode &&
                    <CapacityPositionManager _id={this.props._id} capacitycustomid={this.props.capacitycustomid}/>
                }
            </>
        )
    }
}