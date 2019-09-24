import React from 'react';
import {resourcesContainer} from "../../api/resources";
import Resource from "./Resource";
export default class ResourcesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('resources');
            let resources = resourcesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: resources});
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
                        <Resource
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