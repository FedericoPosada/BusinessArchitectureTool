import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as joint from 'jointjs';
window.joint = joint;
import FileSaver from './BusinessModelEditor/JS/FileSaver.js';
import M from "materialize-css";
import _ from "./BusinessModelEditor/JS/lodash.js";
import "./BusinessModelEditor/BusinessModelEditor.css";
//import  "./BusinessModelEditor/JS/svg-pan-zoom.js";

//import  "./BusinessModelEditor/JS/vectorizer.js";
//import  "./BusinessModelEditor/JS/styles.js";

export default class GraphViewer extends Component {



  componentDidMount(props) {
    this.selected="";

/*
      var svgZoom = svgPanZoom('#zoom', {
  center: false,
  zoomEnabled: true,
  panEnabled: true,
  controlIconsEnabled: true,
  fit: false,
  minZoom: 0.5,
  maxZoom:2,
  zoomScaleSensitivity: 0.5
});
*/
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.refs.paper),
      width: "100%",
      height: 300,
      model: this.props.graph,
      embeddingMode: true,
      gridSize: 20,
            drawGrid: true,





    /*
      ,

      defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        }),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            // Prevent linking from input ports.
            if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
            // Prevent linking from output ports to input ports within one element.
            if (cellViewS === cellViewT) return false;
            // Prevent linking to input ports.
            return magnetT && magnetT.getAttribute('port-group') === 'in';
        },
        // Enable marking available cells & magnets
        markAvailable: true,
      // Enable link snapping within 75px lookup radius
    snapLinks: { radius: 75 }
    */
    });



    this.paper.on('cell:pointerdown', function(cellView, evt, x, y) {
    
      var cell=cellView.model;
        //this.selected = cellView.model;
        this.setState({selectedFrom:this.state.selected});
        this.setState({selected:cell});


        //unembed
        if (cell.get('parent')) {
            this.props.graph.getCell(cell.get('parent')).unembed(cell);
        }


    }.bind(this));

  this.paper.on('cell:pointerup', function(cellView, evt, x, y) {

        var cell = cellView.model;
        var cellViewsBelow = this.paper.findViewsFromPoint(cell.getBBox().center());
 //       console.log(cellViewsBelow.length);

     

      //embed
    
         var cellViewBelow = _.find(cellViewsBelow, function(c) { return c.model.id !== cell.id });
          if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
                cellViewBelow.model.embed(cell);
            }



    }.bind(this));



    

  //selects
    let selects = document.querySelectorAll('select');
    
    M.FormSelect.init(selects, {});




//demo links
/*


    var m1 = new joint.shapes.devs.Model({
        position: { x: 50, y: 50 },
        size: { width: 100, height: 30 },
        inPorts: ['in1','in2'],
//        inPorts: [{id: 'in1', label: 'A'}, {id: 'in2', label: 'V'}],
        outPorts: ['out'],
        ports: {
            groups: {
                'in': {
                    position: "top",
                    attrs: {
                        '.port-body': {
                            r: "6",
                            fill: 'blue',
                            magnet: 'passive'
                        },
                      '.port-label': {
                        fill: "transparent"
                      }
                    }
                },
                'out': {
                    position: "bottom",
                    portLabelMarkup: '<text fill="yellow"/>',
                    attrs: {
                        '.port-body': {
                            r: "6",
                            fill: 'red'
                        },
                        '.port-label': {
                          fill: "transparent"
                      }
                    }
                }
            }
        },
        attrs: {
            '.label': { text: 'node 1', 'ref-x': .5, 'ref-y': .2 },
            rect: { fill: 'LightGrey', rx: 15, ry: 15 }
        }
    }).addTo(this.props.graph);

var m2 = m1.clone();
m2.translate(0, 70);
this.props.graph.addCell(m2);
m2.attr('.label/text', 'node 2');

*/
// demo links end


  }

removeElement(){
   if (this.state.selected) this.state.selected.remove(); 
}

