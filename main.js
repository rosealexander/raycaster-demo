import {Raycaster} from "./src/Raycaster.js";
import {setKeyCommand, setTouchEvent} from "./src/Utility.js";
import {generateDemoMap} from "./src/GameMap.js";
import {resizeCanvas, setCanvasResizeEvent} from "./src/Canvas.js";
import {gameLoop, getFps} from "./src/GameLoop.js";

(() => {
    //Setup
    let demoMap = generateDemoMap(64, 64, 6);
    let raycaster = new Raycaster(32, 32, demoMap);

    //key commands
    setKeyCommand("Up", "ArrowUp", "w",
        () => raycaster.movingForward = true,
        () => raycaster.movingForward = false);
    setKeyCommand("Right", "ArrowRight", "d",
        () => raycaster.turningRight = true,
        () => raycaster.turningRight = false);
    setKeyCommand("Down", "ArrowDown", "s",
        () => raycaster.movingBackward = true,
        () => raycaster.movingBackward = false);
    setKeyCommand("Left", "ArrowLeft", "a",
        () => raycaster.turningLeft = true,
        () => raycaster.turningLeft = false);

    //arrow button commands
    setTouchEvent('arrow-up', () => raycaster.movingForward = true, () =>
        raycaster.movingForward = false);
    setTouchEvent('arrow-right', () => raycaster.turningRight = true, () =>
        raycaster.turningRight = false);
    setTouchEvent('arrow-down', () => raycaster.movingBackward = true, () =>
        raycaster.movingBackward = false);
    setTouchEvent('arrow-left', () => raycaster.turningLeft = true, () =>
        raycaster.turningLeft = false);

    //set resize event
    setCanvasResizeEvent();
    //reset canvas size
    resizeCanvas();

    //draw
    gameLoop([drawPlayerPosition, drawFps, raycaster.draw.bind(raycaster)]);


    function drawFps(){
        document.getElementById('fps').textContent=`fps: ${Math.round(getFps()).toString()}`;
    }

    function drawPlayerPosition(){
        document.getElementById('pos').textContent=
            `pos: ${Math.round(raycaster._playerPositionX).toString()}, ${Math.round(raycaster._playerPositionY).toString()}`;
    }
})();
