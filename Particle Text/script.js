CanvasRenderingContext2D.prototype.setFontSize = function (size){
    let temp = this.font.split(' ');
    temp[0] = size + 'px';
    this.font = temp.join(' ');
    return this.font
}

CanvasRenderingContext2D.prototype.wrapText = function(text){
    text = text.split(' ')
    let lines = [];
    let word = text[0];

    for(let i=1; i<text.length; i++){
        if(this.measureText(word + ' ' + text[i]).width > this.canvas.width){
            lines.push(word);
            word = text[i];
        } else word += " " + text[i];
    } lines.push(word);

    return lines;
}

CanvasRenderingContext2D.prototype.drawText = function(lines, x, y){
    let {width, height} = this.canvas;
    x = x || width/2;
    y = y || height/2;

    lines = this.wrapText(lines);

    let size = this.font.split(' ')[0].replace('px', '');

    for(let i=0; i<lines.length; i++){
        this.fillText(lines[i], x, y - size*(lines.length-1)/2 + i*size);
    }
}

CanvasRenderingContext2D.prototype.drawTextOutline = function(lines, x, y){
    let {width, height} = this.canvas;
    x = x || width/2;
    y = y || height/2;

    lines = this.wrapText(lines);

    console.log(lines)
    let size = this.font.split(' ')[0].replace('px', '');

    for(let i=0; i<lines.length; i++){
        this.strokeText(lines[i], x, y - size*(lines.length-1)/2 + i*size);
    }
}



const {innerWidth: canvasWidth, innerHeight: canvasHeight} = window;

const input = document.getElementById('input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.backgroundColor = 'black';

const particleColor = [255,255,255,1];
const particleSize = 2;



let particles = []
let text = 'Mustak';
let size = 200;
let particleGap = 3;
let mouseX = 0;
let mouseY = 0



function init(){
    ctx.clearRect(0,0,canvasWidth, canvasHeight);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.font = '20vw sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4
    ctx.drawText(text)
    ctx.drawTextOutline(text)
    
    let {data} = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
    
    
    
    particles = [];
    
    for(let i=0; i<canvasHeight; i += particleSize + particleGap){
        for(let j=0; j<canvasWidth; j += particleSize + particleGap){
            let index = 4*(i*canvasWidth + j);
            let [r,g,b] = [data[index], data[index+1], data[index+2]];
            if(!(r && g && b)) continue;
    
            particles.push(new Particle(j, i, particleSize, particleColor))
        }
    }
} init();


function animation(){
    requestAnimationFrame(animation);

    ctx.clearRect(0,0,canvasWidth, canvasHeight)


    for(let p of particles){
        p.show(ctx);
        p.update(canvasWidth, canvasHeight, mouseX, mouseY, 200, 10)
    }

} requestAnimationFrame(animation);




window.addEventListener('mousemove',  (e) => {
    mouseX = e.x;
    mouseY = e.y;
});

input.addEventListener('keyup', (e) => {
    text = e.target.value;
    console.log(text)
    init()
})