constructor(props){
  super(props);

  this.state={selected:"",
      selectedFrom:"",
      fromPortID:"",
      toPortID:"",
      name:"",
      size:75,
      error: '',
      showPuertos: true,
      showAttributes: false,
      showProperties: false,
      nPort:1,
      checked: false };

  this.downloadSvg = this.downloadSvg.bind(this);
  this.removeElement=this.removeElement.bind(this);
  this.changeNormalLink =this.changeNormalLink.bind(this);
  this.changeDottedLink =this.changeDottedLink.bind(this);

  this.savePort=this.savePort.bind(this);
  this.handleCheck = this.handleCheck.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleFromChange = this.handleFromChange.bind(this);
  this.handleToChange = this.handleToChange.bind(this);
  this.handleSize=this.handleSize.bind(this);

  this.showPorts =this.showPorts.bind(this);
  this.createChannel=this.createChannel.bind(this);
  
   

    this.showPuertos = this.showPuertos.bind(this);
    this.showAttributes = this.showAttributes.bind(this);
    this.showProperties = this.showProperties.bind(this);


 
}

handleSize(){
  console.log("Size"+document.getElementById("myRange").value);
  //this.setState({size:document.getElementById("myRange").value});

  if(this.state.selected.attributes.name=="R2")
       {
                this.state.selected.resize(document.getElementById("myRange").value*1.5, document.getElementById("myRange").value);
                //this.state.selected.resize({width:this.state.size, height:this.state.size});

       }
}

handleChange(event){
  
  this.setState({name: event.target.value});

  if(this.state.selected.attributes.name=="R2")
       {
                this.state.selected.attr({text: { text: this.state.name, 'ref-y': 115}});

       }
        
        else{
        this.state.selected.attr({text: { text: this.state.name, 'ref-y': 75}});

      }
}

handleFromChange(event){
  
  this.setState({fromPortID: event.target.value});
}

handleToChange(event){
  
  this.setState({toPortID: event.target.value});
}

logSourceTargetPorts(link) {
    var source = link.get('source'); 
    var target = link.get('target');
    if(source.port && target.port) {
        console.log("source and target ports: ", source.port, target.port);
    }
}

