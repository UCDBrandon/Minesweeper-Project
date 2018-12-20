var MinesweeperGame = function (row, col) {
    this.row = row,
    this.col = col,
    this.difficulty = "Expert"
}

MinesweeperGame.prototype.newGame = function () {
    //Setup a new board by adding in elements to the main div
    var content = document.getElementById("mainContent");

    // Row X Column
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            var emptyTile = document.createElement("div");
            var tileImage = document.createElement("img");

            emptyTile.classList.add("tile");
            tileImage.src = "images/unopened.png";
            emptyTile.appendChild(tileImage);
            content.appendChild(emptyTile);
        }
    }

    this.assignBombs();
}

MinesweeperGame.prototype.clearBoard = function () {
    //Clear the board followed by creating a new board.
    //Can replace later to just change the image of each position instead of deleting
    var content = document.getElementById("mainContent");
    while (content.childElementCount != 0) {
        content.removeChild(content.firstChild);
    }

    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.bombs[i][j] = 0;
        }
    }
    //Start new game
    this.newGame();
}

MinesweeperGame.prototype.assignBombs = function () {
    var bombs = 99;
    this.bombs = [];
    var xCoord;
    var yCoord;

    //Create the 2d array similar to grid
    for (var i = 0; i < this.row; i++) {
        this.bombs.push([]);
        for (var j = 0; j < this.col; j++) {
            this.bombs[i].push([]);
            this.bombs[i][j] = 0;
        }
    }

    //Assign random bomb coordinates
    for (var i = 0; i < bombs; i++) {
        xCoord = Math.floor(Math.random() * this.row);
        yCoord = Math.floor(Math.random() * this.col);

        //Check to make sure bomb positions are not repeated
        while (this.bombs[xCoord][yCoord] === 1) {
            xCoord = Math.floor(Math.random() * this.row);
            yCoord = Math.floor(Math.random() * this.col);
        }
        this.bombs[xCoord][yCoord] = 1;
    }

    //Debug
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            console.log("[" + i + "][" + j + "] " + this.bombs[i][j]);
        }
    }
}

var game = new MinesweeperGame(16, 31);
game.newGame();