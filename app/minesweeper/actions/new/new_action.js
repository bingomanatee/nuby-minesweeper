var _ = require('underscore');

var _c = [0, 1,2,3,4,5,6,7];
function _rand(){ return Math.random(); };

module.exports = {

    execute: function(req_state, cb){
        var sm = req_state.framework.models.ms_game;

        function _new_game(){
            var out = {id: sm.next_key()};
            var mines = [];
            for (var r = 0; r < 8; ++r) {
                var row = [];
                for (var c = 0; c < 8; ++c){
                    row.push(0);
                }
                mines.push(row);
            }

            var placed_mines = 0;

            while (placed_mines < 10){
                var r = _.sortBy(_c, _rand)[0];
                var c = _.sortBy(_c, _rand)[0];
                if (!mines[r][c]){
                    ++placed_mines;
                    mines[r][c] = 1;
                }
            }
            out.mines = mines;
            return out;
        }

        function _on_new(){
            req_state.put_flash('New game created', 'info', '/minesweeper/game/' + game.id);
        }
        var game = _new_game();

        sm.put(game, _on_new);

    }
}

