require('./user');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var ConstructionsSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    foundry: {
        nivel: {
            one: {
                benefits: { type: Number, default: 25 },
                value: {
                    stone: { type: Number, default: 25 },
                    wood: { type: Number, default: 25 }
                }
            },
            two: {
                benefits: { type: Number, default: 50 },
                value: {
                    stone: { type: Number, default: 50 },
                    steel: { type: Number, default: 50 }
                }
            },
            three: {
                benefits: { type: Number, default: 75 },
                value: {
                    stone: { type: Number, default: 75 },
                    wood: { type: Number, default: 75 }
                }
            },
        }
    },
    farm: {
        nivel: {
            one: {
                benefits: { type: Number, default: 25 },
                value: {
                    stone: { type: Number, default: 25 },
                    wood: { type: Number, default: 25 }
                }
            },
            two: {
                benefits: { type: Number, default: 50 },
                value: {
                    stone: { type: Number, default: 50 },
                    steel: { type: Number, default: 50 }
                }
            },
            three: {
                benefits: { type: Number, default: 75 },
                value: {
                    stone: { type: Number, default: 75 },
                    wood: { type: Number, default: 75 }
                }
            },
        }
    }
});

module.exports = mongoose.model('Constructions', ConstructionsSchema);
module.exports.createConstructions = function(newConstructions, callback) {
    newConstructions.save(callback);
}