var fChess = fChess || {};

fChess.Utils = (function () {
    'use strict';

    var Utils = {};

    // static fields
    Utils.moveSound = new Howl({
        src: ['assets/click.wav']
    });

    Utils.images = {
        'board': 'assets/board.png',
        'blackKing_default': 'assets/chesspieces/uscf/bK.png',
        'blackQueen_default': 'assets/chesspieces/uscf/bQ.png',
        'blackBishop_default': 'assets/chesspieces/uscf/bB.png',
        'blackRook_default': 'assets/chesspieces/uscf/bR.png',
        'blackKnight_default': 'assets/chesspieces/uscf/bN.png',
        'blackPawn_default': 'assets/chesspieces/uscf/bP.png',
        'whiteKing_default': 'assets/chesspieces/uscf/wK.png',
        'whiteQueen_default': 'assets/chesspieces/uscf/wQ.png',
        'whiteBishop_default': 'assets/chesspieces/uscf/wB.png',
        'whiteRook_default': 'assets/chesspieces/uscf/wR.png',
        'whiteKnight_default': 'assets/chesspieces/uscf/wN.png',
        'whitePawn_default': 'assets/chesspieces/uscf/wP.png',
        'blackKing_alpha': 'assets/chesspieces/alpha/bK.png',
        'blackQueen_alpha': 'assets/chesspieces/alpha/bQ.png',
        'blackBishop_alpha': 'assets/chesspieces/alpha/bB.png',
        'blackRook_alpha': 'assets/chesspieces/alpha/bR.png',
        'blackKnight_alpha': 'assets/chesspieces/alpha/bN.png',
        'blackPawn_alpha': 'assets/chesspieces/alpha/bP.png',
        'whiteKing_alpha': 'assets/chesspieces/alpha/wK.png',
        'whiteQueen_alpha': 'assets/chesspieces/alpha/wQ.png',
        'whiteBishop_alpha': 'assets/chesspieces/alpha/wB.png',
        'whiteRook_alpha': 'assets/chesspieces/alpha/wR.png',
        'whiteKnight_alpha': 'assets/chesspieces/alpha/wN.png',
        'whitePawn_alpha': 'assets/chesspieces/alpha/wP.png',
        'blackKing_wikipedia': 'assets/chesspieces/wikipedia/bK.png',
        'blackQueen_wikipedia': 'assets/chesspieces/wikipedia/bQ.png',
        'blackBishop_wikipedia': 'assets/chesspieces/wikipedia/bB.png',
        'blackRook_wikipedia': 'assets/chesspieces/wikipedia/bR.png',
        'blackKnight_wikipedia': 'assets/chesspieces/wikipedia/bN.png',
        'blackPawn_wikipedia': 'assets/chesspieces/wikipedia/bP.png',
        'whiteKing_wikipedia': 'assets/chesspieces/wikipedia/wK.png',
        'whiteQueen_wikipedia': 'assets/chesspieces/wikipedia/wQ.png',
        'whiteBishop_wikipedia': 'assets/chesspieces/wikipedia/wB.png',
        'whiteRook_wikipedia': 'assets/chesspieces/wikipedia/wR.png',
        'whiteKnight_wikipedia': 'assets/chesspieces/wikipedia/wN.png',
        'whitePawn_wikipedia': 'assets/chesspieces/wikipedia/wP.png'
    };

    // static functions
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

    return Utils;
})();
