import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import GraphTracker from '../graph/graphTracker';
import GraphEditor from './GraphEditor';
import JsonViewer from './JsonViewer';
import GraphViewer from './GraphViewer';
import Cells from '../api/cells.js';
import * as joint from 'jointjs';
window.joint = joint;
import _ from 'lodash';
import {businessModels} from '../api/businessModels.js';
import "./BusinessModelEditor/BusinessModelEditor.css";
import  "./BusinessModelEditor/JS/svg-pan-zoom.js";

//import  "./BusinessModelEditor/JS/vectorizer.js";
//import  "./BusinessModelEditor/JS/styles.js";
//import ModalTestApp from "./ModalTestApp";

//import {BusinessModelsTwo} from '../api/BusinessModelsTwo.js';

// App component - represents the whole app
export default class TestApp extends React.Component {


  showBusinessModels()
  {
    console.log(businessModels.find({}));
    
    //this.graph.fromJSON(BusinessModels.find({}));

  }
  
  /*
  cleanMongo(){
    businessModels.remove({});
  }
  */
 
   componentWillMount() {
        Tracker.autorun(()=>{
            Meteor.subscribe('businessModels');
            /*
            let packageslist = packagesContainer.find({}).fetch();
            this.setState({packageslist: packageslist});
            */
        })
    }
    /*
    allowZoom(){
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
    }*/

  constructor(props) {
    super(props);
    this.graph = new joint.dia.Graph();

    

    

    this.graphTracker = new GraphTracker(this.graph);
    this.state = { graphWasLoadedFromDb: false,
                   jsonData: "", 
                   mongoId:"",
                   };
    //this.loadCellsFromProps = this.loadCellsFromProps.bind(this);
    this.downloadJson=this.downloadJson.bind(this);
    this.downloadCsv=this.downloadCsv.bind(this);
    this.selectMongoJson = this.selectMongoJson.bind(this);
    this.loadMongoJson = this.loadMongoJson.bind(this);
    this.saveMongoJson = this.saveMongoJson.bind(this);

    this.selectJson = this.selectJson.bind(this);
    this.loadJson = this.loadJson.bind(this);
    

    this.showBusinessModels=this.showBusinessModels.bind(this);
    this.onMongoIdChange=this.onMongoIdChange.bind(this);
    //this.allowZoom=this.allowZoom.bind(this);
    
  }

  onMongoIdChange(event) {  
    this.setState({ mongoId: event.target.value });
    //console.log("updateo id de mongo del modal: "+event.target.value);
  }

  downloadJson(){
    console.log("bajando json")
    var data= JSON.stringify(this.graph.toJSON());

    console.log(data);

    //download
      var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', "json.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    //
    console.log("descargo json")

 
  }
  //MONGO
  saveMongoJson(){
    console.log("guardando JSON en Mongo");

    //var data= JSON.stringify(this.graph.toJSON());
    var data= this.graph.toJSON();
    console.log(data);

    var data2=JSON.stringify(data);

    //data2= {"cells":[{"type":"basic.Rect","position":{"x":100,"y":30},"size":{"width":100,"height":100},"angle":0,"accumulationid":"","name":"R2","typeA":"","subtype":"","groupid":"","ports":{"groups":{"top":{"position":"top"},"bottom":{"position":"bottom"},"left":{"position":"left"},"right":{"position":"right"}}},"id":"deb7d565-c8c1-4fb7-b571-d5f0d28df094","z":1,"attrs":{"rect":{"fill":"#FFFFFF","strokeWidth":"2.5","strokeDasharray":"7","opacity":"0.7"},"text":{"text":"Contenedor","ref-y":115}}}]};

    console.log(data);
    var idInsert=businessModels.insert(data, (err, done) => {
                if(err)
                    Materialize.toast("Hubo un error insertando en DB" + err,3000);
            });
    
    console.log("guardo JSON en Mongo");
    this.setState({mongoId:idInsert});
    Materialize.toast('This is your file ID: '+idInsert+' Make sure to save it!!', 10000);
  }

  //MONGO
  selectMongoJson(){
    //var query = 'ObjectId("'+this.state.mongoId+'")'
    console.log(businessModels.find({}));
    var query =this.state.mongoId;
    console.log(query);
        console.log(businessModels.find({"_id":query}).fetch()[0]);
        
        var size =businessModels.find({}).fetch().length;
        size =size-1;
        console.log(businessModels.find({}).fetch()[size]); 

        let varJsonData = businessModels.find({}).fetch()[size];
        //let varJsonData = businessModels.find({"_id":query}).fetch()[0];
            this.setState({jsonData: varJsonData});
  }

  //MONGO
  loadMongoJson(){


    console.log("state "+this.state.jsonData);

    var formatted = JSON.stringify(this.state.jsonData, null, 2);
    this.graph.fromJSON(JSON.parse(formatted));  
  }

