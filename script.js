let app = new Vue({
    el: '#tic-tac-toe',
    data: {
        cells: [],
        templateCell: {
            insertedFigure: ''
        },
        moveX: true,
        winPoints: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ],
        winLines: [],
        whoWin: '',
        gameEnded: false,
        players: {
            player_X: 'Игрок 1',
            player_O: 'Игрок 2'
        }
    },
    created: function () {
            this.createGrid()
    },
    methods: {
        createGrid: function () {
            for(let i=1; i<=9; i++) {
                const cell = Object.assign({}, this.templateCell);
                this.cells.push(cell);
            }
        },
        catchClick: function (cell) {
            this.moveX
                ?
                cell.insertedFigure = 'x'
                :
                cell.insertedFigure = 'o';
            this.moveX = !this.moveX;
            this.checkWinPoints();
        },
        checkWinPoints: function () {
            this.winPoints.forEach(numCellsArray => {
                let figureLine = [];
                numCellsArray.forEach(numCell => {
                    figureLine.push(this.cells[numCell-1].insertedFigure);
                });
                if(figureLine.every(figure => figure === 'x')) {
                    this.whoWin = this.players.player_X;
                    this.gameEnded = true;
                    return;
                }
                if(figureLine.every(figure => figure === 'o')) {
                    this.whoWin = this.players.player_O;
                    this.gameEnded = true;
                    return;
                }
            });
            if(this.cells.every(cell => cell.insertedFigure)) {
                this.gameEnded = true;
            }
        },

        reboot: function () {
            window.location.reload();
        }
    },
    computed: {
        checkWhoseMove: function () {
            return (this.moveX ? this.players.player_X : this.players.player_O);
        }
    }
})
