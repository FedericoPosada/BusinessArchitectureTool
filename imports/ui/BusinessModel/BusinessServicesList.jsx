import React from 'react';
import {bServicesContainer} from '../../api/bservices';
import BusinessService from './BusinessService.jsx';
import BusinessServiceOperationsManager from "./BusinessServiceOperationsManager";
export default class BusinessServicesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('bservices');
            var bServices = bServicesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: bServices});
        })
    }
    render(){
        return (
            <div>
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Servicio de negocio</th>
                        <th>Objeto de negocio</th>
                        <th>Tipo de cliente</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"service"}>
                        <BusinessService
                            _id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
                            object={val.object}
                            client={val.client}
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