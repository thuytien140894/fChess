var fChess = fChess || {};

fChess.Player = (function () {
    'use strict';

    //constructor
    var Player = function (name, color) {
        this.name = name;
        this.color = color;

        this.pieces = [];
    };

    //fields
    Player.prototype.name = '';
    Player.prototype.color = '';
    Player.prototype.pieces = null;
    Player.prototype.isActive = false;

    // public functions

    return Player;
})();
