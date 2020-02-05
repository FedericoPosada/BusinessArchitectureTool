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
          Organizational Model
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
            <font color="black"><h4>Organizational Model</h4></font>
                     <div class="col m2">
                        
                    </div>
                     <div className="col m4">
                      <div class="card">
                            <div class="card-content">
<<<<<<< HEAD
                              <span class="card-title activator grey-text text-darken-4">Role editor</span>
                              <p><a href="#">Take me there!</a></p>
=======
                              <p><a href="/PositionCatalog">Editor de Cargos</a></p>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Role editor<i class="material-icons right">X</i></span>
                              <p>Structure your business' roles</p>
                            </div>
                          </div>
                    </div>
                    
                     <div className="col m4">

                          <div class="card">
                            <div class="card-content">
<<<<<<< HEAD
                              <span class="card-title activator grey-text text-darken-4">Organigram</span>
                              <p><a href="/OrgChartCreator">Take me there!</a></p>
=======
                              <p><a href="/OrgChartCreator">Organigrama</a></p>
>>>>>>> 42729aa774146bb9ddc5ba30dd3da74e72a5ef88
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4"><br></br>Organigram<i class="material-icons right">X</i></span>
                              <p>Graphically show your business' structure</p>
                            </div>
                          </div>
                    </div>
                    <div class="col m2">
                        
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

export default ModalModeloOrganizacional;
