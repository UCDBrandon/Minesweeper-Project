﻿//1. Make the Minesweeper game board

//2. Assign coordinates to tiles and enable onclick events

//3. Check for win


//MinesweeperGame functions and constructor
/*var MinesweeperGame = function (row, col, numBombs) {
    this.row = row;
    this.col = col;
    this.numBombs = numBombs;
    this.tileCoords = [];
    this.boardGenerated = false;
    this.bombsAssigned = false;
    this.difficulty = "Expert";
}

//This function is called whenever a new game is initiated
MinesweeperGame.prototype.newGame = function (b) {
    if (this.boardGenerated === false) {
        this.generateGame(b);
    }
}

//This function sets up the game by creating the board. Only called once to generate the tiles.
MinesweeperGame.prototype.generateGame = function (b) {
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
            b.push(emptyTile);
        }
    }
    this.boardGenerated = true;
}

//This function is used to reset the board back to the default stage.
MinesweeperGame.prototype.clearBoard = function () {
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
}

//This function assigns the bombs to certain tiles
MinesweeperGame.prototype.assignBombs = function (x, y) {
    var xCoord;
    var yCoord;

    //Assign random bomb coordinates
    for (var i = 0; i < this.numBombs; i++) {
        xCoord = Math.floor(Math.random() * this.row);
        yCoord = Math.floor(Math.random() * this.col);
        
        //Check to make sure bomb positions are not repeated
        //Also ensures that first click is not a bomb
        while (this.tileCoords[xCoord][yCoord] === 1 ||
            (xCoord === x && yCoord === y) ||
            (xCoord === x && yCoord === (y - 1)) ||
            (xCoord === x && yCoord === (y + 1)) ||
            (xCoord === (x - 1) && yCoord === (y - 1)) ||
            (xCoord === (x - 1) && yCoord === y) ||
            (xCoord === (x - 1) && yCoord === (y + 1)) ||
            (xCoord === (x + 1) && yCoord === (y - 1)) ||
            (xCoord === (x + 1) && yCoord === y) ||
            (xCoord === (x + 1) && yCoord === (y + 1))) {

            xCoord = Math.floor(Math.random() * this.row);
            yCoord = Math.floor(Math.random() * this.col);
        }
        this.tileCoords[xCoord][yCoord] = 1;

    }
    this.tileAccess = document.querySelectorAll(".tile");
    this.bombsAssigned = true;
}

//This function deals with revealing a tile and finding out how many
//bombs are next to the revealed tile. The revealed tile will have a 
//new image based on how many bombs are next to the tile.
MinesweeperGame.prototype.revealTileSafe = function (x, y) {
    var bombCount = 0;

    //Check for all possible cases
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

    tileImage = this.tileAccess[30 * x + x + y].children[0];
    tileImage.src = "http://www.chezpoor.com/minesweeper/images/open" + bombCount + ".gif";
    return bombCount;
}

//tile function constructor
var tile = function (x, y, bombArr) {
    this.x = x;
    this.y = y;
    this.tileElement = generateTile(this.x, this.y);
    this.visited = false;
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
        if (game.bombsAssigned == false) {
            game.assignBombs(x, y);
        }
        bombCheck(x, y, true);
    });

    return emptyTile;
}

//This function is called whenever a tile is clicked
function bombCheck(x, y, typeCheck) {
    if (game.tileCoords[x][y] === 1 && typeCheck === true) {
        console.log("lose");
    } else {
        let count = game.revealTileSafe(x, y);

        if (count === 0){
            bombCheck(x - 1, y - 1, false);
            bombCheck(x - 1, y, false);
            bombCheck(x - 1, y + 1, false);
            bombCheck(x, y - 1, false);
            bombCheck(x, y + 1, false);
            bombCheck(x + 1, y - 1, false);
            bombCheck(x + 1, y, false);
            bombCheck(x + 1, y + 1, false);
            
        }
    }
}
var game = new MinesweeperGame(16, 31, 99);

game.newGame(b);
console.log(b);*/

var gameRules = (function () {




    return {
        bombCheck: function (x, y, arr) {

        }
    }

})();

var gameSetupController = (function () {
    var bombsSet = false;

    var makeTiles = function (game) {
        var tile = function (x, y) {
            this.x = x;
            this.y = y;
            this.visited = false;
        }

        var arr = [];
        var content = document.getElementById("mainContent");

        for (var x = 0; x < game.row; x++) {
            game.tileCoords.push([])
            for (var y = 0; y < game.col; y++) {
                var t = new tile(x, y);
                t.ele = generateTileElement(x, y, arr, game);
                content.appendChild(t.ele);
                arr.push(t);
                game.tileCoords[x].push([]);
                game.tileCoords[x][y] = 0;
            }
        }
        return arr;
    }

    function generateTileElement(x, y, arr, game) {
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
            if (game.bombsAssigned === false) {
               game.bombsAssigned = assignBombs(x, y, game);
            }
            //Implement rules portion here
            console.log(arr);
            if (arr[31 * x + y].visited !== true) {
                var count = bombCheck(x, y, arr);
            } else {
                arr[31 * x + y].visited = false;
                var count = bombCheck(x, y, arr);
            }
            
        });

        return emptyTile;
    }

    function assignBombs (x, y, game) {
        var xCoord;
        var yCoord;

        //Assign random bomb coordinates
        for (var i = 0; i < game.numBombs; i++) {
            xCoord = Math.floor(Math.random() * game.row);
            yCoord = Math.floor(Math.random() * game.col);

            //Check to make sure bomb positions are not repeated
            //Also ensures that first click is not a bomb
            while (game.tileCoords[xCoord][yCoord] === 1 ||
                (xCoord === x && yCoord === y) ||
                (xCoord === x && yCoord === (y - 1)) ||
                (xCoord === x && yCoord === (y + 1)) ||
                (xCoord === (x - 1) && yCoord === (y - 1)) ||
                (xCoord === (x - 1) && yCoord === y) ||
                (xCoord === (x - 1) && yCoord === (y + 1)) ||
                (xCoord === (x + 1) && yCoord === (y - 1)) ||
                (xCoord === (x + 1) && yCoord === y) ||
                (xCoord === (x + 1) && yCoord === (y + 1))) {

                xCoord = Math.floor(Math.random() * game.row);
                yCoord = Math.floor(Math.random() * game.col);
            }
            game.tileCoords[xCoord][yCoord] = 1;
        }
        console.log(game.tileCoords);
        return true;
    }

    return {
        tileCreate: function (game) {
            board = makeTiles(game);

            return board;
        }
    }

})();

var controller = (function (gsCtrl) {
    var MinesweeperGame = function (row, col, numBombs) {
        this.row = row;
        this.col = col;
        this.numBombs = numBombs;
        this.tileCoords = [];
        this.bombsAssigned = false;
        this.difficulty = "Expert";
    }

    var game = new MinesweeperGame(16, 31, 99)

    var b = gsCtrl.tileCreate(game);
    console.log(b);


})(gameSetupController);



