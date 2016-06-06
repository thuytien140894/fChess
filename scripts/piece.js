var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function (color) {
        this.color = color;
        this.availableMoves = [];
    };

    //fields
    Piece.prototype.alive = true;
    Piece.prototype.color = '';
    Piece.prototype.availableMoves = null;

    //functions
    Piece.prototype.findCell = function (cells) {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].piece == this) {
                return cells[i];
            }
        }

        return null;
    };

    Piece.prototype.isEnemy = function (piece) {
        return this.color != piece.color;
    };

    Piece.prototype.findSouthernMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = 7 - currentCell.row;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex += 8;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (!(this instanceof fChess.PawnPiece)) { // a pawn cannot cannot capture its enemy on its path
                        if (this.isEnemy(boardCells[cellIndex].piece)) {
                            boardCells[cellIndex].containEnemy = true;
                            this.availableMoves.push(boardCells[cellIndex]);
                        }
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findNorthernMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = currentCell.row;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex -= 8;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (!(this instanceof fChess.PawnPiece)) { // a pawn cannot cannot capture its enemy on its path
                        if (this.isEnemy(boardCells[cellIndex].piece)) {
                            boardCells[cellIndex].containEnemy = true;
                            this.availableMoves.push(boardCells[cellIndex]);
                        }
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findEasternMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = 7 - currentCell.column;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex++;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        boardCells[cellIndex].containEnemy = true;
                        this.availableMoves.push(boardCells[cellIndex]);
                    }
                }
                break;
            }
        }
    };

    Piece.prototype.findWesternMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = currentCell.column;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex--;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        boardCells[cellIndex].containEnemy = true;
                        this.availableMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findSouthEasternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(7 - currentCell.row, 7 - currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex += 9;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) { // a pawn only gets to move diagonally if there is an enemy
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        boardCells[cellIndex].containEnemy = true;
                        this.availableMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findSouthWesternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(7 - currentCell.row, currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex += 7;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        boardCells[cellIndex].containEnemy = true;
                        this.availableMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findNorthEasternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(currentCell.row, 7 - currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex -= 7;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        boardCells[cellIndex].containEnemy = true;
                        this.availableMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findNorthWesternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(currentCell.row, currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex -= 9;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        boardCells[cellIndex].containEnemy = true;
                        this.availableMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
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
    KingPiece.prototype.calculateMoves = function (boardCells) {
        this.availableMoves.length = 0;
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 1);
        this.findSouthernMoves(currentCell, boardCells, 1);
        this.findEasternMoves(currentCell, boardCells, 1);
        this.findWesternMoves(currentCell, boardCells, 1);
        this.findNorthWesternMoves(currentCell, boardCells, 1);
        this.findNorthEasternMoves(currentCell, boardCells, 1);
        this.findSouthEasternMoves(currentCell, boardCells, 1);
        this.findSouthWesternMoves(currentCell, boardCells, 1);
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
    QueenPiece.prototype.calculateMoves = function (boardCells) {
        this.availableMoves.length = 0;
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 8);
        this.findSouthernMoves(currentCell, boardCells, 8);
        this.findEasternMoves(currentCell, boardCells, 8);
        this.findWesternMoves(currentCell, boardCells, 8);
        this.findNorthWesternMoves(currentCell, boardCells, 8);
        this.findNorthEasternMoves(currentCell, boardCells, 8);
        this.findSouthEasternMoves(currentCell, boardCells, 8);
        this.findSouthWesternMoves(currentCell, boardCells, 8);
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
    BishopPiece.prototype.calculateMoves = function (boardCells) {
        this.availableMoves.length = 0;
        var currentCell = this.findCell(boardCells);
        this.findNorthWesternMoves(currentCell, boardCells, 8);
        this.findSouthWesternMoves(currentCell, boardCells, 8);
        this.findNorthEasternMoves(currentCell, boardCells, 8);
        this.findSouthEasternMoves(currentCell, boardCells, 8);
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
    RookPiece.prototype.calculateMoves = function (boardCells) {
        this.availableMoves.length = 0;
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 8);
        this.findSouthernMoves(currentCell, boardCells, 8);
        this.findWesternMoves(currentCell, boardCells, 8);
        this.findEasternMoves(currentCell, boardCells, 8);
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
    KnightPiece.prototype.findNorthernMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = currentCell.row;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        var tempCell;
        for (var i = 0; i < limit; i++) {
            cellIndex -= 8;
            if (boardCells[cellIndex]) {
                tempCell = boardCells[cellIndex];
            }
        }

        if (tempCell && boardCells.indexOf(tempCell) == (boardCells.indexOf(currentCell) - 16)) {
            fChess.Piece.prototype.findWesternMoves.call(this, tempCell, boardCells, 1);
            fChess.Piece.prototype.findEasternMoves.call(this, tempCell, boardCells, 1);
        }
    };

    KnightPiece.prototype.findSouthernMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = 7 - currentCell.row;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        var tempCell;
        for (var i = 0; i < limit; i++) {
            cellIndex += 8;
            if (boardCells[cellIndex]) {
                tempCell = boardCells[cellIndex];
            }
        }

        if (tempCell && boardCells.indexOf(tempCell) == (boardCells.indexOf(currentCell) + 16)) {
            fChess.Piece.prototype.findWesternMoves.call(this, tempCell, boardCells, 1);
            fChess.Piece.prototype.findEasternMoves.call(this, tempCell, boardCells, 1);
        }
    };

    KnightPiece.prototype.findEasternMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = 7 - currentCell.column;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        var tempCell;
        for (var i = 0; i < limit; i++) {
            cellIndex++;
            if (boardCells[cellIndex]) {
                tempCell = boardCells[cellIndex];
            }
        }

        if (tempCell && boardCells.indexOf(tempCell) == (boardCells.indexOf(currentCell) + 2)) {
            fChess.Piece.prototype.findNorthernMoves.call(this, tempCell, boardCells, 1);
            fChess.Piece.prototype.findSouthernMoves.call(this, tempCell, boardCells, 1);
        }
    };

    KnightPiece.prototype.findWesternMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = currentCell.column;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        var tempCell;
        for (var i = 0; i < limit; i++) {
            cellIndex--;
            if (boardCells[cellIndex]) {
                tempCell = boardCells[cellIndex];
            }
        }

        if (tempCell && boardCells.indexOf(tempCell) == (boardCells.indexOf(currentCell) - 2)) {
            fChess.Piece.prototype.findNorthernMoves.call(this, tempCell, boardCells, 1);
            fChess.Piece.prototype.findSouthernMoves.call(this, tempCell, boardCells, 1);
        }
    };

    KnightPiece.prototype.calculateMoves = function (boardCells) {
        this.availableMoves.length = 0;
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 2);
        this.findSouthernMoves(currentCell, boardCells, 2);
        this.findEasternMoves(currentCell, boardCells, 2);
        this.findWesternMoves(currentCell, boardCells, 2);
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
    PawnPiece.prototype.hasMoved = false;

    //functions
    PawnPiece.prototype.checkForEnemies = function (currentCell, boardCells) {
        var cellIndex = boardCells.indexOf(currentCell);

        if (this.color == 'white') {
            if (!boardCells[cellIndex + 7].isEmpty() && this.isEnemy(boardCells[cellIndex + 7].piece)) {
                this.findSouthWesternMoves(currentCell, boardCells, 1);
            }

            if (!boardCells[cellIndex + 9].isEmpty() && this.isEnemy(boardCells[cellIndex + 9].piece)) {
                this.findSoutherEasternMoves(currentCell, boardCells, 1);
            }
        } else {
            if (!boardCells[cellIndex - 7].isEmpty() && this.isEnemy(boardCells[cellIndex - 7].piece)) {
                this.findNorthEasternMoves(currentCell, boardCells, 1);
            }

            if (!boardCells[cellIndex - 9].isEmpty() && this.isEnemy(boardCells[cellIndex - 9].piece)) {
                this.findNorthWesternMoves(currentCell, boardCells, 1);
            }
        }
    };

    PawnPiece.prototype.calculateMoves = function (boardCells) {
        this.availableMoves.length = 0;
        var currentCell = this.findCell(boardCells);
        if (this.color == 'white') { //move south
            if (this.hasMoved) {
                this.findSouthernMoves(currentCell, boardCells, 1);
            } else {
                this.findSouthernMoves(currentCell, boardCells, 2);
            }

            this.findSouthWesternMoves(currentCell, boardCells, 1);
            this.findSouthEasternMoves(currentCell, boardCells, 1);
        } else { //move north
            if (this.hasMoved) {
                this.findNorthernMoves(currentCell, boardCells, 1);
            } else {
                this.findNorthernMoves(currentCell, boardCells, 2);
            }

            this.findNorthEasternMoves(currentCell, boardCells, 1);
            this.findNorthWesternMoves(currentCell, boardCells, 1);
        }
    };

    return PawnPiece;
})();
