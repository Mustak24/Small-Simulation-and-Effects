const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');

canvas1.width = 400;
canvas1.height = 400;

canvas2.width = 400;
canvas2.height = 400;

const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const ray = new Ray(canvas1.width/2, canvas1.height/2, 30);
ray.numberOfRays = 400
ray.viewArea = 40
const walls = []

for(let i=0; i<5; i++){ 
    let [x1, y1] = [Math.random()*canvas1.width, Math.random()*canvas1.height]
    let [x2, y2] = [Math.random()*canvas1.width, Math.random()*canvas1.height]
    walls.push([x1, y1, x2, y2]);
}

ray.walls = walls;

function animate(){
    requestAnimationFrame(animate);
    ctx1.clearRect(0,0,canvas1.width, canvas1.height);
    ctx2.clearRect(0,0,canvas2.width, canvas2.height);
    let dis = ray.look(ctx1);
    ray.show(ctx1);
    let w = canvas2.width / ray.rays.length;
    
    
    for(let i=0; i<dis.length; i++){
        
        let d = ray.maxDistance/dis[dis.length - i - 1];
        let x = i*w;
        let y = (canvas2.height - d)/2;
        let o = (1 - 20/d);
        let h = Math.max(0, canvas2.height - d)/2

        ctx2.beginPath();
        ctx2.fillStyle = 'skyblue';
        ctx2.fillRect(x, 0, w, h);
        ctx1.fill();
        
        ctx2.beginPath()
        ctx2.fillStyle = `rgb(255,255,255,${o})`;
        ctx2.fillRect(x, y, w, d)
        ctx2.fill()
        
        ctx2.beginPath();
        ctx2.fillStyle = 'green';   
        ctx2.fillRect(x, d+h, w, h);
        ctx1.fill()
    }
}
animate()



window.addEventListener('keypress', (e) => {
    switch (e.key){
        case'w': ray.moveForword(); break;
        case's': ray.moveBack(); break;
        case'a': ray.moveLeft(); break;
        case'd': ray.moveRight(); break;
    }
});


let oldX = 0;
window.addEventListener('mousemove', (e) => {
    if(e.clientX > oldX) ray.lookRight()
    else ray.lookLeft();
    oldX = e.clientX;  
})