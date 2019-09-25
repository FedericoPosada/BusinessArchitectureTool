import React, { Component } from "react";
import M from "materialize-css";
import PositionCatalog from "./OrganizationalStructure/PositionCatalog";

class ModalModeloOrganizacional extends Component {
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
          data-target="modalModeloOrganizacional"
        >
          Modelo Organizacional
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalModeloOrganizacional"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
            <font color="black"><h4>Modelo Organizacional</h4></font>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn" href="/PositionCatalog">Catálogo de cargos</a>
                    </div>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn" href="/ValueChain">Cadena de valor</a>
                    </div>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn" href="/ProcessCatalog">Catálogo de procesos</a>
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

export default ModalModeloOrganizacional;
