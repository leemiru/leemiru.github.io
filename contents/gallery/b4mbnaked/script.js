const imageA = new Image();
const imageB = new Image();
const imageC = new Image();
const imageD = new Image();
imageA.src = './image.jpg';
imageB.src = './image-curvesign.jpg';
imageC.src = './image-dny.jpg';
imageD.src = './image-thxalotlot.jpg';

imageA.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 420;
    canvas.height = 594;

    let particlesArray = [];
    const numberOfParticles = 5000;
    const detail = 1;

    ctx.drawImage(imageA, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let grid = [];
    for (let y = 0; y < canvas.height; y += detail){
        let row = [];
        for (let x = 0; x < canvas.width; x += detail){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const color = 'rgb(' + red +',' + green + ',' + blue + ')';
            const brightness = calculateBrightness(red, green, blue)/100;

            row.push(brightness);
        }  
        grid.push(row); 
    }

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y =  0;
            //this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 10;
            this.size = Math.random() * 1 + .25;
        }
        update () {
            this.speed = grid[Math.floor(this.y / detail)][Math.floor(this.x / detail)];
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function init(){
        for (let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particle());
        }
    }
    init();

    function animate () {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        requestAnimationFrame( animate );
    }
    animate();

    function calculateBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        );
    }

    const $cImg = $('#clipped-image');
    $('html').mousemove(function(e){  
      $cImg.css('--clip-position', `${e.pageX}px ${e.pageY + -60}px`);  
    });
    

});

imageB.addEventListener('load', function(){
    const canvas = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    canvas.width = 420;
    canvas.height = 594;

    let particlesArray = [];
    const numberOfParticles = 5000;
    const detail = 1;

    ctx.drawImage(imageB, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let grid = [];
    for (let y = 0; y < canvas.height; y += detail){
        let row = [];
        for (let x = 0; x < canvas.width; x += detail){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const color = 'rgb(' + red +',' + green + ',' + blue + ')';
            const brightness = calculateBrightness(red, green, blue)/100;

            row.push(brightness);
        }  
        grid.push(row); 
    }

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y =  0;
            //this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 10;
            this.size = Math.random() * 1 + .25;
        }
        update () {
            this.speed = grid[Math.floor(this.y / detail)][Math.floor(this.x / detail)];
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function init(){
        for (let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particle());
        }
    }
    init();

    function animate () {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        requestAnimationFrame( animate );
    }
    animate();

    function calculateBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        );
    }

    const $cImg = $('#clipped-image');
    $('html').mousemove(function(e){  
      $cImg.css('--clip-position', `${e.pageX}px ${e.pageY + -60}px`);  
    });
    

});

imageC.addEventListener('load', function(){
    const canvas = document.getElementById('canvas3');
    const ctx = canvas.getContext('2d');
    canvas.width = 420;
    canvas.height = 594;

    let particlesArray = [];
    const numberOfParticles = 5000;
    const detail = 1;

    ctx.drawImage(imageC, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let grid = [];
    for (let y = 0; y < canvas.height; y += detail){
        let row = [];
        for (let x = 0; x < canvas.width; x += detail){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const color = 'rgb(' + red +',' + green + ',' + blue + ')';
            const brightness = calculateBrightness(red, green, blue)/100;

            row.push(brightness);
        }  
        grid.push(row); 
    }

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y =  0;
            //this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 10;
            this.size = Math.random() * 1 + .25;
        }
        update () {
            this.speed = grid[Math.floor(this.y / detail)][Math.floor(this.x / detail)];
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function init(){
        for (let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particle());
        }
    }
    init();

    function animate () {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        requestAnimationFrame( animate );
    }
    animate();

    function calculateBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        );
    }

    const $cImg = $('#clipped-image');
    $('html').mousemove(function(e){  
      $cImg.css('--clip-position', `${e.pageX}px ${e.pageY + -60}px`);  
    });
    

});

imageD.addEventListener('load', function(){
    const canvas = document.getElementById('canvas4');
    const ctx = canvas.getContext('2d');
    canvas.width = 420;
    canvas.height = 594;

    let particlesArray = [];
    const numberOfParticles = 5000;
    const detail = 1;

    ctx.drawImage(imageD, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let grid = [];
    for (let y = 0; y < canvas.height; y += detail){
        let row = [];
        for (let x = 0; x < canvas.width; x += detail){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const color = 'rgb(' + red +',' + green + ',' + blue + ')';
            const brightness = calculateBrightness(red, green, blue)/100;

            row.push(brightness);
        }  
        grid.push(row); 
    }

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y =  0;
            //this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 10;
            this.size = Math.random() * 1 + .25;
        }
        update () {
            this.speed = grid[Math.floor(this.y / detail)][Math.floor(this.x / detail)];
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function init(){
        for (let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particle());
        }
    }
    init();

    function animate () {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        requestAnimationFrame( animate );
    }
    animate();

    function calculateBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        );
    }

    const $cImg = $('#clipped-image');
    $('html').mousemove(function(e){  
      $cImg.css('--clip-position', `${e.pageX}px ${e.pageY + -60}px`);  
    });
    

});