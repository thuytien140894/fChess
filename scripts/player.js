var fChess = fChess || {};

fChess.Player = (function () {
    'use strict';

    //constructor
    var Player = function (name) {
        this.pieces = [];
        this.name = '';
    };

    //fields
    Player.prototype.name = '';
    Player.prototype.pieces = null;

    //functions

    return Player;
})();