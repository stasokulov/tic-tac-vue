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
            player_O: 'Компьютер'
        },
        figures: {
            x: 'x',
            o: 'o'
        }
    },
    created: function () {
            this.createGrid()
    },
    methods: {
        createGrid: function () {
            for(let i=0; i<9; i++) {
                this.cells[i] = '';
            }
        },
        catchClick: function (index) {
            if(this.cells[index] === '') {
                this.moveX
                    ?
                    this.cells[index] = this.figures.x
                    :
                    this.cells[index] = this.figures.o;
                this.moveX = !this.moveX;
                this.checkWinPoints();
            }
        },
        checkWinPoints: function () {
            this.winLines = [];
            this.winPoints.forEach(numCellsArray => {
                let figureLine = [];
                numCellsArray.forEach(numCell => {
                    figureLine.push(
                        {
                            figure: this.cells[numCell-1],
                            numCell: numCell
                        }
                    );
                });
                this.winLines.push(figureLine);
            });
            this.checkWinLines();
            if(this.cells.every(cell => cell)) {
                this.gameEnded = true;
            }
        },
        checkWinLines: function() {
            this.winLines.forEach(line => {
              if(line.every(cell => cell.figure === 'x')) {
                  this.whoWin = this.players.player_X;
                  this.gameEnded = true;
                  return;
              }
              if(line.every(cell => cell.figure === 'o')) {
                  this.whoWin = this.players.player_O;
                  this.gameEnded = true;
                  return;
              }
            });
            if(!this.gameEnded) {
                this.moveAI();
            }
        },
        moveAI: function () {
            if (!this.gameEnded && !this.moveX) {

                let numCell;

                for(let i=0; i<this.winLines.length; i++ ) {
                    numCell = this.checkOO(this.winLines[i]);
                    if (numCell) {
                        console.log('Сработала проверка на победу');
                        this.catchClick(numCell-1);
                        return
                    }
                }

                for(let i=0; i<this.winLines.length; i++ ) {
                    numCell = this.checkXX(this.winLines[i]);
                    if (numCell) {
                        console.log('Сработала проверка на спасение');
                        this.catchClick(numCell-1);
                        return
                    }
                }

                numCell = 5;
                if(this.cells[numCell-1] === '') {
                    console.log('Сработала проверка на центр');
                    this.catchClick(numCell-1);
                    return
                }

                for(let i=0; i<this.winLines.length; i++ ) {
                    numCell = this.checkO__(this.winLines[i]);
                    if (numCell) {
                        console.log('Сработала проверка на второй О');
                        this.catchClick(numCell-1);
                        return
                    }
                }

                let corners = [1, 3, 7, 9];
                numCell = this.getEmptyCells(corners);
                if (numCell) {
                    console.log('Сработала проверка на угол');
                    this.catchClick(numCell-1);
                    return
                }
                let sides = [2, 4, 6, 8];
                numCell = this.getEmptyCells(sides);
                if (numCell) {
                    console.log('Сработала проверка на сторону');
                    this.catchClick(numCell-1);
                }
            }
        },
        checkOO: function(line) {
            if (
                this.howManyFigures(line, this.figures.o).length === 2
                &&
                line.some(item => item.figure === '')
            ) {
                return this.getNumCell(line, '');
            } else {
                return false;
            }
        },
        checkXX:function(line){
            if (
                this.howManyFigures(line, this.figures.x).length === 2
                &&
                line.some(item => item.figure === '')
            ) {
                return this.getNumCell(line, '');
            } else {
                return false;
            }
        },
        checkO__: function(line) {
            if (
                this.howManyFigures(line, '').length === 2
                &&
                line.some(item => item.figure === this.figures.o)
            ) {
                return this.getNumCell(line, '');
            } else {
                return false;
            }
        },
        getEmptyCells: function(checkCells) {
            for(let i=0; i<checkCells.length; i++) {
                const numCell = checkCells[i];
                if (this.cells[numCell-1] === '') {
                    return numCell
                }
            }
        },
        howManyFigures: function (line, figure) {
            let set = [];
            line.forEach(item => {
                if (item.figure === figure) {
                    set.push(figure);
                }
            });
            return set;
        },
        getNumCell: function (line, figure) {
            let numCell = '';
            line.forEach(item => {
                if (item.figure === figure) {
                    numCell = item.numCell;
                }
            })
            return numCell;
        },
        reboot: function () {
            window.location.reload();
        }
    },
    computed: {
        checkWhoseMove: function () {
            return (this.moveX ? this.players.player_X : this.players.player_O);
        },
        q: function () {
            return this.winLines[0];
        }
    }
})
