export class Raycaster {

    constructor(playerStartPosX, playerStartPosY, worldMap = []) {

        this._canvas = document.getElementById('canvas');
        this._ctx = this._canvas.getContext('2d');

        this._drawMax = 128;

        this._worldMap = worldMap;
        this._numberOfWallTypes = worldMap[0][0];
        this._playerPositionX = playerStartPosX;
        this._playerPositionY = playerStartPosY;
        this._playerDirectionX = 1;
        this._playerDirectionY = 0;

        this._cameraPlaneX = this._playerDirectionY;
        this._cameraPlaneY = this._playerDirectionX * window.innerWidth/window.innerHeight < 1.0 ? 0.3 : 0.8;
        console.log(window.innerWidth/window.innerHeight);

        this._moveSpeed = 0.1;
        this._rotSpeed = 0.05;

        this.turningRight = false;
        this.turningLeft = false;
        this.movingForward = false;
        this.movingBackward = false;

    }

    //Movement Controls
    _turnRight() {
        let oldPlayerDirectionX = this._playerDirectionX;
        this._playerDirectionX = this._playerDirectionX * Math.cos(this._rotSpeed) - this._playerDirectionY * Math.sin(this._rotSpeed);
        this._playerDirectionY = oldPlayerDirectionX * Math.sin(this._rotSpeed) + this._playerDirectionY * Math.cos(this._rotSpeed);

        let oldCameraPlaneX = this._cameraPlaneX;
        this._cameraPlaneX = this._cameraPlaneX * Math.cos(this._rotSpeed) - this._cameraPlaneY * Math.sin(this._rotSpeed);
        this._cameraPlaneY = oldCameraPlaneX * Math.sin(this._rotSpeed) + this._cameraPlaneY * Math.cos(this._rotSpeed);
    }

    _turnLeft() {
        let oldPlayerDirectionX = this._playerDirectionX;
        this._playerDirectionX = this._playerDirectionX * Math.cos(-this._rotSpeed) - this._playerDirectionY * Math.sin(-this._rotSpeed);
        this._playerDirectionY = oldPlayerDirectionX * Math.sin(-this._rotSpeed) + this._playerDirectionY * Math.cos(-this._rotSpeed);

        let oldCameraPlaneX = this._cameraPlaneX;
        this._cameraPlaneX = this._cameraPlaneX * Math.cos(-this._rotSpeed) - this._cameraPlaneY * Math.sin(-this._rotSpeed);
        this._cameraPlaneY = oldCameraPlaneX * Math.sin(-this._rotSpeed) + this._cameraPlaneY * Math.cos(-this._rotSpeed);
    }

    _moveForward() {
        if(this._worldMap[Math.trunc(this._playerPositionX + this._playerDirectionX * this._moveSpeed)][Math.trunc(this._playerPositionY)] === 0)
            this._playerPositionX += this._playerDirectionX * this._moveSpeed;

        if(this._worldMap[Math.trunc(this._playerPositionX)][Math.trunc(this._playerPositionY + this._playerDirectionY * this._moveSpeed)] === 0)
            this._playerPositionY += this._playerDirectionY * this._moveSpeed;
    }

    _moveBackward() {
        if(this._worldMap[Math.trunc(this._playerPositionX - this._playerDirectionX * this._moveSpeed)][Math.trunc(this._playerPositionX)] === 0)
            this._playerPositionX -= this._playerDirectionX * this._moveSpeed;

        if(this._worldMap[Math.trunc(this._playerPositionX)][Math.trunc(this._playerPositionY - this._playerDirectionY * this._moveSpeed)] === 0)
            this._playerPositionY -= this._playerDirectionY * this._moveSpeed;
    }

    //Draw functions
    _drawSky() {
        let skyColor = this._ctx.createLinearGradient(0, 0, 0, this._canvas.height/2);
        skyColor.addColorStop(0, "cyan");
        skyColor.addColorStop(1, "white");
        this._ctx.beginPath();
        this._ctx.rect(0, 0, this._canvas.width, this._canvas.height/2);
        this._ctx.fillStyle = skyColor;
        this._ctx.fill();
    }

