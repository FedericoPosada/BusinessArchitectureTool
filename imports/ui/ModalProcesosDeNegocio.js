import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ValueChain from "./ProcessesModel/ValueChain";

class ModalProcesosDeNegocio extends Component {
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
          data-target="modalProcesosDeNegocio"
        >
          Procesos de Negocio
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalProcesosDeNegocio"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
        <div className="row">
          <div className="modal-content">
            <font color="black"><h4>Procesos de Negocio</h4></font>
                    <div class="col m2">
                        
                    </div>
                     <div className="col m4">
                          <div class="card">
                            <div class="card-content">
                              <p><a href="/ProcessCatalog">Catálogo de Procesos</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Catalogo de Procesos<i class="material-icons right">X</i></span>
                              <p>Guarda y accede a los procesos de tu negocio facilmente en un solo lugar</p>
                            </div>
                          </div>
                    </div>
                    
                     <div className="col m4">
                          <div class="card">
                            <div class="card-content">
                              <p><a href="/ValueChain">Cadena de Valor</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Cadena de Valor<i class="material-icons right">X</i></span>
                              <p>Define la Cadena de valor del negocio</p>
                            </div>
                          </div>
                    </div>
                    <div class="col m2">
                        
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

export default ModalProcesosDeNegocio;
