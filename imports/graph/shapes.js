import * as joint from 'jointjs';
window.joint = joint;

import  "../ui/BusinessModelEditor/JS/vectorizer.js";
import  "../ui/BusinessModelEditor/JS/styles.js";

export default class Shapes {

/*
  static createRectangle() {
    return new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: {
        rect: { fill: 'blue' },
        text: { text: 'RECTANGLE', fill: 'white' }
      }
    });
  }

  static createCricle() {
    return new joint.shapes.basic.Circle({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 100 },
      attrs: {
        circle: { fill: 'green' },
        text: { text: 'CIRCLE', fill: 'white' }
      }
    });
  }

*/
  static createComponent(){
    
    
   return new joint.shapes.basic.Rect({

        accumulationid:'',
        name:'R1',
        typeA:'',
        subtype:'',
        groupid:'',

        type:'basic.Rect',
       // markup: '<g className="rotatable"><g className="scalable"><rect/><title className="tooltip"/></g><text/></g><g className="element-tools"><g className="element-tool-remove" event="x-remove"><circle fill="blue" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',

          position: { x: 100, y: 30 },
        size: { width: 30, height: 150 },
          attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5'},text: { text: "Componente", 'ref-y': 75, 'ref-x':10, transform:'rotate(270)'}},
          ports: {
         groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
          }
  })
  }

static createContainer() {
    return new joint.shapes.basic.Rect({

        accumulationid:'',
        name:'R2',
        typeA:'',
        subtype:'',
        groupid:'',
        type:'basic.Rect',
       // markup: '<g className="rotatable"><g className="scalable"><rect/><title className="tooltip"/></g><text/></g><g className="element-tools"><g className="element-tool-remove" event="x-remove"><circle fill="blue" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',

         position: { x: 100, y: 30 },
      size: { width: 100, height: 100 },
          attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5',strokeDasharray:'7', opacity:'0.7'},text: { text: "Contenedor", 'ref-y': 115}},
          ports: {
         groups: {
                'top': {position:'top',
                 attrs: {
                        '.port-body': {
                            r: "6",
                            fill: 'blue',
                            magnet: 'passive'
                        },
                      '.port-label': {
                        fill: "transparent"
                      }
                    }},
                'bottom':{position:'bottom',
                 attrs: {
                        '.port-body': {
                            r: "6",
                            fill: 'blue',
                            magnet: 'passive'
                        },
                      '.port-label': {
                        fill: "transparent"
                      }
                    }},
                'left':{position:'left',
                 attrs: {
                        '.port-body': {
                            r: "6",
                            fill: 'blue',
                            magnet: 'passive'
                        },
                      '.port-label': {
                        fill: "transparent"
                      }
                    }},
                'right':{position:'right',
                 attrs: {
                        '.port-body': {
                            r: "6",
                            fill: 'blue',
                            magnet: 'passive'
                        },
                      '.port-label': {
                        fill: "transparent"
                      }
                    }}
            }
          }
  })

  }

/*
  static createLink(from, to) {
    return new joint.dia.Link({
      source: { id: from },
      target: { id: to }
    });
  }

  static createAtomic() {
    return new joint.shapes.devs.Atomic({

      position: {
        x: 50,
        y: 50
      },
      size: {
        width: 100,
        height: 100
      },
      inPorts: ['in1'],
      outPorts: ['out1']
    });
  }
*/
//nuevas formas


}