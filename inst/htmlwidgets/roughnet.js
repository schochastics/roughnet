function drawRect(rc, s) {
   rc.rectangle(Number(s.x), Number(s.y), Number(s.size), Number(s.size), {
     roughness: s.roughness,
     bowing: s.bowing,
     fill: s.fill,
     fillStyle: s.fillstyle,
     hachureGap: 4,
     fillWeight: 0.5,
     stroke: s.color,
     strokeWidth: s.width
   });
}

function drawCirc(rc, s) {
   rc.circle(Number(s.x), Number(s.y), Number(s.size), {
     roughness: s.roughness,
     bowing: s.bowing,
     fill: s.fill,
     fillStyle: s.fillstyle,
     hachureGap: 4,
     fillWeight: 0.5,
     stroke: s.color,
     strokeWidth: s.width
   });
}

function drawHeart(rc,ctx,s){
  ctx.scale(s.size/100,s.size/100);
  ctx.translate(s.x*100/s.size,s.y*100/s.size);
  rc.path("M51.2 88.058q-1.5 0-2.5-1l-35.65-34.4q-1.65-1.35-4.25-4.65-2.65-3.3-4.4-6.15-1.7-2.8-3.05-6.9t-1.35-7.9q0-12.55 7.25-19.65t20.05-7.1q7.3-.05 13.7 4.25t10.2 8.1q12.5-12.5 23.9-12.35 12.8 0 20.05 7.1t7.25 19.7-13.1 25.65l-35.6 34.3q-1 1-2.5 1z",{
     roughness: s.roughness,
     bowing: s.bowing,
     fill: s.fill,
     fillStyle: s.fillstyle,
     hachureGap: 4,
     fillWeight: 0.5,
     stroke: s.color,
     strokeWidth: s.width});

  ctx.translate(-s.x*100/s.size,-s.y*100/s.size);
  ctx.scale(100/s.size,100/s.size);
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
//          ctx.textAlign = "center";
//          ctx.textBaseline = "middle";

        x.data.map(function(s) {
          if (s.shape === "rectangle") {
            drawRect(rc, s);
          }
          if(s.shape === "circle"){
            drawCirc(rc,s);
          }
          if(s.shape==="heart"){
            drawHeart(rc,ctx,s);
          }
          if(s.shape === "edge"){
            drawEdge(rc,s);
          }

        });
      },
      resize: function(width, height) {
        // TODO
      }
    };
  }
});
