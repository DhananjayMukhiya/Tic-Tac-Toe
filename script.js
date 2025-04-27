const gameInfo = document.querySelector(".game-info"); //text hai
const boxes = document.querySelectorAll(".box"); //sara box hai
const newGameBtn = document.querySelector(".btn"); //new btn hai

const fireworks = document.querySelector(".fireworks"); //cracker ka video hai

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//lets create a funtion to initialise the game
initGame();

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI par empaty bhi karna padega boxes ko
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });

    newGameBtn.classList.remove("active");
    fireworks.classList.remove("active");

    gameInfo.innerText = `Current player - ${currentPlayer}`;

}

function swapTurn() {
    console.log("swap turn ho gaya!");
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    //UI Update
    gameInfo.innerText = `Current player - ${currentPlayer}`;
    console.log("ab current player ye hai : ", currentPlayer);
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    //visible new game button and winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });
        fireworks.classList.add("active");
        fireworks.play();
        newGameBtn.classList.add("active");

        newGameBtn.style.pointerEvents = "all";
    }

    //let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })

    //board is filled, game is TIE
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jit to nahi gaya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})


newGameBtn.addEventListener('click', initGame);