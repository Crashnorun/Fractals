window.onload = function () {
    let size, maxDepth = 0;

    init();

    function init() {
        chaos.init();
        size = chaos.height * 0.5;

        draw();

        document.body.addEventListener("keyup", keyUp);

        function keyUp(event) {
            console.log("Key pressed: " + event.keyCode);
            switch (event.keyCode) {
                case 32:    // space bar
                    maxDepth += 1;
                    draw(false);
                    break;

                case 80:    // p button
                    chaos.popImage();
                    break;

                case 82:    // r button adds random translation
                    maxDepth += 1;
                    draw(true);

                default:
                    break;
            }
        }
    }

    function draw(bool) {
        chaos.clear();
        chaos.context.save();
        chaos.context.translate(chaos.width * 0.5, chaos.height * 0.6);
        chaos.context.scale(size, size);
        drawTriangle(maxDepth, bool);
        chaos.context.restore()
    }

    function drawTriangle(depth, bool) {
  
        let angle = -Math.PI / 2;
        let x = bool ? Math.random() : 0;
        let y = bool ? Math.random() : 0;
        let r = Math.random() * 256;
        let g = Math.random() * 256;
        let b = Math.random() * 256;

        if (depth === 0) {
            chaos.context.beginPath();

            // move to top point of triangle
            chaos.context.moveTo(Math.cos(angle) + x, Math.sin(angle) + y);
            angle += Math.PI * 2 / 3;

            // draw line to lower right point
            chaos.context.lineTo(Math.cos(angle) + x, Math.sin(angle) + y);

            // draw line to final point
            angle += Math.PI * 2 / 3;
            chaos.context.lineTo(Math.cos(angle) + x, Math.sin(angle) + y);

            // fill will close the shape
            chaos.context.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
            chaos.context.fill();
        } else {
            //#region 
            // // draw top of triangle
            // chaos.context.save();
            // chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
            // chaos.context.scale(0.5, 0.5);
            // drawTriangle(depth - 1);
            // chaos.context.restore();

            // // draw the lower right triangle
            // angle += Math.PI * 2 / 3;
            // chaos.context.save();
            // chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
            // chaos.context.scale(0.5, 0.5);
            // drawTriangle(depth - 1);
            // chaos.context.restore();

            // // draw the lower left triangle
            // angle += Math.PI * 2 / 3;
            // chaos.context.save();
            // chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
            // chaos.context.scale(0.5, 0.5);
            // drawTriangle(depth - 1);
            // chaos.context.restore();
            //#endregion

            for (let i = 0; i < 3; i++) {
                angle += Math.PI * 2 / 3;
                chaos.context.save();
                chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
                chaos.context.scale(0.5, 0.5);
                drawTriangle(depth - 1, bool);
                chaos.context.restore();
            }
        }
    }

}
