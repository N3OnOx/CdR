var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var FamilySchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    name: { type: String },
    state: { type: Boolean, default: true },
    resources: {
        wood: { type: Number, default: 0 },
        metals: {
            iron: { type: Number, default: 0 },
            silver: { type: Number, default: 0 },
            steel: { type: Number, default: 0 },
            copper: { type: Number, default: 0 },
            gold: { type: Number, default: 0 }
        },
        leather: { type: Number, default: 0 },
        wine: { type: Number, default: 0 },
        food: { type: Number, default: 0 }
    },
    construction: {
        foundry: { type: Number, default: 0 },
        farm: { type: Number, default: 0 },
        sawmill: { type: Number, default: 0 },
        house: { type: Number, default: 0 },
        quarry: { type: Number, default: 0 },
        vineyard: { type: Number, default: 0 },
        smithy: { type: Number, default: 0 },
        market: { type: Number, default: 0 },
        library: { type: Number, default: 0 },
        barracks: { type: Number, default: 0 },
        tavern: { type: Number, default: 0 },
        shipyard: { type: Number, default: 0 },
        monastery: { type: Number, default: 0 },
        castle: { type: Number, default: 0 },
        stoneWall: { type: Number, default: 0 },
        archery: { type: Number, default: 0 },
        barn: { type: Number, default: 0 }
    },
    constructionID: { type: String }
});

module.exports = mongoose.model('Family', FamilySchema);
module.exports.createFamily = function(newFamily, callback) {
    newFamily.save(callback);
}
module.exports.getFamilyByName = function(name, callback) {
    var query = { name: name };
    Family.findOne(query, callback);
}