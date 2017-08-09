var fChess = fChess || {};

fChess.RookPiece = (function () {
    'use strict';

    //constructor
    var RookPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, RookPiece);

    //fields
    RookPiece.prototype.hasMoved = false;

    // public functions
    RookPiece.prototype.findMoves = function (boardCells) {
        this.refreshMoves();

        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 8);
        this.findSouthernMoves(currentCell, boardCells, 8);
        this.findWesternMoves(currentCell, boardCells, 8);
        this.findEasternMoves(currentCell, boardCells, 8);

        this.updateEnemyKingStatus();
    };

    return RookPiece;
})();
