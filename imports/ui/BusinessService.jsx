import React from 'react';
import {bServicesContainer} from './api/bservices';

export default class BusinessService extends React.Component {
    deleteService(){
        var id = this.props.id;
        bServicesContainer.remove({_id:id});
    }
//<button onClick={this.deleteService.bind(this)}>Borrar</button>
    render(){
        return (
            <>
                <td>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.object}</td>
                <td>{this.props.client}</td>
                <td><a onClick={this.deleteService.bind(this)} className="waves-effect waves-light btn red"><i
                        className="material-icons left">delete</i>Borrar</a>
                </td>
            </>
        )
    }
}