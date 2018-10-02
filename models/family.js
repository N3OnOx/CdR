var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var FamilySchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    name: { type: String },
    state: { type: Boolean, default: true },
    resources: {
        wood: { type: Number, default: 0 },
        steal: { type: Number, default: 0 },
        leather: { type: Number, default: 0 },
        wool: { type: Number, default: 0 },
        wine: { type: Number, default: 0 },
        beer: { type: Number, default: 0 },
        food: { type: Number, default: 0 }
    },
    constructions: {
        smithy: { type: Number, default: 0 },
        farm: { type: Number, default: 0 },
        carpentry: { type: Number, default: 0 },
        butcher: { type: Number, default: 0 },
        tavern: { type: Number, default: 0 },
        library: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('Family', FamilySchema);
module.exports.createFamily = function(newFamily, callback) {
    newFamily.save(callback);
}
module.exports.getFamilyByName = function(name, callback) {
    var query = { name: name };
    Family.findOne(query, callback);
}