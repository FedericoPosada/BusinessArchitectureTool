import React from 'react';
import {bServicesOperationsContainer} from '../../api/bservoperations';
import BusinessServiceOperation from './BusinessServiceOperation.jsx';

export default class BusinessServicesOperationsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('bservoperations');
            let bServiceOperations = bServicesOperationsContainer.find({bserviceid:this.props.bserviceid}).fetch();
            this.setState({list: bServiceOperations});
        })
    }
    render(){
        return (
                <table className="bordered">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Operación</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <BusinessServiceOperation
                            id={val._id}
                            customid={val.customid}
                            bservicecustomid={this.props.bserviceid}
                            name={val.name}
                            key={val.customid}
                        />
                        </tr>
                    )
                }) }
                    </tbody>
                </table>
        )
    }
}