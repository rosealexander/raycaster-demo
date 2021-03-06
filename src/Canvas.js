//Reset canvas width and height to match browser window dimensions
export function resizeCanvas(){

    const canvas = document.querySelector('canvas');

    function resetCanvasWidth() {
        /iPhone|iPad|iPod/i.test(navigator.userAgent)
            ? window.innerHeight > window.innerWidth
            ? canvas.width = screen.width * window.devicePixelRatio
            : canvas.width = screen.height * window.devicePixelRatio
            : canvas.width = window.innerWidth * window.devicePixelRatio;
    }

    function resetCanvasHeight() {
        /iPhone|iPad|iPod/i.test(navigator.userAgent)
            ? window.innerHeight > window.innerWidth
            ? canvas.height = 1.04 * screen.height * window.devicePixelRatio
            : canvas.height = 1.04 * screen.width * window.devicePixelRatio
            : canvas.height = 1.04 * window.innerHeight * window.devicePixelRatio;
    }

    resetCanvasWidth();
    resetCanvasHeight();
}

export function setCanvasResizeEvent(callback = null){
    function _debounce(func) {
        let timer;
        return event => {
            if(timer) { clearTimeout(timer);}
            timer = setTimeout(func,50,event);
        };
    }

    window.addEventListener("resize", _debounce(resizeCanvas));
    window.addEventListener("resize", _debounce(callback));
}
