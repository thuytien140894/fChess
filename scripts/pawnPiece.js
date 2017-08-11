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

    PawnPiece.prototype._atFifthRank = function (owningCell) {
        if (this._moveDirection == 'south') {
            return owningCell.row == 4;
        } else { // north
            return owningCell.row == 3;
        }
    };

    PawnPiece.prototype._checkForEnPassant = function (boardCells, owningCell) {
        var sign = this._moveDirection == 'north' ? -1 : 1;
        if (this._atFifthRank(owningCell)) {
            var cellIndex = boardCells.indexOf(owningCell);
            var adjacentCells = [ boardCells[cellIndex - 1], boardCells[cellIndex + 1] ];
            adjacentCells.forEach(function (cell) {
                if (!cell.isEmpty() &&
                    this.isEnemy(cell.piece) &&
                    fChess.Utils.isPawn(cell.piece)) { // the adjacent piece is the enemy pawn
                        var currentSnapshot = fChess.GameManager.GameVM.snapshot();
                        // first, check that the captured pawn has just been next to the capturing pawn this snapshot
                        // and has not been there previously
                        if (!cell.snapshots[currentSnapshot - 1]) { // if there wasn't any piece in this cell the previous turn
                            // then, check that the captured pawn must be in its second rank in the previous snapshot
                            var startingPosition = boardCells.indexOf(cell) + sign * 16;
                            var previousPiece = boardCells[startingPosition].snapshots[currentSnapshot - 1];
                            var pawn = cell.piece;
                            if (previousPiece == pawn) {
                                var passingCellIndex = boardCells.indexOf(cell) + sign * 8;
                                this.availableMoves.push(boardCells[passingCellIndex]);
                            }
                        }
                    }
            }.bind(this));
        }
    };

    // public functions
    PawnPiece.prototype.setMoveDirection = function (direction) {
        this._moveDirection = direction;
    };

    PawnPiece.prototype.getMoveDirection = function () {
        return this._moveDirection;
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

        this._checkForEnPassant(boardCells, currentCell);
        this.updateEnemyKingStatus();
    };

    PawnPiece.prototype.readyForPromotion = function (owningCell) {
        if (this._moveDirection == 'south') {
            return owningCell.row == 7;
        } else { // north
            return owningCell.row == 0;
        }
    };

    PawnPiece.prototype.isPassing = function (owningCell, cellToMove, boardCells) {
        var indexDifference = boardCells.indexOf(owningCell) - boardCells.indexOf(cellToMove);
        if (Math.abs(indexDifference) == 7 || Math.abs(indexDifference) == 9) { // if the cell to move is diagonal
            return cellToMove.isEmpty();
        }

        return false;
    };

    return PawnPiece;
})();
