var fChess = fChess || {};

fChess.Player = (function () {
    'use strict';

    //constructor
    var Player = function (name, color) {
        this.pieces = [];
        this.name = name;
        this.color = color;
    };

    //fields
    Player.prototype.name = '';
    Player.prototype.color = '';
    Player.prototype.pieces = null;

    //functions

    return Player;
})();
