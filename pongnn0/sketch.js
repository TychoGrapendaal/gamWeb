
const TOTAL = 50;
let balls = [];
let savedPaddles1 = [];
let savedPaddles2 = [];
let padles1 = [];
let padles2 = [];
let slider;
//let slider2;
let generation = 0;


function keyPressed() {
  if (key === 'S') {
    let padle1 = padles1[0];
    saveJSON(padle1.brain, 'padle1.json');
  }
  if (key === 'q') {
    padles1[0].player = true;
  }
}



function setup() {
  createCanvas(640, 480);
  tf.setBackend('cpu');
  slider = createSlider(1, 10, 1);
  //slider2 = createSlider(1, 50, 50);
  //TOTAL = slider2.value();
  for (let i = 0; i < TOTAL; i++) {
    //randomcolor = (random(0, 255), random(0, 255), random(0, 255));
    balls[i] = new Ball(8,8, 'white', 300, 200, random(-4, 4), random(-4, 4));
    padles1[i] = new Padle(8, 60, 'green', 20, 210, balls[i]);
    padles2[i] = new Padle(8, 60, 'red', 620, 210, balls[i]);

  }
}

function draw() {

  for (let n = 0; n < slider.value(); n++) {


    background(0);
    if (keyIsDown(87)) {
      padles1[0].up();
    }
    if (keyIsDown(83)) {
      padles1[0].down();
    }

    for (let i = padles1.length - 1; i >= 0; i--) {
      if (padles1[i].ball.x > width) {
        //padles1[i].score += 100000;
        savedPaddles1.push(padles1.splice(i, 1)[0]);
        savedPaddles2.push(padles2.splice(i, 1)[0]);

        balls.splice(i, 1);
      } else if (padles1[i].ball.x < 0) {
        //padles2[i].score += 100000;
        savedPaddles1.push(padles1.splice(i, 1)[0]);
        savedPaddles2.push(padles2.splice(i, 1)[0]);

        balls.splice(i, 1);
      } else if (padles1[i].score > 50000) {
        savedPaddles1.push(padles1.splice(i, 1)[0]);
        savedPaddles2.push(padles2.splice(i, 1)[0]);
        balls.splice(i, 1);
      }
      // else if (padles1[i].still === 1000) {
      //   padles1.score = 0;
      //   //balls[i].padle2.score = 0;
      //   savedPaddles1.push(padles1.splice(i, 1)[0]);
      //   //savedPaddles2.push(padles2.splice(i, 1)[0]);
      //   balls.splice(i, 1);
      // }
    }

    for (let i = 0; i < balls.length; i++) {

      balls[i].update();
      padles1[i].update();

      padles2[i].update();
      padles2[i].think(balls[i]);
    }

    if (balls.length === 0) {
      nextGeneration();
      balls = [];
      for (let i = 0; i < TOTAL; i++) {
        balls[i] = new Ball(8,8, 'white', 300, 200, random(-4, 4), random(-4, 4));
        padles1[i].setball(balls[i]);
        padles2[i].setball(balls[i]);
      }
      generation++;
      console.log("Generation: " + generation);
    }
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
    padles1[i].show();
    padles2[i].show();
  }

}
