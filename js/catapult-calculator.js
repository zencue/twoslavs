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
function velInitial(k, mass,l){
    return Math.sqrt(k*l*l/mass-2*9.8*(l));
}

function plot(){
    const l = Math.sqrt(armL*armL*2-2*armL*armL*Math.cos(2*alpha))
    console.log(l,alpha)
    console.log(velInitial(9*2,0.028,l))
    Vx = velInitial(9*2,0.01,l)*Math.cos(alpha)
    
    Vy = velInitial(9*2 ,0.01,l)*Math.sin(alpha)
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
        y = Math.round(y*100)/100
        x = Math.round(x*100)/100
        Vy = Math.round(Vy*100)/100
        Vx = Math.round(Vx*100)/100
        Ay = Math.round(Ay*100)/100
        Ax = Math.round(Ax*100)/100
        if(t/0.01%5==0){
            accY.push(Ay);
            velY.push(Vy);
            accX.push(Ax);
            velX.push(Vx);
            time.push(t)
        }

    }
}

plot();

let aChart = new Chart("accelerations", {
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
      },
      {pointRadius: 2,
        backgroundColor:"#7400b8",
        borderColor: "#5e60ce",
        data: accX,
        label:"x",
        fill:false,
        color:"#102b3f"
      }],
    },
    options:{
        title: {
            display: true,
            text: 'Acceleration',
            position:"top",
            fontSize:20
        },
        scales: {
            yAxes: [{
                gridLines:{
                    color:"#e2cfea50"
                }
            }],
            xAxes: [{
                gridLines:{
                    color:"#e2cfea50"
                },
                scaleLabel:{
                    display:true,
                    labelString:"time",
                }
            }]
        }
    }
  });
  Chart.defaults.global.defaultFontColor = "#e2cfea";

  let vChart = new Chart("velocities", {
    type: "line",
    data: {
        labels:time,
      datasets: [{
        pointRadius: 2,
        backgroundColor:"#641220",
        borderColor: "#e01e37",
        data: velY,
        fill:false,
        label:"y",
        color:"#102b3f"
      },
      {pointRadius: 2,
        backgroundColor:"#7400b8",
        borderColor: "#5e60ce",
        data: velX,
        label:"x",
        fill:false,
        color:"#102b3f"
      }
    ],
    },
    options: {
        title: {
                display: true,
                text: 'Velocity',
                position:"top",
                fontSize:20
        },
        scales: {
            
            yAxes: [{

                gridLines:{
                    color:"#e2cfea50"
                }
            }],
            xAxes: [{
                borderColor:"#e2cfea50",
                gridLines:{
                    color:"#e2cfea50"
                },
                scaleLabel:{
                    display:true,
                    labelString:"time",
                }
            }]
        }
    }
  });
const armLInput = document.getElementById("arm-length");
const armValue = document.getElementById("arm-value");
armLInput.onchange = (e)=>{
    
    armL = e.srcElement.value;
    armValue.textContent = e.srcElement.value;
    plot();
    aChart.data.datasets[0].data.splice(0,aChart.data.datasets[0].data.length)
    aChart.data.datasets[0].data = accY;
    aChart.data.datasets[1].data.splice(0,aChart.data.datasets[1].data.length)
    aChart.data.datasets[1].data = accX;

    vChart.data.datasets[0].data.splice(0,vChart.data.datasets[0].data.length)
    vChart.data.datasets[0].data = velY;
    vChart.data.datasets[1].data.splice(0,vChart.data.datasets[1].data.length)
    vChart.data.datasets[1].data = velX;
    aChart.update();
    vChart.update();
}


const angleLInput = document.getElementById("angle-length");
const angleValue = document.getElementById("angle-value");

angleLInput.onchange = (e)=>{
    
    alpha = (180-e.srcElement.value)/2*3.14/180;
    console.log(alpha)
    angleValue.textContent = e.srcElement.value;
    plot();
    aChart.data.datasets[0].data.splice(0,aChart.data.datasets[0].data.length)
    aChart.data.datasets[0].data = accY;
    aChart.data.datasets[1].data.splice(0,aChart.data.datasets[1].data.length)
    aChart.data.datasets[1].data = accX;

    vChart.data.datasets[0].data.splice(0,vChart.data.datasets[0].data.length)
    vChart.data.datasets[0].data = velY;
    vChart.data.datasets[1].data.splice(0,vChart.data.datasets[1].data.length)
    vChart.data.datasets[1].data = velX;
    aChart.update();
    vChart.update();
}