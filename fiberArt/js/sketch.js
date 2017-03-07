
// var num = 300;

// color[] col = new color['#255c7d','#9a7b69','#0d4164','#6b726b','#d4a493'];

function setup() {
  createCanvas(375, 667);
  //
  // for (var cnt=0; cnt<num; cnt++){
  //      col[cnt] = color(random(150,300),100,100);
  //    }

}

function draw() {
  noStroke();
  fill('#255c7d');
  rect(0, 0, 75, height);
  fill('#9a7b69');
  rect(75, 0, 75, height);
  fill('#0d4164');
  rect(150, 0, 75, height);
  fill('#6b726b');
  rect(225, 0, 75, height);
  fill('#d4a493');
  rect(300, 0, 75, height);
}

// function draw() {
//   background(255);
//   noStroke();
//   for (var i = 0; i < width; i++) {
//       line(i, 0, i, height);
//       stroke('#255c7d');
//     }
// }

// #255c7d
// #9a7b69
// #0d4164
// #6b726b
// #d4a493

// var count = 0;
// var num = 300;
// color[] col = new color[num];
//
// function setup(){
//
//   createCanvas(640,640);
//   colorMode(HSB,360,100,100);
//
//
//   for (var cnt=0; cnt<num; cnt++){
//       col[cnt] = color(random(150,300),100,100);
//     }
//
// }
//
//
// function draw(){
//   background(0,0,0);
//
//   for (var i = 0; i < width; i++) {
//     float ramdomNum = random(100);
//     if (ramdomNum < 50) stroke(0);
//     else stroke(random(150,300),100,100);
//     line(i, 0, i, height);
//   }
// }
