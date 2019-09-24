import React from 'react';
import {tiResourcesContainer} from "../../api/tiresources";
import TIResource from "./TIResource";
export default class TIResourcesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('tiresources');
            let tiresources = tiResourcesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: tiresources});
        })
    }
    render(){
        return (
            <div>
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Costo mensual</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"service"}>
                        <TIResource
                            id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
                            description={val.description}
                            cost={val.cost}
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