export function runGame(instanceName) {

    let _fps = 60,
        _interval = 1000 / _fps,
        _lastTime = (new Date()).getTime(),
        _currentTime = 0,
        _delta = 0;

    function _drawFps(delta) {
        let ctx = document.querySelector('canvas').getContext('2d');
        ctx.font = 'calc(42px - 0.4vw) Sans-serif';
        ctx.fillStyle = "red";
        ctx.fillText(Math.round(1000 / delta).toString() + " fps", 10, 50);
    }

    function _drawPlayerPosition(posX, posY) {
        let ctx = document.querySelector('canvas').getContext('2d');
        ctx.fillText("(" + Math.round(posX).toString() + "," + Math.round(posY).toString() + ")", 10, 100);
    }

//Game loop
    function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        _currentTime = (new Date()).getTime();
        _delta = (_currentTime - _lastTime);

        if (_delta > _interval) {

            //draw environment
            instanceName._drawSky();
            instanceName._drawFloor();
            instanceName._drawWalls(instanceName._numberOfWallTypes);

            _drawFps(_delta);
            _drawPlayerPosition(instanceName._playerPositionX, instanceName._playerPositionY);

            //key commands
            if (instanceName.turningRight) {
                instanceName._turnRight();
            } else if (instanceName.turningLeft) {
                instanceName._turnLeft();
            } else if (instanceName.movingForward) {
                instanceName._moveForward();
            } else if (instanceName.movingBackward) {
                instanceName._moveBackward();
            }

            _lastTime = _currentTime - (_delta % _interval);
        }
    }

    gameLoop();
}