downloadSvg(){
    var svg = this.paper.svg;
  var serializer = new XMLSerializer();
  var string = serializer.serializeToString(svg);
  console.log(string);


 console.log("bajando svg")
    

    //download
      var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(string));
    element.setAttribute('download', "svg.svg");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    //
    console.log("descargo svg")



  }
   showPuertos()
  {
      this.setState( {
      showPuertos: true,
      showAttributes: false,
      showProperties: false
    });
  }
  showAttributes()
  {
      this.setState( {
      showPuertos: false,
      showAttributes: true,
      showProperties: false
    });
  }
  showProperties()
  {
      this.setState( {
      showPuertos: false,
      showAttributes: false,
      showProperties: true
    });
  }

  handleCheck(e){
    console.log("cambiando cheked a "+e.target.checked);
    console.log(e.target);
   this.setState({
    checked: e.target.checked
   });
     
 }
 savePort(){
  

  var val =this.state.nPort;
  console.log("añadiendo puerto "+val);
  var pos=$('select#position').val();

       var port = {
        id: val,
        group: pos,
        args: {},

        label: {
            position: {
                name: 'bottom',
                args: { y: 6 } // extra arguments for the label layout function, see `layout.PortLabel` section
            },
            markup: '<text class="label-text" fill="balck"/>'
        },
 
        attrs: { circle: { magnet: true, stroke: '#000000', 'stroke-width': 2, fill: '#000000' }, text: { text: val, stroke: '#ffffff' } },
         
      };

      this.state.selected.addPort(port);
      //this.props.graph.addCell(port);
      /*
      var clone = this.state.selected.clone();
      clone.translate(300, 0);
        clone.addTo(this.props.graph);
      */
      this.setState({nPort:this.state.nPort+1});
      console.log("añadio puerto");
      console.log("puerto añadido: "+this.state.selected.getPort(val).id);



 }

 createChannel(){
  var type=$('select#channelType').val();
  var link="";
  if(type=="owned")
  {
    console.log("owned");
      link = new joint.shapes.devs.Link({
      //link = new joint.dia.Link({
          source: {
            id: this.state.selectedFrom.id,
            port: this.state.selectedFrom.getPorts()[this.state.fromPortID]
          },
          target: {
            id: this.state.selected.id,
            port: this.state.selected.getPorts()[this.state.toPortID]
          },
          description:'',
          connector:{name:'jumpover'},
          router:{name:'manhattan'},
          smooth:true,
           labels:
          [
            {
              attrs:{text:{text:'Canal'}},
              position:0.5
            }

          ],
          
          markup: [
              '<path class="connection" stroke="#000000" d="M 0 0 0 0"/>',
              '<path class="connection-wrap" d="M 0 0 0 0"/>',
              '<g class="labels"/>',
              '<g class="marker-vertices"/>',
              '<g class="link-tools"/>'
          ].join(''),
    });
  }
  else{
    console.log("non owned");
     link = new joint.shapes.devs.Link({
     // link = new joint.dia.Link({
        source: {
            id: this.state.selectedFrom.id,
            port: this.state.selectedFrom.getPorts()[this.state.fromPortID]
          },
          target: {
            id: this.state.selected.id,
            port: this.state.selected.getPorts()[this.state.toPortID]
          },
         attrs: {
      '.connection': { 'stroke-dasharray': '2,5' }
   },
        description:'',
        connector:{name:'jumpover'},
        router:{name:'manhattan'},
        smooth:true,
         labels:
        [
          {
            attrs:{text:{text:'Canal No Propio', size:'2'}},
            position:0.5
          }

        ],
        
        markup: [
            '<path class="connection" stroke="#000000" d="M 0 0 0 0"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="labels"/>',
            '<g class="marker-vertices"/>',
            '<g class="link-tools"/>'
        ].join(''),
  });
  }
/*
var link = new joint.dia.Link({
      source: {
        id: this.state.selectedFrom.id,
        port: this.state.selectedFrom.getPorts()[0]
      },
      target: {
        id: this.state.selected.id,
        port: this.state.selected.getPorts()[0]
      }
    });
    */

/*
var link = new joint.dia.Link({
      source: {
        id: this.state.selectedFrom.id,
        port: this.state.selectedFrom.getPorts()[this.state.fromPortID]
      },
      target: {
        id: this.state.selected.id,
        port: this.state.selected.getPorts()[this.state.toPortID]
      }
    });
    */
   


        link.addTo(this.props.graph);
        //this.props.graph.addCells([link]);
 }

 showPorts(){
  console.log("puertos: "+this.state.selected.getPorts()[0].id);
 }

 changeNormalLink()
 {
  /*
    var linknuevo = new joint.shapes.devs.Link({
          source:{x:margin.left+20,y:5*size+2*(margin.top+margin.bottom)},
          target:{x:2*size-margin.right,y:5*size+2*(margin.top+margin.bottom)},
          description:'',
          connector:{name:'jumpover'},
          router:{name:'manhattan'},
          smooth:true,
           labels:
          [
            {
              attrs:{text:{text:'Canal'}},
              position:0.5
            }

          ],
          
          markup: [
              '<path class="connection" stroke="#000000" d="M 0 0 0 0"/>',
              '<path class="connection-wrap" d="M 0 0 0 0"/>',
              '<g class="labels"/>',
              '<g class="marker-vertices"/>',
              '<g class="link-tools"/>'
          ].join(''),
    });

  this.paper.options.defaultLink = linknuevo;
  */
}

