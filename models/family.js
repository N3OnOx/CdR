var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var FamilySchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    name: { type: String },
    state: { type: Boolean, default: true },
    resources: {
        type: Array,
        default: [
            ["gold", 0],
            ["food", 0],
            ["wood", 0],
            ["steel", 0],
            ["iron", 0],
            ["stone", 0],
            ["wine", 0],
            ["poblation", 0]
        ]
    },

    construction: {
        type: Array,
        default: [
            ["foundry", "steel", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["farm", "food", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["sawmill", "wood", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["house", "poblation", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["quarry", "stone", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["vineyard", "wine", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["smithy", "iron", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["monastery", "fe", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["castle", "power", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["stoneWall", "guard", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["archery", "archers", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
        ]
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