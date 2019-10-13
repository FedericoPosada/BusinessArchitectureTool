import { Document, Packer, Paragraph, TextRun } from "docx";
import React from "react";
import FinalDocuments from "../../api/FinalDocumentsCol";
import {processesContainer} from "../../api/processes";
import {Meteor} from "meteor/meteor";

// Create document
export default class FinalDocument extends React.Component {

    constructor(props){
        super(props);
        this.state={
            docid:""
        }
        this.uploadIt=this.uploadIt.bind(this);
    }

    componentWillMount() {
        Meteor.subscribe('finaldocuments');
        Tracker.autorun(()=> {
            let doc = FinalDocuments.collection.findOne({userId: Meteor.userId()});
            if (typeof doc !== "undefined")
                this.setState({
                    docid: doc._id
                });
        });
    }

    removeFinalDocument(){
        Meteor.call('RemoveFinalDocument', this.state.docid, function (err, res) {
            if (err)
                Materialize.toast("Ha ocurrido un error.",3000);
        })
        this.setState({
            docid:""
        })
    }

    uploadIt(e) {
        let self = this;
            let file = e;
            if (file) {
                let uploadInstance = FinalDocuments.insert({
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
                        docid:fileObj._id
                    });
                })
                uploadInstance.start(); // Must manually start the upload
            }

    }

    createDoc() {
        let self=this;
        const doc = new Document();
        doc.addSection({
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foozzz Bar",
                            bold: true,
                        }),
                        new TextRun({
                            text: "Github is the best",
                            bold: true,
                        }).tab(),
                    ],
                }),
            ],
        });
        let file;
        Packer.toBlob(doc).then((blob) => {
            // saveAs from FileSaver will download the file
            file=new File([blob],Meteor.userId()+"FinalDoc.docx");
            self.uploadIt(file);
        });

    }

    render(){
        let query=FinalDocuments.findOne({_id:this.state.docid});
        let cursor;
        if(typeof query !== "undefined")
            cursor=query.link();
        else
            cursor="";
        return(
            <div>
                { cursor !== "" &&
                <div className="input-field col s10">
                    <a className="waves-effect waves-light btn red" onClick={this.removeFinalDocument.bind(this)} style={{"marginLeft":"14px"}}><i className="material-icons left">delete</i>Borrar</a>
                    <a className="waves-effect waves-light btn" href={cursor} download={true} style={{"marginLeft":"14px"}}><i className="material-icons left">file_download</i>Descargar</a>
                </div>
                }
                { cursor === "" &&
                <div className="input-field col s8">
                    <a className="waves-effect waves-light btn light-green" onClick={this.createDoc.bind(this)}
                       style={{"marginLeft":"14px"}}><i className="material-icons left">library_add</i>Crear documento</a>
                </div>
                }
            </div>
        )
    }
}
