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
          className="waves-effect waves-light btn light-blue darken-4 modal-trigger"
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
          <div className="row">
          <div className="modal-content">
            <font color="black"><h4>Modelo Organizacional</h4></font>
<<<<<<< HEAD
                     <div class="col m2">
                        
                    </div>
                     <div className="col m4">

                      <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/editorDeCargos.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Editor de Cargos</span>
                              <p><a href="#">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Editor de Cargos<i class="material-icons right">X</i></span>
                              <p>Estructura los cargos de tu negocio</p>
                            </div>
                          </div>
                    </div>
                    
                     <div className="col m4">

                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/organigrama.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Organigrama</span>
                              <p><a href="#">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4"><br></br>Organigrama<i class="material-icons right">X</i></span>
                              <p>Evidencia gráficamente la estructura de tu negocio</p>
                            </div>
                          </div>
                    </div>
                    <div class="col m2">
                        
=======
                    <div class="col m4">
                        <a class="waves-effect waves-light btn" href="/PositionCatalog">Catálogo de cargos</a>
                    </div>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn" href="/ValueChain">Cadena de valor</a>
                    </div>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn" href="/ProcessCatalog">Catálogo de procesos</a>
>>>>>>> 31572df22de100e3b0d2a57112b6b049036739ab
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

export default ModalModeloOrganizacional;
