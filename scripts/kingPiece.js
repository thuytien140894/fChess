var fChess = fChess || {};

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields
    KingPiece.prototype.isChecked = false;

    //functions
    KingPiece.prototype.calculateMoves = function (boardCells) {
        this.refreshMoves();
        this.findMoves(boardCells);
    };

    KingPiece.prototype.findMoves = function (boardCells) {
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

    KingPiece.prototype.calculateMovesWithCaution = function (boardCells) {
        this.calculateMoves(boardCells);
        this.avoidEnemies(boardCells);
    }

    return KingPiece;
})();
