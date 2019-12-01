import React from 'react';
import {clientsContainer} from "../../api/clients";

export default class Client extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            _id:this.props._id,
            name:this.props.name,
            description:this.props.description
        };
    }
    deleteClient(){
        var id = this.props._id;
        clientsContainer.remove({_id:id});
    }

    render() {
        return(
            <>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteClient.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}