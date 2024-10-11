const mongoose = require('mongoose')

const mongodb = async () => {
    try {
        await mongoose.connect(process.env.Database)
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongodb