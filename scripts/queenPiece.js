var fChess = fChess || {};

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
    QueenPiece.prototype.findMoves = function (boardCells) {
        this.refreshMoves();
        
        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 8);
        this.findSouthernMoves(currentCell, boardCells, 8);
        this.findEasternMoves(currentCell, boardCells, 8);
        this.findWesternMoves(currentCell, boardCells, 8);
        this.findNorthWesternMoves(currentCell, boardCells, 8);
        this.findNorthEasternMoves(currentCell, boardCells, 8);
        this.findSouthEasternMoves(currentCell, boardCells, 8);
        this.findSouthWesternMoves(currentCell, boardCells, 8);

        this.updateEnemyKingStatus();
    };

    return QueenPiece;
})();
