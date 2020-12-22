let fps = 60,
    _interval = 1000 / fps,
    _lastTime = (new Date()).getTime(),
    _currentTime = 0,
    _delta = 0;

//Game loop
export const gameLoop = ([...callback]) => {
    window.requestAnimationFrame(gameLoop.bind(null, [...callback]));

    _currentTime = (new Date()).getTime();
    _delta = (_currentTime - _lastTime);

    if (_delta > _interval) {
        _lastTime = _currentTime - (_delta % _interval);
        callback.forEach(f => f.call());
    }
}

//draw fps
export const getFps = () => {
    return Math.round(1000 / _delta);
}
