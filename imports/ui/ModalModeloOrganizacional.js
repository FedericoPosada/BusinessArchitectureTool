import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import OrgChartCreator from "./OrganizationalStructure/OrgChartCreator";

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
                     <div class="col m2">
                        
                    </div>
                     <div className="col m4">

                      <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/editorDeCargos.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Editor de Cargos</span>
                              <p><a href="/PositionCatalog">Llevame allí!</a></p>
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
                              <p><a href="/OrgChartCreator">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4"><br></br>Organigrama<i class="material-icons right">X</i></span>
                              <p>Evidencia gráficamente la estructura de tu negocio</p>
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

export default ModalModeloOrganizacional;
