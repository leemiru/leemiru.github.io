// github.com/jwagner/simplex-noise.js?utm_source=recordnotfound.com#simplex-noisejs
const simplex = new SimplexNoise();

// $("#js-canvas").mouseenter(function (e) {
//   $(".cursor, .follower").css({ "mix-blend-mode": "normal" });
//   $(".follower-circle").addClass("follower-circle--scale");
// });

// $("#js-canvas").mouseleave(function (e) {
//   $(".cursor, .follower").css({ "mix-blend-mode": "normal" });
//   $(".follower-circle").removeClass("follower-circle--scale");
// });

// $(document).on("mousemove", function (e) {
//   $(".cursor, .follower").css({
//     transform: "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0px)",
//   });
// });

class Point {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.ctx = options.ctx;
    this.scalar = options.scalar;
    this.maxSize = options.maxSize;
  }

  render(t) {
    const noise = Math.abs(
      simplex.noise3D(this.x * this.scalar, this.y * this.scalar, t)
    );
    ctx.fillStyle = `rgb(255,  0,  0)`;
    this.ctx.fillRect(
      this.x,
      this.y,
      noise * this.maxSize,
      noise * this.maxSize
    );

    const noise2 = Math.abs(
      simplex.noise3D(this.x * this.scalar, this.y * this.scalar, t + 0.25)
    );
    ctx.fillStyle = `rgb(0,  255,  0)`;
    this.ctx.fillRect(
      this.x,
      this.y,
      noise2 * this.maxSize,
      noise2 * this.maxSize
    );

    const noise3 = Math.abs(
      simplex.noise3D(this.x * this.scalar, this.y * this.scalar, t + 0.5)
    );
    ctx.fillStyle = `rgb(0,  0,  255)`;
    this.ctx.fillRect(
      this.x,
      this.y,
      noise3 * this.maxSize,
      noise3 * this.maxSize
    );

    // const noise4 = Math.abs(
    //   simplex.noise3D(this.x * this.scalar, this.y * this.scalar, t + 0)
    // );
    // ctx.fillStyle = `rgb(255,  255,  255)`;
    // this.ctx.fillRect(
    //   this.x,
    //   this.y,
    //   noise4 * this.maxSize/2,
    //   noise4 * this.maxSize/2
    // );
  }
}

// Basic canvas setup
const c = document.querySelector("#js-canvas");
const ctx = c.getContext("2d", { alpha: false });
let h = c.height = innerHeight/1.3;
let w = c.width = innerWidth/1.3;
// let h = (c.height = 594 * 1.5);
// let w = (c.width = 420 * 1.5);
const canvasHeight = $("#js-canvas").height();
const canvasWidth = $("#js-canvas").width();

const points = [];
let t = 1;

// Play with this variables
let scalar = 0.00125;
let perLine = 125;
// const particleSize = Math.max(window.innerHeight, window.innerWidth) / perLine;
let particleSize = Math.max(innerHeight, innerWidth) / perLine;
let particleDistance = particleSize / 20;

// Generate points instances only once
function initPoints() {
  points.pop();
  for (let x = 0; x < w; x += particleSize + particleDistance) {
    for (let y = 0; y < h; y += particleSize + particleDistance) {
      points.push(
        new Point({
          x,
          y,
          ctx,
          scalar,
          maxSize: particleSize,
        })
      );
    }
  }
}

function clearPoints() {
  for (let x = 0; x < w; x += particleSize + particleDistance) {
    for (let y = 0; y < h; y += particleSize + particleDistance) {
      points.pop(
        new Point({
          x,
          y,
          ctx,
          scalar,
          maxSize: particleSize,
        })
      );
    }
  }
}
initPoints();

function animate(t) {
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.globalCompositeOperation = "lighter";
  // ctx.globalCompositeOperation = "normal";
  points.forEach((point) => {
    point.render(t * 0.0002);
  });

  requestAnimationFrame(animate);
}

animate(t);

$("#js-canvas").click(function () {
  // Array to store indexes which are left to access.
  // It helps in accessing values without repeating
  var alreadyDone = [];

  // Function picking random values from array
  const randomValueFromArray = (myArray) => {
    // If alreadyDone is empty then fill it will indexes equal
    // to the size of myArray
    if (alreadyDone.length === 0) {
      for (var i = 0; i < myArray.length; i++) alreadyDone.push(i);
    }

    // Generate random number within the range of
    // length of alreadyDone array
    var randomValueIndex = Math.floor(Math.random() * alreadyDone.length);

    // Getting unaccessed index of myArray using above
    // random number
    var indexOfItemInMyArray = alreadyDone[randomValueIndex];

    // remove this index from alreadyDone array because
    // we are accessing it now.
    alreadyDone.splice(randomValueIndex, 1);

    // Get the value
    return myArray[indexOfItemInMyArray];
  };

  scalar = randomValueFromArray([
    0, 0.0005, 0.00125, 0.0025, 0.005, 0.0075, 0.02,
  ]);

  // $("#js-canvas").toggleClass("is-active");
  console.log(scalar, perLine);

    clearPoints();
    
    perLine = randomValueFromArray([10, 25, 50, 75, 100, 125, 150]);

    initPoints();
    // $("#js-canvas").toggleClass("is-active");

  // animate(newScalar);
});