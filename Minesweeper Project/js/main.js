(function () {

    var game = {
        'row': 16,
        'col': 31
    }

    var tile = {
        'img': null,
        'x': 0,
        'y': 0
    }

    var content = document.getElementById("mainContent");
    for (var i = 0; i < game.row; i++) {
        for (var j = 0; j < game.col; j++) {
            var emptyTile = document.createElement("div");
            var tileImage = document.createElement("img");

            emptyTile.classList.add("tile");
            tileImage.src = "images/unopened.png";
            emptyTile.appendChild(tileImage);
            content.appendChild(emptyTile);
        }
        var lineBreak = document.createElement("br");
        content.appendChild(lineBreak);
    }
})();