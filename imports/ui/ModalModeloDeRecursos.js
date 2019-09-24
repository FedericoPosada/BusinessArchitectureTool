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
          className="waves-effect waves-light btn modal-trigger"
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
          <div className="modal-content">
            <font color="black"><h4>Modelo de Recursos</h4></font>
                    <div class="col m2">
                        <a class="waves-effect waves-light btn-large" href="/ResourcesModel">Modelo de recursos</a>
                    </div>
                    <div class="col m2">
                        <a class="waves-effect waves-light btn-large" href="/TIResourcesModel">Modelo de recursos TI</a>
                    </div>
                    <div class="col m2">
                        <a class="waves-effect waves-light btn-large" href="/ApplicationCatalog">Catálogo de aplicaciones</a>
                    </div>
              <div className="col m2">
                  <a className="waves-effect waves-light btn-large" href="/ComponentsCatalog">Catálogo de componentes</a>
              </div>
              <div className="col m2">
                  <a className="waves-effect waves-light btn-large" href="/OperativeModel">Modelo operativo</a>
              </div>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat">
              Disagree
            </a>
            <a className="modal-close waves-effect waves-green btn-flat">
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalModeloDeRecursos;
