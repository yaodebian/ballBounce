window.onload = function () {
  var ball = $("ball"),
    shadow = $("shadow");
  var objBall = {};
  var shadowWithBall = function (top) {
    // 0 ~ 335
    var top = top || parseInt(ball.css("top")),
      scale = top / 335;
    opacity = top / 335;
    if (opacity < 0) opacity = 0;
    shadow.css("opacity", opacity)
      .css("WebkitTransform", "scale(" + [scale, scale].join(",") + ")")
      .css("transform", "scale(" + [scale, scale].join(",") + ")");
  }, funFall = function () {
    var start = 0, during = 100;
    var _run = function () {
      start++;
      var top = Tween.Bounce.easeOut(start, objBall.top, 335 - objBall.top, during);
      ball.css("top", top);
      shadowWithBall(top);
      if (start < during) requestAnimationFrame(_run);
    };
    _run();
  };
  ball.bind("mousedown", function (event) {
    objBall.pageY = event.pageY;
    objBall.flagFollow = true;
  });
  $(document).bind("mousemove", function (event) {
    if (objBall.flagFollow) {
      var pageY = event.pageY;
      objBall.top = 335 - (objBall.pageY - pageY);
      if (objBall.top < 0) {
        objBall.top = 0;
      } else if (objBall.top > 335) {
        objBall.top = 335;
      }
      //cosnole.log(objBall.top);
      ball.css("top", objBall.top);
      shadowWithBall(objBall.top);
    }
  });
  $(document).bind("mouseup", function (event) {
    if (objBall.flagFollow) funFall();
    objBall.flagFollow = false;
  });
}