import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ModalCapacidadesDeNegocio extends Component {
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
          data-target="modalCapacidadesDeNegocio"
        >
          Capacidades de Negocio
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalCapacidadesDeNegocio"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
        <div className="row">
          <div className="modal-content col m12">
            <font color="black"><h4>Capacidades de Negocio</h4></font>
                    <div class="col m4">
                        
                    </div>
                     <div className="col m4">
                         <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="./images/mapaDeCapacidades.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4" >Mapa de Capacidades</span>
                              <p><a href="/CapacitiesList">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Mapa de Capacidades<i class="material-icons right">X</i></span>
                              <p>Identifica las capacidades de tu negocio.</p>
                            </div>
                          </div>
                    <div class="col m4">
                        
                    </div>
          </div>
        </div>
          <div className="modal-footer col m12">
            
            <a className="modal-close waves-effect waves-green btn-flat">
              Volver
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default ModalCapacidadesDeNegocio;
