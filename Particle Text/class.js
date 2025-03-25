
class Particle{
    #color = [0,0,0,1];

    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.#color = color
        this.origin = {x, y};
        this.originF = 2;
        this.maxNetDis = 5*r
    }

    show(ctx){

        if(!ctx) return;
        
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.#color.join(', ')})`;
        ctx.fillRect(this.x - this.r, this.y - this.r, 2*this.r, 2*this.r)
        ctx.fill();

    }

    update(w, h, mouseX, mouseY, mouseR=50, mouseF=10){

        if(this.getDistance(this.origin) > this.originF){
            if(this.x > this.origin.x) this.x -= this.originF;
            else if(this.x < this.origin.x) this.x += this.originF;
            
            if(this.y > this.origin.y) this.y -= this.originF;
            else if(this.y < this.origin.y) this.y += this.originF;
        } else {
            this.x = this.origin.x;
            this.y = this.origin.y
        }
        
        if(!(mouseX && mouseY)) return;

        let dis = this.getDistance({x: mouseX, y: mouseY})
        if(dis > mouseR) return;

        mouseF *= 1-dis/mouseR;

        if(this.x < mouseX && this.x - mouseF - this.r > 0) this.x -= mouseF;
        else if(this.x > mouseX && this.x + mouseF + this.r < w ) this.x += mouseF;

        if(this.y < mouseY && this.y - mouseF - this.r > 0) this.y -= mouseF;
        else if(this.y > mouseY && this.y + mouseF + this.r < h ) this.y += mouseF;



    }

    
    getDistance(other){
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        )
    }
    
    getColor(){return this.#color;}

}
