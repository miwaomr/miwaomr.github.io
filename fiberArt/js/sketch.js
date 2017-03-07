
var color = []; 

function setup(){

  createCanvas(375, 667);
  colorMode(HSB,360,100,100);

}


function draw(){
  background(255);

  for (var i = 0; i < width; i++) {
    var ramdomNum = random(100);
    if (ramdomNum < 50) stroke(255);
    else stroke(random(150,300),100,100,10);
    line(i, 0, i, height);
  }
}
