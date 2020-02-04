

active = function(cellView){
      selected=cellView.Model;
      console.log("jeje");
 
  cellView.highlight(null, {
    highlighter: {
        name: 'stroke',
        options: {
          padding: 10,
          rx: 5,
          ry: 5,
          attrs: {
            'stroke-width': 2,
            stroke: '#4F94AB'
          }
        }
    }
  });
};

var unactive = function(cellView){
      
  cellView.unhighlight(null, {
    highlighter: {
        name: 'stroke',
        options: {
          padding: 10,
          rx: 5,
          ry: 5,
          attrs: {
            'stroke-width': 2,
            stroke: '#4F94AB'
          }
        }
    }
  });
};


 props = function(cellView)
{

{

    var getName = function(cellView){
      if (cellView.model.attributes.name) {
        return cellView.model.attributes.name;
        
      }
      else {
        return "";
      }
    };
    var attributes =function(type, func){
      if(type=='val'){
        if(func=='in'){
          return {circle:{stroke:"#000000", magnet:true},type:'input'};
        }
        else{
          return {circle:{stroke:"#000000", fill:"#000000", magnet:true}};
        }
      }
      if(type=='mon'){
        if(func=='in'){
          return {circle:{stroke:"#000000", magnet:true}};
        }
        else{
          return {circle:{stroke:"#000000", fill:"#000000", magnet:true}};
        }
      }
       if(type=='nor'){
        if(func=='in'){
          return {circle:{stroke:"#000000", magnet:true}};
        }
        else{
          return {circle:{stroke:"#000000", fill:"#000000", magnet:true}};
        }
      }
      else{
        if(func=='in'){
          return {circle:{stroke:"#000000", magnet:true}};
        }
        else{
          return {circle:{stroke:"#000000", fill:"#000000", magnet:true}};
        }
      }
    };
    var nPort=0;
    
    
    $("#tabPorts #addPort").append(
      "<button type='button' class='btn btn-default btn-sm' id='btnPort'>"+
      "<span class='glyphicon glyphicon-plus'></span>"
      );
    $("#tabAttributes #table tbody").append("");
    if(cellView.model.attributes.type==='basic.Circle'){
      $("#tabAttributes #table tbody").append("<tr id='amount'><td>Processor ID</td><td><input type='text' value='"+cellView.model.attributes.processorid+"' id='processorz' value></td><tr><td>Nombre</td><td><input type='text' value='"+cellView.model.attributes.name+"' id='namez'></td></tr><tr><td>Behaviour</td><td><input type='file' value='"+cellView.model.attributes.behaviour+"' id='behaviourz'></td></tr><tr><td>Type</td><td><input type='text' value='"+cellView.model.attributes.typeP+"' id='typez'></td></tr><tr><td>Group ID</td><td><input type='text' value='"+cellView.model.attributes.groupid+"'id='groupidz'></td></tr><tr><td>Num Instances</td><td><input type='text'value='"+cellView.model.attributes.numinstances+"' id='instancez'></td></tr></tr>");
    }
    if(cellView.model.attributes.type=='basic.Rect'|| cellView.model.attributes.type=="Link")
    {
     $("#tabAttributes #table tbody").append("<tr id='amount'><tr><td>Nombre</td><td><input type='text' value='"+cellView.model.attributes.attrs.text.text+"' id='namez'></td></tr><tr></tr><tr></tr><tr></tr></tr>");
   }
   if(cellView.model.attributes.type==='basic.Image'){
    $("#tabAttributes #table tbody").append("<tr id='amount'><td>Leaf ID</td><td><input type='text' value='"+cellView.model.attributes.processorid+"' id='mprocessorz' value></td><tr><td>Nombre</td><td><input type='text' value='"+cellView.model.attributes.name+"' id='mnamez'></td></tr><tr><td>Behaviour</td><td><input type='file' value='"+cellView.model.attributes.behaviour+"' id='mbehaviourz'></td></tr><tr><td>Type</td><td><input type='text' value='"+cellView.model.attributes.typeP+"' id='mtypez'></td></tr><tr><td>Group ID</td><td><input type='text' value='"+cellView.model.attributes.groupid+"'id='mgroupidz'></td></tr><tr><td>Num Instances</td><td><input type='text'value='"+cellView.model.attributes.numinstances+"' id='minstancez'></td></tr></tr>");
  }
  if(cellView.model.attributes.type==='devs.Link'){
    $("#tabAttributes #table tbody").append("<tr><td>Nombre</td><td><input type='text' value='"+cellView.model.attributes.labels[0].attrs.text.text+"' id='namelinkz'></td><tr><td>Descripción</td><td><textarea placeholder="+"Remember, be nice!"+"id="+"linkdescription" +"rows="+"20"+"cols="+"100"+"></textarea></td></tr></tr>");
  }

  var $linkattr = $('#namelinkz');
  $linkattr.on('input change', function() {
   cellView.model.label(0, { attrs: { text: { text: $linkattr.val()} } });
  });

  

  
  $("#tabProperties #height").append(
    "<label for='h'>Tamaño</label>"+
    "<input id='h' class='form-control' type='range' value='"+cellView.model.attributes.size.height+"' min='10' max='"+$('#myHolder').height()+"' oninput='hV.value=h.value'>"
    
    );

 

  var $am = $('#quan');
  $am.on('input change', function() {
    cellView.model.attr({text: { text: $am.val(), 'ref-y': cellView.model.attributes.size.height+8}});
  });






if(cellView.model.attributes.name=="R2")
{



  var $w = $('#w');
  $w.on('input change', function() {
    cellView.model.resize(parseInt($w.val(), 10),cellView.model.attributes.size.height);
    console.log(cellView.model.attributes.name)

  });
  var $h = $('#h');
  $h.on('input change', function() {
    cellView.model.resize(parseInt($h.val(), 10),cellView.model.attributes.size.width-90);
    console.log(cellView.model.attributes.name);
  });

}
  var $n = $('#name');
  $n.on('input change', function() {
    cellView.model.prop('name',$n.val());
  });
      var $pz = $('#processorz');
      var $nz = $('#namez');
      var $bz = $('#behaviourz');
      var $tz = $('#typez');
      var $gz = $('#groupidz');
      var $niz = $('#instancez');
      
      $pz.on('input change', function()
      {
        cellView.model.attributes.processorid=$pz.val();
        var xw = new XMLWriter('UTF-8');
              xw.formatting = 'indented';//add indentation and newlines
              xw.indentChar = ' ';//indent with spaces
               xw.indentation = 2;//add 2 spaces per level
               xw.writeStartDocument( );
               xw.writeDocType('"items.dtd"');
               xw.writeStartElement( 'config' );
               xw.writeComment($pz.val());
               var xml = xw.flush(); //generate the xml string
             xw.close();//clean the writer
           xw = undefined;//don't let visitors use it, it's closed
    //set the xml
  
  });

      $nz.on('input change', function()
        
      {
        
       cellView.model.attr({text: { text: $nz.val(), 'ref-y': cellView.model.attributes.size.height}});
     });
      $bz.on('input change', function()
        
      {
        
        cellView.model.attributes.behaviour=$bz.val();
      });
      $tz.on('input change', function()
        
      {
        
        cellView.model.attributes.typeP=$tz.val();
      });
      $gz.on('input change', function()
        
      {
        
        cellView.model.attributes.groupid=$gz.val();
      });
      $niz.on('input change', function()
        
      {
        
        cellView.model.attributes.numinstances=$niz.val();
      });

    
   

  

      var $az = $('#accumulationidz');
      var $nz = $('#namez');
      var $tyz = $('#typeAz');
      var $suz = $('#subtypez');
      var $grz = $('#groupidz');

      $az.on('input change', function()
      {
        console.log('llego aqui');
        cellView.model.attributes.accumulationid=$az.val();
      });

      $nz.on('input change', function()
        
      {
       
       if(cellView.model.attributes.name=="R2")
       {
                cellView.model.attr({text: { text: $nz.val(), 'ref-y': cellView.model.attributes.size.height+15}});

       }
        
        else{
        cellView.model.attr({text: { text: $nz.val(), 'ref-y': 75}});

      }
      });

      $tyz.on('input change', function()
        
      {
        console.log('llego aqui');
        cellView.model.attributes.typeA=$tyz.val();
      });
      $suz.on('input change', function()
        
      {
        
        cellView.model.attributes.subtype=$suz.val();
      });
      $grz.on('input change', function()
        
      {
        
        cellView.model.attributes.groupid=$grz.val();
      });
      
  



      var $mpz = $('#mprocessorz');
      var $mnz = $('#mnamez');
      var $mbz = $('#mbehaviourz');
      var $mtz = $('#mtypez');
      var $mgz = $('#mgroupidz');
      var $mniz = $('#minstancez');

      $mpz.on('input change', function()
      {
        cellView.model.attributes.processorid=$mpz.val();
        
      });

      $mnz.on('input change', function()
        
      {
        
       cellView.model.attr({text: { text: $mnz.val()+" - " +$mniz.val()+" Instances"}});
     });
      $mbz.on('input change', function()
        
      {
        
        cellView.model.attributes.behaviour=$mbz.val();
      });
      $mtz.on('input change', function()
        
      {
        
        cellView.model.attributes.typeP=$mtz.val();
      });
      $mgz.on('input change', function()
        
      {
        
        cellView.model.attributes.groupid=$mgz.val();
      });
      $mniz.on('input change', function()
        
      {
        
        cellView.model.attr({text: { text: $mnz.val()+" - " +$mniz.val()+" Instances"}});
      });

 





 


  $('#addAttribute').click(function(){
    $("#tabAttributes #table tbody").append("<tr><td><input id='PN' type='text'></td><td><input type='text' id='PV'></td></tr>");
  });


  $('#btnPort').click(function(){
    $("#tabPorts #table tbody").empty();
    nPort ++;

    $("#tabPorts #table tbody").append(
      "<tr id='port"+nPort+"'><td><input id='id' type='text'></td>"+
      "<td><select id='position'><option value='left'>Izquierda</option><option value='right'>Derecha</option><option value='top'>Arriba</option><option value='bottom'>Abajo</option></select></td>"+
      "<td><input id='active' name='port"+nPort+"' type='checkbox'></td>"+
      "</tr>"
      );

    
    $("#port"+nPort+" #active").change(function(){
      console.log(this+"jajajaxd");
      if(this.checked) {

        


       $("#"+this.name+" #id" ).prop('enabled', true);
       var port = {
        id: $("#"+this.name+" #id" ).val(),
        group: $("#"+this.name+" #position" ).val(),
        args: {'type':$("#"+this.name+" #type" ).val(), 'function':$("#"+this.name+" #function" ).val()},
        attrs: attributes($("#"+this.name+" #type" ).val(),$("#"+this.name+" #function" ).val())
      };

      console.log(port.args.function);



      cellView.model.addPort(port);
     

      function addInPort(port)
      {



      }


     var countOut;

      if(port.args.function=='out'){

        console.log(cellView.model.attributes.outPorts);
        console.log(port.args.function)
     var portO = (cellView.model.get('outPorts') || []).slice();
     portO.push(port.group);
     console.log(cellView.model.attributes.outPorts);
     cellView.model.set('outPorts',[portO]);
     }

     else
     {

      var portI = (cellView.model.get('inPorts') || []).slice();
     portI.push(port.group);
     cellView.model.set('inPorts',[portI]);

     }

   




      console.log(this);
    }
   


    var xjiji= $("#id").val();

    $("#id").val("");
    if(xjiji=="")
    {

    }
    

    else{
      $("#mySelect").append("<option value='"+xjiji+"'>"+xjiji+"</option>")};

        $("#mySelect").change(function(e){ // This is called whenever the user selects a option
          
          var x = e.target.value;
          var x2= $('#mySelect option:selected').val(); // Get the value of the selected option
          $("#id").val(x);
          


           })// Remove the
      });
  });
}


 }


//Unhighlight when press


