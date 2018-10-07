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
            ["metals", 0],
            ["food", 0],
            ["wood", 0],
            ["poblation", 0],
            ["stone", 0],
            ["wine", 0],
            ["steel", 0],
        ]
    },

    construction: {
        type: Array,
        default: [
            ["foundry", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["farm", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["sawmill", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["house", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["quarry", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["vineyard", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["smithy", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["monastery", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["castle", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["stoneWall", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["archery", 0, [
                { benefits: 25, valor: "stone:5;wood:5" },
                { benefits: 50, valor: "stone:5;wood:5" },
                { benefits: 75, valor: "stone:5;wood:5" },
            ]],
            ["barn", 0, [
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