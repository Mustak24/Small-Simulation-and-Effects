
class Partical{
    #isUpdate = true;
    #color = [0,0,0,1];

    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.#color = color
        this.v = [Math.random()*2 - 1, Math.random()*2 - 1];
    }

    show(ctx){
        if(!this.#isUpdate || !ctx) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.fillStyle = `rgb(${this.#color.join(', ')})`;
        ctx.fill();

        this.#isUpdate = false;
    }

    update(w, h){
        if(!(0 < this.x && this.x < w)) this.v[0] *= -1;
        this.x += this.v[0];

        if(!(0 < this.y && this.y < h)) this.v[1] *= -1;    
        this.y += this.v[1];

        this.#isUpdate = true;
    }

    
    getDistance(other){
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        )
    }
    
    getColor(){return this.#color;}

}
