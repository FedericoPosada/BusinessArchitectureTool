import React from 'react';
import ResourceComponent from "./ResourceComponent";
import {tiResourcesContainer} from "../../api/tiresources";
import {componentsContainer} from "../../api/components";

export default class ResourceComponentsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('tiresources');
            let resource = tiResourcesContainer.findOne({owner:Meteor.userId(),customid:this.props.resourcecustomid});
            let idsComps=resource.components;
            this.setState({list: idsComps});
        })
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Componente</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    const comp=componentsContainer.findOne({customid:val});
                    let name=comp.name;
                    return(
                        <tr key={"Fila"+index}>
                            <ResourceComponent
                                resourceid={this.props.resourceid}
                                componentcustomid={val}
                                name={name}
                                resourcecustomid={this.props.resourcecustomid}
                                key={"ResCom"+this.props.resourcecustomid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}