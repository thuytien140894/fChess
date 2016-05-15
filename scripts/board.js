var fChess = fChess || {};

fChess.Board = (function () {
    'use strict';

    //constructor
    var Board = function (parentElement) {
        if (parentElement == undefined) {
            parentElement = document.body;
        }
        this.$parent = $(parentElement);
        
        this.players = [];
        this.cells = [];

        this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, this.$parent.get(0), {
            preload: this.preload.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
    };

    //fields
    Board.prototype.game = null;
    Board.prototype.$parent = null;

    Board.prototype.players = null;
    Board.prototype.currentPlayer = null;
    Board.prototype.cells = null;

    //functions
    Board.prototype.preload = function () {
        //load all the images
        for (var image in Board.images) {
            this.game.load.image(image, Board.images[image]);
        }
    };

    Board.prototype.create = function () {
        var board = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'board');
        board.scale.setTo(0.6, 0.6);
        board.anchor.setTo(0.5, 0.5);

        var queen = this.game.add.sprite(200, 200, 'queen');
        queen.scale.setTo(0.6, 0.6);
        queen.anchor.setTo(0.5, 0.5);
    };

    Board.prototype.update = function () {

    };

    Board.prototype.startNewGame = function () {
        this.resetPlayers();
    };

    Board.prototype.resetPlayers = function () {
      this.players.push(new fChess.Player('Player 1'), new fChess.Player('Player 2'));

        //give players all the starting pieces
        this.players.forEach(function (player) {
            player.pieces.length = 0;

            player.pieces.push(new fChess.RookPiece());
            player.pieces.push(new fChess.KnightPiece());
            player.pieces.push(new fChess.BishopPiece());
            player.pieces.push(new fChess.QueenPiece());
            player.pieces.push(new fChess.KingPiece());
            player.pieces.push(new fChess.BishopPiece());
            player.pieces.push(new fChess.KnightPiece());
            player.pieces.push(new fChess.RookPiece());

            for (var i = 0; i < 8; i++) {
                player.pieces.push(new fChess.PawnPiece());
            }
        }.bind(this));

        //fill in all cells with pieces
        // reset the cells first
        this.cells.length = 0;
        var totalCells = Board.gameSettings.rows * Board.gameSettings.columns;
        for (var i = 0; i < totalCells; i++) {
            this.cells.push(new fChess.Cell());
        }
        // now fill them in with player pieces
        this.players[0].pieces.forEach(function (piece, i) {
            this.cells[i].piece = piece;
        }.bind(this));
        this.players[1].pieces.forEach(function (piece, i) {
            if (piece instanceof fChess.QueenPiece) {
                this.cells[this.cells.length - 5].piece = piece;
            } else if (piece instanceof fChess.KingPiece) {
                this.cells[this.cells.length - 4].piece = piece;
            } else {
                this.cells[this.cells.length - i - 1].piece = piece;
            }
        }.bind(this));
    };

    //static fields
    Board.images = {
        'board': 'assets/board.png',
        'king': 'assets/chesspieces/alpha/bK.png',
        'queen': 'assets/chesspieces/alpha/bQ.png',
        'bishop': 'assets/chesspieces/alpha/bB.png',
        'rook': 'assets/chesspieces/alpha/bR.png',
        'knight': 'assets/chesspieces/alpha/bN.png',
        'pawn': 'assets/chesspieces/alpha/bP.png'
    };

    Board.gameSettings = {
        rows: 8,
        columns: 8
    };

    return Board;
})();