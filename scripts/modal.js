fChess = fChess || {};

fChess.Modal = (function () {
    'use strict';

    var Modal = function () {
        this.isVisible = ko.observable(false);
    };

    //fields
    Modal.prototype.isVisible = null;

    //functions
    Modal.prototype.show = function () {
        this.isVisible(true);
    };

    Modal.prototype.close = function () {
        this.isVisible(false);
    };

    Modal.prototype.confirm = function () {
        this.isVisible(false);
    };

    return Modal;
})();
