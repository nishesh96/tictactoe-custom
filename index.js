/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
var size = 3;
let turn = 'X';
var gameData = {
    token1: 'x',
    token2: 'o',
    movesPlayer: [],
    movesComp: [],
    scorePlayer: 0,
    scoreComp: 0,
    playerName: '',
}

var gameOver = false;
var turns = 0;
var arrayId = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];

var a1, a2, a3, b1, b2, b3, c1, c2, c3;


function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        // const gridValue = grid[colIdx][rowIdx];
        // if (gridValue === 1) {
        //     content = '<span class="cross">X</span>';
        // } else if (gridValue === 2) {
        //     content = '<span class="circle">O</span>';
        // }
        rowDivs = rowDivs + '<div id="' + (colIdx + 1) + "" + (rowIdx + 1) + '";  colIdx="' + rowIdx + '" rowIdx="' + colIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}



function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    // if (grid[colIdx][rowIdx] > 0) {
    //     alert("Already chosen. Try another box");
    // } else {
    var marked = $(this); // get the square that player selects
    var token1 = gameData.token1;
    var token2 = gameData.token2;

    if (marked.hasClass(token1) || marked.hasClass(token2)) {
        alert("Please choose another square!")
        return;
    }
    console.log(turns);
    if (turns % 2 === 0) {

        marked.addClass(token1);
        gameData.movesPlayer.push(this.id);
        $("#message").text("It's Computers's turn!")
        turns++;

        if (checkWin(gameData.movesPlayer, size)) {
            $("#message").text("Player wins!")
            gameOver = true;
            gameData.scorePlayer += 1;
            $("#player1 .num").text('' + gameData.scorePlayer);
            $("#player1 .name").addClass("changecolor");
            $("#player2 .name").removeClass("changecolor");
            removeClickHandlers();
        } else {
            if (turns === size ** 2) {
                $("#message").text("It's a draw!")
                gameOver = true;
                return;
            }

        }
    }
    if (turns === 1) {
        setTimeout(function () {
            compMove1();
            $("#message").text("It's " + gameData.playerName + "'s turn!");
            console.log(1);
        }, 1000);
    } else if (turns === 3) {
        setTimeout(function () {
            compMove2();
            console.log(2);
            $("#message").text("It's " + gameData.playerName + "'s turn!");
        }, 1000);
    } else if (turns === 5) {
        compMove3();
        console.log(2);
        $("#message").text("It's " + gameData.playerName + "'s turn!");
    } else if (turns === 7) {
        compMove4();
        console.log(2);
        $("#message").text("It's " + gameData.playerName + "'s turn!");
    }
    if (checkWin(gameData.movesComp, size)) {
        $("#message").text("Computer wins!");
        gameOver = true;
        gameData.scoreComp += 1;
        $("#player2 .num").text('' + gameData.scoreComp);
        $("#player2 .name").addClass("changecolor");
        $("#player1 .name").removeClass("changecolor");
        removeClickHandlers();

    } else {

        if (turns === size ** 2) {
            $("#message").text("It's a draw!")
            gameOver = true;
            // saveGame();
            return;
        }
    }
};
// Create a 2d array with diagonal values
var diagArr = function (size, booleanNum) {
    var row = [];
    var col = [];
    var diagonal = [];

    for (var i = 1; i <= size; i++) {
        i = String(i);
        row.push(i);

        if (booleanNum) {
            col.unshift(i);
        } else {
            col.push(i);
        }
    }
    for (var i = 0; i < row.length; i++) {
        diagonal.push(row[i] + col[i]);
    }
    return diagonal;
};

// to check whether it is winning diagonally
var checkDiag = function (diagonal, playerMoves) {

    for (var i = 0; i < diagonal.length; i++) {
        if (playerMoves.indexOf(diagonal[i]) === -1) {
            return false;
        }
    }
    return true;
};

// to check whether it's winning horizontally or vertically
var checkOther = function (playerMoves, size) {
    var row = [];
    var col = [];

    for (var i = 0; i < playerMoves.length; i++) {
        row.push(Number(playerMoves[i][0]));
        col.push(Number(playerMoves[i][1]));
    }

    row.sort();
    col.sort();

    if (size === 3) {
        for (var i = 0; i < row.length; i++) {
            if (row[i] === row[i + 1] && row[i] === row[i + 2]) {
                return true;
            }
        }

        for (var i = 0; i < col.length; i++) {
            if (col[i] === col[i + 1] && col[i] === col[i + 2]) {
                return true;
            }
        }
        return false;
    }

};

var checkWin = function (moves, size) {
    var diagonal1 = diagArr(GRID_LENGTH, 0);
    var diagonal2 = diagArr(GRID_LENGTH, 1);

    if (checkDiag(diagonal1, moves) || checkDiag(diagonal2, moves) || checkOther(moves, size)) {
        return true;
    }
    return false;
};

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


function removeClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick);
    }
}

var gridCheck = function (token) {
    a1 = $("#11").hasClass(token);
    a2 = $("#12").hasClass(token);
    a3 = $("#13").hasClass(token);
    b1 = $("#21").hasClass(token);
    b2 = $("#22").hasClass(token);
    b3 = $("#23").hasClass(token);
    c1 = $("#31").hasClass(token);
    c2 = $("#32").hasClass(token);
    c3 = $("#33").hasClass(token);
    return [a1, a2, a3, b1, b2, b3, c1, c2, c3];
};


