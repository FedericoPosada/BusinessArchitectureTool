import React from 'react';
import {opItemsContainer} from "../../api/opitems";
import {applicationsContainer} from "../../api/applications";

export default class ApplicationComponent extends React.Component {
    constructor(props)
    {
        super(props);
    }
    deleteApplicationComponent(){
        let opItem = applicationsContainer.findOne({_id:this.props.applicationid});
        let components=opItem.components;
        let currentRes={
            customid:this.props.customid,
            name:this.props.name
        }
        let indexItem=0;
        for(let i=0;i<components.length && i !== -1;i++)
        {
            if(components[i].customid === currentRes.customid)
                indexItem=i;
        }
        components.splice(indexItem,1);
        applicationsContainer.update({_id:this.props.applicationid},{$set:{"components":components}});
        Materialize.toast("Se ha borrado el componente, verá los cambios al volver a esta aplicación.",3000);
    }
    render(){
        return(
            <>
                <td>{this.props.name}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteApplicationComponent.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}