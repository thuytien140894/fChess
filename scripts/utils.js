var fChess = fChess || {};

fChess.Utils = (function () {
    'use strict';

    var Utils = {};

    //functions
    Utils.extend = function (parent, child) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = parent;
    };

    Utils.createName = function (piece) {
        var name = '';
        if (piece instanceof fChess.KingPiece) {
            name = piece.color + 'King';
        } else if (piece instanceof fChess.QueenPiece) {
            name = piece.color + 'Queen';
        } else if (piece instanceof fChess.BishopPiece) {
            name = piece.color + 'Bishop';
        } else if (piece instanceof fChess.KnightPiece) {
            name = piece.color + 'Knight';
        } else if (piece instanceof fChess.RookPiece) {
            name = piece.color + 'Rook';
        } else { //pawn
            name = piece.color + 'Pawn';
        }

        return name;
    }

    return Utils;
})();
