
var gameState = {
    isPlaying: false,
    player: null,
    computer: null,
    grid: null, //info storage about where player has placed Xs, Os (vital stats)

    // setPlayers takes an argument and sets the value of this.player (ie. player attribtue within gameState object, which was previously null) to the argument. It then sets this.computer (another attribute within the gameState object) to the "opposite" of gameState.player//

    setPlayers: function(xorO) {
        this.player = xorO;
        this.computer = (xorO == "X") ? "O" : "X";
        this.isPlaying = true;
    },

    onPlayerSelectO: function() {
        this.setPlayers("O");
        this.grid[4] = "X";
        this.afterMove();
    },

    onPlayerSelectX: function() {
        this.setPlayers("X");
        gameUI.update();
    },

    onPlayerPlays: function(n) {
        if (!this.isPlaying) {
            return;
        }

        this.grid[n] = this.player;
        this.afterMove();
        this.computerChooses();
        this.afterMove();
    },

    afterMove: function() {
        if (!this.isPlaying) {
            return;
        }

        gameUI.update();
        this.detectWinCondition();
    },

    // Find the square that are not null. iterate over the grid. Find all of the rows, columns, and diagonals that that square is in. Put an X or O in that row.

    computerChooses: function() {
        if (!this.isPlaying) {
            return;
        }

        var nullIndices = [];

        this.grid.forEach(function chooseOne(gridElementValue, index) {
            if (gridElementValue === null) {
                nullIndices.push(index);
            };
        });

        var computerChoice = nullIndices[Math.floor(nullIndices.length * Math.random())];
        this.grid[computerChoice] = this.computer;
    },

    winLines: [
        // rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // diagonals
        [0, 4, 8],
        [2, 4, 6],
    ],

    detectWinCondition: function() {
        if (!this.isPlaying) {
            return;
        }

        var hasWon = false;

        this.winLines.forEach(function(winLine) {
            if (this.grid[winLine[0]] != null && this.grid[winLine[0]] == this.grid[winLine[1]] && this.grid[winLine[0]] == this.grid[winLine[2]]) {
                hasWon = true
            }
        }, this);

        if (hasWon) {
            alert("Three in a row! You win!")
            this.isPlaying = false;
        }
    },

    reset: function() {
        this.player = null;
        this.computer = null;
        this.grid = [];
        for (var i = 0; i < 9; i++) {
            this.grid.push(null);
        }

        this.isPlaying = false;

    },
}; // last brackets of gamestate object.