import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ModalModeloDeInformacion extends Component {
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
          data-target="modalModeloDeInformacion"
        >
          Information Model
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalModeloDeInformacion"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
        <div className="row">
          <div className="modal-content">
           <font color="black"><h4>Information Model</h4></font>
                    <div className="col m2">
                         
                    </div>
                     <div className="col m4">
                           <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/modeloOntologico.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Ontologic Model</span>
                              <p><a href="#">Take me there!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Ontologic Model<i class="material-icons right">X</i></span>
                              <p>Define the structure of your ontologic model</p>
                            </div>
                          </div>
                    </div>
                     
                     <div className="col m4">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/indicadoresEstrategicos.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Strategic Indicators</span>
                              <p><a href="#">Take me there!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Strategic Indicators<i class="material-icons right">X</i></span>
                              <p>Identify indicators to suppport your business' strategy</p>
                            </div>
                          </div>
                    </div>
                    <div className="col m2">
                         
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

export default ModalModeloDeInformacion;
