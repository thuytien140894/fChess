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

    //functions
    RookPiece.prototype.calculateMoves = function (boardCells) {
        this.refreshMoves();

        var myKing = this.findKing(boardCells);
        if (myKing && !myKing.isChecked && this.isSafeToMove(boardCells, myKing)) {
            this.findMoves(boardCells);
        }
    };

    RookPiece.prototype.findMoves = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 8);
        this.findSouthernMoves(currentCell, boardCells, 8);
        this.findWesternMoves(currentCell, boardCells, 8);
        this.findEasternMoves(currentCell, boardCells, 8);
    };

    return RookPiece;
})();
