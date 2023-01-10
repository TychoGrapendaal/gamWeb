
function nextGeneration() {
  console.log('next generation');
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    padles1[i] = pickOne1();
    padles2[i] = pickOne2();
  }
  for (let i = 0; i < TOTAL; i++) {
    savedPaddles1[i].dispose();
    savedPaddles2[i].dispose();
  }
  savedPaddles1 = [];
  savedPaddles2 = [];
}

function pickOne1() {
  let index1 = 0;
  let r1 = random(1);
  while (r1 > 0) {
    r1 = r1 - savedPaddles1[index1].fitness;
    index1++;
  }
  index1--;
  let padle1 = savedPaddles1[index1];
  let child = new Padle(8, 60, 'green', 20, 210, undefined, padle1.brain);
  // if (index1 === TOTAL - 1) {
  //   console.log("same");
  //   return child;
  // } else {
  if (random(1) > 0.1) {
    child.mutate();
  }
  return child;
}

function pickOne2() {
  let index2 = 0;
  let r2 = random(1);
  while (r2 > 0) {
    // console.log(r2);
    // console.log(savedPaddles2[index2]);
    r2 = r2 - savedPaddles2[index2].fitness;
    index2++;
  }
  index2--;
  let padle2 = savedPaddles2[index2];
  // if (index2 === TOTAL - 1) {
  //   console.log("same2");
  //   return padle2;
  // } else {
  let child = new Padle(8, 60, 'red', 620, 210, undefined, padle2.brain);
  if (random(1) > 0.1) {
    child.mutate();
  }
  return child;
}

function calculateFitness() {
  let sum1 = 0;
  let sum2 = 0;
  for (let padle of savedPaddles1) {
    sum1 += padle.score;
  }
  console.log(sum1);
  for (let padle of savedPaddles1) {
    padle.fitness = padle.score / sum1;
  }
  for (let padle of savedPaddles2) {
    sum2 += padle.score;
  }
  for (let padle of savedPaddles2) {
    padle.fitness = padle.score / sum2;
  }
}
