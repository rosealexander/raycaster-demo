# RaycasterJS
 
A ray-caster demo written in javascript. Geometry is rendered by measuring the distance of an emitted "ray" to its intersection with a predetermined delimeter. In this case, the delimeter is any number stored in a 2d array that does not equal zero. 

In an abstract way, if we think about the camera's position coordinates as something like mapArr[playerPosX][playerPosY] then  wherever mapArr[mapPosX][MapPosY] does not equal a zero, the "distance" between these positions determines the "height" of a wall.

## Getting Started

Everything needed to draw walls has been implement within the Raycaster class included in modules/Raycaster.js. I have gone ahead and built a UI around everything with some controls. A live demo is also availible at https://aeroses.github.io/RaycasterJS/. 

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the LICENSE.md file for details

## Acknowledgements 

Thanks to Lode's tutorials over at https://lodev.org.
I really reccommend anyone interested in learning more about raycasting to check out the guide, https://lodev.org/cgtutor/raycasting.html which does a great job of explaining how to implement the raycaster concept using a  2d viewing plane.
