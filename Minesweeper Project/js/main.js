//1. Make the Minesweeper game board

//2. Assign coordinates to tiles and enable onclick events

//3. Check for win


//MinesweeperGame functions and constructor
var MinesweeperGame = function (row, col, numBombs) {
    this.row = row,
    this.col = col,
    this.numBombs = numBombs,
    this.tileCoords = [],
    this.boardGenerated = false,
    this.difficulty = "Expert"
}

//This function is called whenever a new game is initiated
MinesweeperGame.prototype.newGame = function () {
    if (this.boardGenerated === false) {
        this.generateGame();
    }
    //this.clearBoard();
    this.assignBombs();
}

//This function sets up the game by creating the board. Only called once to generate the tiles.
MinesweeperGame.prototype.generateGame = function () {
    //Setup the board and 2D array used to hold bombs
    var content = document.getElementById("mainContent");

    // Row X Column, generate the tiles
    for (var i = 0; i < this.row; i++) {
        this.tileCoords.push([]);
        for (var j = 0; j < this.col; j++) {
            var emptyTile = new tile(i, j, this.tileCoords[i]);

            content.appendChild(emptyTile.tileElement);
            this.tileCoords[i].push([]);
            this.tileCoords[i][j] = 0;
        }
    }
    this.boardGenerated = true;
}

//This function is used to reset the board back to the default stage.
/*MinesweeperGame.prototype.clearBoard = function () {
    //Clear the board followed by simply replacing the images.
    var content = document.getElementById("mainContent");
    for (let i = 0; i < this.row * this.col; i++) {
        content.children[i].src = "images/unopened.png";
    }

    //Reset the bombs
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.tileCoords[i][j] = 0;
        }
    }
}*/

//This function assigns the bombs to certain tiles
MinesweeperGame.prototype.assignBombs = function () {
    var xCoord;
    var yCoord;

    //Assign random bomb coordinates
    for (var i = 0; i < this.numBombs; i++) {
        xCoord = Math.floor(Math.random() * this.row);
        yCoord = Math.floor(Math.random() * this.col);

        //Check to make sure bomb positions are not repeated
        while (this.tileCoords[xCoord][yCoord] === 1) {
            xCoord = Math.floor(Math.random() * this.row);
            yCoord = Math.floor(Math.random() * this.col);
        }
        this.tileCoords[xCoord][yCoord] = 1;
        console.log(xCoord + "  " + yCoord);
    }
}

MinesweeperGame.prototype.revealTileSafe = function (x, y, tileImage) {
    var bombCount = 0;

    if (x === 0) {
        if (y === 0) {
            if (this.tileCoords[x][y + 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y + 1] === 1) {
                bombCount++;
            }
        } else if (y === this.col - 1) {
            if (this.tileCoords[x][y - 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y - 1] === 1) {
                bombCount++;
            }
        } else {
            if (this.tileCoords[x][y - 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x][y + 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y - 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x + 1][y + 1] === 1) {
                bombCount++;
            }
        }
    } else if (x === this.row - 1) {
        if (y === 0) {
            if (this.tileCoords[x][y + 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x - 1][y] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x - 1][y + 1] === 1) {
                bombCount++;
            }
        } else if (y === this.col - 1) {
            if (this.tileCoords[x][y - 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x - 1][y] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x - 1][y - 1] === 1) {
                bombCount++;
            }
        } else {
            if (this.tileCoords[x - 1][y - 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x - 1][y] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x - 1][y + 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x][y - 1] === 1) {
                bombCount++;
            }
            if (this.tileCoords[x][y + 1] === 1) {
                bombCount++;
            }
        }
    } else if (y === 0) {
        if (this.tileCoords[x - 1][y] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x - 1][y + 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x][y + 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y + 1] === 1) {
            bombCount++;
        }
    } else if (y === this.col - 1) {
        if (this.tileCoords[x - 1][y - 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x - 1][y] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x][y - 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y - 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y] === 1) {
            bombCount++;
        }
    } else {
        if (this.tileCoords[x - 1][y - 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x - 1][y] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x - 1][y + 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x][y - 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x][y] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x][y + 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y - 1] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y] === 1) {
            bombCount++;
        }
        if (this.tileCoords[x + 1][y + 1] === 1) {
            bombCount++;
        }
    }
    console.log(bombCount);
    tileImage.src = "http://www.chezpoor.com/minesweeper/images/open" + bombCount + ".gif";
}

//tile function constructor
var tile = function (x, y, bombArr) {
    this.x = x,
    this.y = y,
    this.tileElement = generateTile(this.x, this.y);
}

//This function makes the tile element
function generateTile(x, y) {
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
        bombCheck(x, y, tileImage);
    });

    return emptyTile;
}

//This function is called whenever a tile is clicked
function bombCheck(x,y, tileImage) {
    if (game.tileCoords[x][y] === 1) {
        console.log("lose");
    } else {
        game.revealTileSafe(x, y, tileImage);
    }
}


var game = new MinesweeperGame(16, 31, 99);
game.newGame();

