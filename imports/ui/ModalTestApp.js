import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";


class ModalTestApp extends Component {
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
   constructor(props) {
    super(props);
     this.state = { 
                   modalMongoId:"",
                   };
  }
  handleChange(event){
  
  this.props.onMongoIdChange(event.target.value);
  //this.setState({modalMongoId: event.target.value});

}

  render() {

    return (
      <div>
        <a
          className="waves-effect waves-light btn light-blue darken-4 modal-trigger"
          data-target="modalTestApp"
        >
          Select cloud file ID
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modalTestApp"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
        <div className="row">
          <div className="modal-content">
            <font color="black"><h4>Select Cloud File ID</h4></font>
                    <div className="col m12">
                       <input type="text" value={this.state.name} onChange={this.handleChange} />

                    </div>
          </div>
        </div>
          <div className="modal-footer">
            
            <a className="modal-close waves-effect waves-green btn-flat">
              Select ID
            </a>
            <a className="modal-close waves-effect waves-green btn-flat">
              Exit
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalTestApp;
