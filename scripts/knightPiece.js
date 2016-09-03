var fChess = fChess || {};

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
        this.refreshMoves();

        var myKing = this.findKing(boardCells);
        if (myKing && !myKing.isChecked && this.isSafeToMove(boardCells, myKing)) {
            this.findMoves(boardCells);
        }
    };

    KnightPiece.prototype.findMoves = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 2);
        this.findSouthernMoves(currentCell, boardCells, 2);
        this.findEasternMoves(currentCell, boardCells, 2);
        this.findWesternMoves(currentCell, boardCells, 2);
    };

    return KnightPiece;
})();
