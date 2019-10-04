import React from "react";
import PackageCreator from "./PackageCreator";
import SubpackageCreator from "./SubpackageCreator";
import CapacityCreator from "./CapacityCreator";
import PredefinedSubpackageCreator from "./PredefinedSubpackageCreator";
import PredefinedCapacityCreator from "./PredefinedCapacityCreator";


export default class MapCatalog extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s12">
                        <PredefinedSubpackageCreator/>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s12">
                        <PredefinedCapacityCreator />
                    </div>
                </div>
            </div>
        )
    }
}