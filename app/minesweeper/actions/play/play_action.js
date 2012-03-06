

module.exports = {

    execute: function(req_state, cb){

        var sm = req_state.framework.models.ms_game;


        sm.all(function(err, games){

            cb(null, {games: games});
        });

    }
}