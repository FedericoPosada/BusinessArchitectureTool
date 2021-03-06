import React from 'react';
import {processesContainer} from "../../api/processes";
import {Meteor} from "meteor/meteor";
import ProcessesImages from "../../api/ProcessesImagesCol";


export default class ProcessCreator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            imageid:""
        }
        this.uploadIt=this.uploadIt.bind(this);
    }

    createProcess(){
        if(this.checkFields()) {
            let processcustomid;
            let catNumber=this.obtainCategoryNumber();
            if (processesContainer.find({owner:Meteor.userId(),category:this.refs.categoryCreate.value}).count() === 0) {
                processcustomid = "P"+catNumber+".1.";
            } else {
                let customIdLastNumber = '';
                let lastProcesss = processesContainer.find({owner:Meteor.userId(),category:this.refs.categoryCreate.value}).fetch();
                let customIdLast = lastProcesss[lastProcesss.length - 1].customid;
                let arrayId=customIdLast.split(".");
                for (let i = 0; i < arrayId[1].length; i++) {
                    customIdLastNumber += arrayId[1].charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                processcustomid = "P" +catNumber+"."+lastnumber;
            }
            let createObj = {
                customid: processcustomid,
                name: this.refs.nameCreate.value,
                category:  this.refs.categoryCreate.value,
                activities:[],
                imageid:this.state.imageid,
                owner:Meteor.userId()
            }
            processesContainer.insert(createObj,(err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el proceso. Inténtelo de nuevo.",3000);
            });

            Materialize.toast("Se ha creado el proceso", 3000);
            this.refs.nameCreate.value = "";
            this.refs.categoryCreate.value = "";
        }
    }

    uploadIt(e) {
        e.preventDefault();
        let self = this;
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var file = e.currentTarget.files[0];
            if (file) {
                let uploadInstance = ProcessesImages.insert({
                    file: file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true // If you see issues with uploads, change this to false
                }, false);

                // These are the event functions, don't need most of them, it shows where we are in the process
                uploadInstance.on('start', function () {
                    console.log('Starting');
                })

                uploadInstance.on('end', function (error, fileObj) {
                    console.log('On end File Object: ', fileObj);
                })

                uploadInstance.on('uploaded', function (error, fileObj) {
                    console.log('uploaded: ', fileObj);
                    // Reset our state for the next file
                    self.setState({
                        imageid:fileObj._id
                    });
                })
                uploadInstance.start(); // Must manually start the upload
            }
        }
    }

    obtainCategoryNumber()
    {
        let cat = this.refs.categoryCreate.value;
        if(cat === "Logística de entrada")
            return 1;
        else if(cat === "Operaciones")
            return 2;
        else if(cat === "Logística de salida")
            return 3;
        else if(cat === "Marketing")
            return 4;
        else if(cat === "Servicios")
            return 5;
    }

    checkFields(){
        if(this.refs.nameCreate.value.length === 0
            || this.refs.categoryCreate.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;

    }

    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <a className="waves-effect waves-light btn green" onClick={this.createProcess.bind(this)} style={{"marginLeft":"14px"}}><i className="material-icons right">check</i>Crear</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="nameCreate" type="text"  defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Imagen:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="imageCreate" type="file"  onChange={this.uploadIt} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Tipo de actividad:</label>
                            </div>
                            <div className="input-field col s8">
                                <select ref="categoryCreate" className="browser-default" style={{"width":"49%"}} >
                                    <option></option>
                                    <option>Logística de entrada</option>
                                    <option>Operaciones</option>
                                    <option>Logística de salida</option>
                                    <option>Marketing</option>
                                    <option>Servicios</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
    }


}