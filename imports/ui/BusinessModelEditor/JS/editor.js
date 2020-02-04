
import joint from "jointjs";
//Tabla de selección de elementos ( Editar )

var requiredElements = new joint.dia.Graph;
var paperEdit= new joint.dia.Paper({
  el: $('#panel'),
  height: $( window ).height()-300,
  width: $('#panel').width(),
  gridSize:5,
  drawGrid:true,
  padding:0,
  model: requiredElements,
  restrictTranslate: true,
  interactive: false
});





var svgCircle=['<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',
   '<circle cx="1025" cy="1025" r="1000" stroke="black" stroke-width="50" fill="#FFFFFF" />',
   '<circle cx="1025" cy="1025" r="900" stroke="black" stroke-width="50" fill="#FFFFFF" />',
  '</svg>'
].join('');

var circuloDoble = new joint.shapes.basic.Image(
{

  processorid:'0',
          name:'',
          behaviour:'',
          typeP:'',
          groupid:'',
          numinstances:'0',
position:{x: size/2, y:margin.top+6*size/2},
size:{width: size-margin.right-margin.left, height: size-margin.top-margin.bottom},
 attrs: {
      text: { text: "Multiple Leaf", 'ref-y':-5},
    name: {text:'namejiji'},
    image: {
      width: 2040,
      height: 2050,
      'xlink:href': 'data:image/svg+xml;utf8,' + encodeURIComponent(svgCircle),
      preserveAspectRatio: 'true'
    }
  },
  ports: {
            groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
        }


});
circuloDoble.prop('multiple','');



joint.shapes.devs.CircleModel = joint.shapes.devs.Model.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',


    defaults: joint.util.deepSupplement({

        type: 'devs.CircleModel',


        attrs: {
            '.body': { r: 50, cx: 50, cy:50, stroke: 'blue', fill: 'lightblue' },
            '.label': { text: 'Circle Model', 'ref-y': 0.5, 'y-alignment': 'middle' },
            '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active' }
        }

    }, joint.shapes.devs.Model.prototype.defaults)
});

joint.shapes.devs.CircleModelView = joint.shapes.devs.ModelView;

var circleModel = new joint.shapes.devs.CircleModel({
text: { 'font-weight': 400, 'font-size': 'middle', fill: 'black', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, 'y-alignment': 'middle' },
    name:'',
   position: { x: size/2, y:margin.top+size/2 },
          size: { width: size-margin.right-margin.left, height: size-margin.top-margin.bottom},
          attrs: { circle: { fill: '#FFFFFF', stroke:'#000000',strokeWidth:'2.5' },text: { text: "Procesador", 'ref-y': 100}},
    inPorts:[],
    outPorts:[],
    ports: {
     groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
    },

});




//Elementos básicos
  var circle = new joint.shapes.basic.Circle({
          processorid:'0',
          name:'',
          behaviour:'',
          typeP:'',
          groupid:'',
          numinstances:'0',
          inPorts: ['top1','top2'],
          position: { x: size/2, y:margin.top+size/2 },
          size: { width: size-margin.right-margin.left, height: size-margin.top-margin.bottom},
          attrs: { circle: { fill: '#FFFFFF', stroke:'#000000',strokeWidth:'2.5' },text: { text: "Procesador", 'ref-y': 120}},
          ports: {
           groups: {
                'top': {position:'top',},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
        },
       

    defaults: joint.util.deepSupplement({
        attrs: {
            text: { 'font-weight': 400, 'font-size': 'small', fill: 'black', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, 'y-alignment': 'middle' },
        },
    }, joint.shapes.basic.Generic.prototype.defaults)
  });


 
  //RECTANGULO


   var rectangle = new joint.shapes.basic.Rect({

        accumulationid:'',
        name:'',
        typeA:'',
        subtype:'',
        groupid:'',
        //markup: '<g class="rotatable"><g class="scalable"><rect/><title class="tooltip"/></g><text/></g><g class="element-tools"><g class="element-tool-remove" event="x-remove"><circle fill="blue" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',

         position: { x: size/2, y:2*margin.top+3.5*size/2 },
          size: { width: size-margin.right-margin.left, height: size-2*(margin.top+margin.bottom)},
          attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5', strokeDasharray:'10,2'},text: { text: "Acumulador", 'ref-y': 110}},
          ports: {
         groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
          }
  });


var rectangle2 = new joint.shapes.basic.Rect({

        accumulationid:'',
        name:'R1',
        typeA:'',
        subtype:'',
        groupid:'',

        //markup: '<g class="rotatable"><g class="scalable"><rect/><title class="tooltip"/></g><text/></g><g class="element-tools"><g class="element-tool-remove" event="x-remove"><circle fill="blue" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',

         position: {  x: size/2+23, y:margin.top+size/2-25 },
          size: { width: size+10-margin.right-margin.left-50, height: size+70-2*(margin.top+margin.bottom)},
          attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5'},text: { text: "Componente", 'ref-y': 75, 'ref-x':20, transform:'rotate(270)'}},
          ports: {
         groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
          }
  }).addTo(requiredElements);


var rectangle4 = new joint.shapes.basic.Rect({

        accumulationid:'',
        name:'R2',
        typeA:'',
        subtype:'',
        groupid:'',
        //markup: '<g class="rotatable"><g class="scalable"><rect/><title class="tooltip"/></g><text/></g><g class="element-tools"><g class="element-tool-remove" event="x-remove"><circle fill="blue" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',

         position: {  x: size/2+15, y:margin.top+size/2+150 },
          size: { width: size-margin.right-margin.left, height: size-2*(margin.top+margin.bottom)},
          attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5',strokeDasharray:'7', opacity:'0.7'},text: { text: "Contenedor", 'ref-y': 95}},
          ports: {
         groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
          }
  }).addTo(requiredElements);



var rectangle3 = new joint.shapes.basic.Rect({

        
        accumulationid:'',
        name:'R2',
        typeA:'',
        subtype:'',
        groupid:'',

        //markup: '<g class="rotatable"><g class="scalable"><rect/><title class="tooltip"/></g><text/></g><g class="element-tools"><g class="element-tool-remove" event="x-remove"><circle fill="blue" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',

         position: {  x: size/2-15, y:2*margin.top+3.5*size/2 +50},
          size: { width: size-margin.right-margin.left+50, height: size-2*(margin.top+margin.bottom)-50},
          attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5'},text: { text: "Canales", 'ref-y': 50}},
          ports: {
         groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
          }
  });


   var m1 = new joint.shapes.devs.Model({
    position: {x: size/2, y:2*margin.top+3.5*size/2},
    size: { width: size-margin.right-margin.left, height: size-2*(margin.top+margin.bottom) },
    attrs: { rect: { fill: '#FFFFFF', stroke:'#000000', strokeWidth:'2.5'},text: { text: "Acumulador", 'ref-y': 100}},
    inPorts:[],
    outPorts:[],
    ports: {
      groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
            }
    }
});



