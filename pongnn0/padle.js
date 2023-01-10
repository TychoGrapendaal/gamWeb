class Padle {
  constructor(width, height, color, x, y, ball, brain) {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
    this.color = color;
    this.still = 0;
    this.ball = ball;

    this.score = 0;
    this.fitness = 0;
    this.player = false;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 2);
    }
  }

  crashWith(otherobj) {
				var myleft = this.x;
				var myright = this.x + (this.width);
				var mytop = this.y;
				var mybottom = this.y + (this.height);
				var otherleft = otherobj.x - (otherobj.width / 2);
				var otherright = otherobj.x + (otherobj.width / 2);
				var othertop = otherobj.y - (otherobj.height / 2);
				var otherbottom = otherobj.y + (otherobj.height / 2);
				var crash = true;
				if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
					crash = false;
				}
				return crash;
			}

  dispose() {
    this.brain.dispose();
  }

  show() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  setball(ball) {
    this.ball = ball;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  up() {
    this.y += -4;
  }

  down() {
    this.y += 4
  }

  think() {
    // Find the closest pipe
    if (this.player === false) {
      let inputs = [];
      inputs[0] = (this.y + this.height / 2 - this.ball.y);
      inputs[1] = (this.x - this.ball.x);
      inputs[2] = this.ball.speedX;
      inputs[3] = this.ball.speedY;

      let output = this.brain.predict(inputs);
      //console.log(output);
      //if (output[0] > output[1] && this.velocity >= 0) {
      if (output[0] > output[1] && output[0] > 0.7) {
        this.up();
      } else if (output[1] > output[0] && output[1] > 0.7) {
        this.down();
      }
    }
  }

  stills() {
    let oldy = this.y;
    if (this.y === oldy) {
      this.still++;
    } else {
      this.still = 0;
    }
  }


  update() {
    this.score++;
    //this.stills();
    this.think();



    if (this.crashWith(this.ball)) {
      if (this.ball.x > width / 2) {
        this.ball.speedX = -4;
      } else {
        this.ball.speedX = 4;
      }

      this.ball.speedY += (this.ball.y - this.y - this.height / 2) / 6;
      //this.ball.speedY *= random(1, 2);
    }


    if (this.y + this.height > height) {
      this.y = height - this.height;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }
}
