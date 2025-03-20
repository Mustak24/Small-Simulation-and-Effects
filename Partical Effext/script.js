const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'black';

const particals = [];
const particalRedius = 5;
const particalColor = [255,255,255,1];
const numberOfParticals = window.innerWidth * window.innerHeight / 10000;
const maxNetDis = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))/(4*particalRedius);

for(let i=0; i<numberOfParticals; i++){
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    particals.push(new Partical(x, y, particalRedius, particalColor, canvas))
}


function createNetwork(particals){

    for(let i=0; i<particals.length; i++){
        for(let j=i+1; j<particals.length; j++){
            let dis = particals[i].getDistance(particals[j]);
            
            if(dis < 2*particals[i].r)
                [particals[i].v, particals[j].v] = [particals[j].v, particals[i].v]
            
            if(dis > maxNetDis) continue;

            let opacity = (1 - dis/maxNetDis);
            let color = [...particals[i].getColor()];
            color[3] = opacity;

            ctx.beginPath();
            ctx.moveTo(particals[i].x, particals[i].y);
            ctx.lineTo(particals[j].x, particals[j].y);
            ctx.strokeStyle = `rgb(${color.join(', ')})`;
            ctx.lineWidth = 2
            ctx.stroke();
        }
    }
}


function animation(){
    requestAnimationFrame(animation);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createNetwork(particals)

    for(let partical of particals){
        partical.show(ctx)
        partical.update(canvas.width, canvas.height)
    }

} requestAnimationFrame(animation);


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

