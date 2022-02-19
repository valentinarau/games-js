document.addEventListener('DOMContentLoaded',()=>{
const melody = document.querySelector('.melody');
const grid = document.querySelector('.grid');
const alert = document.getElementById('alert');
const audio = document.getElementById('audio');


let jumping = false;
let gravity = 0.9;
let gameOver = false;

function control(e) {
    if(e.keyCode === 32){
        if (!jumping) {
            jumping = true;
            jump();
            audio.play();

          }
    }

}
let position = 0;
document.addEventListener('keyup',control)
function jump() {
    count = 0;
    let timerId = setInterval(function (){
        //down
        if (count === 15){
            clearInterval(timerId);
            let downTimerId = setInterval(function(){
                if(count   === 0) {
                    clearInterval(downTimerId);
                    jumping = false;
                }
                else {
                    position -= 5;
                    count --;
                    position = position*gravity;
                    melody.style.bottom = position + "px";
                }
            },20)
        }
        //up
        position += 25;
        count ++;
        position = position*gravity;
        melody.style.bottom = position + "px"; 
        },20)
}

function generateKuromis() {
    let randomTime = 1000 + Math.random() * 4000;
    let kuromiPosition = 2000;
    const kuromi = document.createElement('div');
    kuromi.classList.add('kuromi');
    grid.appendChild(kuromi);  // makes an append of the kuromi into the grid
    kuromi.style.left = kuromiPosition + "px";
    generateFrutillita();
    let timerId = setInterval(function() {
        if (kuromiPosition > 0 && kuromiPosition < 20 && position <= 100) {
            clearInterval(timerId);
            gameOver = true;            
            alert.innerHTML = 'Game Over';
            //remove all children
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }
            }
        kuromiPosition -= 10;
        kuromi.style.left = kuromiPosition + "px";
        },20)
        if (!gameOver) setTimeout(generateKuromis, randomTime);
}

function generateFrutillita(){
    let frutillitaPosition = 1000 + Math.random()*4000;
    const frutillita = document.createElement('div');
    frutillita.classList.add('frutillita');
    grid.appendChild(frutillita);  // makes an append of the frutillita into the grid
    frutillita.style.left = frutillitaPosition + "px";
    let timerId = setInterval(function() {
        if (frutillitaPosition > 0 && frutillitaPosition < 30 && position >= 50) {
            //remove all children
            grid.removeChild(frutillita);
            }
        frutillitaPosition -= 10;
        frutillita.style.left = frutillitaPosition + "px";
        },20)
}
generateFrutillita();
generateKuromis()

})