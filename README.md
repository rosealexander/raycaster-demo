# RaycasterJS
 
A ray-caster demo written in javascript. Geometry is rendered by measuring the distance of an emitted "ray" from a view position to its intersection with a predetermined delimeter. In this case, the delimeter is any number stored in a 2d array that does not equal zero. 

Usually a raycaster draws a bunch of vertical lines inorder to render the enviroment. This does not work well with HTML canvas. The solution is to calculate the corners of each simulated 3d shape and then draw flat shapes to the canvas.


## Getting Started

Everything needed to draw walls has been implement within the Raycaster class included in modules/Raycaster.js. I have gone ahead and built a UI around everything with some controls. A live demo is also availible at https://rosealexander.github.io/raycaster-demo/. 

CONTROLS: Use the arrow or wasd keys to move around.


## Acknowledgements 

Thanks to Lode's tutorials over at https://lodev.org.
I really recommend anyone interested in learning more about raycasting to check out the guide, https://lodev.org/cgtutor/raycasting.html which does a great job of explaining how to implement the raycaster concept.
