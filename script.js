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
        gameEnded: this.checkEnd,
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
            this.winPoints.forEach(item => {
                let line = [];
                item.forEach(cell => {
                    line.push(this.cells[cell-1].insertedFigure);
                });
                this.winLines.push(line);
            });
            this.checkWinLines();
        },
        checkWinLines: function () {
            this.winLines.forEach(line => {
                if(line.every(cell => cell === 'x')) {
                    this.whoWin = this.players.player_X;
                    return;
                }
                if(line.every(cell => cell === 'o')) {
                    this.whoWin = this.players.player_O;
                    return;
                }
            })
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
