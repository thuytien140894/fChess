var fChess = fChess || {};

//TODO:
//1. CHECKMATE - when the king has no more available moves - pop the game result modal
//2. castling
//4. reset the king's checked status when reverting to different snapshots
fChess.GameManager = (function() {
    'use strict';

    var GameManager = function () {

    };

    //fields

    //static fields
    GameManager.lostPiecesRecord = null;
    GameManager.gameEnded = false;
    GameManager.mostRecentSnapshot = -1;
    GameManager.turnCounter = 0;

    // private functions
    GameManager.prototype._getActivePlayer = function () {
        for (var i = 0; i < GameManager.GameVM.players().length; i++) {
            var player = GameManager.GameVM.players()[i];
            if (player.isActive()) {
                return player;
            }
        }
    };

    // public functions
    GameManager.prototype.startNewGame = function () {
        GameManager.GameVM.reset();
        GameManager.lostPiecesRecord = [];
        GameManager.gameEnded = false;

        if (fChess.Page.board && fChess.Page.historyChart) {
            fChess.Page.board.reset();
            fChess.Page.historyChart.reset();
        }
    };

    // static functions
    GameManager.endGame = function (reason, player) {
        GameManager.gameEnded = true;
        fChess.Page.gameResultModal.initialize(reason, player);
        fChess.Page.gameResultModal.show();
    };

    GameManager.resetHeadSnapshot = function () {
        var turn = GameManager.GameVM.snapshot() + 1;
        GameManager.GameVM.snapshot(turn);
        GameManager.mostRecentSnapshot = GameManager.GameVM.snapshot();
        GameManager.updateLostPieces();

        if (turn == 2) {
            GameManager.GameVM.canUndo(true);
        }

        GameManager.GameVM.canRedo(false);
    };

    GameManager.updateLostPieces = function () {
        var snapshot = GameManager.GameVM.snapshot();
        if (snapshot >= 0) {
            var lostPieces = this.lostPiecesRecord[snapshot];

            fChess.GameManager.GameVM.players().forEach(function (player) {
                player.lostPieces([]);
            }.bind(this));

            lostPieces.forEach(function (piece) {
                var pieceColor = piece.piece.color;
                for (var i = 0; i < fChess.GameManager.GameVM.players().length; i++) {
                    var player = fChess.GameManager.GameVM.players()[i];
                    if (player.color == pieceColor) {
                        player.lostPieces.push(piece);
                    }
                }
            }.bind(this));
        }
    };

    GameManager.promotePawn = async function (color) {
        fChess.Page.pawnPromotionModal.initialize(color);
        var promotedPiece = await fChess.Page.pawnPromotionModal.show();

        if (promotedPiece.name == 'Queen') {
            return new fChess.QueenPiece(color);
        } else if (promotedPiece.name == 'Knight') {
            return new fChess.KnightPiece(color);
        } else if (promotedPiece.name == 'Rook') {
            return new fChess.RookPiece(color);
        } else { // bishop
            return new fChess.BishopPiece(color);
        }
    };

    GameManager.GameVM = (function () {
        var GameVM = {};

        GameVM.newState = ko.observable('');
        GameVM.snapshot = ko.observable();
        GameVM.players = ko.observableArray([]);
        GameVM.canUndo = ko.observable(false);
        GameVM.canRedo = ko.observable(false);

        GameVM.reset = function () {
            GameVM.snapshot(-1);
        };

        GameVM.concede = function () {

        };

        GameVM.draw = function () {

        };

        GameVM.undo = function () {
            var previousTurn = GameVM.snapshot() - 2;

            if (previousTurn >= 0 && previousTurn <= (fChess.GameManager.mostRecentSnapshot - 2)) {
                GameVM.snapshot(previousTurn);
                GameVM.canRedo(true);
            }

            if (previousTurn == 0) {
                GameVM.canUndo(false);
            }
        };

        GameVM.redo = function () {
            var nextTurn = GameVM.snapshot() + 2;

            if (nextTurn <= fChess.GameManager.mostRecentSnapshot && nextTurn >= 2) {
                GameVM.snapshot(nextTurn);
                GameVM.canUndo(true);
            }

            if (nextTurn == fChess.GameManager.mostRecentSnapshot) {
                GameVM.canRedo(false);
            }
        };


        return GameVM;
    })();

    return GameManager;
})();
