
var svgZoom = svgPanZoom('#myHolder svg', {
  center: false,
  zoomEnabled: true,
  panEnabled: true,
  controlIconsEnabled: false,
  fit: false,
  minZoom: 0.04,
  maxZoom: 10,
  zoomScaleSensitivity: 0.4,
  dblClickZoomEnabled:false
});


//Enable pan when a blank area is click (held) on
paper.on('blank:pointerdown', function (evt, x, y) {
    svgZoom.enablePan();
    //console.log(x + ' ' + y);
});

//Disable pan when the mouse button is released
paper.on('cell:pointerup blank:pointerup', function(cellView, event) {
  svgZoom.disablePan();
});

paper.on({
    'cell:pointerdblclick': function(cellView, event, x, y){
        if (cellView.model.isLink()) {
            cellView.model.label(0, { attrs: { text: { text: 'new label' } } });
        }
        console.log(cellView.model.attr);
    },
});



$('#svg').click(function(){
  var svg = paper.svg;
  var serializer = new XMLSerializer();
  var string = serializer.serializeToString(svg);
  var nbreak= string.search('><');
  var headline= string.slice(0,nbreak);
  headline = headline.concat(' style="background: #FFFFFF">');
  var rest = string.slice(nbreak+1);

  saveAs(new Blob([headline.concat(styles, rest)], {type:"application/svg+xml"}), "Paper_Graph.svg");
  //console.log(string);
  //string = '<?xml version="1.0" standalone="no"?>\r\n' +string;
  //var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(string);
  //$('#svg').attr("href",  url);
  //$('#svg').attr("download", "data.svg");
});



paper.on("link:connect", function(linkView, evt, cellView, magnet, arrowhead) {
    logSourceTargetPorts(linkView.model);
})

graph.on("remove", function(cell, collection, opt) {
    if (cell.isLink()) {
        logSourceTargetPorts(cell);
    }
})

function logSourceTargetPorts(link) {
    var source = link.get('source'); 
    var target = link.get('target');
    if(source.port && target.port) {
        console.log("source and target ports: ", source.port, target.port);
    }
}

paper.on('blank:pointerdblclick',function(evt,x,y){
  if(elementAdd){
    var obj = elementAdd.clone();
    obj.name="";
    if(obj.isElement()){
      obj.position(x,y);
      graph.addCell(obj);
      console.log(graph.getCells());
      data= "text/json;charset=utf-8," +encodeURIComponent(JSON.stringify(graph.toJSON()));
      json.attr("href","data:" + data );
      obj.toFront();
    }
  }
});

paper.on('blank:pointerdblclick',function(evt,x,y){
  if(elementAdd2){
    var obj = elementAdd2.clone();

    if(obj.isElement()){
      obj.position(x,y);
      if(obj.attributes.name=='R1')
      {
        obj.size(500,2000); 
        obj.attr('text/font-size',50);
      }
      if(obj.attributes.name=='R2')
      {

        obj.size(2000,500); 
        obj.attr('text/font-size',50);
      }
      console.log(obj.attributes.name);
      graph.addCell(obj);
      console.log(graph.getCells());
      data= "text/json;charset=utf-8," +encodeURIComponent(JSON.stringify(graph.toJSON()));
      json.attr("href","data:" + data );
      obj.toFront();
    }
  }
});

paper.on('tool-remove', function(evt,linkView){

linkView.model.remove();

});
paper.on('x-remove', function(evt,cellView){

})
var propElement;

var select = function(cellView){
  if(propElement){
    unactive(propElement);
    $("#tabAttributes #table tbody").empty();
    $("#tabAttributes #addButton").empty();
    $("#tabProperties #width").empty();
    $("#tabProperties #height").empty();
  }
  if(propElement!=cellView){
    props(cellView);
    active(cellView);
    propElement=cellView;
  }
  else {
      propElement=null;
  }
}
paper.on('cell:pointerclick',function(cellView,evt,x,y){
  if(elementAdd){
    if(elementAdd.isLink()){
      console.log(elementAdd.attributes.name);
      if(!elementAdd.get('source').id){
        elementAdd.set('source',{id:cellView.model.id});
      }
      else{
        var finalLink=elementAdd.clone();
        finalLink.set('target',{id:cellView.model.id});
        graph.addCell(finalLink);
        data= "text/json;charset=utf-8," +encodeURIComponent(JSON.stringify(graph.toJSON()));
        json.attr("href","data:" + data );
        elementAdd.disconnect();
        finalLink.toFront();

      }
    }
    else {
      select(cellView);
    }
  }
  else{
    select(cellView);
  }
});