  //NO MONGO
  selectJson(){

    var files = document.getElementById('files1').files;
              console.log("el archivo es");
              console.log(files);
              if (files.length <= 0) {
                return false;
              }

              var str;
              var result;
              
              var fr = new FileReader();
              


              var scope=this;
              fr.onload = function(e) { 
              console.log(e);
                 result = JSON.parse(e.target.result);

                //var formatted = JSON.stringify(result, null, 2);
                //str=formatted;


                //Swal.fire('¡Tu archivo ha sido cargado!')
                //this.graph.fromJSON(JSON.parse(formatted));  

              console.log("STR:");
              console.log(result);
              
    
 
              this.setState({jsonData: result});
            }.bind(this); 
              fr.readAsText(files.item(0));
                
              //console.log("STR AFUERA");
              //console.log(result);
              

  }

  //NO MONGO
  loadJson(){
     
    console.log("state "+this.state.jsonData);
    //this.graph.fromJSON(JSON.parse(this.state.jsonData));  
    var formatted = JSON.stringify(this.state.jsonData, null, 2);
    this.graph.fromJSON(JSON.parse(formatted));  
    
  }

  downloadCsv(){
    var a = document.getElementById("csv");
 

     var stg = "";
      var json1 = (JSON.parse(JSON.stringify(this.graph.toJSON())));
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
              var xc = this.graph.getCell(obj.embeds[j]);
              if(this.graph.getCell(obj.embeds[j]).attributes.type=="basic.Rect"){
              stg=stg+","+this.graph.getCell(obj.embeds[j]).attributes.attrs.text.text;
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

                stg=stg+obj.type+",,"+obj.labels[0].attrs.text.text+","+this.graph.getCell(obj.source.id).attributes.attrs.text.text+","+this.graph.getCell(obj.target.id).attributes.attrs.text.text+","+"\r\n";

              

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
  


  render() {
  var containerStyle= {
        backgroundColor: "#FFFFFF"
      };

    return (
      <div>

        <div className="divider"></div>
         <nav className="navbar navbar-inverse"  style={{background:"#283E49"}}>
         <div className="col m12">
            <ul className="nav navbar-nav" style={{background:"#283E49"}}>

           

            <div className="col m1">
              <li><a style={{color:"white", cursor: "pointer" }} id="json" onClick={this.downloadJson}><span className="glyphicon glyphicon-download" style={{color:"white", cursor:"pointer"}}></span> Download JSON</a>
                </li>
            </div>

            <div className="col m1">
              <li><a style={{color:"white", cursor: "pointer" }} id="csv" onClick={this.downloadCsv}><span className="glyphicon glyphicon-download" style={{color:"white", cursor:"pointer"}}></span> Download CSV</a>
              </li>
            </div>
            
            <div className="col m1">
               <li><a 
               style={{color:"white", cursor: "pointer" }} id="csv" onClick={this.saveMongoJson}><span className="glyphicon glyphicon-download" style={{color:"white", cursor:"pointer"}}></span>Save in cloud</a>
              </li>
              </div>

            <div className="col m1">
              <li><a id='select_json' style={{color:"white",cursor: "pointer"}} onClick={this.selectMongoJson}><span className="glyphicon glyphicon-download" style={{color:"white"}}></span>Select cloud ID</a></li>
              </div>

            <div className="col m1">
              <input type="text" value={this.state.mongoId} onChange={this.onMongoIdChange} />
              </div>
            
            <div className="col m1">  
              <li><a id='load_json' style={{color:"white",cursor: "pointer"}} onClick={this.loadMongoJson}><span className="glyphicon glyphicon-download" style={{color:"white"}}></span> Load from Cloud</a></li>
              </div>
             
             <div className="col m1"> 
                <li>
                      <div className="upload-btn-wrapper" style={{marginTop: "5px"}}>
                      <span className="glyphicon glyphicon-upload" style={{color: "white" }}></span>
                      <button className="btn" style={{fontFamily: "sans-serif", backgroundColor: "#283E49", 
                      border: "2px solid #000000",  color: "white",
                       fontSize: "14px",  borderRadius: "15px",  cursor:"pointer"}}>Upload JSON</button>
                       <input type="file" id="files1" name="files1" />
                      </div>
              </li>
              </div>

            <div className="col m1">
              <li><a id='load_json' style={{color:"white",cursor: "pointer"}} onClick={this.selectJson}><span className="glyphicon glyphicon-download" style={{color:"white"}}></span> Select JSON</a></li>
             </div>

            <div className="col m1">
              <li><a id='load_json' style={{color:"white",cursor: "pointer"}} onClick={this.loadJson}><span className="glyphicon glyphicon-download" style={{color:"white"}}></span> Load JSON</a></li>
              </div>
             
            </ul>
          </div>
        </nav>


            <div style={{width: "100%", textAlign: "center"}}className="row justify-content-center" >
              <div style={{float:"left"}} className="col-lg-2" id="panel"></div>
              <div className="col-lg-10" id="myHolder"></div>
           </div>


      <div className="col m12">
        <div className="col m2">
          <GraphEditor graph={this.graph} />
        </div>
          
        <div className="col m10">
          <GraphViewer id="zoom" graph={this.graph} />
        </div>        
      </div>

   
      </div>
    );
  }
/*
  renderLoadFromDbButton() {
    const buttonStyle = {
      width: 200, height: 100, backgroundColor: 'red'
    };
    return <button style={buttonStyle} onClick={this.loadCellsFromProps} > initalize Graph With Data from DB</button>
  }
*/
}

