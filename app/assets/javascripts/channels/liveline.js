//= require cable
//= require_self
//= require_tree .

this.App = {};

App.cable = ActionCable.createConsumer();

App.messages = App.cable.subscriptions.create('LineChannel', {
  received: function(data){
    drawLine(data.fromx, data.fromy, data.tox, data.toy, data.color)
  }
});

$(function(){
  doc = $(document),
  canvas = $('#paper'),
  ctx = canvas[0].getContext('2d');

  var prev = {};
  var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  var drawing = false;
  var timeSinceLastSend = $.now();

  canvas.on("mousedown touchstart", function(e){
    e.preventDefault();

    var x = e.pageX;
    var y = e.pageY;

    if ( e.originalEvent.changedTouches ) {
      e = e.originalEvent.changedTouches[0];
      x = e.pageX;
      y = e.pageY;
    }

    drawing = true;
    prev.x = x;
    prev.y = y;
  });

  doc.bind('mouseup mouseleave touchend',function(){
    drawing = false;
  });

  doc.on('mousemove touchmove',function(e){

    if(drawing && $.now() - timeSinceLastSend > 10){
      //get mouse coords
      var x = e.pageX;
      var y = e.pageY;

      if ( e.originalEvent.changedTouches ) {
        e = e.originalEvent.changedTouches[0];
        x = e.pageX;
        y = e.pageY;
      }

      $.ajax({
        method: "POST",
        url: "/updateline",
        data: {
          'fromx': prev.x,
          'fromy': prev.y,
          'tox': x,
          'toy': y,
          'color': color
        }
      });

      timeSinceLastSend = $.now();
    }

    if(drawing && x && y){
      drawLine(prev.x, prev.y, x, y, color);
      prev.x = x;
      prev.y = y;
    }
  });
});

function drawLine(fromx, fromy, tox, toy, color){
 ctx.beginPath();
 ctx.strokeStyle = color
 ctx.moveTo(fromx, fromy);
 ctx.lineTo(tox, toy);
 ctx.stroke();
}