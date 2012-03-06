var util = require('util');

module.exports = {

    route:'/minesweeper/game/:id',

    load_req_params:true,

    method:['get', 'post'],

    execute:function (req_state, cb) {

        var sm = req_state.framework.models.ms_game;

        function _on_get(err, game) {
            console.log('game found: ', util.inspect(game));
            _mine_count(game);
            cb(null, {game:game});
        }

        function _on_id(err, id) {
            sm.get(id, _on_get);
        }

        function _on_fail() {
            req_state.put_flash('Cannot get id', 'error', '/');
        }

        req_state.get_param('id', _on_id, _on_fail);
    }

}

function _hits(game, r, c) {
    var h = 0;
    for (var r2 = Math.max(r - 1, 0); r2 <= Math.min(7, r + 1); ++r2){
        for (var c2 = Math.max(c - 1, 0); c2 <= Math.min(7, c + 1); ++c2){
            if (game.mines[r2][c2]){
                ++h;
            }
        }
    }
    return h;
}

function _mine_count(game) {
    game.count = [];
    for (var r = 0; r < 8; ++r) {
        var hits = [];
        for (var c = 0; c < 8; ++c) {
            var hit_count = _hits(game, r, c);
            console.log('r', r,'c', c, 'count: ', hit_count);
            hits.push(hit_count);
        }
        game.count.push(hits);
        console.log('row', r, 'game.count = ', util.inspect(game.count));
    }
}