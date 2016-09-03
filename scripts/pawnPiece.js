var fChess = fChess || {};

fChess.PawnPiece = (function () {
    'use strict';

    //constructor
    var PawnPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
        this.potentialMoves = [];
    };

    fChess.Utils.extend(fChess.Piece, PawnPiece);

    //fields
    PawnPiece.prototype.hasMoved = false;
    PawnPiece.prototype.potentialMoves = null;

    //functions
    PawnPiece.prototype.refreshMoves = function () {
        fChess.Piece.prototype.refreshMoves.call(this);
        this.potentialMoves.length = 0;
    };

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
        this.refreshMoves()

        var myKing = this.findKing(boardCells);
        if (myKing && !myKing.isChecked && this.isSafeToMove(boardCells, myKing)) {
            this.findMoves(boardCells);
        }
    };

    PawnPiece.prototype.findMoves = function (boardCells) {
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