paperEdit.drawBackground({color:"#EFF8FB"});
var cellHighlight;
var elementAdd;
paperEdit.on('cell:pointerclick', function(cellView,evt, x, y) {
    if(cellHighlight){
      unactive(cellHighlight);

    }
    if(cellHighlight!=cellView){
      cellHighlight=cellView;
      elementAdd=cellView.model.clone();
      active(cellView);


    }
    else {
      cellHighlight=null;
      elementAdd=null;
      elementAdd2=null;
    }
});




//Canvas para crear el modelo
function createFile(){
var object = new ActiveXObject("Scripting.FileSystemObject");
var file = object.CreateTextFile("C:\\Hello.txt", false);
file.WriteLine('Hello World');
file.WriteLine('Hope is a thing with feathers, that perches on the soul.'); 
file.Close();
}

var graph = new joint.dia.Graph;
var json=$('#json');
json.on('click', function() {
  var data= JSON.stringify(graph.toJSON());
  json.attr("href","data:" + data);
  json.attr("download", data);

  console.log(data);
});





//







//FIGURAS//


//circulo Doble







var paper= new joint.dia.Paper({
  el: $('#myHolder'),
  height: $( window ).height()-300,
  width: $('#myHolder').width()+10,
  padding:0,
  gridSize:10,
  drawGrid:true,
  drawGrid: {
    name: 'doubleMesh',
    args: [
        { color: 'black', thickness: 0.20 }, // settings for the primary mesh
        { color: '#6d466b', scaleFactor: 7, thickness: 0.45 } //settings for the secondary mesh
]},
  snapLinks: true,
  linkPinning: false,
  defaultLink: new joint.shapes.devs.Link({
        source:{x:margin.left+20,y:5*size+2*(margin.top+margin.bottom)},
        target:{x:2*size-margin.right,y:5*size+2*(margin.top+margin.bottom)},
        descrption:'',
        connector:{name:'jumpover'},
        router:{name:'manhattan'},
        smooth:true,
         labels:
        [
          {
            attrs:{text:{text:'Insert Name'}},
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
        labels: [ { position: 0.5, attrs: { text: { text: 'Link Name' } } }  ]
  }),

validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {


          if(magnetS.getAttribute('stroke')===magnetT.getAttribute('stroke'))

          {

            return true
          }


          else

          {

            return false;
          }


        },
        // Enable marking available cells & magnets
        markAvailable: true,

    // Enable link snapping within 75px lookup radius
    labelMove: true,
  snapLinks: { radius: 15 },
  model: graph,
  restrictTranslate:false,
  embeddingMode: true,
});

paperEdit.on('cell:pointerdown', function(cellView, e, x, y) {
  $('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:1; background: transparent; pointer-event:none; "></div>');
  var flyGraph = new joint.dia.Graph,
    flyPaper = new joint.dia.Paper({
      el: $('#flyPaper'),
      model: flyGraph,
      interactive: false,
      

    }),
    flyShape = cellView.model.clone(),
    pos = cellView.model.position(),
    offset = {
      x: x - pos.x,
      y: y - pos.y
    };

  flyShape.position(0, 0);
  flyGraph.addCell(flyShape);
  $("#flyPaper").offset({
    left: e.pageX - offset.x,
    top: e.pageY - offset.y
  });
  $('body').on('mousemove.fly', function(e) {
    $("#flyPaper").offset({
      left: e.pageX - offset.x,
      top: e.pageY - offset.y
    });
  });
  $('body').on('mouseup.fly', function(e) {
    var x = e.pageX,
      y = e.pageY,
      target = paper.$el.offset();
    
    // Dropped over paper ?
    if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
      var s = flyShape.clone();
      s.position(x - target.left - offset.x, y - target.top - offset.y);
      graph.addCell(s);
    }
    $('body').off('mousemove.fly').off('mouseup.fly');
    flyShape.remove();
    $('#flyPaper').remove();

if(cellView.model.attributes.name=="R2")
{

  graph.getCell(selectedId).toBack();
}

else{
  graph.getCell(selectedId).toFront();


}

  });
});








