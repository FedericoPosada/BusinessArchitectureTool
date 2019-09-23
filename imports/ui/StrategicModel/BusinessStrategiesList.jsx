import React from 'react';
import {bStrategiesContainer} from "../../api/bstrategies";
import BusinessStrategy from "./BusinessStrategy";

export default class BusinessStrategiesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('bstrategies');
            var bStrategies = bStrategiesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: bStrategies});
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
                        <th>Categoría</th>
                        <th>ID asociada</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"service"}>
                        <BusinessStrategy
                            id={val._id}
                            customid={val.customid}
                            name={val.name}
                            key={val.customid}
                            description={val.description}
                            category={val.category}
                            associatedid={val.associatedid}
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