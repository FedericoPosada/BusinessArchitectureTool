import React, { Component } from "react";
import M from "materialize-css";

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
          className="waves-effect waves-light btn modal-trigger"
          data-target="modalModeloDeInformacion"
        >
          Modelo de Informacion
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
          <div className="modal-content">
           <font color="black"><h4>Modelo de Informacion</h4></font>
                     <div className="col m3">
                         <a className="waves-effect waves-light btn-large" href="/LabelsCreator">Etiquetas</a>
                     </div>
                    <div class="col m3">
                        <a class="waves-effect waves-light btn-large" href="/StrategicIndicatorsList">Indicadores estratégicos</a>
                    </div>

                    <div class="col m3">
                        <a class="waves-effect waves-light btn-large" href="/OperativeIndicatorsList">Indicadores operativos</a>
                    </div>
                    <div class="col m3">
                        <a class="waves-effect waves-light btn-large" href="/ExternalIndicatorsList">Indicadores externos</a>
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

export default ModalModeloDeInformacion;