function restart() {
    $("#player1 .name").removeClass("changecolor");
    $("#player2 .name").removeClass("changecolor");
    removeClickHandlers();
    addClickHandlers();
    gameData.movesPlayer = [];
    gameData.movesComp = [];
    turns = 0;
    gameOver = false;
    $(".box").removeClass(gameData.token1).removeClass(gameData.token2);
    $("#message").text("Let's play the game! " + gamePlayer.playerName + " first.")
};

function startPlay(playerName) {
    console.log("Play");
    addClickHandlers();
    $("#message").text("Let's play the game! " + playerName + " first.");
    $('.choose').hide();
    $('.input').hide();
    $('.play').hide();
    $('.restart').show();
    $('.scores').show();
}

var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function () {
    console.log($('#option:checked').val());
    gameData.playerName = $('#name').val();
    $('#player1 .name').text(gameData.playerName);
    if ($('#option:checked').val() == 'O') {
        gameData.token1 = 'O';
        gameData.token2 = 'X';
        startPlay(gameData.playerName);
    } else if ($('#option:checked').val() == 'X') {
        startPlay(gameData.playerName);
    } else if ($('#option:checked').val() == undefined)
        alert("Please select your option");
    else
        alert("Please enter Player name");
});


var restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", function () {
    restart();
}); 
initializeGrid();
renderMainGrid();


var compMove1 = function () {

    gridCheck(gameData.token1);
    if (!b2) {
        $("#22").addClass(gameData.token2);
        gameData.movesComp.push("22");
        turns++;
    } else {
        $("#13").addClass(gameData.token2);
        gameData.movesComp.push("13");
        turns++;
    }
}; // 1st computer move




var compMove2 = function () {

    gridCheck(gameData.token1);
    if ((a1 && c3) || (a3 && c1)) {
        $("#23").addClass(gameData.token2); 
        gameData.movesComp.push("23");
        turns++;
    } else if ((a2 && c2) || (b1 && b3) || (a2 && c1) || (b1 && a3)) {
        $("#11").addClass(gameData.token2); 
        gameData.movesComp.push("11");
        turns++;
    } else if ((a3 && c2) || (b3 && c1) || (c1 && b2)) {
        $("#33").addClass(gameData.token2);
        gameData.movesComp.push("33");
        turns++;
    } else if ((a1 && c2) || (b1 && c3) || (a2 && b3) || (a2 && b1)) {
        $("#31").addClass(gameData.token2);
        gameData.movesComp.push("31");
        turns++;
    } else if ((a1 && b3) || (a2 && c3) || (b1 && c2) || (b3 && c2)) {
        $("#13").addClass(gameData.token2);
        gameData.movesComp.push("13");
        turns++;
    } else {
        var id = blockOrWin(gameData.token1);
        $("#" + id).addClass(gameData.token2);
        gameData.movesComp.push(id);
        turns++;
    }
}; // 2nd computer move

var getEmpty = function () {
    var boardX = gridCheck(gameData.token1);
    var boardO = gridCheck(gameData.token2);
    var empty = [];
    for (var i = 0; i < boardX.length; i++) {
        if (!boardX[i] && !boardO[i]) {
            return i;
        }
    }
};


var compMove3 = function () {
    var win = blockOrWin(gameData.token2);
    var block = blockOrWin(gameData.token1);

    if (win) {
        $("#" + win).addClass(gameData.token2);
        gameData.movesComp.push(win);
        turns++;
    } else if (block) {
        $("#" + block).addClass(gameData.token2);
        gameData.movesComp.push(block);
        turns++;
    } else {
        var i = getEmpty();
        var id = arrayId[i];
        $("#" + id).addClass(gameData.token2);
        gameData.movesComp.push(id);
        turns++;
    }

}; // 3rd computer move

var compMove4 = function () {
    compMove3();
}; // 4th computer move


var blockOrWin = function (token) {
    var empty = checkEmpty();
    gridCheck(token);
    if (!empty[0] && ((a2 && a3) || (b1 && c1) || (b2 && c3))) {
        return "11";
    } else if (!empty[1] && ((a1 && a3) || (b2 && c2))) {
        return "12";
    } else if (!empty[2] && ((a1 && a2) || (b3 && c3) || (b2 && c1))) {
        return "13";
    } else if (!empty[3] && ((a1 && c1) || (b2 && b3))) {
        return "21";
    } else if (!empty[5] && ((a3 && c3) || (b1 && b2))) {
        return "23";
    } else if (!empty[6] && ((c2 && c3) || (a1 && b1) || (b2 && a3))) {
        return "31";
    } else if (!empty[7] && ((a2 && b2) || (c1 && c3))) {
        return "32";
    } else if (!empty[8] && ((c1 && c2) || (a3 && b3) || (a1 && b2))) {
        return "33";
    } else {
        return false;
    }
};

var checkEmpty = function () {
    var boardX = gridCheck(gameData.token1);
    var boardO = gridCheck(gameData.token2);
    var empty = [];

    for (var i = 0; i < boardX.length; i++) {
        empty[i] = boardX[i] || boardO[i];
    }
    return empty;
};