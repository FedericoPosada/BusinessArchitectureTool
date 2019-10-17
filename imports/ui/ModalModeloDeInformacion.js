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
        <div className="row">
          <div className="modal-content">
           <font color="black"><h4>Modelo de Informacion</h4></font>
                    <div className="col m2">
                         
                    </div>
                     <div className="col m4">
                           <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/modeloOntologico.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Creador de etiquetas</span>
                              <p><a href="/LabelsCreator">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Modelo Ontológico<i class="material-icons right">X</i></span>
                              <p>Define la estructura de tu modelo ontológico</p>
                            </div>
                          </div>
                    </div>
                     
                     <div className="col m4">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/indicadoresEstrategicos.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Indicadores Operativos</span>
                              <p><a href="/OperativeIndicatorsList">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Indicadores Operativos<i class="material-icons right">X</i></span>
                              <p>Identifica los indicadores para apoyar tu estratégia de negocio</p>
                            </div>
                          </div>
                    </div>
              <div className="col m4">
                  <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" height="125"
                               src="http://172.24.101.248/images/indicadoresEstrategicos.PNG"></img>
                      </div>
                      <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">Indicadores Estratégicos</span>
                          <p><a href="/StrategicIndicatorsList">Llevame allí!</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Indicadores Estratégicos<i
                              className="material-icons right">X</i></span>
                          <p>Identifica los indicadores para apoyar tu estratégia de negocio</p>
                      </div>
                  </div>
              </div>
              <div className="col m4">
                  <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" height="125"
                               src="http://172.24.101.248/images/indicadoresEstrategicos.PNG"></img>
                      </div>
                      <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">Indicadores Externos</span>
                          <p><a href="/ExternalIndicatorsList">Llevame allí!</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Indicadores Externos<i
                              className="material-icons right">X</i></span>
                          <p>Identifica los indicadores para apoyar tu estratégia de negocio</p>
                      </div>
                  </div>
              </div>
                    <div className="col m2">
                         
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

export default ModalModeloDeInformacion;
