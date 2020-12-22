import {Raycaster} from "./src/Raycaster.js";
import {setKeyCommand, setTouchEvent} from "./src/Utility.js";
import {generateDemoMap} from "./src/GameMap.js";
import {resizeCanvas, setCanvasResizeEvent} from "./src/Canvas.js";

(() => {
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
    setCanvasResizeEvent();
    //reset canvas size
    resizeCanvas();

    //draw
    // gameLoop([raycaster.draw.bind(raycaster),
    //     () => {document.getElementById('fps').textContent=`fps: ${Math.round(getFps()).toString()}`}]);

    let fps = 60,
        fpsID = document.getElementById('fps'),
        _interval = 1000 / fps,
        _lastTime = (new Date()).getTime(),
        _currentTime = 0,
        _delta = 0,
        _flag = false;

    //draw fps
    const getFps = () => {
        return Math.round(1000 / _delta);
    }

    const clearCanvas = () => {
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //Game loop
    (function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        _currentTime = (new Date()).getTime();
        _delta = (_currentTime - _lastTime);

        if (_delta > _interval) {
            _lastTime = _currentTime - (_delta % _interval);
            if (!_flag) {
                _flag = true;
                raycaster.drawEnvironment();
            }
            raycaster.directionalCommands();
            if (raycaster.isMoving()){
                clearCanvas();
                raycaster.drawEnvironment();
            }
            fpsID.textContent=`fps: ${Math.round(getFps()).toString()}`;
        }
    })();




})();
