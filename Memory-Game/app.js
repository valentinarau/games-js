document.addEventListener('DOMContentLoaded', () => {

// card options
const cardArray = [
{
    name:'hello-kitty',
    img:'images/hello-kitty.png'
},
{
    name:'hello-kitty',
    img:'images/hello-kitty.png'
},
{
    name:'frutilla',
    img:'images/frutilla.png'
},
{
    name:'frutilla',
    img:'images/frutilla.png'
},
{
    name:'goth',
    img:'images/goth.png'
},
{
    name:'goth',
    img:'images/goth.png'
},
{
    name:'peach',
    img:'images/peach.png'
},
{
    name:'peach',
    img:'images/peach.png'
},
{
    name:'my-melody',
    img:'images/my-melody.png'
},
{
    name:'my-melody',
    img:'images/my-melody.png'
},
{
    name:'yunoka',
    img:'images/yunoka.png'
},
{
    name:'yunoka',
    img:'images/yunoka.png'
}
]

cardArray.sort(() => 0.5 - Math.random())    // refresh the game with new card positions

// devuelve el (selector) del document

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
var cardsChosen = []
var cardsChosenId = []
var cardsWon = []

// create board

function createBoard(){

    // loopea creando un elemento img para cada carta
    for(let i = 0 ; i < cardArray.length ; i ++){     
        var card = document.createElement('img')    // crea img para cada carta
        card.setAttribute('src','images/fondo.png') // toma dos parametros, primero el nombre de la propiedad a setear y el valor de dicha propiedad
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipcard) // lo que hace es fijarse si la carta fue cliqueada, e invoca un flipcard
        grid.appendChild(card) // Agrega un nuevo nodo al final de la lista de un elemento hijo de un elemento padre especificado.
    }
}

// check for matches
function checkForMatch() {
    var cards = document.querySelectorAll('img')  // pick up all the images that weve created in the first function using query selector
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if(cardsChosen[0] === cardsChosen[1]){
        alert('You found a match')
        cards[optionOneId].setAttribute('src','images/white.png')
        cards[optionTwoId].setAttribute('src','images/white.png')
        cards[optionOneId].removeEventListener('click', flipcard)
        cards[optionTwoId].removeEventListener('click', flipcard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src','images/fondo.png')
        cards[optionTwoId].setAttribute('src','images/fondo.png')
        alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length// convert to score, display. by picking out span element with id result (from HTML), we can do this using text content
    if (cardsWon.length === cardArray.length/2){ // si la cantidad de cartas ganadas es igual a la mitad del array, ganamos
        resultDisplay.textContent = 'Congratulations! You found them all'
    }}

// flipcard
function flipcard(){
    var cardId = this.getAttribute('data-id') // En general, el valor de this está determinado por cómo se invoca a la función. No puede ser establecida mediante una asignación en tiempo de ejecución, y puede ser diferente cada vez que la función es invocada.
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2){  // cuando sea 2 las cartas elegidas, llama  checkForMatch
        setTimeout(checkForMatch,500) // tarda 500 ms en hacerlo
    }
}

createBoard()
})