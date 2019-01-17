//1. Make the Minesweeper game board

//2. Assign coordinates to tiles and enable onclick events

//3. Check for win

var gameRules = (function () {

    //Main function of game rules to check whether tiles are safe or a bomb
    revealTiles = function (x, y, game) {
        if (game.tileCoords[x][y].isBomb === 1) {
            console.log("Bomb");
        } else if (game.tileCoords[x][y].isBomb === 0 && game.tileCoords[x][y].visited === false) {
            game.tileCoords[x][y].visited = true;
            var bombCount = revealTileSafe(x, y, game);
            if (bombCount === 0) {
                revealEmptySpots(x, y, game);
            }
        }
    }

    //Tiles revealed are guaranteed to be safe. Check how many bombs are around the current tile
    revealTileSafe = function (x, y, game) {
        var bombCount = 0;

        //Check for all possible cases
        if (x === 0) {
            if (y === 0) {
                if (game.tileCoords[x][y + 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y + 1].isBomb === 1) {
                    bombCount++;
                }
            } else if (y === game.col - 1) {
                if (game.tileCoords[x][y - 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y - 1].isBomb === 1) {
                    bombCount++;
                }
            } else {
                if (game.tileCoords[x][y - 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x][y + 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y - 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x + 1][y + 1].isBomb === 1) {
                    bombCount++;
                }
            }
        } else if (x === game.row - 1) {
            if (y === 0) {
                if (game.tileCoords[x][y + 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x - 1][y].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x - 1][y + 1].isBomb === 1) {
                    bombCount++;
                }
            } else if (y === game.col - 1) {
                if (game.tileCoords[x][y - 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x - 1][y].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x - 1][y - 1].isBomb === 1) {
                    bombCount++;
                }
            } else {
                if (game.tileCoords[x - 1][y - 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x - 1][y].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x - 1][y + 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x][y - 1].isBomb === 1) {
                    bombCount++;
                }
                if (game.tileCoords[x][y + 1].isBomb === 1) {
                    bombCount++;
                }
            }
        } else if (y === 0) {
            if (game.tileCoords[x - 1][y].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x - 1][y + 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x][y + 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y + 1].isBomb.isBomb === 1) {
                bombCount++;
            }
        } else if (y === game.col - 1) {
            if (game.tileCoords[x - 1][y - 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x - 1][y].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x][y - 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y - 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y].isBomb === 1) {
                bombCount++;
            }
        } else {
            if (game.tileCoords[x - 1][y - 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x - 1][y].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x - 1][y + 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x][y - 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x][y + 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y - 1].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y].isBomb === 1) {
                bombCount++;
            }
            if (game.tileCoords[x + 1][y + 1].isBomb === 1) {
                bombCount++;
            }
        }
        tileImage = game.tileCoords[x][y].tile.ele.children[0]
        tileImage.src = "images/open" + bombCount + ".gif";
        return bombCount;
    }

    //Show the spots with 0 tiles and reveal the surrounding area.
    revealEmptySpots = function (x, y, game) {
        if (x === 0) {
            if (y === 0) {
               revealTiles(x, y + 1, game);
               revealTiles(x + 1, y + 1, game);
            } else if (y === game.col - 1) {
               revealTiles(x, y - 1, game);
               revealTiles(x + 1, y - 1, game);
            } else {
               revealTiles(x, y + 1, game);
               revealTiles(x, y - 1, game);
               revealTiles(x + 1, y - 1, game);
               revealTiles(x + 1, y + 1, game);
               }
            revealTiles(x + 1, y, game);
        } else if (x === game.row - 1) {
            if (y === 0) {
               revealTiles(x - 1, y + 1, game);
               revealTiles(x, y + 1, game);
            } else if (y === game.col - 1) {
               revealTiles(x - 1, y - 1, game);
               revealTiles(x, y - 1, game);
            } else {
               revealTiles(x - 1, y + 1, game);
               revealTiles(x - 1, y - 1, game);
               revealTiles(x, y - 1, game);
               revealTiles(x, y + 1, game);
            }
            revealTiles(x - 1, y, game);
        } else if (y === 0) {
            revealTiles(x - 1, y, game);
            revealTiles(x - 1, y + 1, game);
            revealTiles(x, y + 1, game);
            revealTiles(x + 1, y, game);
            revealTiles(x + 1, y + 1, game);
         } else if (y === game.col - 1) {
            revealTiles(x - 1, y, game);
            revealTiles(x - 1, y - 1, game);
            revealTiles(x, y - 1, game);
            revealTiles(x + 1, y - 1, game);
            revealTiles(x + 1, y, game);
         } else {
            revealTiles(x - 1, y - 1, game);
            revealTiles(x - 1, y, game);
            revealTiles(x - 1, y + 1, game);
            revealTiles(x, y - 1, game);
            revealTiles(x, y + 1, game);
            revealTiles(x + 1, y - 1, game);
            revealTiles(x + 1, y, game);
            revealTiles(x + 1, y + 1, game);
    }
}

    return {
        bombCheck: function (x, y, game) {
            revealTiles(x, y, game);
        }
    }

})();

var gameSetupController = (function (gRules) {
    var bombsSet = false;

    var makeTiles = function (game) {
        var tile = function (x, y) {
            this.x = x;
            this.y = y;
        }

        var content = document.getElementById("mainContent");

        for (var x = 0; x < game.row; x++) {
            game.tileCoords.push([])
            for (var y = 0; y < game.col; y++) {
                var t = new tile(x, y);
                t.ele = generateTileElement(x, y, game);
                content.appendChild(t.ele);
                game.tileCoords[x].push([]);
                game.tileCoords[x][y] = {
                    tile: t,
                    isBomb: 0,
                    visited: false
                };
            }
        }
    }

    function generateTileElement(x, y, game) {
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

            gRules.bombCheck(x, y, game);
            
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
            while (game.tileCoords[xCoord][yCoord].isBomb === 1 ||
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
            game.tileCoords[xCoord][yCoord].isBomb = 1;
        }
        return true;
    }

    return {
        tileCreate: function (game) {
            board = makeTiles(game);

            return board;
        }
    }

})(gameRules);

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


})(gameSetupController);



