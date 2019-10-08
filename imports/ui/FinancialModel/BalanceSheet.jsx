import React from 'react';
import {motivCompContainer} from "../../api/motivcomp";
import {bSheetsContainer} from "../../api/bsheets";
import Assets from "./Assets";
import Liabilities from "./Liabilities";


export default class BalanceSheet extends React.Component{

    constructor(props){
        super(props);
        this.state={
            _id:""
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('bsheets');
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
                    cash:0,
                    marketablesecurities:0,
                    inventories:0,
                    accountsreceivable:0,
                    property:0,
                    intangible:0,
                    investment:0,
                    otherassets:0,
                    totalcurrent:0,
                    totalnoncurrent:0,
                    accountspayable:0,
                    financialliabilities:0,
                    unearnedrevenue:0,
                    longtermdebt:0,
                    otherlongtermliabilities:0,
                    treasuryshares:0,
                    additionalpaidin:0,
                    comprehensiveloss:0,
                    retainedearnings:0,
                    totalcurrentl:0,
                    totalnoncurrentl:0,
                    totalequity:0,
                    total:0,
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
                        <Liabilities _id={this.state._id}/>
                    </div>
                </div>
            </div>
    )
    }
}