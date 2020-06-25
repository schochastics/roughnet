function drawRect(rc, s) {
   rc.rectangle(Number(s.x), Number(s.y), Number(s.size), Number(s.size), {
     roughness: s.roughness,
     bowing: s.bowing,
     fill: s.fill,
     stroke: s.color,
     fillStyle: s.fillstyle
   });
}

function drawCirc(rc, s) {
   rc.circle(Number(s.x), Number(s.y), Number(s.size), {
     roughness: s.roughness,
     bowing: s.bowing,
     fill: s.fill,
     stroke: s.color,
     fillStyle: s.fillstyle
   });
}

function drawEdge(rc, s) {
   rc.line(Number(s.x), Number(s.y), Number(s.xend),Number(s.yend),{
     roughness: s.roughness,
     bowing: s.bowing,
     stroke: s.color,
     strokeWidth: s.width
   });
}

HTMLWidgets.widget({

  name: 'roughnet',

  type: 'output',

  factory: function(el, width, height) {

    return {
      renderValue: function(x) {

        // Create Canvas element in DOM
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        el.appendChild(canvas);

        // Insert rough canvas in the new canvas element
        const rc = rough.canvas(document.getElementById("canvas"));

        // Create context for text shape
        const c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        console.log(x);
//        rc.rectangle(0,0,800,600,{
//          stroke: 'white',
//          fill: 'white',
//          fillstyle: 'solid'
//        });
        x.data.map(function(s) {
          if (s.shape === "rectangle") {
            drawRect(rc, s);
          }
          if(s.shape === "circle"){
            drawCirc(rc,s);
          }
          if(s.shape === "line"){
            drawEdge(rc,s);
          }
        });
      },
      resize: function(width, height) {
        // TODO: Find a way to redraw the image on resize.
      }
    }
  }
});
