import React from "react";
import MapEditor from "./MapEditor";
import PredefinedCapacityCreator from "./PredefinedCapacityCreator";
import MapCatalog from "./MapCatalog";

export default class CapacitiesMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorMode: true,
            catalogMode: false
        };
    }

    changeEditorMode() {
        this.setState({
            editorMode: !this.state.editorMode,
            catalogMode: false
        })
    }

    changeCatalogMode() {
        this.setState({
            editorMode: false,
            catalogMode: !this.state.catalogMode
        })
    }

    render() {
        return (
            <div>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4"><a onClick={this.changeEditorMode.bind(this)}>Editor</a></li>
                        <li className="tab col s4"><a onClick={this.changeCatalogMode.bind(this)}>Catálogo de
                            capacidades</a></li>
                    </ul>
                </div>
                <div className="row">
                    {this.state.editorMode && <MapEditor/>}
                    {this.state.catalogMode && <MapCatalog/>}
                </div>
            </div>
        )
    }
}