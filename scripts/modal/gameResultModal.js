fChess = fChess || {};

fChess.GameResultModal = (function () {
    'use strict';

    var GameResultModal = function () {
        fChess.Modal.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Modal, GameResultModal);

    //fields

    // public functions
    GameResultModal.prototype.onNewGame = function () {
        // close();
        fChess.Page.newGameModal.show();
    };

    GameResultModal.prototype.onRestart = function () {

    };

    return GameResultModal;
})();
