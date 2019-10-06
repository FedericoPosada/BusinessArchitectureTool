import React, { Component } from 'react';

export default class ProcessImageComponent extends React.Component{
  constructor(props) {
    super(props);
  }

  removeFile(){
      Meteor.call('RemoveFile', this.props.fileId, function (err, res) {
        if (err)
          Materialize.toast("Ha ocurrido un error.",3000);
      })
  }

  render() {
    return (
      <div className="row">
        <div className="input-field col s8">
          <img src={this.props.fileUrl}/>
        </div>
      </div>
     )
  }
}