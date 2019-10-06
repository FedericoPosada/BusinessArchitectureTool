import React from 'react';
import {processesContainer} from "../../api/processes";
import {Meteor} from "meteor/meteor";
import OntologicModels from "../../api/OntologicModelsCol";
import ProcessesImages from "../../api/ProcessesImagesCol";


export default class OntologicModelCreator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            imageid:""
        }
        this.uploadIt=this.uploadIt.bind(this);
    }

    componentWillMount() {
        Tracker.autorun(()=> {
            let query=OntologicModels.collection.findOne({userId:Meteor.userId()});
            if(typeof query !== "undefined")
            {
                this.setState({
                    imageid:query._id
                })
            }
        });
    }

    uploadIt(e) {
        e.preventDefault();
        let self = this;
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var file = e.currentTarget.files[0];
            if (file) {
                let uploadInstance = OntologicModels.insert({
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

    removeFile(){
        Meteor.call('RemoveOntologicModel', this.state.imageid, function (err, res) {
            if (err)
                Materialize.toast("Ha ocurrido un error.",3000);
        })
        this.setState({
            imageid:""
        })
    }

    render() {
        let query=OntologicModels.findOne({_id:this.state.imageid});
        let cursor;
        if(typeof query !== "undefined")
            cursor=query.link();
        else
            cursor="";
        return(
            <div>
                <h4 style={{"marginLeft":"20px"}}>Modelo ontológico</h4>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s1">
                                <label>Imagen:</label>
                            </div>
                            <div className="input-field col s2">
                                { this.state.imageid.length !== 0 &&
                                <a className="waves-effect waves-light btn red" onClick={this.removeFile.bind(this)} style={{"marginLeft":"14px"}}><i className="material-icons">delete</i></a>
                                }
                            </div>
                        </div>
                        <div className="row">
                            { this.state.imageid.length !== 0 &&
                            <div className="input-field col s10">
                                <img src={cursor}/>
                            </div>
                            }
                            { this.state.imageid.length === 0 &&
                            <div className="input-field col s8">
                                <input placeholder="" ref="imageCreate" type="file"  onChange={this.uploadIt} />
                            </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
    )
    }


}