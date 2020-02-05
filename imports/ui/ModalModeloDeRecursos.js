import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import TIResourcesModel from "./ResourcesModel/TIResourcesModel";
import OperativeModel from "./ResourcesModel/OperativeModel";

class ModalModeloDeRecursos extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <div>
        <a
          className="waves-effect waves-light btn light-blue darken-4 modal-trigger"
          data-target="modalModeloDeRecursos"
        >
          Resources Model
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalModeloDeRecursos"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
        <div className="row">
          <div className="modal-content">
            <font color="black"><h4>Modelo de Recursos</h4></font>
                    <div class="col m2">
                        
                    </div>
                     <div className="col m4">

                           <div class="card">
                            <div class="card-content">
<<<<<<< HEAD
                              <span class="card-title activator grey-text text-darken-4">Resources Model</span>
                              <p><a href="#">Take me there!</a></p>
=======
                              <p><a href="/ResourcesModel">Modelo de Recursos</a></p>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Resources Model<i class="material-icons right">X</i></span>
                              <p>Manage tour business' resources</p>
                            </div>
                          </div>
                    </div>
<<<<<<< HEAD
                   
                     <div className="col m4">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/modeloOperativo.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Operative Model</span>
                              <p><a href="#">Take me there!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Modelo Operativo<i class="material-icons right">X</i></span>
                              <p>Identify your business' operations</p>
                            </div>
                          </div>
                    </div>
                    <div class="col m2">
                        
                    </div>
=======
              <div className="col m4">
                  <div className="card">
                      <div className="card-content">
                          <p><a href="/TIResourcesModel">Modelo de Recursos TI</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Modelo Operativo<i
                              className="material-icons right">X</i></span>
                          <p>Identifica las operaciones de tu negocio</p>
                      </div>
                  </div>
              </div>
              <div className="col m4">
                  <div className="card">
                      <div className="card-content">
                          <p><a href="/ComponentsCatalog">Catálogo de componentes tecnológicos</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Catálogo de componentes tecnológicos<i
                              className="material-icons right">X</i></span>
                          <p>Identifica las operaciones de tu negocio</p>
                      </div>
                  </div>
              </div>

              <div className="col m4">
                  <div className="card">
                      <div className="card-content">
                          <p><a href="/ApplicationCatalog">Catálogo de aplicaciones</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Modelo Operativo<i
                              className="material-icons right">X</i></span>
                          <p>Identifica las operaciones de tu negocio</p>
                      </div>
                  </div>
              </div>


              <div className="col m4">
                  <div className="card">
                      <div className="card-content">
                          <p><a href="/OperativeModel">Modelo Operativo</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Modelo Operativo<i
                              className="material-icons right">X</i></span>
                          <p>Identifica las operaciones de tu negocio</p>
                      </div>
                  </div>
              </div>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
          </div>
        </div>
          <div className="modal-footer">
            
            <a className="modal-close waves-effect waves-green btn-flat">
              Go back
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalModeloDeRecursos;
