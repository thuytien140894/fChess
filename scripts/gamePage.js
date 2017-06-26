var fChess = fChess || {};

fChess.Page = (function () {
    'use strict';

    var Page = {};

    //fields
    Page.gameManager = null;
    Page.board = null;
    Page.gameHistory = null;
    Page.modal = null;

    //functions
    Page.initialize = function () {
        Page.gameManager = new fChess.GameManager();
        Page.gameManager.createBoard('#game');
        Page.gameManager.createHistoryChart();
        Page.modal = new fChess.Modal();

        $('#start-new-game-btn').on('click', function () {
            Page.gameManager.startNewGame();
            Page.modal.show();
        }.bind(this));

        // apply knockout bindings
        ko.applyBindings(fChess.GameManager.GameVM, $('#wrapper').get(0));
        ko.applyBindings(Page.gameManager.historyChart, $('#history-chart').get(0));
        ko.applyBindings(Page.modal, $(".modal").get(0));
    };

    return Page;
})();
