export function setTouchCommandEvent(instanceName){
    const touchStartEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    const touchEndEvent = 'ontouchend' in window ? 'touchend' : 'mouseup';

    //touch commands
    document.getElementById('arrow-up').addEventListener(touchStartEvent, function (){instanceName.movingForward = true});
    document.getElementById('arrow-up').addEventListener(touchEndEvent, function (){instanceName.movingForward = false});

    document.getElementById('arrow-down').addEventListener(touchStartEvent, function (){instanceName.movingBackward = true});
    document.getElementById('arrow-down').addEventListener(touchEndEvent, function (){instanceName.movingBackward = false});

    document.getElementById('arrow-left').addEventListener(touchStartEvent, function (){instanceName.turningLeft = true});
    document.getElementById('arrow-left').addEventListener(touchEndEvent, function (){instanceName.turningLeft = false});

    document.getElementById('arrow-right').addEventListener(touchStartEvent, function (){instanceName.turningRight = true});
    document.getElementById('arrow-right').addEventListener(touchEndEvent, function (){instanceName.turningRight = false});
}



export function setKeyCommandEvent(instanceName) {
    //Key Commands
    function keyDownHandler(event){
        if(event.key === "Right" || event.key === "ArrowRight" || event.key === "d") {
            instanceName.turningRight = true;
        }
        else if(event.key === "Left" || event.key === "ArrowLeft" || event.key === "a") {
            instanceName.turningLeft = true;
        }
        else if(event.key === "Up" || event.key === "ArrowUp" || event.key === "w") {
            instanceName.movingForward = true;
        }
        else if(event.key === "Down" || event.key === "ArrowDown" || event.key === "s") {
            instanceName.movingBackward = true;
        }
    }

    function keyUpHandler(event){
        if(event.key === "Right" || event.key === "ArrowRight" || event.key === "d") {
            instanceName.turningRight = false;
        }
        else if(event.key === "Left" || event.key === "ArrowLeft" || event.key === "a") {
            instanceName.turningLeft = false;
        }
        else if(event.key === "Up" || event.key === "ArrowUp" || event.key === "w") {
            instanceName.movingForward = false;
        }
        else if(event.key === "Down" || event.key === "ArrowDown" || event.key === "s") {
            instanceName.movingBackward = false;
        }
    }

    // event listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}