changeDottedLink()
{
  /*
  var linknuevo = new joint.shapes.devs.Link({
        source:{x:margin.left+20,y:5*size+2*(margin.top+margin.bottom)},
        target:{x:2*size-margin.right,y:5*size+2*(margin.top+margin.bottom)},
         attrs: {
      '.connection': { 'stroke-dasharray': '2,5' }
   },
        description:'',
        connector:{name:'jumpover'},
        router:{name:'manhattan'},
        smooth:true,
         labels:
        [
          {
            attrs:{text:{text:'Canal No Propio', size:'2'}},
            position:0.5
          }

        ],
        
        markup: [
            '<path class="connection" stroke="#000000" d="M 0 0 0 0"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="labels"/>',
            '<g class="marker-vertices"/>',
            '<g class="link-tools"/>'
        ].join(''),
  });

  this.paper.options.defaultLink = linknuevo;
  */
}






  render() {
    var containerStyle= {
        backgroundColor: "#FFFFFF"
      };

    let selection
        if(this.state.showPuertos)
        {
          selection = <div>
                <table className="table table-hover" id="tablePorts">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Active</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                     <tr id='port"+this.state.nPort+"'>
                      <td><input id='id' type='text'/></td>
                      <td><select id='position'><option value='left'>Left</option><option value='right'>Right</option><option value='top'>Top</option><option value='bottom'>Bottom</option></select></td>
                      <td><input type='checkbox' id='active' name='port"+this.state.nPort+"' checked={this.state.checked} onChange={this.handleCheck}/><label for='active'></label></td>
                      <td><button className='btn' id='savePort' style={{backgroundColor: '#283E49'}} onClick={this.savePort}>Save port</button></td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table table-hover" id="tableChannels">
                    <thead>
                      <tr>
                        <th>From port ID</th>
                        <th>To port ID</th>
                        <th>Channel type</th>
                      </tr>
                    </thead>
                    <tbody>
                     <tr id='port"+this.state.nChannel+"'>
                      <td><input type="text" value={this.state.fromPortID} onChange={this.handleFromChange}/></td>
                      <td><input type="text" value={this.state.toPortID} onChange={this.handleToChange}/></td>
                      <td><select id='channelType'><option value='owned'>Owned channel</option><option value='nonOwned'>Non owned channel</option></select></td>
                      <td><button className='btn' id='saveChannel' style={{backgroundColor: '#283E49'}} onClick={this.createChannel}>Create channel</button></td>
                      </tr>
                    </tbody>
                  </table>

                 
                  </div>
                
        }
        else if(this.state.showAttributes)
        {
          selection = <div>
                <table className="table table-hover" id="tableAttributes">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Name</td>
                      <td><input type="text" value={this.state.name} onChange={this.handleChange} /></td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
        }
        else if(this.state.showProperties)
        {
          selection = <div>
          <div className="col m12">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Size</th>
                        <th></th>
                      </tr>
                    </thead>
          </div>
          <div className="col m12">
                        <div className="form-inline" id="size">
                                <form action="#">
                                  <p className="range-field">
                                    <input type="range" id="myRange" min="75" max="225" onInput={this.handleSize} onChange={this.handleSize}/>
                                  </p>
                                </form>
                        </div>
                  </div>
          </div>
        }

    return (
      <div>
          <div style={graphStyle} ref="paper" />
          <div className="card" style={containerStyle}>
                    <div className="center-align">
                      <div className="card-content black-text">
  

                        <div className="row">
                        
                          <div className="col m6">
                              <button className="btn" id="svg" style={{backgroundColor: "#283E49"}} onClick={this.downloadSvg}><span className="glyphicon glyphicon-floppy-saved" style={{color:"white", cursor:"pointer"}}></span> Save as SVG</button>
                          </div>
                          <div className="col m6">
                              <button className="btn" id="svg" style={{backgroundColor: "#283E49"}} onClick={this.removeElement}><span className="glyphicon glyphicon-floppy-saved" style={{color:"white", cursor:"pointer"}}></span> Delete element</button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
          </div>
          <div className="col m12">
          <div className="divider"></div>
           <div className="col m3">
              <table className="striped">
                  <tbody>
                    <tr>
                      <td><a href="#" onClick={this.showPuertos}>Ports</a></td>
                    </tr>
                    <tr>
                      <td><a href="#" onClick={this.showAttributes}>Name</a></td>
                    </tr>
                    <tr>
                      <td><a href="#" onClick={this.showProperties}>Size</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            <div className="col m9">
                {selection}
            </div>
        </div>

    
      </div>
      )
  }
}

const graphStyle = {
  margin: "auto",
  border: "1px solid #f1f1f1",
};