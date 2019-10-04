import React from 'react';
import {pSubpackagesContainer} from "../../api/psubpackages";
import Subpackage from "./Subpackage";
import PredefinedSubpackage from "./PredefinedSubpackage";

export default class PredefinedSubpackagesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            packageSelected:this.props.packageSelected
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({packageSelected: nextProps.packageSelected});
    }

    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('psubpackages');
            let subps = pSubpackagesContainer.find({owner:Meteor.userId()}).fetch();
            this.setState({list: subps});
        })
    }
    render(){
        return (
                <table className="bordered" style={{'height': '300px', 'overflow-y':'scroll', 'overflow-x':'hidden', 'display': 'block'}}>
                    <tbody>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={index}>
                        <PredefinedSubpackage
                            packageSelected={this.state.packageSelected}
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