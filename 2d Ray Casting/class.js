class Ray{
    constructor(x, y, viewArea=45){
        this.x = x;
        this.y = y;
        this.viewArea = viewArea;
        this.numberOfRays = viewArea;
        this.viewAngle = 90;
        this.speed = 4;
        this.maxDistance = 10000;
        this.walls = []
        this.creatRays()
    }

    show(ctx){
        for(let [x, y, m] of this.rays){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(m*x + this.x, m*y + this.y);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        for(let wall of this.walls){
            ctx.beginPath();
            ctx.moveTo(wall[0], wall[1]);
            ctx.lineTo(wall[2], wall[3]);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2, true);
        ctx.fillStyle = 'white';
        ctx.fill();

        this.creatRays()
    }

    look(){
        let pointDis = [];

        for(let i = 0; i<this.rays.length; i++){
            let [x, y] = this.rays[i];
            let minDis = this.maxDistance;
            let ray = [this.x, this.y, minDis*x + this.x, minDis*y + this.y];

            for(let wall of this.walls){
                let point = this.findLineIntersect(ray, wall)
                if(!point) continue;
                if(!this.isPointOnLine(wall, point)) continue;
                if(!this.isPointOnLine(ray, point)) continue;
                
                let dis = this.getDistance(this.x, this.y, ...point);

                if(dis < minDis) minDis = dis;
            }
            
            this.rays[i][2] = minDis;
            pointDis.push(minDis);
        }

        return pointDis
    }
    
    creatRays(){
        this.rays = [];
        let start = this.getLowAngle();
        let end = this.getHighAngle();
        let step = this.viewArea/this.numberOfRays;
        for(let i=start; i<=end; i+=step){
            let angle = Math.PI*i/180;
            let x = Math.cos(angle);
            let y = -Math.sin(angle);
            this.rays.push([x, y, this.maxDistance]);
        }
    }

    getLowAngle(){ return this.viewAngle - Math.floor(this.viewArea/2); }
    getHighAngle(){ return this.viewAngle + Math.floor(this.viewArea/2); }

    getLineEquation(x1, y1, x2, y2){
        let a = (y1 - y2);
        let b = (x2 - x1);
        let c = (x1*y2 - x2*y1)
        return [a, b, c]
    }


    findLineIntersect(l1, l2){
        let [a1, b1, c1] = this.getLineEquation(...l1)
        let [a2, b2, c2] = this.getLineEquation(...l2)
        
        let m = a1*b2 - a2*b1;
        if(m == 0) return null;
        
        c1 = -c1; 
        c2 = -c2;

        let mx = c1*b2 - c2*b1;
        let my = a1*c2 - a2*c1;
        return [mx/m, my/m];
    }

    isPointOnLine(line, point, error=2){
        let ac = this.getDistance(...line);
        let ab = this.getDistance(...point, line[0], line[1]);
        let bc = this.getDistance(...point, line[2], line[3]);
        return Math.abs(ac - (ab + bc)) < error;
    }

    getDistance(x1, y1, x2, y2){
        return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    }

    getRayUnitVec(){ return {x: Math.cos(this.viewAngle*Math.PI/180), y: -Math.sin(this.viewAngle*Math.PI/180)} }


    lookLeft(){ this.viewAngle += this.speed; }
    lookRight(){ this.viewAngle -= this.speed; }
    
    moveForword(){
        let {x, y} = this.getRayUnitVec()
        this.x += x*this.speed; 
        this.y += y*this.speed; 
    }

    moveBack(){
        let {x, y} = this.getRayUnitVec() 
        this.x -= x*this.speed; 
        this.y -= y*this.speed; 
    }
   
    moveLeft(){
        let angle = (this.viewAngle + 90)*Math.PI/180;
        this.x += Math.cos(angle)*this.speed; 
        this.y += -Math.sin(angle)*this.speed; 
    }
    
    moveRight(){
        let angle = (this.viewAngle - 90)*Math.PI/180;
        this.x += Math.cos(angle)*this.speed; 
        this.y += -Math.sin(angle)*this.speed; 
    }

}