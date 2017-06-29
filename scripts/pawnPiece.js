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
    PawnPiece.prototype.potentialMoves = null;
    PawnPiece.prototype._moveDirection = '';

    // private functions
    PawnPiece.prototype._hasMoved = function (owningCell) {
        if (this._moveDirection == 'south') {
            return owningCell.row > 1;
        } else { // north
            return owningCell.row < 6;
        }
    };

    // public functions
    PawnPiece.prototype.setMoveDirection = function (direction) {
        this._moveDirection = direction;
    };

    PawnPiece.prototype.refreshMoves = function () {
        fChess.Piece.prototype.refreshMoves.call(this);
        this.potentialMoves.length = 0;
    };

    PawnPiece.prototype.findMoves = function (boardCells) {
        this.refreshMoves();

        var currentCell = this.findCell(boardCells);
        if (this._moveDirection == 'south') { //move south
            if (this._hasMoved(currentCell)) {
                this.findSouthernMoves(currentCell, boardCells, 1);
            } else {
                this.findSouthernMoves(currentCell, boardCells, 2);
            }

            this.findSouthWesternMoves(currentCell, boardCells, 1);
            this.findSouthEasternMoves(currentCell, boardCells, 1);
        } else { //move north
            if (this._hasMoved(currentCell)) {
                this.findNorthernMoves(currentCell, boardCells, 1);
            } else {
                this.findNorthernMoves(currentCell, boardCells, 2);
            }

            this.findNorthEasternMoves(currentCell, boardCells, 1);
            this.findNorthWesternMoves(currentCell, boardCells, 1);
        }

        this.updateEnemyKingStatus();
    };

    PawnPiece.prototype.readyForPromotion = function (owningCell) {
        if (this._moveDirection == 'south') {
            return owningCell.row == 7;
        } else { // north
            return owningCell.row == 0;
        }
    };

    return PawnPiece;
})();
