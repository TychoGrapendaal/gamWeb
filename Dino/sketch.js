
const TOTAL = 250;
let dinos = [];
let saveddinos = [];
let cactuss = [];
let counter = 0;
let slider;
let levels = [1, 2, 3];
let speed = 5;

function keyPressed() {
  if (key === 'S') {
    let dino = dinos[0];
    saveJSON(dino.brain, 'dino.json');
  }
}

function setup() {
  createCanvas(640, 480);
  tf.setBackend('cpu');
  slider = createSlider(1, 10, 1);
  for (let i = 0; i < TOTAL; i++) {
    dinos[i] = new Dino();
  }
  cactuss.push(new Cactus(speed));
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    //console.log(floor(400 / speed));
    if (cactuss[0] instanceof Cactus || cactuss[0] instanceof Bird) {
    } else {
      if (random(1) < 0.7) {
        cactuss.push(new Cactus(speed));
      } else {
        cactuss.push(new Bird(random(levels), speed));
      }
    }
    if (cactuss[0].x - 64 < 20 && cactuss.length < 2) {
      if (random(1) < 0.7) {
        cactuss.push(new Cactus(speed));
      } else {
        cactuss.push(new Bird(random(levels), speed));
      }
    }
    if (counter % 6000 == 0) {
      speed++;
    }
    counter++;

    for (let i = cactuss.length - 1; i >= 0; i--) {
      cactuss[i].update();

      for (let j = dinos.length - 1; j >= 0; j--) {
        if (cactuss[i].hits(dinos[j])) {
          saveddinos.push(dinos.splice(j, 1)[0]);
        }
      }

      if (cactuss[i].offscreen()) {
        cactuss.splice(i, 1);
      }
    }

    for (let dino of dinos) {
      dino.think(cactuss);
      dino.update();
    }

    if (dinos.length === 0) {
      counter = 0;
      nextGeneration();
      speed = 5;
      cactuss = [];
    }
  }

  // All the drawing stuff
  background(0);
  noStroke();
  fill(194, 178, 128);
  rect(0, 450, 640, 30);

  for (let dino of dinos) {
    dino.show();
  }

  for (let cactus of cactuss) {
    cactus.show();
  }
}
