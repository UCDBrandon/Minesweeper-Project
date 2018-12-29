//MinesweeperGame functions and constructor
var MinesweeperGame = function (row, col, numBombs) {
    this.row = row,
    this.col = col,
    this.numBombs = numBombs,
    this.bombCoords = [],
    this.boardGenerated = false,
    this.difficulty = "Expert"
}

MinesweeperGame.prototype.newGame = function () {
    if (this.boardGenerated === false) {
        this.generateGame();
    }
    this.clearBoard();
    this.assignBombs();
}

MinesweeperGame.prototype.generateGame = function () {
    //Setup the board and 2D array used to hold bombs
    var content = document.getElementById("mainContent");

    // Row X Column
    for (var i = 0; i < this.row; i++) {
        this.bombCoords.push([]);
        for (var j = 0; j < this.col; j++) {
            var emptyTile = new tile(i, j, this.bombCoords);

            content.appendChild(emptyTile.tileElement);
            this.bombCoords[i].push([]);
            this.bombCoords[i][j] = 0;
        }
    }
    this.boardGenerated = true;
}

MinesweeperGame.prototype.clearBoard = function () {
    //Clear the board followed by simply replacing the images.
    var content = document.getElementById("mainContent");
    for (let i = 0; i < this.row * this.col; i++) {
        content.children[i].src = "images/unopened.png";
    }

    //Reset the bombs
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.bombCoords[i][j] = 0;
        }
    }
}

MinesweeperGame.prototype.assignBombs = function () {
    var xCoord;
    var yCoord;

    //Assign random bomb coordinates
    for (var i = 0; i < this.numBombs; i++) {
        xCoord = Math.floor(Math.random() * this.row);
        yCoord = Math.floor(Math.random() * this.col);

        //Check to make sure bomb positions are not repeated
        while (this.bombCoords[xCoord][yCoord] === 1) {
            xCoord = Math.floor(Math.random() * this.row);
            yCoord = Math.floor(Math.random() * this.col);
        }
        this.bombCoords[xCoord][yCoord] = 1;
        console.log(xCoord + "  " + yCoord);
    }
}

MinesweeperGame.prototype.bombClicked = function (x, y) {
    if (this.bombCoords[x][y] === 1) {
        console.log("lose");
    } else {
        console.log("safe");
    }
}

//tile function constructor
var tile = function (x, y, bombArr) {
    this.x = x,
    this.y = y,
    this.tileElement = generateTile(this.x, this.y, bombArr);
}

function generateTile(x, y, bombArr) {
    //Generate a tile element for each space in the minesweeper board
    var emptyTile = document.createElement("div");
    var tileImage = document.createElement("img");

    //Make the tile undraggable so button click up responds to tile where cursor is on
    tileImage.setAttribute('draggable', false);
    emptyTile.classList.add("tile");
    tileImage.src = "images/unopened.png";
    emptyTile.appendChild(tileImage);

    //Event listener for mouseup to check whether tile is a bomb
    emptyTile.addEventListener("mouseup", function () {
        console.log(x + "  " + y);
        if (bombArr[x][y] === 1) {
            console.log("lose");
        } else {
            console.log("safe");
        }
    });

    return emptyTile;
}


var game = new MinesweeperGame(16, 31, 99);
game.newGame();

