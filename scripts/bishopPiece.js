var fChess = fChess || {};

fChess.BishopPiece = (function () {
    'use strict';

    //constructor
    var BishopPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, BishopPiece);

    //fields

    // public functions
    BishopPiece.prototype.findMoves = function (boardCells) {
        this.refreshMoves();

        var currentCell = this.findCell(boardCells);
        this.findNorthWesternMoves(currentCell, boardCells, 8);
        this.findSouthWesternMoves(currentCell, boardCells, 8);
        this.findNorthEasternMoves(currentCell, boardCells, 8);
        this.findSouthEasternMoves(currentCell, boardCells, 8);

        this.updateEnemyKingStatus();
    };

    return BishopPiece;
})();
