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
        this.spritePieces = [];

        this.game = new Phaser.Game(this.$parent[0].clientWidth, '100', Phaser.AUTO, this.$parent[0], {
            preload: this._preload.bind(this),
            create: this._create.bind(this),
            update: this._update.bind(this)
        });

        this.snapshotSubscription = fChess.GameManager.GameVM.snapshot.subscribe(function (snapshot) {
            this._checkout(snapshot);
        }.bind(this));
    };

    //fields
    Board.prototype.game = null;
    Board.prototype.$parent = null;
    Board.prototype.selectedCell = null;
    Board.prototype.selectedPiece = null;
    Board.prototype.snapshotSubscription = null;

    Board.prototype.players = null;
    Board.prototype.cells = null;
    Board.prototype.spritePieces = null;

    // these fields are used for graphics
    Board.prototype.overlayCells = null;
    Board.prototype.feedbackGraphics = null;
    Board.prototype.highlightGraphics = null;
    Board.prototype.firstPlayerPieces = null;
    Board.prototype.secondPlayerPieces = null;

    //static fields
    Board.pieceType = 'default';
    Board.showFeedback = true;

    // private functions
    Board.prototype._preload = function () {
        //load all the images
        for (var image in fChess.Utils.images) {
            this.game.load.image(image, fChess.Utils.images[image]);
        }
    };

    Board.prototype._create = function () {
        this.game.stage.backgroundColor = '#182d3b';
        var board = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'board');
        board.scale.setTo(Board.gameSettings.widthScale, Board.gameSettings.heightScale);
        board.anchor.set(Board.gameSettings.anchor);

        // create groups
        this.firstPlayerPieces = this.game.add.group();
        this.secondPlayerPieces = this.game.add.group();
        this.overlayCells = this.game.add.group();

        this._initializeCells();

        // notify the page that the board has been loaded and that the overlay html
        // for row and column ids can be rendered
        fChess.Page.VM.boardIsLoaded(true);
    };

    Board.prototype._update = function () {
        this._render();
    };

    Board.prototype._render = function () {
        // update the positions of all pieces
        this._updatePiecePosition();
        this._togglePlayerActivity();
    };

    Board.prototype._updatePiecePosition = function () {
        this.spritePieces.forEach(function (chessPiece) {
            var cell = this._findCellForSprite(chessPiece);
            if (cell) {
                chessPiece.sprite.x = cell.centerX;
                chessPiece.sprite.y = cell.centerY;

                // update the king's status
                if (fChess.Utils.isKing(chessPiece.piece)) {
                    if (chessPiece.piece.isChecked()) {
                        this._check(chessPiece);
                    } else {
                        this._uncheck(chessPiece);
                    }
                }
            }
        }.bind(this));
    };

    Board.prototype._togglePlayerActivity = function () {
        // toggle the activity and inactivity of two players
        this.game.world.bringToTop(this.overlayCells);
        if (this.players.length == 2) {
            if (this.players[0].isActive) {
                this.game.world.bringToTop(this.firstPlayerPieces);
            } else {
                this.game.world.bringToTop(this.secondPlayerPieces);
            }
        }
    };

    Board.prototype._selectPiece = function (piece) {
        this.selectedPiece = piece;
        this.selectedCell = this._findCellForPiece(piece);
        if (this.selectedCell) {
            if (!fChess.GameManager.gameEnded) { // only calculates moves when game is in progress
                this._calculateMoves(piece);
                this._detectEnemies(piece);
            }
            this._highlight(this.selectedCell);
        }
    };

    Board.prototype._check = function (kingPiece) {
        kingPiece.changeColor(0xff0000);
    };

    Board.prototype._uncheck = function (kingPiece) {
        kingPiece.changeColor(0xffffff);
    };

    Board.prototype._calculateMoves = function (piece) {
        piece.calculateMoves(this.cells);
    };

    Board.prototype._detectEnemies = function (selectedPiece) {
        selectedPiece.availableMoves.forEach(function (cell) {
            cell.containEnemy = false;
            if (!cell.isEmpty() && cell.piece.isEnemy(selectedPiece)) {
                cell.containEnemy = true;
            }
        }.bind(this));
    };

    Board.prototype._highlight = function (selectedCell) {
        this._removeGraphics();

        this.highlightGraphics = this.game.add.graphics(0, 0);
        this.highlightGraphics.lineStyle(4, Board.gameSettings.selectedCellColor, 1);
        this.highlightGraphics.drawRect(selectedCell.topLeftX, selectedCell.topLeftY, Board.gameSettings.squareWidth, Board.gameSettings.squareHeight);

        if (Board.showFeedback && !fChess.GameManager.gameEnded) {
            this._highlightMoves(selectedCell.piece);
        }
    };

    Board.prototype._removeGraphics = function () {
        if (this.highlightGraphics) {
            this.highlightGraphics.destroy();
        }

        this._removeFeedback();
    };

    Board.prototype._removeFeedback = function () {
        if (this.feedbackGraphics) {
            this.feedbackGraphics.destroy();
        }
    }

    Board.prototype._highlightMoves = function (piece) {
        // draw the possible moves for the piece
        this.feedbackGraphics = this.game.add.graphics(0, 0);
        piece.availableMoves.forEach(function (move) {
            if (move.containEnemy) { // if the cell contains an enemy, highlight it red
                this.feedbackGraphics.lineStyle(4, Board.gameSettings.enemyCellColor, 1);
                this.feedbackGraphics.drawRect(move.topLeftX, move.topLeftY, Board.gameSettings.squareWidth, Board.gameSettings.squareHeight);
            } else {
                this.feedbackGraphics.lineStyle(0, 0, 1);
                this.feedbackGraphics.beginFill(Board.gameSettings.selectedCellColor, 1);
                this.feedbackGraphics.drawCircle(move.centerX, move.centerY, 15);
                this.feedbackGraphics.endFill();
            }
        }.bind(this));
    };

    Board.prototype._makeMove = async function (cellToMove) {
        if (this.selectedCell &&
            this.selectedCell.piece &&
            this.selectedCell.piece.isAllowedToMove(cellToMove)) { // make sure that cellToMove is part of the piece's availableMoves
                this._removeGraphics();

                if (!cellToMove.isEmpty()) {
                    this._clearCell(cellToMove);
                }
                cellToMove.piece = this.selectedPiece;
                this.selectedCell.piece = null;
                this.selectedPiece = await this._checkForPawnPromotion(cellToMove);

                // recalculate moves for the piece that just gets moved
                // so that if we can check if any king is checked
                this.selectedPiece.findMoves(this.cells);
                this._updateCheckStatus(this.selectedPiece);
                this._takeSnapshot(cellToMove); // make this a promise waiting for pawn promotion tp resolve
                this.selectedPiece = null;
                this._switchPlayer();
        }
    };

    Board.prototype._updateCheckStatus = function (movedPiece) {
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            var enemyKing = Board.findEnemyKing(player.king);

            // if the most recently moved piece helps uncheck its king, then
            // the king's threatening piece should not threaten the king anymore

            // if the most recently moved piece checks the king,
            // the king status should remain the same
            if (player.king.isChecked()) {
                player.king.threateningPiece.findMoves(this.cells);
            }
        }

        this.checkForGameEndConditions();
    };

    Board.prototype.checkForGameEndConditions = function () {
        var opponent;
        for (var i = 0; i < this.players.length; i++) {
            if (!this.players[i].isActive) {
                opponent = this.players[i];
                break;
            }
        }

        // check for game end conditions
        if (opponent.isCheckmated(this.cells)) {
            fChess.GameManager.endGame('Checkmate', opponent);
        } else if (!opponent.hasLegalMoves(this.cells)) {
            fChess.GameManager.endGame('Stalemate', opponent);
        }
    };

    Board.prototype._checkForPawnPromotion = async function (cellToMove) {
        var movedPiece = cellToMove.piece;
        if (fChess.Utils.isPawn(cellToMove.piece)) {
            if (movedPiece.readyForPromotion(cellToMove)) {
                var promotedPiece = await fChess.GameManager.promotePawn(cellToMove.piece.color);
                cellToMove.piece = promotedPiece;

                // update the sprite
                var sprite = this._findSpriteForPiece(movedPiece);
                sprite.replacePiece(promotedPiece);

                this._updatePlayerPieces(movedPiece, promotedPiece);

                return promotedPiece;
            }
        }

        return movedPiece;
    };

    // update player pieces after pawn promotion
    Board.prototype._updatePlayerPieces = function (oldPiece, newPiece) {
        var activePlayer;
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].isActive) {
                activePlayer = this.players[i];
                break;
            }
        }

        for (var j = 0; j < activePlayer.pieces.length; j++) {
            if (oldPiece == activePlayer.pieces[j]) {
                activePlayer.pieces[j] = newPiece;
                break;
            }
        }
    };

    Board.prototype._switchPlayer = function () {
        var currentTurn = fChess.GameManager.GameVM.snapshot();
        if (currentTurn % 2 == 1) {
            this.players[0].isActive = false;
            this.players[1].isActive = true;
        } else {
            this.players[1].isActive = false;
            this.players[0].isActive = true;
        }
    };

    // take a snapshot of the current game states
    Board.prototype._takeSnapshot = function (cellToMove) {
        this.cells.forEach(function (cell) {
            cell.takeSnapshot();
        }.bind(this));

        this._saveLostPieces();
        fChess.GameManager.resetHeadSnapshot();

        if (typeof cellToMove !== 'undefined') { // check if cellToMove was passed in
            this._updateHistoryChart(cellToMove);
        }
    };

    Board.prototype._clearSnapshots = function () {
        this.cells.forEach(function (cell) {
            cell.clearSnapshots();
        }.bind(this));
    };

    Board.prototype._saveLostPieces = function () {
        var currentSnapshot = fChess.GameManager.GameVM.snapshot();
        fChess.GameManager.lostPiecesRecord.splice(currentSnapshot + 1);

        var lostPieces = [];
        this.spritePieces.forEach(function (spritePiece) {
            if (!spritePiece.piece.alive) {
                lostPieces.push(spritePiece);
            }
        }.bind(this));

        fChess.GameManager.lostPiecesRecord.push(lostPieces);
    };

    Board.prototype._checkout = function (snapshot) {
        if (snapshot >= 0) {
            this.selectedPiece = null;
            this.selectedCell = null;
            this._retrieveLostPieces(snapshot);
            this._removeGraphics();

            this.cells.forEach(function (cell) {
                cell.checkout(snapshot);
            }.bind(this));

            fChess.GameManager.updateLostPieces();
        }
    };

    Board.prototype._retrieveLostPieces = function (snapshot) {
        // kill all the pieces of this snapshot's lost pieces
        var lostPieces = fChess.GameManager.lostPiecesRecord[snapshot];
        if (lostPieces) {
            lostPieces.forEach(function (sprite) {
                sprite.kill();
            }.bind(this));

            // revive pieces that are lost after the current snapshot
            var lastIndex = fChess.GameManager.lostPiecesRecord.length - 1;
            var subsequentLostPieces = fChess.GameManager.lostPiecesRecord[lastIndex];
            if (subsequentLostPieces) {
                subsequentLostPieces.forEach(function (sprite) {
                    if (lostPieces.indexOf(sprite) == -1) {
                        sprite.revive();
                    }
                }.bind(this));
            }
        }
    };

    // use for the history chart
    Board.prototype._updateHistoryChart = function (cell) {
        if (cell) {
            var state = Board.getCellID(cell);
            fChess.GameManager.GameVM.newState(state);
        }
    };

    Board.prototype._clearCell = function (cell) {
        cell.piece.kill();

        var spritePiece = this._findSpriteForPiece(cell.piece);
        spritePiece.kill();

        // if the killed piece is the threatening piece,
        // then the king should be safe again
        this.players.forEach(function (player) {
            var king = player.king;
            if (cell.piece == king.threateningPiece) {
                king.unchecked();
            }
        }.bind(this));

        cell.piece = null;
    };

    Board.prototype._clearBoard = function () {
        this.spritePieces.forEach(function (spritePiece) {
            spritePiece.destroy();
        }.bind(this));
        this.spritePieces.length = 0;

        this.cells.forEach(function (cell) {
            cell.piece = null;
        }.bind(this));

        // remove the feedbackGraphics from the previous game
        this._removeGraphics();
    };

    Board.prototype._initializeCells = function () {
        var startingX = this.game.world.centerX - 4 * Board.gameSettings.squareWidth + Board.gameSettings.squareWidth / 2;
        var startingY = this.game.world.centerY - 4 * Board.gameSettings.squareHeight + Board.gameSettings.squareHeight / 2;

        this.cells = [];
        var totalCells = Board.gameSettings.rows * Board.gameSettings.columns;
        for (var i = 0; i < totalCells; i++) {
            var cell = new fChess.Cell();
            cell.row = Math.floor(i / Board.gameSettings.columns);
            cell.column = i % Board.gameSettings.columns;
            cell.centerX = startingX + Board.gameSettings.squareWidth * cell.column;
            cell.centerY = startingY + Board.gameSettings.squareHeight * cell.row;
            cell.topLeftX = this.game.world.centerX - 4 * Board.gameSettings.squareWidth + Board.gameSettings.squareWidth * cell.column;
            cell.topLeftY = this.game.world.centerY - 4 * Board.gameSettings.squareHeight + Board.gameSettings.squareHeight * cell.row;
            this.cells.push(cell);

            // this is an anonymous function that helps restrict the scope of the
            // variables created inside of it.
            (function () {
                var spriteCell = new fChess.SpriteCell(this.game, cell);
                this.game.add.existing(spriteCell.sprite);
                this.overlayCells.add(spriteCell.sprite);

                spriteCell.sprite.events.onInputDown.add(function () {
                    this._makeMove(spriteCell.cell);
                }, this);
            }.bind(this))();
        }
    };

    Board.prototype._initializePieces = function () {
        this._renderPieces();
        this._categorizePieces();
    };

    Board.prototype._renderPieces = function () {
        // since forEach is already a function, all the variables created for each
        // iteration is unique to that iteration.
        this.cells.forEach(function (cell, i) {
            if (cell.piece != null) {
                var spritePiece = new fChess.SpritePiece(this.game, cell.centerX, cell.centerY, cell.piece);
                this.spritePieces.push(spritePiece);
                this.game.add.existing(spritePiece.sprite);

                spritePiece.sprite.events.onInputDown.add(function () {
                    this._selectPiece(spritePiece.piece);
                }, this);
            }
        }.bind(this));
    };

    Board.prototype._categorizePieces = function () {
        // group the sprite pieces for two players
        this.spritePieces.forEach(function (spritePiece) {
            if (spritePiece.piece.color == this.players[0].color) {
                this.firstPlayerPieces.add(spritePiece.sprite);
            } else {
                this.secondPlayerPieces.add(spritePiece.sprite);
            }
        }.bind(this));
    };

    Board.prototype._resetPlayers = function () {
        this.players = fChess.GameManager.GameVM.players();
        this.players[0].isActive = true;

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

            var moveDirection = this.players.indexOf(player) == 0 ? 'south' : 'north';
            for (var i = 0; i < 8; i++) {
                var pawn = new fChess.PawnPiece(player.color);
                pawn.setMoveDirection(moveDirection);
                player.pieces.push(pawn);
            }
        }.bind(this));

        // now fill them in with player pieces
        this.players[0].pieces.forEach(function (piece, i) {
            this.cells[i].piece = piece;
        }.bind(this));
        this.players[1].pieces.forEach(function (piece, i) {
            if (fChess.Utils.isQueen(piece)) {
                this.cells[this.cells.length - 5].piece = piece;
            } else if (fChess.Utils.isKing(piece)) {
                this.cells[this.cells.length - 4].piece = piece;
            } else {
                this.cells[this.cells.length - i - 1].piece = piece;
            }
        }.bind(this));
    };

    Board.prototype._findKings = function () {
        for (var i = 0; i < this.players.length; i++) {
            var pieces = this.players[i].pieces;
            for (var j = 0; j < pieces.length; j++) {
                if (fChess.Utils.isKing(pieces[j])) {
                    this.players[i].king = pieces[j];
                    break;
                }
            }
        }
    };

    Board.prototype._findCellForPiece = function (piece) {
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i].piece == piece) {
                return this.cells[i];
            }
        }

        return null;
    };

    Board.prototype._findCellForSprite = function (spritePiece) {
        for (var i = 0; i < this.cells.length; i++) {
            var piece = this.cells[i].piece;
            if (piece == spritePiece.piece) {
                return this.cells[i];
            } else if (spritePiece.pastPieces.has(piece)) { // the sprite used to have this piece
                spritePiece.replacePiece(piece);
                return this.cells[i];
            }
        }

        return null;
    };

    Board.prototype._findSpriteForPiece = function (piece) {
        for (var i = 0; i < this.spritePieces.length; i++) {
            if (this.spritePieces[i].piece == piece) {
                return this.spritePieces[i];
            }
        }

        return null;
    };

    // public functions
    Board.prototype.reset = function () {
        this._clearBoard();
        this._resetPlayers();
        this._findKings();
        this._clearSnapshots();
        this._initializePieces();
        this._takeSnapshot();
    };

    Board.prototype.changePiece = function (pieceName) {
        Board.pieceType = pieceName;

        // this is only valid when the game already starts
        this.spritePieces.forEach(function (spritePiece) {
            spritePiece.changeIcon();
        }.bind(this));
    };

    Board.prototype.toggleFeedback = function (isSet) {
        if (this.selectedPiece) {
            if (isSet) {
                this._highlightMoves(this.selectedPiece);
            } else {
                this._removeFeedback();
            }
        }

        Board.showFeedback = isSet;
    };

    //static functions
    Board.getCellID = function (cell) {
        var column = Board.gameSettings.columnIDs[cell.column];
        var row = (Board.gameSettings.rows - cell.row).toString();

        return column + row;
    };

    Board.findKing = function (piece) {
        var players = fChess.GameManager.GameVM.players();
        for (var i = 0; i < players.length; i++) {
            if (players[i].color == piece.color) {
                return players[i].king;
            }
        }

        return null;
    };

    Board.findEnemyKing = function (piece) {
        var players = fChess.GameManager.GameVM.players();
        for (var i = 0; i < players.length; i++) {
            if (players[i].color != piece.color) {
                return players[i].king;
            }
        }

        return null;
    };

    //static fields
    Board.gameSettings = {
        rows: 8,
        columns: 8,
        columnIDs: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        squareWidth: 63,
        squareHeight: 63,
        widthScale: 0.6,
        heightScale: 0.6,
        anchor: 0.5,
        selectedCellColor: 0x0000FF,
        enemyCellColor: 0xFF0000
    };

    return Board;
})();
