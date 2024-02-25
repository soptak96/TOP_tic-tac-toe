
const GameBoard = (function (){
    const board = ["","","","","","","","",""];
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [1, 4, 7],
        [0, 3, 6],
        [2, 5, 8]
    ];

    const getBoard = () => board;

    const render = () => {
        let cellHtml = ""; 
        

    }

    // const setFeild = (num, player){

    // }

    const printBoard = () => {
        // const boardWithValues = board.map(cell => cell);
        // console.log(boardWithValues);   
        console.table(board)
    };


    return {printBoard, getBoard, render, board, winningCondition}
    
})();


GameBoard.render();




const Player =  (function() {
    let currentPlayer = "X";

    const getActivePlayer = () => currentPlayer;

    const setActivePlayer = (player) => currentPlayer = player; 

    let player = []; 
    
    function changePlayer() {
        console.log(currentPlayer);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // getActivePlayer();
    }
    return {changePlayer, getActivePlayer, setActivePlayer}

})()

const Game = (() => {
    let running = false;
    let roundWon = false;
    const modal = document.querySelector("#modal")
    const modalTxt = document.querySelector("#modal p")
    
    const playRound = () => {
        running = true;
        // const yourChoice = prompt("choose your cell?",)
    }

    const restartGame = () =>{
        Player.setActivePlayer("X");
        GameBoard.board = new Array(9).fill("");
        displayControl.cells.forEach(cell => 
        cell.innerHTML = "")
        roundWon = false;
    };

    const updateCell = (cell, index) => {
        GameBoard.board[index] = Player.getActivePlayer();
        cell.innerHTML = `<div class = "sign">${Player.getActivePlayer()}</div>`;
    } 

    const checkWinner = () => {
        for(let i = 0; i < GameBoard.winningCondition.length; i++){
            const condition = GameBoard.winningCondition[i];
            const cellA = GameBoard.board[condition[0]];
            const cellB = GameBoard.board[condition[1]];
            const cellC = GameBoard.board[condition[2]];

            if(cellA == "" || cellB == "" || cellC == ""){
                continue
            }
            if (cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }
        if(roundWon){
            modal.showModal();
            running = false;
            modalTxt.textContent = `${Player.getActivePlayer()} Won the game!`
            
        }
        else if(!GameBoard.board.includes("")){
            modalTxt.textContent = `The Game is Draw!`
            running = false;
            modal.showModal();
        }
    }

    
    return{playRound, restartGame, updateCell, checkWinner}
})()


const displayControl = (function(){
    
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.querySelector("#restart");
    const playAgainBtn = document.querySelector("#playAgain")

    const cellClicked = () => {
        cells.forEach(cell => cell.addEventListener("click", (e) => {
            console.log(`${cell.dataset.index} is pressed`);
                        
            const cellIndex = cell.dataset.index;   

            if(GameBoard.board[cellIndex] != ""){
                return
            }
            Game.updateCell(cell, cellIndex);
            Game.checkWinner();
            
            Player.changePlayer();

            playAgainBtn.addEventListener("click", () => {
                Game.restartGame();
                modal.close()
            })
            
            
          }
        ) )
        
    }
    restartBtn.addEventListener("click", Game.restartGame);
    return {cellClicked , cells}

}
)()


displayControl.cellClicked();

Game.playRound()
