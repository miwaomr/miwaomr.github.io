//
// var color =
//
// function setup(){
//
//   createCanvas(375, 667);
//   colorMode(HSB,360,100,100);
//
// }
//
//
// function draw(){
//   background(255);
//
//   for (var i = 0; i < width; i++) {
//     var ramdomNum = random(100);
//     if (ramdomNum < 50) stroke(255);
//     else stroke(random(150,300),100,100,10);
//     line(i, 0, i, height);
//   }
// }

var balls = [];

function setup() {
  var canvas = createCanvas(400, 300);
  canvas.parent("p5Canvas");
  colorMode(HSB);
}

function draw() {
  background(0);
  if(frameCount % 10 == 0){
    balls.push(Ball(random(width),0,random(3),random(4)));
  }

for(var i = balls.length - 1; i > 0; i--){
    balls[i].disp();
    balls[i].move();
    if(balls[i].end()){
      balls.splice(i, 1);
    }
  }
}


function Ball(_x, _y, _xSpeed, _ySpeed) {

  var b = {
    x: _x,
    y: _y,
    xSpeed: _xSpeed,
    ySpeed: _ySpeed,
    h: random(255),
    disp: function() {
      fill(this.h,255,255);
      noStroke(0);
      ellipse(this.x,this.y,25,25);
    },

    move: function(){
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    },
    end: function(){
      var e = false;

      if(this.x > width | this.x < 0 | this.y > height | this.y < 0){
        50
        this.e = true;
      }

      return this.e;
    }
  }
  return b;
}
