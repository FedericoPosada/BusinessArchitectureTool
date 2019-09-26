import React from 'react';
import {componentsContainer} from "../../api/components";
import Component from "./Component";
export default class ComponentsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('components');
            let components = componentsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: components});
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
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"service"}>
                        <Component
                            id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
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