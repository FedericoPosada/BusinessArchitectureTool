import React, { Component } from "react";
import M from "materialize-css";

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
          Modelo de Recursos
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
<<<<<<< HEAD
                        
                    </div>
                     <div className="col m4">

                           <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/modeloDeRecursos.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Modelo de Recursos</span>
                              <p><a href="#">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Modelo de Recursos<i class="material-icons right">X</i></span>
                              <p>Gerencia los recursos que usa tu negocio</p>
                            </div>
                          </div>
                    </div>
                   
                     <div className="col m4">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/modeloOperativo.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Modelo Operativo</span>
                              <p><a href="#">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Modelo Operativo<i class="material-icons right">X</i></span>
                              <p>Identifica las operaciones de tu negocio</p>
                            </div>
                          </div>
                    </div>
                    <div class="col m2">
                        
=======
                        <a class="waves-effect waves-light btn-large" href="/ResourcesModel">Modelo de recursos</a>
                    </div>
                    <div class="col m2">
                        <a class="waves-effect waves-light btn-large" href="/TIResourcesModel">Modelo de recursos TI</a>
                    </div>
                    <div class="col m2">
                        <a class="waves-effect waves-light btn-large" href="/ApplicationCatalog">Catálogo de aplicaciones</a>
>>>>>>> 31572df22de100e3b0d2a57112b6b049036739ab
                    </div>
              <div className="col m2">
                  <a className="waves-effect waves-light btn-large" href="/ComponentsCatalog">Catálogo de componentes</a>
              </div>
              <div className="col m2">
                  <a className="waves-effect waves-light btn-large" href="/OperativeModel">Modelo operativo</a>
              </div>
          </div>
        </div>
          <div className="modal-footer">
            
            <a className="modal-close waves-effect waves-green btn-flat">
              Volver
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalModeloDeRecursos;
