//catapult settings


//ping pong properties
const A = 0.0013; //surafce against air
const Cd = 0.5;// fancy shmancy air drag constant
const p = 1.293; // density of air
const w = A*Cd*p*1/2 // everything at once as a constant to make it easier
const m = 0.0027; //mass in kg
let alpha = 3.14/4;//angle to horizontal axes
let armL = 0.17;
let accY = [];
let velY = [];
let accX = [];
let velX = [];
//Velocity before catching air
function velInitial(k, m,l){
    return Math.sqrt(l*l*k/m);
}

function plot(){
    const l = Math.sqrt(armL*armL*2-2*armL*armL*Math.cos(2*alpha))
    Vx = velInitial(9*3,0.01,l)*Math.cos(alpha)
    Vy = velInitial(9*3 ,0.01,l)*Math.sin(alpha)
    // console.log(Vy,w*Vy*Vy)
    Ay = (-m*9.8-w*Vy*Vy)/m;
    Ax = -w*(Vx)*(Vx)/m;
    Dy =1/(-Ay*3)*Vy*Vy;

    x = 0;
    y=0.01;
    t = 0;
    step = 0.01;
    accY = []
    velY = []
    accX = []
    velX = []
    time = []
    while(y >0){
        y+=step*Vy;
        Vy+=step*Ay;
        x+=step*Vx;
        Vx+=step*Ax;
        Ay = (-m*9.8-w*Vy*Vy)/m;
        Ax = -w*(Vx)*(Vx)/m;
        t+=step;
        t = Math.round(t*100)/100
        if(t/0.01%5==0){
            accY.push(Ay);
            velY.push(Vy);
            accX.push(Ax);
            velX.push(Vx);
            time.push(t)
        }
        console.log(t)

    }
}
plot();
console.log(accY)
let aChart = new Chart("Ay", {
    type: "line",
    data: {
        labels:time,
      datasets: [{
        pointRadius: 2,
        backgroundColor:"#641220",
        borderColor: "#e01e37",
        data: accY,
        fill:false,
        label:"y",
        color:"#102b3f"
      },
      {pointRadius: 2,
        backgroundColor:"#7400b8",
        borderColor: "#5e60ce",
        data: accX,
        label:"x",
        fill:false,
        color:"#102b3f"
      }
    ],
    },
    options: {
        title: {
                display: true,
                text: 'Acceleration',
                position:"top",
                align:'end',
                
        },
        customCanvasBackgroundColor: {
            color: '#e2cfea',
            
        },
        scales:{
            x:{
                text:"time"
            }
        }
        
    }
  });
const armLInput = document.getElementById("arm-length");
armLInput.onchange = (e)=>{
    armL = e.srcElement.value;
    plot();
    console.log(aChart.data.datasets[0].data)
    aChart.data.datasets[0].data.splice(0,aChart.data.datasets[0].data.length)
    aChart.data.datasets[0].data = accY;
}