var fChess = fChess || {};

fChess.History = (function () {
    'use strict';

    // constructor
    var History = function (parentElement) {
        if (parentElement == undefined) {
            parentElement = document.body;
        }
        this.$parent = $(parentElement);

        fChess.GameManager.GameVM.state.extend({ notify: 'always' });
        this.boardStateSubscription = fChess.GameManager.GameVM.state.subscribe(function (newState) {
            if (newState != '') {
                this.update(newState);
            }
        }.bind(this));
    };

    History.prototype.$parent = null;
    History.prototype.$row = null;
    History.prototype.turn = 0;
    History.prototype.counter = 1;
    History.prototype.boardStateSubscription = null;

    History.prototype.reset = function () {

    };

    History.prototype.update = function (newState) {
        if (this.turn == 0) {
            this.createNewRow();
            this.turn = 1;
        } else {
            this.turn = 0;
            this.counter++;
        }

        this.createNewCell(newState);
    };

    History.prototype.createNewRow = function () {
        this.$row = $(document.createElement('div'));
        this.$row.attr('id', 'history-row');
        this.$parent.append(this.$row);

        var $label = $(document.createElement('div'));
        $label.attr('id', 'turn-label');
        $label.text(this.counter);
        this.$row.append($label);
    }

    History.prototype.createNewCell = function (newState) {
        var $newCell = $(document.createElement('div'));
        $newCell.attr('id', 'history-cell');
        $newCell.text(newState);
        this.$row.append($newCell);
    }
    return History;
})();
