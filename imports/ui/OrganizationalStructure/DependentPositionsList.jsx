import React from 'react';
import DependentPosition from "./DependentPosition";
import {positionsContainer} from "../../api/positions";

export default class DependentPositionsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.dependentslist,
            positionid:this.props.positionid,
            dependentslist:this.props.dependentslist
        }
    }
    componentWillMount(){
        Tracker.autorun(()=>{
            Meteor.subscribe('positions')
            let app = positionsContainer.findOne({owner:Meteor.userId(),_id:this.state.positionid});
            let dependents;
            if(typeof this.state.positionid !== "undefined")
                dependents=app.dependents;
            else
                dependents=this.state.dependentslist;
            this.setState({list: dependents});
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.dependentslist});
    }

    render(){
        return (
            <div>
            <div className="input-field col s4">
                <label>Cargos dependientes:</label>
            </div>
            <table className="bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                { this.state.list.map((val, index)=>{
                    return(
                        <tr key={"Filaposcom"+index}>
                            <DependentPosition
                                positionid={this.props.positionid}
                                customid={val.customid}
                                name={val.name}
                                key={"appcom"+this.props.positionid+" "+index}
                            />
                        </tr>
                    )
                }) }
                </tbody>
            </table>
            </div>
        )
    }
}