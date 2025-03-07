//catapult settings

const l = 0.2*Math.sqrt(2)//length if alpha is 45 degrees
//Velocity before catching air
function velInitial(k, m){
    return Math.sqrt(l*l*k/m);
}

//ping pong properties
const A = 0.0013 //surafce against air
const Cd = 0.5// fancy shmancy air drag constant
const p = 1.293 // density of air
const w = A*Cd*p*1/2 // everything at once as a constant to make it easier
const m = 0.0027 //mass in kg

//angle to horizontal axes
alpha = 3.14/4;

Vx = velInitial(9*3,0.01)*Math.cos(alpha)
Vy = velInitial(9*3 ,0.01)*Math.sin(alpha)
// console.log(Vy,w*Vy*Vy)
Ay = (-m*9.8-w*Vy*Vy)/m;
Ax = -w*(Vx)*(Vx)/m;
// Dy =1/(-Ay*3)*Vy*Vy;
// console.log("The Highst Point is at: "+Dy);

x = 0;
y=0.01;
t = 0;
step = 0.01;
while(y >0){
    y+=step*Vy;
    Vy+=step*Ay;
    x+=step*Vx;
    Vx+=step*Ax;
    Ay = (-m*9.8-w*Vy*Vy)/m;
    Ax = -w*(Vx)*(Vx)/m;
    t+=step;
}
console.log(x,y,t)