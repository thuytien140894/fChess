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
        board.scale.setTo(Board.gameSettings.widthScale, Board.gameSettings.heightScale);
        board.anchor.set(Board.gameSettings.anchor);
    };

    Board.prototype.update = function () {
        this.render();
    };

    Board.prototype.render = function () {
        var xPos = 0;
        var yPos = 0;
        var row = 0;
        var column = 0;
        var startingX = this.game.world.centerX - 4 * Board.gameSettings.squareWidth + Board.gameSettings.squareWidth / 2;
        var startingY = this.game.world.centerY - 4 * Board.gameSettings.squareWidth + Board.gameSettings.squareWidth / 2;

        this.cells.forEach(function (cell, i) {
            if (cell.piece != null) {
                row = Math.floor(i / Board.gameSettings.rows);
                column = i % Board.gameSettings.columns;

                xPos = startingX + Board.gameSettings.squareWidth * column;
                yPos = startingY + Board.gameSettings.squareWidth * row;

                var pieceName = fChess.Utils.createName(cell.piece);
                var piece = new fChess.Sprite(this.game, xPos, yPos, pieceName);
                this.game.add.existing(piece.sprite);
            }
        }.bind(this));
    };

    Board.prototype.startNewGame = function () {
        this.resetPlayers();
    };

    Board.prototype.resetPlayers = function () {
        this.players.push(new fChess.Player('Player 1', 'white'), new fChess.Player('Player 2', 'black'));

        //give players all the starting pieces
        this.players.forEach(function (player) {
            player.pieces.length = 0;

            player.pieces.push(new fChess.RookPiece(player.color));
            player.pieces.push(new fChess.KnightPiece(player.color));
            player.pieces.push(new fChess.BishopPiece(player.color));
            player.pieces.push(new fChess.QueenPiece(player.color));
            player.pieces.push(new fChess.KingPiece(player.color));
            player.pieces.push(new fChess.BishopPiece(player.color));
            player.pieces.push(new fChess.KnightPiece(player.color));
            player.pieces.push(new fChess.RookPiece(player.color));

            for (var i = 0; i < 8; i++) {
                player.pieces.push(new fChess.PawnPiece(player.color));
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
        'blackKing': 'assets/chesspieces/alpha/bK.png',
        'blackQueen': 'assets/chesspieces/alpha/bQ.png',
        'blackBishop': 'assets/chesspieces/alpha/bB.png',
        'blackRook': 'assets/chesspieces/alpha/bR.png',
        'blackKnight': 'assets/chesspieces/alpha/bN.png',
        'blackPawn': 'assets/chesspieces/alpha/bP.png',
        'whiteKing': 'assets/chesspieces/alpha/wK.png',
        'whiteQueen': 'assets/chesspieces/alpha/wQ.png',
        'whiteBishop': 'assets/chesspieces/alpha/wB.png',
        'whiteRook': 'assets/chesspieces/alpha/wR.png',
        'whiteKnight': 'assets/chesspieces/alpha/wN.png',
        'whitePawn': 'assets/chesspieces/alpha/wP.png'
    };

    Board.gameSettings = {
        rows: 8,
        columns: 8,
        squareWidth: 63,
        widthScale: 0.6,
        heightScale: 0.6,
        anchor: 0.5,
    };

    return Board;
})();
