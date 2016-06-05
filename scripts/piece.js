var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function (color) {
        this.color = color;
    };

    //fields
    Piece.prototype.alive = true;
    Piece.prototype.color = '';
    Piece.prototype.availableMoves = [];

    //functions
    Piece.prototype.findCell = function (cells) {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].piece == this) {
                return cells[i];
            }
        }

        return null;
    };

    Piece.prototype.findNorthernMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = currentCell.row; i < 7; i++) {
            cellIndex += 8;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findSouthernMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = 0; i < currentCell.row; i++) {
            cellIndex -= 8;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findEasternMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = currentCell.column; i < 7; i++) {
            cellIndex++;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findWesternMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = 0; i < currentCell.column; i++) {
            cellIndex--;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findNorthEasternMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = currentCell.column; i < 7; i++) {
            cellIndex += 9;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findNorthWesternMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = 0; i < currentCell.column; i++) {
            cellIndex += 7;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findSouthWesternMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = 0; i < currentCell.column; i++) {
            cellIndex -= 7;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };

    Piece.prototype.findSouthEasternMoves = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);
        for (var i = currentCell.column; i < 7; i++) {
            cellIndex -= 9;
            if (boardCells[cellIndex] && boardCells[cellIndex].isEmpty()) {
                this.availableMoves.push(boardCells[cellIndex]);
            } else {
                break;
            }
        }
    };


    return Piece;
})();

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields

    //functions
    KingPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    KingPiece.prototype.calculateMoves = function (boardCells) {
        console.log('Move');
    };

    return KingPiece;
})();

fChess.QueenPiece = (function () {
    'use strict';

    //constructor
    var QueenPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, QueenPiece);

    //fields

    //functions
    QueenPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    QueenPiece.prototype.calculateMoves = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells);
        this.findSouthernMoves(currentCell, boardCells);
        this.findEasternMoves(currentCell, boardCells);
        this.findWesternMoves(currentCell, boardCells);
        this.findNorthWesternMoves(currentCell, boardCells);
        this.findNorthEasternMoves(currentCell, boardCells);
        this.findSouthEasternMoves(currentCell, boardCells);
        this.findSouthWesternMoves(currentCell, boardCells);
    };

    return QueenPiece;
})();

fChess.BishopPiece = (function () {
    'use strict';

    //constructor
    var BishopPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, BishopPiece);

    //fields

    //functions
    BishopPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    BishopPiece.prototype.calculateMoves = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        this.findNorthWesternMoves(currentCell, boardCells);
        this.findSouthWesternMoves(currentCell, boardCells);
        this.findNorthEasternMoves(currentCell, boardCells);
        this.findSouthEasternMoves(currentCell, boardCells);
    };

    return BishopPiece;
})();

fChess.RookPiece = (function () {
    'use strict';

    //constructor
    var RookPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, RookPiece);

    //fields

    //functions
    RookPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    RookPiece.prototype.calculateMoves = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells);
        this.findSouthernMoves(currentCell, boardCells);
        this.findWesternMoves(currentCell, boardCells);
        this.findEasternMoves(currentCell, boardCells);
    };

    return RookPiece;
})();

fChess.KnightPiece = (function () {
    'use strict';

    //constructor
    var KnightPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, KnightPiece);

    //fields

    //functions
    KnightPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    KnightPiece.prototype.calculateMoves = function (boardCells) {
        console.log('Move');
    };

    return KnightPiece;
})();

fChess.PawnPiece = (function () {
    'use strict';

    //constructor
    var PawnPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, PawnPiece);

    //fields

    //functions
    PawnPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    PawnPiece.prototype.calculateMoves = function (boardCells) {
        console.log('Move');
    };

    return PawnPiece;
})();
