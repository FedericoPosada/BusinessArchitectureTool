import React from 'react';
import PrimaryActivityCreator from "./PrimaryActivityCreator";

export default class PrimaryActivities extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s6">
                        <PrimaryActivityCreator category="Logística de entrada" categorynumber="1"/>
                    </div>
                    <div className="input-field col s6">
                        <PrimaryActivityCreator category="Operaciones" categorynumber="2"/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s6">
                        <PrimaryActivityCreator category="Logística de salida" categorynumber="3"/>
                    </div>
                    <div className="input-field col s6">
                        <PrimaryActivityCreator category="Marketing" categorynumber="4"/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s6">
                        <PrimaryActivityCreator category="Servicios" categorynumber="5"/>
                    </div>
                </div>
            </div>
        )
    }
}