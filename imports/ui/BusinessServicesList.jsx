import React from 'react';
import {bServicesContainer} from './api/bservices';
import BusinessService from './BusinessService.jsx';
export default class BusinessServicesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            var bServices = bServicesContainer.find({}).fetch();
            this.setState({list: bServices});
        })
    }
    render(){
        return (
            <div>
                <table className="striped">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Servicio de negocio</th>
                        <th>Objeto de negocio</th>
                        <th>Tipo de cliente</th>
                        <th>Acciones</th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <BusinessService
                            id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
                            object={val.object}
                            client={val.client}
                        />
                        </tr>
                    )
                }) }
                    </tbody>
                </table>
            </div>
        )
    }
}