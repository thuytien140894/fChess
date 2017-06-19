var fChess = fChess || {};

fChess.HistoryChart = (function () {
    'use strict';

    // constructor
    var HistoryChart = function () {
        this.rows = ko.observableArray([]);

        fChess.GameManager.GameVM.newState.extend({ notify: 'always' });
        this.boardStateSubscription = fChess.GameManager.GameVM.newState.subscribe(function (newState) {
            this.update(newState);
        }.bind(this));
    };

    HistoryChart.prototype.rows = null;

    HistoryChart.prototype.reset = function () {
        this.rows([]);
    };

    HistoryChart.prototype.update = function (newState) {
        var counter = fChess.GameManager.GameVM.snapshot();
        var rowIndex = Math.floor(counter / 2);

        var cellIndex = counter % 2;
        if (cellIndex == 0) {
            this.rows.splice(rowIndex);
            var row = new HistoryChart.Row(counter);
            this.rows.push(row);
        } else {
            this.rows.splice(rowIndex + 1);
        }

        var currentRow = this.rows()[rowIndex];
        currentRow.cells[cellIndex].name(newState);

        fChess.GameManager.totalTurn++;
    };

    HistoryChart.Row = (function () {
        var Row = function (turn) {
            this.cells = [new HistoryChart.Cell(turn), new HistoryChart.Cell(turn + 1)];
            this.index = Math.floor(turn / 2) + 1;
        };

        Row.prototype.cells = null;
        Row.prototype.index = 0;

        return Row;
    })();

    HistoryChart.Cell = (function () {
        var Cell = function (turn) {
            // this attaches the observable to the individual instance
            // as a property
            this.turn = turn;
            this.name = ko.observable('');
        };

        // observables are functions and not properties, so they are
        // represented by a single instance on the object prototype
        // https://stackoverflow.com/questions/10520400/knockout-issue-with-prototypical-inheritance

        // this observable is shared by all instances
        // Cell.prototype.name = ko.observable();
        Cell.prototype.name = null;
        Cell.prototype.turn = 0;

        Cell.prototype.revertTheGame = function () {
            fChess.GameManager.GameVM.snapshot(this.turn);
        };

        return Cell;
    })();

    return HistoryChart;
})();
