import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";


class ModalModeloDeNegocio extends Component {
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
          data-target="modalModeloDeNegocio"
        >
          Business Model
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalModeloDeNegocio"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
        <div className="row">
          <div className="modal-content">
            <font color="black"><h4>Business Model</h4></font>
                    <div className="col m4">

                        <div class="card">
                            <div class="card-content">
<<<<<<< HEAD
                              <span class="card-title activator grey-text text-darken-4">Service Portfolio</span>
                              <p><a href="/BusinessServicesPortfolio">Take me there!</a></p>
=======
                              <p><a href="/BusinessServicesPortfolio">Portafolio de Servicios</a></p>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Service Portfolio<i class="material-icons right">X</i></span>
                              <p>Discover your business' services</p>
                            </div>
                          </div>
                    </div>
                    <div className="col m4">
                          <div class="card">
                            <div class="card-content">
<<<<<<< HEAD
                              <span class="card-title activator grey-text text-darken-4">Ontologic Model</span>
                              <p><a href="/OntologicModelCreator">Take me there!</a></p>
=======
                              <p><a href="/OntologicModelCreator">Modelo Ontologico</a></p>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Ontologic Model<i class="material-icons right">X</i></span>
                              <p>Observe graphically your business' ontologic model</p>
                            </div>
                          </div>
                    </div>
                      <div className="col m4">
                          <div class="card">
                            <div class="card-content">
<<<<<<< HEAD
                              <span class="card-title activator grey-text text-darken-4">Business Structure</span>
                              <p><a href="/businessModelEditor">Take me there!</a></p>
=======
                              <p><a href="/BusinessStructure">Estructura de Negocio</a></p>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Business Structure<i class="material-icons right">X</i></span>
                              <p>Define teh structure of your business model</p>
                            </div>
                          </div>

                       
                    </div>
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

export default ModalModeloDeNegocio;
