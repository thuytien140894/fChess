var fChess = fChess || {};

fChess.Page = (function () {
    'use strict';

    var Page = {};

    //fields
    Page.gameManager = null;
    Page.board = null;
    Page.historyChart = null;
    Page.pawnPromotionModal = null;

    //functions
    Page.initialize = function () {
        Page.gameManager = new fChess.GameManager();
        Page.board = new fChess.Board('#game');
        Page.historyChart = new fChess.HistoryChart();
        Page.pawnPromotionModal = new fChess.PawnPromotionModal();

        $('#start-new-game-btn').on('click', function () {
            Page.gameManager.startNewGame();
        }.bind(this));

        // apply knockout bindings
        Page.applyBindings();
    };

    Page.applyBindings = function () {
        ko.applyBindings(fChess.GameManager.GameVM, $('#wrapper').get(0));
        ko.applyBindings(Page.historyChart, $('#history-chart').get(0));
        ko.applyBindings(Page.pawnPromotionModal, $('#pawn-promotion-modal').get(0));
    };

    return Page;
})();
