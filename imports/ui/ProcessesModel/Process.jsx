import React from 'react';
import ProcessActivityManager from "./ProcessActivityManager";
import {processesContainer} from "../../api/processes";
import { FilesCollection } from 'meteor/ostrio:files';
import ProcessesImages from "../../api/ProcessesImagesCol";
import OntologicModels from "../../api/OntologicModelsCol";
import {Meteor} from "meteor/meteor";

export default class Process extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isInEditMode:false,
            activitieslist:this.props.activitieslist,
            imageid:this.props.imageid
        }
        this.uploadIt=this.uploadIt.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps._id !== this.props._id) {
            this.setState({
                isInEditMode: false,
                activitieslist:nextProps.activitieslist,
                imageid:nextProps.imageid
            })
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
                    self.updateImage();
                })
                uploadInstance.start(); // Must manually start the upload
            }
        }
    }
    updateImage(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                imageid:this.state.imageid
            }
        }
        processesContainer.update(query,updateObj);
    }
    removeFile(){
        this.setState({
            imageid:""
        });
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                imageid:""
            }
        }
        processesContainer.update(query,updateObj);
        ProcessesImages.collection.remove({_id:this.state.imageid});
        Meteor.call('RemoveFile', {_id:this.state.imageid}, function (err, res) {
            if (err)
                Materialize.toast("Ha ocurrido un error.",3000);
        })
    }
    updateProcess(){
        let query = {_id:this.props._id};
        let updateObj= {
            $set:{
                name:this.refs.nameEdit.value,
                imageid:this.state.imageid
            }
        }
        processesContainer.update(query,updateObj);
        Materialize.toast("Se ha actualizado el indicador",3000);
    }
    deleteProcess(){
        let query = {_id:this.props._id};
        processesContainer.remove(query);
        this.props.hideFields();
    }
    changeEditMode(){
        if(this.state.isInEditMode)
        {
            if(this.checkFields()) {
                this.updateProcess();
            }
        }
        else {
            this.setState({
                isInEditMode: !this.state.isInEditMode
            })
        }
    }
    checkFields(){
        if(this.refs.nameEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.",3000);
            return false;
        }
        return true;
    }
    render() {
        return this.state.isInEditMode ? this.renderEdit() : this.renderDefault()
    }

    renderEdit() {
        let query=ProcessesImages.findOne({_id:this.state.imageid});
        let cursor;
        if(typeof query !== "undefined")
            cursor=query.link();
        else
            cursor="";
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn green" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">check</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deleteProcess.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s2" style={{"marginTop":15}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="" ref="nameEdit" type="text" defaultValue={this.props.name} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Tipo de actividad:</label>
                            </div>
                            <div className="input-field col s4" style={{"marginTop":15}}>
                                {
                                    this.props.category
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Imagen:</label>
                            </div>
                            { this.state.imageid.length !== 0 &&
                            <div className="input-field col s10">
                                <img src={cursor}/>
                                <a className="waves-effect waves-light btn red" onClick={this.removeFile.bind(this)} style={{"marginLeft":"14px"}}><i className="material-icons">delete</i></a>
                            </div>
                            }
                            { this.state.imageid.length === 0 &&
                            <div className="input-field col s8">
                                <input placeholder="" ref="imageCreate" type="file"  onChange={this.uploadIt} />
                            </div>
                            }

                        </div>
                        <div className="row">
                        <ProcessActivityManager
                            processid={this.props._id}
                            processcustomid={this.props.customid}
                            activitieslist={this.state.activitieslist}/>
                        </div>
                    </form>
                </div>
            </div>
    )
    }

    renderDefault() {
        let query=ProcessesImages.findOne({_id:this.state.imageid});
        let cursor;
        if(typeof query !== "undefined")
            cursor=query.link();
        else
            cursor="";
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s2">
                                <a className="waves-effect waves-light btn" onClick={this.changeEditMode.bind(this)} style={{marginRight:5}}><i className="material-icons">edit</i></a>
                                <a className="waves-effect waves-light btn red" onClick={this.deleteProcess.bind(this)}><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>ID:</label>
                            </div>
                            <div className="input-field col s2" style={{"marginTop":15}}>
                                {
                                    this.props.customid
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                            <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":15}}>
                                {
                                    this.props.name
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Tipo de actividad:</label>
                            </div>
                            <div className="input-field col s8" style={{"marginTop":15}}>
                                {
                                    this.props.category
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Imagen:</label>
                            </div>
                                <div className="input-field col s10">
                                    <img src={cursor}/>
                                </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Actividades del proceso:</label>
                            </div>
                            <div className="row">
                            </div>
                        <table className="bordered">
                            <tbody>
                            <tr>
                                <th></th>
                                <th>Actividad</th>
                                <th></th>
                                <th>Capacidad</th>
                            </tr>
                            { this.state.activitieslist.map((val, index)=>{
                                return(
                                    <tr key={"Filapos"+index}>
                                        <td style={{width:"13%"}}>{val.customid}</td>
                                        <td>{val.name}</td>
                                        <td>{val.capacitycustomid}</td>
                                        <td>{val.capacityname}</td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}