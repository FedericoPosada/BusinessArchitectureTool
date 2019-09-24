import React from 'react';
import OperativeIndicatorProcess from "./OperativeIndicatorProcess";
import {opIndicatorsContainer} from "../../api/opindicators";

export default class OperativeIndicatorProcessesList extends React.Component {
    constructor(props){
        super(props);
        let processes;
        let indi = opIndicatorsContainer.findOne({_id:this.props.indicatorid});
        processes=indi.processes;
        this.state = {
            list: processes,
            indicatorid:this.props.indicatorid
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('opindicators');
            let processes;
            if(typeof this.state.list === "undefined")
            {let indi = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:this.state.indicatorid});
                processes=indi.processes;}
            else
                processes=this.state.list;
            this.setState({list: processes});
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let processes;
        let indi = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:nextProps.indicatorid});
        processes=indi.processes;
        this.setState({list: processes});
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Proceso</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <OperativeIndicatorProcess
                                indicatorid={this.props.indicatorid}
                                customid={val.customid}
                                name={val.name}
                                key={"opindpos"+this.props.indicatorid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}