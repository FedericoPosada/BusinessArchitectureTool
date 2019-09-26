import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";

export default class MotivationalComponentValue extends React.Component {

    deleteValue() {
        let motivC = motivCompContainer.findOne({_id: this.props._id});
        let tempList = motivC.values;
        if (tempList.indexOf(this.props.name) !== -1) {
            tempList.splice(tempList.indexOf(this.props.name), 1);
            motivCompContainer.update({_id: this.props._id}, {$set: {values: tempList}});
        }
    }

    render() {
        return(
                <>
                <td style={{width:"20%"}}>{this.props.name}</td>
                <td style={{width:"5%"}}><a onClick={this.deleteValue.bind(this)} className="waves-effect waves-light btn red" style={{marginRight:5,marginBottom:5}}><i
                className="material-icons">delete</i></a></td>
                </>
        )
    }

}