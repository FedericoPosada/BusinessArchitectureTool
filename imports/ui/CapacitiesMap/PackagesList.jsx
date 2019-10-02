import React from 'react';
import {packagesContainer} from "../../api/packages";
import Package from "./Package";

export default class PackagesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('packages');
            let packs = packagesContainer.find({owner:Meteor.userId()}, {sort:{customid:1}}).fetch();
            this.setState({list: packs});
        })
    }
    render(){
        return (
                <table className="bordered" style={{'height': '300px', 'overflow-y':'scroll', 'overflow-x':'hidden', 'display': 'block'}}>
                    <tbody>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <Package
                            id={val._id}
                            customid={val.customid}
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