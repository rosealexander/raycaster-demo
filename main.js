import {Raycaster} from "./src/Raycaster.js";
import {setKeyCommand, setTouchEvent} from "./src/Utility.js";
import {generateDemoMap} from "./src/GameMap.js";
import {resizeCanvas, setCanvasResizeEvent} from "./src/Canvas.js";
import {gameLoop, getFps} from "./src/GameLoop.js";

(() => {
    //global variables
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //Setup
    let demoMap = generateDemoMap(64, 64, 6);
    let raycaster = new Raycaster(32, 32, demoMap);

    //key commands
    setKeyCommand("Up", "ArrowUp", "w", () => raycaster.movingForward = true, () => raycaster.movingForward = false);
    setKeyCommand("Right", "ArrowRight", "d", () => raycaster.turningRight = true, () => raycaster.turningRight = false);
    setKeyCommand("Down", "ArrowDown", "s", () => raycaster.movingBackward = true, () => raycaster.movingBackward = false);
    setKeyCommand("Left", "ArrowLeft", "a", () => raycaster.turningLeft = true, () => raycaster.turningLeft = false);

    //arrow button commands
    setTouchEvent('arrow-up', () => raycaster.movingForward = true, () => raycaster.movingForward = false);
    setTouchEvent('arrow-right', () => raycaster.turningRight = true, () => raycaster.turningRight = false);
    setTouchEvent('arrow-down', () => raycaster.movingBackward = true, () => raycaster.movingBackward = false);
    setTouchEvent('arrow-left', () => raycaster.turningLeft = true, () => raycaster.turningLeft = false);

    //set resize event
    setCanvasResizeEvent(
        () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            raycaster.drawEnvironment();
        });


    //draw
    gameLoop(
        [resizeCanvas, raycaster.drawEnvironment.bind(raycaster)],
        [raycaster.directionalCommands.bind(raycaster),
            resizeCanvas, raycaster.drawEnvironment.bind(raycaster),
            () => {if (raycaster.isMoving()) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                raycaster.drawEnvironment();}
        }]);
})();
