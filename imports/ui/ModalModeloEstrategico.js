import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ModalModeloEstrategico extends Component {
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
          data-target="modalModeloEstrategico"
        >
          Modelo Estrategico
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalModeloEstrategico"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
            <font color="black"><h4>Modelo Estrategico</h4></font>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn-large" href="/MotivationalComponent">Componente moivacional</a>
                    </div>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn-large" href="/StrategicPlan">Plan estratégico</a>
                    </div>
                    <div class="col m4">
                        <a class="waves-effect waves-light btn-large" href="/BusinessStrategiesCatalog">Estrategias de negocio</a>
                    </div>
                <div className="col m4">
                  <a className="waves-effect waves-light btn-large" href="/TransformationActionList">Acciones de transformación</a>
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

export default ModalModeloEstrategico;
