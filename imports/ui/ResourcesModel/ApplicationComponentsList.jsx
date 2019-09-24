import React from 'react';
import {applicationsContainer} from "../../api/applications";
import ApplicationComponent from "./ApplicationComponent";

export default class ApplicationComponentsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.componentslist,
            applicationid:this.props.applicationid,
            componentslist:this.props.componentslist
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('applications')
            let app = applicationsContainer.findOne({owner:Meteor.userId(),_id:this.state.applicationid});
            let components;
            if(typeof this.state.applicationid !== "undefined")
                components=app.components;
            else
                components=this.state.componentslist;
            this.setState({list: components});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.componentslist});
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>Componentes tecnológicos relacionados:</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filaposcom"+index}>
                            <ApplicationComponent
                                applicationid={this.props.applicationid}
                                customid={val.customid}
                                name={val.name}
                                key={"appcom"+this.props.applicationid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}