paper.on('cell:pointerclick',function(cellView,evt,x,y)
{



selectedId=cellView.model.id;






});

$('#saveButton').click(function(){

data= "text/json;charset=utf-8," +encodeURIComponent(JSON.stringify(graph.toJSON()));
      json.attr("href","data:" + data );


Swal.fire('¡Tu modelo ha sido guardado!');

 
}

);

$('#csv').click(function(text,name,type){


var a = document.getElementById("csv");
 

 var stg = "";
  var json1 = (JSON.parse(JSON.stringify(graph.toJSON())));
var max = 0;
for (var i = 0; i< json1.cells.length ; i++) 
{
  
 


    var obj = json1.cells[i];
      if(obj.type == "basic.Rect")
      {
          stg=stg+obj.type+",";
          if(obj.attrs.text.text)
           stg=stg+obj.attrs.text.text;
         else
          stg=stg+"Container";
          stg=stg+",,,";

if(obj.embeds){
  var numberEmbeds =0;
        for (var j = 0; j< obj.embeds.length ; j++) {
          var xc = graph.getCell(obj.embeds[j]);
          if(graph.getCell(obj.embeds[j]).attributes.type=="basic.Rect"){
          stg=stg+","+graph.getCell(obj.embeds[j]).attributes.attrs.text.text;
        numberEmbeds++;}
        }

        if(numberEmbeds>max)
        {

          max=numberEmbeds;
        }}


          stg=stg+"\r\n";


            console.log(obj);
    }
       if(obj.type == "devs.Link")
        {

            stg=stg+obj.type+",,"+obj.labels[0].attrs.text.text+","+graph.getCell(obj.source.id).attributes.attrs.text.text+","+graph.getCell(obj.target.id).attributes.attrs.text.text+","+"\r\n";

          

        }
    console.log(obj);
    
    
}

var stg2= "Type,Component Name,Link Name,Link Source,Link Target";

for (var i = 0; i< max; i++) 
{
 
 stg2=stg2+",Embed "+(i+1);

}

stg=stg2+"\r\n"+stg;
  
var type= "text/csv";
var name="data.csv"
 var file = new Blob([stg], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;

}


);




$('#dltButton').click(function(){

console.log(selected);
graph.getCell(selectedId).remove();

});


$('#changeColor').click(function()
{
var elem = graph.getCell(selectedId);
elem.attributes.attrs;
console.log( elem.attributes.attrs.circle.fill);

elem.attributes.attrs.circle.fill='#98c9a3'




})



$('#toFrontButton').click(function(){

graph.getCell(selectedId).toFront();
});






$('#imprimirPropiedades').click(function(){


console.log(graph.getCell(selectedId).attributes.processorid);


var text = '\n&lt;processor id="'+graph.getCell(selectedId).attributes.processorid+'"&gt;\n   &lt;name&gt;'+graph.getCell(selectedId).attributes.attrs.text.text+'&lt;/name&gt\n   &lt;behaviour&gt;'+graph.getCell(selectedId).attributes.behaviour+'&lt;/behaviour&gt\n   &lt;type&gt;'+graph.getCell(selectedId).attributes.typeP+'&lt;/type&gt;\n   &lt;groupId&gt;'+graph.getCell(selectedId).attributes.groupid+'&lt;/groupId&gt;\n   &lt;numInstances&gt;'+graph.getCell(selectedId).attributes.numinstances+'&lt;/numInstances&gt;\n&lt;/processor&gt;';


$('#parsed-xml').append(text);

});




$('#toBackButton').click(function(){

graph.getCell(selectedId).toBack();



});




$('#changeNormalLink').click(function(){

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

paper.options.defaultLink = linknuevo;


});


$('#changeDottedLink').click(function(){

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

paper.options.defaultLink = linknuevo;


});


function generateXML()
{

console.log(graph.getCells());

}


