//Create a random map
export function generateDemoMap(mapWidth, mapHeight, numOfWallTypes) {
    let map = [];
    for (let i = 0; i <= mapWidth; i++) {
        map[i] = [];
        for (let j = 0; j <= mapHeight; j++) {
            if (i === 0 || i === mapWidth || j === 0 || j === mapHeight)
                map[i][j] = numOfWallTypes;
            //exclude placing a wall at the center of the map so that this may be the player start position
            else if ((i !== mapWidth/2 && j !== mapHeight/2) && (i > 8 && i < mapWidth - 8 && j > 8 && j < mapHeight - 8))
                Math.trunc(Math.random() * 10) % 10 === 0 ? map[i][j] = (Math.trunc(Math.random() * 30) % numOfWallTypes) : map[i][j] = 0;
            else
                map[i][j] = 0;
        }
    }
    return map;
}