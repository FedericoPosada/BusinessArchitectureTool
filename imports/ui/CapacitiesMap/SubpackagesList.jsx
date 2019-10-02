import React from 'react';
import {subpackagesContainer} from "../../api/subpackages";
import Subpackage from "./Subpackage";

export default class SubpackagesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            packageSelected:this.props.packageSelected
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if( nextProps.packageSelected === "") {
            let caps = subpackagesContainer.find({owner: Meteor.userId()}, {sort: {customid: 1}}).fetch();
            this.setState({packageSelected: nextProps.packageSelected, list: caps});
        }
        else {
            console.log(nextProps.packageSelected);
            let caps = subpackagesContainer.find({owner: Meteor.userId(), "customid": new RegExp(nextProps.packageSelected)}, {sort: {customid: 1}}).fetch();
            this.setState({packageSelected: nextProps.packageSelected, list: caps});
        }
    }

    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('subpackages');
            let subps = subpackagesContainer.find({owner:Meteor.userId()}, {sort:{customid:1}}).fetch();
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
                        <Subpackage
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