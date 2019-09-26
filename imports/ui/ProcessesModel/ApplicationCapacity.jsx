import React from 'react';
import {opItemsContainer} from "../../api/opitems";
import {applicationsContainer} from "../../api/applications";

export default class ApplicationCapacity extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteApplicationCapacity(){
        let opItem = applicationsContainer.findOne({_id:this.props.applicationid});
        let capacities=opItem.capacities;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<capacities.length && i !== -1;i++)
        {
            if(capacities[i].customid === currentRes.customid)
                indexItem=i;
        }
        capacities.splice(indexItem,1);
        applicationsContainer.update({_id:this.props.applicationid},{$set:{"capacities":capacities}});
        Materialize.toast("Se ha borrado la capacidad, verá los cambios al volver a esta aplicación.",3000);
    }
    render(){
        return(
            <>
                <td style={{width:"10%"}}>{this.props.customid}</td>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteApplicationCapacity.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}