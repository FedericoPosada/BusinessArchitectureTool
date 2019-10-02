import React from "react";
import PackageCreator from "./PackageCreator";
import SubpackageCreator from "./SubpackageCreator";
import CapacityCreator from "./CapacityCreator";


export default class MapEditor extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s5">
                        <PackageCreator/>
                    </div>
                    <div className="input-field col s6">
                        <SubpackageCreator />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-field col s12">
                        <CapacityCreator />
                    </div>
                </div>
            </div>
        )
    }
}