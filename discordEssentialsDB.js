const { reconDB } = require("reconlx");

const db = new reconDB({
    uri : 'mongodb+srv://root:o7c4DWZ9yTNnGAOv@cluster0.ejdy1.mongodb.net/test'
})

module.exports = db;