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
    var tail = 5;
    var lastKey = null;

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

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        // Desenha a maçã com um efeito de piscar
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(ax * tp + tp / 2, ay * tp + tp / 2, tp / 2, 0, Math.PI * 2, false);
        ctx.fill();
        
        ctx.fillStyle = "#9E8954";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 2, tp - 2);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
            }
        }

        trail.push({ x: px, y: py });
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }

    function keyPush(event) {
        switch (event.keyCode) {
            case 37: // Left
                if (lastKey !== 39) { // Prevent reversing to the opposite direction
                    vx = -vel;
                    vy = 0;
                    lastKey = 37;
                }
                break;
            case 38: // Up
                if (lastKey !== 40) { // Prevent reversing to the opposite direction
                    vx = 0;
                    vy = -vel;
                    lastKey = 38;
                }
                break;
            case 39: // Right
                if (lastKey !== 37) { // Prevent reversing to the opposite direction
                    vx = vel;
                    vy = 0;
                    lastKey = 39;
                }
                break;
            case 40: // Down
                if (lastKey !== 38) { // Prevent reversing to the opposite direction
                    vx = 0;
                    vy = vel;
                    lastKey = 40;
                }
                break;
        }
    }
};


