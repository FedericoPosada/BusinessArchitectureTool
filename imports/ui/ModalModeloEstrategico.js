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
          className="waves-effect waves-light btn light-blue darken-4 modal-trigger"
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
          <div className="row">
          <div className="modal-content">
            <font color="black"><h4>Modelo Estrategico</h4></font>
                    <div class="col m2">
                    </div>
              <div className="col m4">
                  <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" height="125"
                               src="http://172.24.101.248/images/editorPlanEstrategico.PNG"></img>
                      </div>
                      <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">Componente motivacional</span>
                          <p><a href="/MotivationalComponent">Llevame allí!</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Componente motivacional<i
                              className="material-icons right">X</i></span>
                      </div>
                  </div>
              </div>

              <div className="col m4">
                  <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" height="125"
                               src="http://172.24.101.248/images/editorPlanEstrategico.PNG"></img>
                      </div>
                      <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">Estrategias de negocio</span>
                          <p><a href="/BusinessStrategiesCatalog">Llevame allí!</a></p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Estrategias de negocio<i
                              className="material-icons right">X</i></span>
                      </div>
                  </div>
              </div>

                     <div className="col m4">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/editorPlanEstrategico.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Plan Estratégico</span>
                              <p><a href="/StrategicPlan">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Plan Estratégico<i class="material-icons right">X</i></span>
                              <p>Define la estructura de tu estratégia</p>
                            </div>
                          </div>
                    </div>


                    
                     <div className="col m4">

                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" height="125" src="http://172.24.101.248/images/visualizadorPlanEstrategico.PNG"></img>
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4"> Visualizador Plan</span>
                              <p><a href="#">Llevame allí!</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Visualizador Plan<i class="material-icons right">X</i></span>
                              <p>Observa graficamente la estructura de tu estratégia</p>
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

export default ModalModeloEstrategico;
