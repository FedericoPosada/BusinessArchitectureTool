import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";
import {bSheetsContainer} from "../../api/bsheets";
import Assets from "./Assets";


export default class BalanceSheet extends React.Component{

    constructor(props){
        super(props);
        this.state={
            _id:""
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('motivcomp');
            let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
            if(typeof bSheet !== 'undefined'){
                this.setState({
                    _id:bSheet._id
                });
            }
            else{
                const id=Meteor.userId()+"bSheet";
                let newbSheet={
                    _id:id,
                    cash:"",
                    marketablesecurities:"",
                    inventories:"",
                    accountsreceivable:"",
                    property:"",
                    intangible:"",
                    investment:"",
                    otherassets:"",
                    totalcurrent:"",
                    totalnoncurrent:"",
                    owner:Meteor.userId()
                };
                this.setState({
                    _id:id
                })
                bSheetsContainer.insert(newbSheet);
            }
        })
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="input-field col s6" >
                        <Assets _id={this.state._id}/>
                    </div>
                    <div className="input-field col s6">
                    </div>
                </div>
            </div>
    )
    }
}