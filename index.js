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
var GRID_LENGTH = 3;
var size = GRID_LENGTH;
let turn = 'X';
var gameData = {
    token1: 'X',
    token2: 'O',
    movesPlayer: [],
    movesComp: [],
    scorePlayer: 0,
    scoreComp: 0,
    playerName: '',
}

var gameOver = false;
var turns = 0;

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
        rowDivs = rowDivs + '<div id="' + (colIdx + 1) + "" + (rowIdx + 1) + '"; value=" ";   colIdx="' + rowIdx + '" rowIdx="' + colIdx + '" class="box ' +
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
    console.log("Turn Click:" + turns);
    console.log("turns Click:" + turn);
    if (turns % 2 === 0) {
        markCheck(this);
        $("#message").text("It's Your turn!")

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
    autoTurn();

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
    $(".box").attr("value", ' ');

    $("#message").text("Let's play the game! " + gameData.playerName + " first.")
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

$('#gameformat').on('change', function () {
    console.log("Val:" + $('#gameformat').val());
    var format = $('#gameformat').val();
    if (format > 2) {
        GRID_LENGTH = format;
        size = GRID_LENGTH;
        initializeGrid();
        renderMainGrid();
    } else
        alert("Please enter propee grid size ie >2");
})

var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function () {
    //console.log($('#option:checked').val());
    gameData.playerName = $('#name').val();

    $('#player1 .name').text(gameData.playerName);
    if ($('#option:checked').val() == 'O') {
        gameData.token1 = 'O';
        gameData.token2 = 'X';
        turn = 'O';
        startPlay(gameData.playerName);
    } else if ($('#option:checked').val() == 'X') {
        startPlay(gameData.playerName);
        turn = 'X';
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


function winnerPatterns() {
    var wins = Array();

    for (var r = 1; r <= size; r++) {
        var row1 = [];
        var row2 = [];
        for (var c = 1; c <= size; c++) {
            row1.push(r + "" + c);
            row2.push(c + "" + r);
            // console.log("row1");
            // console.log(row1);
        }
        wins.push(row1);
        wins.push(row2);

        // wins.push(row2);   
    }
    var diag1 = diagArr(size, 1);
    var diag0 = diagArr(size, 0);
    wins.push(diag1);
    wins.push(diag0);
    return wins
}

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


var checkDiag = function (diagonal, playerMoves) {

    for (var i = 0; i < diagonal.length; i++) {
        if (playerMoves.indexOf(diagonal[i]) === -1) {
            return false;
        }
    }
    return true;
};


var checkOther = function (playerMoves, size) {
    var row = [];
    var col = [];

    for (var i = 0; i < playerMoves.length; i++) {
        row.push(Number(playerMoves[i][0]));
        col.push(Number(playerMoves[i][1]));
    }

    row.sort();
    col.sort();

    for (var i = 0; i < size; i++) {
        var tempR = row[i];
        var tempC = col[i];
        var ctrR = 0;
        var ctrC = 0;

        for (var j = 0; j < row.length; j++) {
            if (tempR == row[j]) {
                ctrR++;
            }
            if (ctrR == size)
                return true;
        }
        for (var j = 0; j < col.length; j++) {
            if (tempC == col[j]) {
                ctrC++;
            }
            if (ctrC == size)
                return true;
        }
    }
    return false;
}
var checkWin = function (moves, size) {
    var diagonal1 = diagArr(size, 0);
    var diagonal2 = diagArr(size, 1);

    if (checkDiag(diagonal1, moves) || checkDiag(diagonal2, moves) || checkOther(moves, size)) {
        return true;
    }
    return false;
};

// Computer patterns
function DefaultComputerPatterns() {
    var comp_turns = Array();
    for (var o = 1; o <= size; o++)
        for (var j = 1; j <= size; j++)
            comp_turns.push(o + "" + j);

    return comp_turns
}

function autoTurn(again = false) {

    if (gameOver === true) return false;

    var comp_pattern = '';
    if (again == true) comp_pattern = DefaultComputerPatterns();
    else comp_pattern = getAutoTurnPattern();
    console.log(comp_pattern);
    for (var x = 0; x < comp_pattern.length; x++) {
        var desired_obj = document.getElementById(comp_pattern[x]);
        var objectValue = desired_obj.getAttribute("value");
        console.log('==>>' + objectValue);

        if (objectValue == '' || objectValue == ' ') {
            markCheck(desired_obj);
            break;
        }
    }

}

function markCheck(obj) {
    console.log(obj.id);
    obj.setAttribute("value", turn);
    turns++;
    console.log("Next:" + turn);

    console.log(gameData.token1);

    if (turn == gameData.token1) {
        obj.classList.add(turn);
        gameData.movesPlayer.push(obj.id);
    } else {
        obj.classList.add(turn);
        gameData.movesComp.push(obj.id);
    }

    console.log("Player" + gameData.movesPlayer);
    console.log("Computer" + gameData.movesComp);

    changeTurn();
}

function changeTurn() {
    if (turn == 'X') turn = 'O';
    else turn = 'X';
}

function getAutoTurnPattern() {

    var pattern = [];
    pattern = getMostNearestPattern(gameData.movesComp);
    if (pattern.length <= 0) {
        pattern = getMostNearestPattern(gameData.movesPlayer);
        if (pattern.length <= 0) {
            pattern = DefaultComputerPatterns();
        }
    }

    return pattern;

}
var selection;

function getMostNearestPattern(selection) {
    var matches = 0;

    var selected = selection.sort();
    var win_patterns = winnerPatterns();
    console.log("win_patterns");
    console.log(win_patterns);

    finished = false;
    for (var x = 0; x < win_patterns.length; x++) {
        var intersected = intersectionArray(selected, win_patterns[x]);
        if (intersected.length == (win_patterns[x].length - 1)) {

            for (var y = 0; y < win_patterns[x].length; y++) {
                obj = document.getElementById(win_patterns[x][y]);

                if (obj.getAttribute("value") == ' ' || obj.getAttribute("value") == '') {
                    return win_patterns[x];
                }
            }
        }

    }
    return [];
}

function intersectionArray(x, y) {

    var response = [];
    for (var i = 0; i < x.length; i++) {
        for (var z = 0; z < y.length; z++) {
            if (x[i] == y[z]) {
                response.push(x[i]);
                break;
            }
        }
    }
    return response;

}