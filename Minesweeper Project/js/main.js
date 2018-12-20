var MinesweeperGame = function (row, col) {
    this.row = row,
    this.col = col,
    this.numBombs = 99,
    this.bombs = [],
    this.boardGenerated = false,
    this.difficulty = "Expert"
}

MinesweeperGame.prototype.generateGame = function () {
    //Setup the board and 2D array used to hold bombs

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

    for (var i = 0; i < this.row; i++) {
        this.bombs.push([]);
        for (var j = 0; j < this.col; j++) {
            this.bombs[i].push([]);
            this.bombs[i][j] = 0;
        }
    }
    this.boardGenerated = true;
}

MinesweeperGame.prototype.newGame = function () {
    if (this.boardGenerated === false) {
        this.generateGame();
    }
    this.clearBoard();
    this.assignBombs();
}

MinesweeperGame.prototype.clearBoard = function () {
    //Clear the board followed by simply replacing the images.
    var content = document.getElementById("mainContent");
    for (var i = 0; i < this.row * this.col; i++) {
        content.children[i].src = "images/unopened.png";
    }

    //Reset the bombs
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.bombs[i][j] = 0;
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
        while (this.bombs[xCoord][yCoord] === 1) {
            xCoord = Math.floor(Math.random() * this.row);
            yCoord = Math.floor(Math.random() * this.col);
        }
        this.bombs[xCoord][yCoord] = 1;
    }

    //Debug
    /*
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            console.log("[" + i + "][" + j + "] " + this.bombs[i][j]);
        }
    }*/
}


var game = new MinesweeperGame(16, 31);
game.newGame();

