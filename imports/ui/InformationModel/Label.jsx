import React from 'react';
import {labelsContainer} from "../../api/labels";

export default class Label extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            _id:this.props._id,
            description:this.props.description
        };
    }
    deleteLabel(){
        var id = this.props._id;
        labelsContainer.remove({_id:id});
    }

    render() {
        return(
            <>
                <td style={{width:"10%"}}>{this.props._id}</td>
                <td>{this.props.description}</td>
                <td style={{width:"20%"}}><a onClick={this.deleteLabel.bind(this)} className="waves-effect waves-light btn red"><i
                    className="material-icons">delete</i></a>
                </td>
            </>
        )
    }
}