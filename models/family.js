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
            ["food", 0],
            ["wine", 0],
            ["wood", 0],
            ["iron", 0],
            ["stone", 0]
        ]
    },
    coins: {
        type: Array,
        default: [
            ["goldenDragon", 0],
            ["silverDeer", 0],
            ["copperPenny", 0]
        ]
    },
    army: {
        type: Array,
        default: [
            ["knight", 0],
            ["mercenary", 0],
            ["archer", 0],
            ["crossbowman", 0],
            ["galley", 0],
            ["poblation", 0]
        ]
    },

    construction: {
        type: Array,
        default: [
            ["foundry", "iron", 1, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ], "resource"],
            ["farm", "food", 1, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ], "resource"],
            ["sawmill", "wood", 1, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ], "resource"],
            ["quarry", "stone", 1, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ], "resource"],
            ["vineyard", "wine", 1, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ], "resource"],
            ["house", "poblation", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["smithy", "armor;sword", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["monastery", "faith", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["castle", "knight", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["stoneWall", "defense", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["archery", "archer", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["barracks", "mercenary", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
            ]],
            ["shipyard", "galley", 0, [
                { benefits: 0, valor: "0" },
                { benefits: 25, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 50, valor: "stone:5;wood:5", tiempo: 15000 },
                { benefits: 75, valor: "stone:5;wood:5", tiempo: 15000 },
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