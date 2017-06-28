fChess = fChess || {};

fChess.PawnPromotionModal = (function () {
    'use strict';

    var PawnPromotionModal = function () {
        fChess.Modal.prototype.constructor.apply(this, arguments);

        this.pieceChoices = [
            { name: 'Queen', imageUrl: ko.observable(''), isSelected: ko.observable(false) },
            { name: 'Knight', imageUrl: ko.observable(''), isSelected: ko.observable(false) },
            { name: 'Rook', imageUrl: ko.observable(''), isSelected: ko.observable(false) },
            { name: 'Bishop', imageUrl: ko.observable(''), isSelected: ko.observable(false) }
        ];

        PawnPromotionModal.self = this;
        this.select.bind(PawnPromotionModal.self);
    };

    fChess.Utils.extend(fChess.Modal, PawnPromotionModal);

    //fields
    PawnPromotionModal.prototype.pieceChoices = null;
    PawnPromotionModal.prototype.selectedPiece = null;
    PawnPromotionModal.prototype.resolvePromise = null;
    PawnPromotionModal.prototype.rejectPromise = null;
    PawnPromotionModal.self = null;

    //static fields
    PawnPromotionModal.selectedPiece = null;

    //functions
    PawnPromotionModal.prototype.initialize = function (color) {
        this.pieceChoices.forEach(function (choice) {
            var imageName = color + choice.name;
            choice.imageUrl(fChess.Utils.images[imageName]);
        }.bind(this));
    };

    PawnPromotionModal.prototype.select = function (piece) {
        PawnPromotionModal.self.selectedPiece = piece;
        PawnPromotionModal.self._reset();
        piece.isSelected(true);
    };

    PawnPromotionModal.prototype.close = function () {
        fChess.Modal.prototype.close.apply(this, arguments);
    };

    PawnPromotionModal.prototype.show = function () {
        this._reset();
        fChess.Modal.prototype.show.apply(this, arguments);

        return this.makePromise();
    };

    PawnPromotionModal.prototype.confirm = function () {
        if (PawnPromotionModal.self.selectedPiece) {
            fChess.Modal.prototype.confirm.apply(this, arguments);
            this.resolvePromise(PawnPromotionModal.self.selectedPiece);
        }
    };

    PawnPromotionModal.prototype.makePromise = function () {
        return new Promise (function (resolve, reject) {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        }.bind(this));
    };

    PawnPromotionModal.prototype._reset = function () {
        this.pieceChoices.forEach(function (choice) {
            choice.isSelected(false);
        });
    };

    return PawnPromotionModal;
})();
