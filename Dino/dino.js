class Dino {
  constructor(brain) {
    this.width = 32;
    this.height = 32;
    this.y = height - this.height - 30;
    this.x = 64;


    this.gravity = 0.7;
    this.lift = -12;

    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 10, 3);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  show() {
    noStroke();
    fill(0, 0, 255);
    rect(this.x, this.y, this.width, this.height);
  }

  up() {
    if (this.y >= height - this.height - 30) {
      //console.log("velocity");
      this.velocity = this.lift;
    }
  }

  duck() {
    if (this.y >= height - this.height - 30) {
      this.height = 16;
      this.y = height - this.height - 30;
      this.velocity = this.gravity;
    }
  }

  notduck() {
    this.height = 32;
    //this.y = height - this.height - 30;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(cactuss) {
    // Find the closest cactus
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < cactuss.length; i++) {
      let d = cactuss[i].x + cactuss[i].width - this.x;
      if (d < closestD && d > 0) {
        closest = cactuss[i];
        closestD = d;
      }
    }
    if (closest === null) {
      closest = cactuss[0];
    }

    let inputs = [];
    inputs[0] = this.x - closest.x;
    inputs[1] = this.y - closest.y;
    inputs[2] = closest.width;
    inputs[3] = closest.height;
    inputs[4] = this.velocity;
    let output = this.brain.predict(inputs);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1] && output[0] > output[2]) {
      this.up();
      this.notduck();
    } else if (output[1] > output[0] && output[1] > output[2]) {
      this.duck();
    } else {
      this.notduck();
    }
  }


  update() {
    this.score++;

    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.y > height - this.height - 30) {
      this.y = height - this.height - 30;
      this.velocity = 0;
    }
    if (this.velocity < this.lift) {
      this.velocity = this.lift;
    }
  }
}
