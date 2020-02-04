import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as joint from 'jointjs';
window.joint = joint;
import GraphViewer from './GraphViewer'
import JsonViewer from './JsonViewer'
import Shapes from '../graph/shapes';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import "./BusinessModelEditor/BusinessModelEditor.css";

//import  "./BusinessModelEditor/JS/vectorizer.js";
//import  "./BusinessModelEditor/JS/styles.js";

export default class GraphEditor extends Component {

    constructor(props) {
        super(props);
        //this.handleAddAtomic = this.handleAddAtomic.bind(this);
        this.addToCellToGraph = this.addToCellToGraph.bind(this);

        this.handleAddContainer = this.handleAddContainer.bind(this);
        this.handleAddComponent = this.handleAddComponent.bind(this);
    }

    addToCellToGraph(a) {
        console.log(a);
        this.props.graph.addCell(a);
    }
/*)
    handleAddAtomic() {
        this.addToCellToGraph(Shapes.createAtomic());
    }

*/
     handleAddContainer() {
        this.addToCellToGraph(Shapes.createContainer());
    }
    handleAddComponent() {
        this.addToCellToGraph(Shapes.createComponent());
    }


    renderButtons() {
        return (<div style={{
          backgroundColor: "#EFF8FB"
        }}>

        <input type="image" src="http://172.24.101.248/images/contenedor.PNG" onClick={this.handleAddContainer} />
        <input type="image" src="http://172.24.101.248/images/componente.PNG" onClick={this.handleAddComponent} />
            
        </div>)
    }

    render() {
        return (
            <div>
                {this.props.graph ? this.renderButtons() : <div>There is no Graph.</div>}
            </div >
        )
    }
}