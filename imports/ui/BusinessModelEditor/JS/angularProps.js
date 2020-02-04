var app = angular.module('modeler',[]);
var margin ={top:5, bottom:5, left:5, right:5};
var size = $('#panel').width()/2;



  app.controller('PropController',function(){
    this.tab=1;
    this.selectTab= function(tab){
      this.tab=tab;
    };
    this.isSelected = function(tab){
      return this.tab===tab;
    }
  });