import {Raycaster} from "./module/Raycaster.js";
import {resizeCanvas, setCanvasResizeEvent} from "./module/canvas.js";
import {setKeyCommandEvent, setTouchCommandEvent} from "./module/commands.js";
import {generateDemoMap} from "./module/worldMap.js";
import {runGame} from "./module/gameLoop.js";

let raycaster = new Raycaster(32,32, generateDemoMap(64,64,6));

resizeCanvas();
setCanvasResizeEvent();
setKeyCommandEvent(raycaster);
setTouchCommandEvent(raycaster);
runGame(raycaster);