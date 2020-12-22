export const setTouchEvent = (elementId, startEvent = null, endEvent = null) => {
    const touchStartEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    const touchEndEvent = 'ontouchend' in window ? 'touchend' : 'mouseup';
    document.getElementById(elementId).addEventListener(touchStartEvent, startEvent);
    document.getElementById(elementId).addEventListener(touchEndEvent, endEvent);
}

export const setKeyCommand = (key1, key2 = null, key3 = null, keyDown, keyUp) => {
    const keyDownHandler = (event) => {
        if (event.key === key1 || event.key === key2 || event.key === key3)
            keyDown();
    }
    const keyUpHandler = (event) => {
        if (event.key === key1 || event.key === key2 || event.key === key3)
            keyUp();
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}
