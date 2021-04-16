const { mongo } = require("mongoose");
const mono = require("mongoose");

module.exports = mongo.model(
    'Money',
    new mongo.Schema({
        id: String,
        coins: Number
    })
);