    _drawFloor() {
        let floorColor = this._ctx.createLinearGradient(0, this._canvas.height/2, 0, this._canvas.height);
        floorColor.addColorStop(0, "beige");
        floorColor.addColorStop(1, "tan");
        this._ctx.beginPath();
        this._ctx.rect(0, this._canvas.height/2, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = floorColor;
        this._ctx.fill();
    }

    _drawWalls() {
        for (let wallType = this._numberOfWallTypes-1; wallType > 0; wallType -= 1) {

            let previousState = null,
                x2 = null, y2 = null,
                x3 = null, y3 = null,
                x1 = null, y1 = null,
                x4 = null, y4 = null;

            for (let x = 0; x < this._canvas.width; x++) {
                let cameraX = 2 * x / this._canvas.width - 1,
                    rayDirectionX = this._playerDirectionX + this._cameraPlaneX * cameraX,
                    rayDirectionY = this._playerDirectionY + this._cameraPlaneY * cameraX,

                    mapPositionX = Math.trunc(this._playerPositionX),
                    mapPositionY = Math.trunc(this._playerPositionY),

                    stepX, stepY,
                    sideDistanceX, sideDistanceY, perpWallDistance,

                    deltaDistanceX = Math.sqrt(1 + Math.pow(rayDirectionY, 2) / Math.pow(rayDirectionX, 2)),
                    deltaDistanceY = Math.sqrt(1 + Math.pow(rayDirectionX, 2) / Math.pow(rayDirectionY, 2)),

                    hit = false, side = false,
                    wallColor = null, darkenWallColor = false;


                if (rayDirectionX < 0) {
                    stepX = -1;
                    sideDistanceX = (this._playerPositionX - mapPositionX) * deltaDistanceX;
                } else {
                    stepX = 1;
                    sideDistanceX = (mapPositionX + 1 - this._playerPositionX) * deltaDistanceX;
                }

                if (rayDirectionY < 0) {
                    stepY = -1;
                    sideDistanceY = (this._playerPositionY - mapPositionY) * deltaDistanceY;
                } else {
                    stepY = 1;
                    sideDistanceY = (mapPositionY + 1 - this._playerPositionY) * deltaDistanceY;
                }

                while (!hit) {
                    if (sideDistanceX < sideDistanceY) {
                        sideDistanceX += deltaDistanceX;
                        mapPositionX += stepX;
                        side = false;
                    } else {
                        sideDistanceY += deltaDistanceY;
                        mapPositionY += stepY;
                        side = true;
                    }

                    let drawDistance = Math.abs(mapPositionX - this._playerPositionX) + Math.abs(mapPositionY - this._playerPositionY);
                    if (this._worldMap[mapPositionX][mapPositionY] >= wallType || drawDistance > this._drawMax) {
                        hit = true;

                        if (!side) {
                            perpWallDistance = Math.abs(mapPositionX - this._playerPositionX + (1 - stepX) / 2) / rayDirectionX;
                        } else {
                            perpWallDistance = Math.abs(mapPositionY - this._playerPositionY + (1 - stepY) / 2) / rayDirectionY;
                            darkenWallColor = true;
                        }

                        let lineHeight = Math.abs(Math.trunc(this._canvas.height / perpWallDistance));
                        let drawStart = Math.trunc(-lineHeight / 2 + this._canvas.height / 2) - lineHeight * (this._worldMap[mapPositionX][mapPositionY] - 1);
                        let drawEnd = Math.trunc(lineHeight / 2 + this._canvas.height / 2);

                        switch (previousState % 100) {
                            case 10: wallColor = "red"; break;
                            case 11: wallColor = "darkred"; break;
                            case 20: wallColor = "blue"; break;
                            case 21: wallColor = "darkblue"; break;
                            case 30: wallColor = "yellow"; break;
                            case 31: wallColor = "orange"; break;
                            case 40: wallColor = "green"; break;
                            case 41: wallColor = "darkGreen"; break;
                            case 50: wallColor = "magenta"; break;
                            case 51: wallColor = "purple"; break;
                            default: wallColor = "clear";
                        }

                        this._ctx.strokeStyle = wallColor;
                        this._ctx.fillStyle = wallColor;

                        let currentState =
                            100000 * mapPositionX
                            + 1000 * mapPositionY
                            + 10 * this._worldMap[mapPositionX][mapPositionY]
                            + darkenWallColor;

                        if (previousState !== currentState || x === this._canvas.width - 1) {

                            if (Math.trunc((previousState % 100) / 10) !== this._numberOfWallTypes) {
                                this._ctx.beginPath();
                                this._ctx.moveTo(x1, y1);
                                this._ctx.lineTo(x2, y2);
                                this._ctx.lineTo(x3, y3);
                                this._ctx.lineTo(x4, y4);
                                this._ctx.closePath();

                                this._ctx.fill();
                                this._ctx.stroke();
                            }
                            x2 = x;
                            y2 = Math.trunc(drawStart);
                            x3 = x;
                            y3 = Math.trunc(drawEnd);
                        }

                        x1 = x;
                        y1 = Math.trunc(drawStart);
                        x4 = x;
                        y4 = Math.trunc(drawEnd);
                        previousState = currentState;
                    }
                }
            }
        }
    }

    drawEnvironment(){
        this._drawSky();
        this._drawFloor();
        this._drawWalls();
    }

    isMoving(){
        return this.turningRight || this.turningLeft || this.movingForward || this.movingBackward;
    }

    directionalCommands(){
        if (this.turningRight) this._turnRight();
        else if (this.turningLeft) this._turnLeft();
        else if (this.movingForward) this._moveForward();
        else if (this.movingBackward) this._moveBackward();
    }
}
