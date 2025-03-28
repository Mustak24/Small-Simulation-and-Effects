const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const sandBoxSize = 5;
const sandSize = 2;
const rows = 160;
const cols = 160;

let isMouseDown = false;

canvas.width = sandSize*cols;
canvas.height = sandSize*rows;

let sand = Array.from({length: rows}, _=> Array.from({length: cols}, _=> false));

let bottom = Array.from({length: cols}, _=> rows);




function animation(){
    requestAnimationFrame(animation)
    for(let i=0; i<bottom.length; i++){
        ctx.clearRect(i*sandSize, 0, sandSize, bottom[i]*sandSize);
    }

    draw();
    update();
} animation();



function draw(){
    
    for(let x=0; x<cols; x++){
        for(let y=0; y<bottom[x]; y++){
            if(!sand[y][x]) continue;
        
            ctx.beginPath();
            ctx.fillRect(x*sandSize, y*sandSize, sandSize, sandSize);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
}




function update(){

    for(let x=0; x<cols; x++){
        let y = bottom[x] - 1;
        while(y && sand[y][x]) y--;
        bottom[x] = sand[bottom[x] -1][x] ? y+2 : y + 1;
    }

    for(let x=0; x<cols; x++){
        for(let y=bottom[x]-1; y>0; y--){
            
            if(!sand[y][x] && sand[y-1][x]){
                sand[y][x] = true;
                sand[y-1][x] = false;
            }
            
            
            if(!sand[y][x]) continue;
            
            if(x == 0 || x == cols-1 || y == rows-1) continue;
            if(!sand[y+1][x]) continue;

            

            let [left, right] = [sand[y+1][x-1], sand[y+1][x+1]]

            if(left && right) continue;

            sand[y][x] = false
            
            if(left) sand[y+1][x+1] = true;
            else if(right) sand[y+1][x-1] = true;
            else if(Math.random() < .5) sand[y+1][x+1] = true;
            else sand[y+1][x-1] = true;

        }
    }
}







canvas.addEventListener('mousemove', (e) => {
    let {offsetX, offsetY} = e;
    let x = Math.floor(offsetX/sandSize)
    let y = Math.floor(offsetY/sandSize)

    if(-1 < x && x < cols && -1 < y && y < rows) {
        for(let i=y - sandBoxSize; i<=y + sandBoxSize; i++){
            if(i < 0 || i >= rows) continue;
            for(let j=x - sandBoxSize ; j<=x + sandBoxSize; j++){
                if(j < 0 || j >= cols) continue;
                sand[i][j] = !isMouseDown;
            }
        }
    }
});

window.addEventListener('mousedown', (e) => {
    isMouseDown = true;
})
window.addEventListener('mouseup', (e) => {
    isMouseDown = false;
})