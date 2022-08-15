//customize the body element
const body=document.querySelector("body");
body.style.backgroundColor="black";

let time=60*60;

//create and customize a input[type="range"] element
const inputRange=document.createElement("input");
inputRange.type="range";
inputRange.width="10px";
inputRange.min="0";
inputRange.max="3600";
inputRange.setAttribute("style", "width:100%;");  
inputRange.value=time;

//create and customize a h1 element
const welcomeTheGame= document.createElement("h1");
welcomeTheGame.innerText="Test Your Reaction Speed !";
welcomeTheGame.style.color="green";
welcomeTheGame.style.fontSize="50px";
welcomeTheGame.style.textAlign="center";
document.body.append(welcomeTheGame);
document.body.append(inputRange);

var word="C";
var wordP="A";
var place=0;
var places=[
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""]
];

//create and customize the canvas element
const canvas=document.createElement("canvas");
const context=canvas.getContext("2d");
canvas.style.width="100%";
canvas.style.height="70vh";
canvas.style.backgroundColor="black";
const canvasW=canvas.width;
const canvasH=canvas.height;
context.strokeStyle="white";
context.lineWidth=1;
context.fillStyle="green";
context.textAlign="center";


let intervalId;
let intervalIdO;
let gameStarted=false;
let timeO=60*3;

//create and customize a input[type="range"] element
const inputRangeO=document.createElement("input");
inputRangeO.type="range";
inputRangeO.min="0";
inputRangeO.max="180";
inputRangeO.setAttribute("style", "width:100%;");
inputRangeO.value=timeO;

//place letters
function fillTheBlanks() { 
    context.beginPath();

    for (let i = 0; i < 11; i++) {
        context.moveTo((canvasW/10)*i,0);
        context.lineTo((canvasW/10)*i,canvasH);
    }
    for (let i = 0; i < 11; i++) {
        context.moveTo(0,(canvasH/10)*i);
        context.lineTo(canvasW,(canvasH/10)*i);
    }

    let rand=Math.floor(Math.random()*100);
    let k=0;
    let l=0;

    for (let i = 0; i < 300; i+=30) {
        for (let j = 0; j < 150; j+=15) {
            if (place==rand) {
                wordP=word;
                context.fillText(wordP,(canvasW/20)+i,(canvasH*2/(canvasH*2/10))+j);
            } 
            else {
                wordP="A";
                context.fillText(wordP,(canvasW/20)+i,(canvasH*2/(canvasH*2/10))+j);
            }
            places[k][l]=wordP;
            place++;
            l++;
        }
        k++;

        l=0;

    }
    place=0;
    k=0;
    l=0;
    context.stroke();
    clearInterval(intervalIdO);
    intervalIdO=setInterval(UpdateTimeO,1);
}

const xRef=0.1;
const yRef=0.1;
const x=0.1;
const y=0.1;

var point=0;
var sec=60;

//get the click and check the mouse position
canvas.addEventListener("click",(e)=>{
    if (gameStarted==true) {  
        let find=false;
        const rect = canvas.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if ((e.clientX - rect.left) / (rect.right - rect.left)<=x+(xRef*i) && 
                (e.clientY - rect.top) / (rect.bottom - rect.top)<=y+(yRef*j)) {
                    if (places[i][j]==word) {
                        sec--;
                        point+=10;
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        timeO=sec*3;
                        inputRangeO.max=timeO;
                        inputRangeO.value=timeO;
                        clearInterval(intervalIdO);
                        fillTheBlanks();
                    }
                    else{
                        if (point>0) {
                            point-=5;
                        }
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        timeO=sec*3;
                        inputRangeO.max=timeO;
                        inputRangeO.value=timeO;

                        clearInterval(intervalIdO);
                        fillTheBlanks();
                    }
                    find=true;
                    break;
                }
            }
            if (find==true) {
                break;
            }
        }
    }
});
document.body.append(canvas);
document.body.append(inputRangeO);

//create and customize a button element
const startTheGame=document.createElement("button");
startTheGame.innerText="START";
startTheGame.style.backgroundColor="blue";
startTheGame.style.color="white";
startTheGame.style.fontSize="50px";
startTheGame.style.width="100vw";
startTheGame.style.height="10vh";
startTheGame.style.border="none";
startTheGame.style.borderRadius="12px";
startTheGame.style.cursor="pointer";

//create and customize a button element
const reStartTheGame=document.createElement("button");
reStartTheGame.innerText="RESTART";
reStartTheGame.style.backgroundColor="blue";
reStartTheGame.style.color="white";
reStartTheGame.style.fontSize="50px";
reStartTheGame.style.width="100vw";
reStartTheGame.style.height="10vh";
reStartTheGame.style.border="none";
reStartTheGame.style.borderRadius="12px";
reStartTheGame.style.cursor="pointer";
reStartTheGame.style.visibility="hidden";

//create and customize a button element
const quitTheGame=document.createElement("button");
quitTheGame.innerText="QUIT";
quitTheGame.style.backgroundColor="blue";
quitTheGame.style.color="white";
quitTheGame.style.fontSize="50px";
quitTheGame.style.width="100vw";
quitTheGame.style.height="10vh";
quitTheGame.style.border="none";
quitTheGame.style.borderRadius="12px";
quitTheGame.style.cursor="pointer";
quitTheGame.style.visibility="visible";

//start the game
startTheGame.addEventListener("click",()=>{
    intervalId=setInterval(UpdateTime,1);
    intervalIdO=setInterval(UpdateTimeO,1);


    context.clearRect(0, 0, canvas.width, canvas.height);
    fillTheBlanks();
    startTheGame.style.visibility="hidden";
    welcomeTheGame.style.visibility="hidden";
    gameStarted=true;
});
//restart the game
reStartTheGame.addEventListener("click",()=>{

    sec=60;
    point=0;
    time=sec*sec;
    timeO=sec*3;
    inputRangeO.max=timeO;
    inputRangeO.value=timeO;
    timeO=sec*3;
    inputRangeO.max=timeO;
    inputRangeO.value=timeO;
    inputRange.value=time;



    intervalId=setInterval(UpdateTime,1);
    intervalIdO=setInterval(UpdateTimeO,1);


    context.clearRect(0, 0, canvas.width, canvas.height);
    fillTheBlanks();
    startTheGame.style.visibility="hidden";
    reStartTheGame.style.visibility="hidden";
    welcomeTheGame.style.visibility="hidden";
    gameStarted=true;
});
//quit the game
quitTheGame.addEventListener("click",()=>{
    gameStarted=false;
    window.close();
});

//add elements
document.body.append(startTheGame);
document.body.append(reStartTheGame);
document.body.append(quitTheGame);

//changing time
function UpdateTimeO(){
    timeO--;
    inputRangeO.value=timeO;
    if (timeO<=0) {
        clearInterval(intervalIdO);
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        inputRangeO.value=sec*3;
        timeO=sec*3;
        inputRangeO.max=inputRangeO.value;
        fillTheBlanks();
    }
}
//full time
function UpdateTime(){
    time--;
    inputRange.value=time;
    if (time<=0) {
        clearInterval(intervalId);
        clearInterval(intervalIdO);
        window.alert("Game Over!");
        welcomeTheGame.innerText="Game Over! Your point is : "+point;
        reStartTheGame.style.visibility="visible";
        quitTheGame.style.visibility="visible";
        welcomeTheGame.style.visibility="visible";
        gameStarted=false;
    }
}

