let fps = 60,
    _interval = 1000 / fps,
    _lastTime = (new Date()).getTime(),
    _currentTime = 0,
    _delta = 0,
    _flag = true;

//Game loop
export const gameLoop = ([...setup], [...draw]) => {
    if (_flag) {
        _flag = false;
        setup.forEach(f => f.call());
    }
    window.requestAnimationFrame(gameLoop.bind(null, [...setup], [...draw]));

    _currentTime = (new Date()).getTime();
    _delta = (_currentTime - _lastTime);

    draw.forEach(f => f.call());

    _lastTime = _currentTime - (_delta % _interval);
}

//draw fps
export const getFps = () => {
    return Math.round(1000 / _delta);
}
