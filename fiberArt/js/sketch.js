
var color = []; //配列を用意


function setup() {
  createCanvas(375, 667);

}

// function draw() {
//   noStroke();
//   fill('#255c7d');
//   rect(0, 0, 75, height);
//   fill('#9a7b69');
//   rect(75, 0, 75, height);
//   fill('#0d4164');
//   rect(150, 0, 75, height);
//   fill('#6b726b');
//   rect(225, 0, 75, height);
//   fill('#d4a493');
//   rect(300, 0, 75, height);
// }

function setup(){

  createCanvas(640,640);
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
