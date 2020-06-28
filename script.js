const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text')
let circleTurn

startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    //to get the hover effect on the first turn and thus begin the game
    circleTurn = false //since this is flase the first turn whill belong to "x"
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)//removing all x when restarting the game
        cell.classList.remove(CIRCLE_CLASS)//removing all circles when restarting the game
        cell.removeEventListener('click', handleClick)//to restart the game and set the click counter to zero
        cell.addEventListener('click', handleClick, {once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true })
})

function handleClick(e){
  const cell =e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS   //turn determination
  placeMark(cell, currentClass)
  if (checkWin(currentClass)){
   endGame(false)    
  }
  else if(isDraw()) {
      endGame(true)
  } //check if there is a winner or a draw if not then swap the turns to continue the game
  else {
    swapTurns()  
    setBoardHoverClass()
  }
}
function endGame(draw) {
    //to check if it is a draw 
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    // function to make sure every cell has an element and there is no win situation
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })

}

function placeMark(cell, currentClass) {
    // placing the mark
    cell.classList.add(currentClass)
}
function swapTurns() {
    //swapping turns
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    //applying class to enabaling the hovering effect while making a choice
    //has to be done after the turn is swapped as it is required to know who the current player is
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS) //to make sure there is no class on it currently
    //now adding class according to the turn
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass) {
    //to check winnning combinations
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
    
}