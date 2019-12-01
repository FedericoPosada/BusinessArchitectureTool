import React from 'react';
import {clientsContainer} from "../../api/clients";
import Client from "./Client";

export default class ClientsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('clients');
            let labels = clientsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: labels});
        })
    }
    render(){
        return (
            <div>
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"label"}>
                        <Client
                            _id={val._id}
                            name={val.name}
                            description={val.description}
                        />
                        </tr>
                        </React.Fragment>
                    )
                }) }
                    </tbody>
                </table>
            </div>
        )
    }
}