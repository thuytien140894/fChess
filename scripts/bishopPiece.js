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

    //functions
    BishopPiece.prototype.calculateMoves = function (boardCells) {
        fChess.Piece.prototype.calculateMoves.call(this, boardCells);

        var myKing = this.findKing(boardCells);
        if (myKing && !myKing.isChecked && this.isSafeToMove(boardCells, myKing)) {
            this.findMoves(boardCells);
        }
    };

    BishopPiece.prototype.findMoves = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        this.findNorthWesternMoves(currentCell, boardCells, 8);
        this.findSouthWesternMoves(currentCell, boardCells, 8);
        this.findNorthEasternMoves(currentCell, boardCells, 8);
        this.findSouthEasternMoves(currentCell, boardCells, 8);
    };

    return BishopPiece;
})();
