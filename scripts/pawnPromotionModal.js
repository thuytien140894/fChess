fChess = fChess || {};

fChess.PawnPromotionModal = (function () {
    'use strict';

    var PawnPromotionModal = function () {
        fChess.Modal.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Modal, PawnPromotionModal);
    
    //fields

    //functions
    Modal.prototype.close = function () {

    };

    Modal.prototype.confirm = function () {

    };

    return PawnPromotionModal;
})();
