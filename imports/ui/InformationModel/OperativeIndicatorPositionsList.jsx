import React from 'react';
import OperativeIndicatorPosition from "./OperativeIndicatorPosition";
import {opIndicatorsContainer} from "../../api/opindicators";

export default class OperativeIndicatorPositionsList extends React.Component {
    constructor(props){
        super(props);
        let positions;
        Meteor.subscribe('opindicators');
        let indi = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:this.props.indicatorid});
        positions=indi.positions;
        this.state = {
            list: positions,
            indicatorid:this.props.indicatorid
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            let positions;
            if(typeof this.state.list === "undefined")
            {let indi = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:this.state.indicatorid});
                positions=indi.positions;}
            else
                positions=this.state.list;
            this.setState({list: positions});
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let positions;
        let indi = opIndicatorsContainer.findOne({owner:Meteor.userId(),_id:nextProps.indicatorid});
        positions=indi.positions;
        this.setState({list: positions});
    }

    render(){
        return (
            <table className="bordered">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Cargo</th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filapos"+index}>
                            <OperativeIndicatorPosition
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