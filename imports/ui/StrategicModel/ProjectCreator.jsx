import React from 'react';
import {labelsContainer} from "../../api/labels";
import {projectsContainer} from "../../api/projects";


export default class ProjectCreator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            labelList:[]
        }
    }

    componentWillMount() {
        Tracker.autorun(()=>{
        })
    }

    createProject(){
        if(this.checkFields()) {
            let projectcustomid;
            if (projectsContainer.find({owner:Meteor.userId()}).count() === 0) {
                projectcustomid = "PR1";
            } else {
                let customIdLastNumber = '';
                let lastProjects = projectsContainer.find({owner:Meteor.userId()}).fetch();
                let customIdLast = lastProjects[lastProjects.length - 1].customid;
                for (let i = 2; i < customIdLast.length; i++) {
                    customIdLastNumber += customIdLast.charAt(i);
                }
                let lastnumber = parseInt(customIdLastNumber);
                lastnumber++;
                projectcustomid = "PR" +lastnumber;
            }
            let createObj = {
                customid: projectcustomid,
                description: this.refs.descEdit.value,
                name: this.refs.nameEdit.value,
                priority: this.refs.priorityEdit.value,
                deadline: this.refs.deadlineEdit.value,
                actions:[],
                owner:Meteor.userId()
            }
            projectsContainer.insert(createObj,(err, done) => {
                if(err)
                Materialize.toast("Ha ocurrido un error al crear el proyecto. Inténtelo de nuevo.",3000);
                else
                    Materialize.toast("Se ha creado el proyecto", 3000);
            });

            this.refs.descEdit.value = "";
            this.refs.nameEdit.value = "";
            this.refs.priorityEdit.value = "";
            this.refs.deadlineEdit.value = "";
        }
    }
    checkFields() {
        if (this.refs.descEdit.value.length === 0
            || this.refs.nameEdit.value.length === 0
            || this.refs.priorityEdit.value.length === 0
            || this.refs.deadlineEdit.value.length === 0)
        {
            Materialize.toast("Todos los campos deben completarse.", 3000);
            return false;
        }
        else
            return true;
    }


        render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <a className="waves-effect waves-light btn green" onClick={this.createProject.bind(this)}><i className="material-icons right">check</i>Crear</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Nombre:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="nameEdit" type="text" className="active"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Descripción:</label>
                            </div>
                            <div className="input-field col s8">
                                <input placeholder="" ref="descEdit" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            <label>Prioridad:</label>
                            </div>
                            <div className="input-field col s8">
                            <select ref="priorityEdit" className="browser-default" style={{"width":"49%"}} >
                                <option></option>
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <label>Fecha límite:</label>
                            </div>
                            <div className="input-field col s8">
                                <input ref="deadlineEdit" type="date" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
    }


}