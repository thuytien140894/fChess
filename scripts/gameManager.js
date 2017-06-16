var fChess = fChess || {};

fChess.GameManager = (function() {
    'use strict';

    var GameManager = function () {

    };

    //fields
    GameManager.prototype.board = null;
    GameManager.prototype.history = null;

    GameManager.prototype.createBoard = function (element) {
        this.board = new fChess.Board(element);
    };

    GameManager.prototype.createHistory = function (element) {
        this.history = new fChess.History(element);
    };

    GameManager.prototype.startNewGame = function (element) {
        if (this.board && this.history) {
            this.board.reset();
            this.history.reset();
            this.GameVM.reset();
        }
    };

    GameManager.GameVM = (function () {
        var GameVM = {};

        GameVM.lostWhitePieces = ko.observableArray([]);
        GameVM.lostBlackPieces = ko.observableArray([]);
        GameVM.state = ko.observable('');

        GameVM.reset = function () {
            this.lostWhitePieces([]);
            this.lostBlackPieces([]);
            this.state('');
        };

        return GameVM;
    })();

    return GameManager;
})();
