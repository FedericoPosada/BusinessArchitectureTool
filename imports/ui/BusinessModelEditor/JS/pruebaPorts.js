var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({ el: $('#paper'), width: 650, height: 200, gridSize: 1, model: graph });

var m1 = new joint.shapes.devs.Model({
    position: {x: size/2, y:2*margin.top+3.5*size/2},
    size: { width: size-margin.right-margin.left, height: size-2*(margin.top+margin.bottom) },
    inPorts: [],
    outPorts: [],
    ports: {
        groups: {
                'top': {position:'top'},
                'bottom':{position:'bottom'},
                'left':{position:'left'},
                'right':{position:'right'}
        }
    }
});
graph.addCell(m1);
