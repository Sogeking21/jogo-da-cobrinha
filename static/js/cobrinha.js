window.onload = function () {

    var stage = document.getElementById('stage');
    var ctx = stage.getContext('2d');
    document.addEventListener("keydown", keyPush);
    setInterval(game, 75);

    const vel = 1;

    var vx = vy = 0;
    var px = 10;
    var py = 15;
    var tp = 30;
    var qp = 20;
    var ax = ay = 15;

    var trail = [];
    tail = 5;

    function game() {
        px += vx;
        py += vy;
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "#F20505";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = "#0fa";
        for (var i = 0; i < trail.length; i++) {
            ctx
