import React from 'react';
import PrivateLoggedHeader from "../PrivateLoggedHeader";
import ClientsCreator from "./ClientsCreator";
import BusinessStructureCreator from "./BusinessStructureCreator";
import ChannelsModel from "./ChannelsModel";

export default class BusinessStructure extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            clientsMode: false,
            strMode: true,
            chanMode:false
        };
    }
    changeClientsMode(){
        this.setState({
            clientsMode: !this.state.clientsMode,
            strMode: false,
            chanMode:false
        })
    }
    changeStrode(){
        this.setState({
            clientsMode: false,
            strMode: !this.state.strMode,
            chanMode:false
        })
    }
    changeChanMode(){
        this.setState({
            clientsMode: false,
            strMode: false,
            chanMode:!this.state.chanMode
        })
    }
    render() {
        return (
            <div>
                <PrivateLoggedHeader/>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4"><a onClick={this.changeStrode.bind(this)}>Estructura de negocio</a></li>
                        <li className="tab col s4"><a onClick={this.changeChanMode.bind(this)}>Modelo de canales</a></li>
                        <li className="tab col s4"><a onClick={this.changeClientsMode.bind(this)}>Clientes</a></li>
                    </ul>
                </div>
                <div className="row">
                    {this.state.clientsMode && <ClientsCreator/>}
                    {this.state.strMode && <BusinessStructureCreator/>}
                    {this.state.chanMode && <ChannelsModel />}
                </div>
            </div>
        )
    }
}