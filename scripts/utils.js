var fChess = fChess || {};

fChess.Utils = (function () {
    'use strict';

    var Utils = {};

    //functions
    Utils.extend = function (parent, child) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = parent;
    };

    Utils.getImageNameForPiece = function (piece) {
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
    };

    Utils.isKing = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.KingPiece;
    };

    Utils.isQueen = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.QueenPiece;
    };

    Utils.isRook = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.RookPiece;
    };

    Utils.isBishop = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.BishopPiece;
    };

    Utils.isPawn = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.PawnPiece;
    };

    Utils.isKnight = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.KnightPiece;
    };

    Utils.CustomKOBindings = (function () {
        // http://www.knockmeout.net/2012/05/quick-tip-skip-binding.html
        ko.bindingHandlers.stopBinding = {
            init: function() {
                return { controlsDescendantBindings: true };
            }
        };

        ko.virtualElements.allowedBindings.stopBinding = true;
    })();

    Utils.images = {
        'board': 'assets/board.png',
        'blackKing': 'assets/chesspieces/alpha/bK.png',
        'blackQueen': 'assets/chesspieces/alpha/bQ.png',
        'blackBishop': 'assets/chesspieces/alpha/bB.png',
        'blackRook': 'assets/chesspieces/alpha/bR.png',
        'blackKnight': 'assets/chesspieces/alpha/bN.png',
        'blackPawn': 'assets/chesspieces/alpha/bP.png',
        'whiteKing': 'assets/chesspieces/alpha/wK.png',
        'whiteQueen': 'assets/chesspieces/alpha/wQ.png',
        'whiteBishop': 'assets/chesspieces/alpha/wB.png',
        'whiteRook': 'assets/chesspieces/alpha/wR.png',
        'whiteKnight': 'assets/chesspieces/alpha/wN.png',
        'whitePawn': 'assets/chesspieces/alpha/wP.png'
    };

    return Utils;
})();
