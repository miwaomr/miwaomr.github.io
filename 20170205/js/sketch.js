
function setup() {
  createCanvas(720, 400);
  background(255);
}

function draw() {
  line(mouseX,mouseY,pmouseX,20);
	if(mousePressed == true){
        background(255);
      }
}
