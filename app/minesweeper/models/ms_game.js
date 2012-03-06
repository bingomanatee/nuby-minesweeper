var Simple_model = require('nuby-express/lib/simple_model');

var _model;

module.exports = function () {
    if (!_model) {
        _model = new Simple_model();
    }

    return _model;
}