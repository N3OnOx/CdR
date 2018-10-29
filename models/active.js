var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var activeSchema = mongoose.Schema({
    family: {},
    construction: {},
    dateEnd: {}
});

module.exports = mongoose.model('Active', activeSchema);