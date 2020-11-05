
	
	/*======작업물 나열 구간======*/
	allProjects();
	
	// function allProjects() {
	// 	let masterpieces = 6; //작품의 최신 개수로 업데이트
	// 	let count = masterpieces + 1;
	// 	const wrapper = $('#swiper-projects-all');
	// 	for (count>1; count--;) {
	// 		if (count>0) {
	// 			const slide = document.createElement('div');
	// 			wrapper.append(slide);
	// 			slide.className="swiper-slide";
				
	// 			const picture = document.createElement('div');
	// 			slide.append(picture);
				
	// 			picture.className="picture";
	// 			// picture.id = "picture-" + count;
				
	// 			const img = document.createElement('img');
	// 			picture.append(img);
				
	// 			img.id = "picture-" + count;
				
	// 			$('#picture-'+count).attr('src', './images/posts/19-'+ count +'/thumb.png');
	// 			$('#picture-'+count).attr('href', './images/posts/19-'+ count +'/desc.html');
	// 			var title = $('#picture-'+count);
				
	// 			//JSON Array
	// 			// var jsondata = '../images/posts/19-'+ count +'/data.json';
	// 			// $.getJSON(jsondata, function(title) { return (data) => {
	// 			// 	title.html('<p class="image-frame-title">'+JSON.stringify(data.index)+'</p>');
	// 			// }}(title));;
				
	// 		}
	// 	}
		
	// }
	
	function allProjects() {
		let masterpieces = 6; //작품의 최신 개수로 업데이트
		let count = masterpieces + 1;
		const gallery = $('#gallery');
		for (count>1; count--;) {
			if (count>0) {
				const frame = document.createElement('div');
				gallery.append(frame);
				frame.className="project-frame";
				
				const sub = document.createElement('a');
				frame.append(sub);
				
				sub.className="image-frame";
				sub.id = "image-" + count;
				
				// $('#image-'+count).attr('src', './images/posts/19-'+ count +'/thumb.png');
				$('#image-'+count).css('background', 'url("./images/posts/19-'+ count +'/thumb.png") center no-repeat');
				$('#image-'+count).attr('href', './images/posts/19-'+ count +'/desc.html');
				var title = $('#image-'+count);
				
				//JSON Array
				var jsondata = './images/posts/19-'+ count +'/data.json';
				$.getJSON(jsondata, function(title) { return (data) => {
					title.html('<p class="image-frame-title">'+JSON.stringify(data.index)+'</p>');
				}}(title));;
				
			}
		}
		
	}
  
var swiperH = new Swiper('.swiper-container-h', {
	spaceBetween: 0,
	freeMode: true,
	cssMode: true,
	mousewheel: true,
	keyboard: true,
	pagination: {
		el: '.swiper-pagination-h',
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		clickable: true,
	},
});
var swiperV = new Swiper('.swiper-container-v', {
	direction: 'vertical',
	spaceBetween: 0,
	cssMode: true,
	mousewheel: true,
	keyboard: true,
	pagination: {
		el: '.swiper-pagination-v',
		clickable: true,
	},
});

//main canvas animation

let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadiusSmall = 5;
let maxRadius = 7;
let maxRadiusLarge = 10;
let rangeExtraSmall = 30;
let rangeSmall = 70;
let rangeMedium = 200;
let rangeLarge = 350;
let rangeExtraLarge = 500;
let rangeExtraXLarge = 600;
let displacement = 0;
let halfWidth = window.innerWidth / 2;
let halfHeight = window.innerHeight / 2;

let minRadius = 2;
let growSpeed = 1;

let colorArray = [
    "#111111"//,
     // "#C700E8",
     // "#9A0EFF",
     // "#4800E8",
     // "#0A00FF"
]

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius) {
    let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    //this.color = randomColor;
    //this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.color = "#111111";

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.rect(this.x, this.y, this.radius * 1.5, this.radius * 1.5);
        c.fillStyle = this.color;
        c.fill();
      //
        c.shadowColor = "#111111";
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowBlur = 0;
    }
    
    this.update = () => {
    
            // interactivity - grow / shrink
           if (mouse.x - this.x < rangeSmall && mouse.x - this.x > -rangeSmall 
                && mouse.y - this.y < rangeSmall && mouse.y - this.y > -rangeSmall && $('#tm-circles:hover').length != 0) {
                    if (this.radius < maxRadiusLarge){
                        this.radius += growSpeed;
                    } else if (this.radius > maxRadiusLarge){
                        this.radius -= growSpeed;
                    }
            } else if (mouse.x - this.x < rangeMedium && mouse.x - this.x > -rangeMedium 
                && mouse.y - this.y < rangeMedium && mouse.y - this.y > -rangeMedium && $('#tm-circles:hover').length != 0) {
                    if (this.radius < maxRadius){
                        this.radius += growSpeed;
                    } else if (this.radius > maxRadius){
                        this.radius -= growSpeed;
                    }
            } else if (mouse.x - this.x < rangeLarge && mouse.x - this.x > -rangeLarge 
                && mouse.y - this.y < rangeLarge && mouse.y - this.y > -rangeLarge && $('#tm-circles:hover').length != 0) {
                    if (this.radius < maxRadiusSmall){
                        this.radius += growSpeed;
                    } else if (this.radius > maxRadiusSmall){
                        this.radius -= growSpeed;
                    }
            } 
            else if (this.radius > this.minRadius){
                this.radius -= growSpeed;
            }
      
           // change colors
      
             if (mouse.x - this.x > rangeExtraLarge || mouse.x - this.x < -rangeExtraLarge || mouse.y - this.y > rangeExtraLarge || mouse.y - this.y < -rangeExtraLarge && $('#tm-circles:hover').length != 0) {
              this.color = "#111111";
            } else if (mouse.x - this.x > rangeLarge || mouse.x - this.x < -rangeLarge || mouse.y - this.y > rangeLarge || mouse.y - this.y < -rangeLarge) {
              this.color = "#222222";
            }  else if (mouse.x - this.x > rangeMedium || mouse.x - this.x < -rangeMedium || mouse.y - this.y > rangeMedium || mouse.y - this.y < -rangeMedium) {
              this.color = "#444444";
            }   else if (mouse.x - this.x > rangeSmall || mouse.x - this.x < -rangeSmall || mouse.y - this.y > rangeSmall || mouse.y - this.y < -rangeSmall) {
              this.color = "#777777";
            }  else if (mouse.x - this.x > rangeExtraSmall || mouse.x - this.x < -rangeExtraSmall || mouse.y - this.y > rangeExtraSmall || mouse.y - this.y < -rangeExtraSmall) {
              this.color = "#aaaaaa";
            }  

//             let originalPos = this.x;
      
//           // change positions 
//             if (mouse.x - this.x > rangeLarge) {
//               while (displacement > this.x - originalPos){
//                 this.x += 1;
//               } 
//             }

            this.draw();
      
    }
}

let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        //let radius = Math.random() * 3 + 1;
      let radius = 4;
        //let x = Math.random() * (innerWidth - radius * 2) + radius;
        //let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;

      for (let j = 0; j<20; j++){
          circleArray.push(new Circle(i*55 + 45, j*55 + 45, dx, dy, radius));
      }
    }
}

//console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
  
//   canvas.addEventListener('mouseleave', function() {
//         c.clearRect(0,0, innerWidth, innerHeight);
//     for (let i = 0; i < circleArray.length; i++) {
//         circleArray[i].radius = 2;
//     }
// });
}

init();


animate();

// while(mouse.x < canvas.width && mouse.y < canvas.height){
//   animate();
// }
