import React from 'react';
import Label from "./Label";
import {labelsContainer} from "../../api/labels";

export default class ComponentsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('labels');
            let labels = labelsContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: labels});
        })
    }
    render(){
        return (
            <div>
                <table className="striped" >
                    <tbody>
                    <tr>
                        <th>Etiqueta</th>
                        <th>Descripción</th>
                        <th></th>
                    </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <React.Fragment key={index}>
                        <tr key={index+"label"}>
                        <Label
                            _id={val._id}
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